import { cacheLife } from "next/cache";
import axios from "axios";
import type { Product } from "@/lib/products";

type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  productType: string;
  description: string;
  tags: string[];
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  variants: {
    nodes: Array<{ id: string; availableForSale: boolean }>;
  };
};

type ShopifyResponse = {
  data?: {
    products?: { nodes: ShopifyProduct[] };
    product?: ShopifyProduct | null;
  };
  errors?: Array<{ message: string }>;
};

const productFields = `
  id
  title
  handle
  vendor
  productType
  description
  tags
  featuredImage { url altText }
  priceRange { minVariantPrice { amount currencyCode } }
  variants(first: 1) { nodes { id availableForSale } }
`;

async function queryShopify(query: string, variables?: Record<string, string>) {
  const domainValue = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION;

  if (!domainValue || !token || !version) {
    throw new Error(
      "Shopify settings are missing from the server environment.",
    );
  }

  try {
    const domain = new URL(
      domainValue.includes("://") ? domainValue : `https://${domainValue}`,
    ).hostname;
    const { data: result } = await axios.post<ShopifyResponse>(
      `https://${domain}/api/${version}/graphql.json`,
      { query, variables },
      {
        headers: {
          "content-type": "application/json",
          "Shopify-Storefront-Private-Token": token,
        },
      },
    );
    if (result.errors?.length) {
      throw new Error(result.errors.map(({ message }) => message).join("; "));
    }

    return result.data ?? null;
  } catch (error) {
    console.error("Could not load products from Shopify:", error);
    throw error;
  }
}

function toProduct(product: ShopifyProduct): Product {
  const tags = product.tags.map((tag) => tag.toLowerCase());
  const pet = [
    tags.some((tag) => tag.includes("chien")) && "Chien",
    tags.some((tag) => tag.includes("chat")) && "Chat",
  ]
    .filter(Boolean)
    .join(" & ");

  return {
    slug: product.handle,
    brand: product.vendor,
    name: product.title,
    detail: product.productType,
    price: Number(product.priceRange.minVariantPrice.amount),
    unitPrice: "",
    image: product.featuredImage?.url ?? "",
    category: product.productType,
    pet,
    description: product.description,
    composition: "",
    usage: "",
    shopifyVariantId: product.variants.nodes[0]?.id,
    availableForSale: product.variants.nodes[0]?.availableForSale ?? false,
  };
}

export async function getShopifyProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");

  const query = `query PawWellProducts { products(first: 50) { nodes { ${productFields} } } }`;
  const data = await queryShopify(query);
  return data?.products?.nodes.map(toProduct) ?? [];
}

export async function getShopifyProductByHandle(handle: string) {
  "use cache";
  cacheLife("minutes");

  const query = `query PawWellProduct($handle: String!) { product(handle: $handle) { ${productFields} } }`;
  const data = await queryShopify(query, { handle });
  return data?.product ? toProduct(data.product) : undefined;
}

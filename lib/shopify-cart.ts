import axios from "axios";

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    image: { url: string; altText: string | null } | null;
    product: { title: string; handle: string };
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: { nodes: ShopifyCartLine[] };
};

type CartPayload = {
  cart: ShopifyCart | null;
  userErrors: Array<{ message: string }>;
};

type CartResponse = {
  data?: {
    cart?: ShopifyCart | null;
    cartCreate?: CartPayload;
    cartLinesAdd?: CartPayload;
    cartLinesUpdate?: CartPayload;
    cartLinesRemove?: CartPayload;
  };
  errors?: Array<{ message: string }>;
};

const cartFields = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 250) {
    nodes {
      id
      quantity
      merchandise {
        ... on ProductVariant {
          id
          title
          price { amount currencyCode }
          image { url altText }
          product { title handle }
        }
      }
    }
  }
`;

async function queryShopifyCart(query: string, variables: Record<string, unknown>) {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION;

  if (!storeDomain || !token || !version) {
    throw new Error("Shopify cart settings are missing.");
  }

  const domain = new URL(
    storeDomain.includes("://") ? storeDomain : `https://${storeDomain}`,
  ).hostname;
  const { data } = await axios.post<CartResponse>(
    `https://${domain}/api/${version}/graphql.json`,
    { query, variables },
    {
      headers: {
        "content-type": "application/json",
        "Shopify-Storefront-Private-Token": token,
      },
    },
  );

  if (data.errors?.length) {
    throw new Error(data.errors.map(({ message }) => message).join("; "));
  }
  return data.data ?? null;
}

function getCart(payload: CartPayload | undefined) {
  if (!payload) throw new Error("Shopify did not return a cart.");
  if (payload.userErrors.length) {
    throw new Error(payload.userErrors.map(({ message }) => message).join("; "));
  }
  if (!payload.cart) throw new Error("Shopify did not return a cart.");
  return payload.cart;
}

export async function getShopifyCart(cartId: string) {
  const query = `query PawWellCart($cartId: ID!) { cart(id: $cartId) { ${cartFields} } }`;
  const data = await queryShopifyCart(query, { cartId });
  return data?.cart ?? null;
}

export async function clearShopifyCart(cartId: string) {
  const cart = await getShopifyCart(cartId);
  if (!cart) return null;

  const lineIds = cart.lines.nodes.map(({ id }) => id);
  if (lineIds.length === 0) return cart;

  const mutation = `mutation PawWellCartClear($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${cartFields} }
      userErrors { message }
    }
  }`;
  const data = await queryShopifyCart(mutation, { cartId, lineIds });
  return getCart(data?.cartLinesRemove);
}

export async function addShopifyCartLine(
  cartId: string | undefined,
  variantId: string,
  quantity: number,
) {
  if (!cartId) {
    const mutation = `mutation PawWellCartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { ${cartFields} }
        userErrors { message }
      }
    }`;
    const data = await queryShopifyCart(mutation, {
      lines: [{ merchandiseId: variantId, quantity }],
    });
    return getCart(data?.cartCreate);
  }

  const mutation = `mutation PawWellCartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${cartFields} }
      userErrors { message }
    }
  }`;
  const data = await queryShopifyCart(mutation, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });
  return getCart(data?.cartLinesAdd);
}

export async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
) {
  if (quantity === 0) {
    const mutation = `mutation PawWellCartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${cartFields} }
        userErrors { message }
      }
    }`;
    const data = await queryShopifyCart(mutation, { cartId, lineIds: [lineId] });
    return getCart(data?.cartLinesRemove);
  }

  const mutation = `mutation PawWellCartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${cartFields} }
      userErrors { message }
    }
  }`;
  const data = await queryShopifyCart(mutation, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  return getCart(data?.cartLinesUpdate);
}

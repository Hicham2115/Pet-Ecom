import { getShopifyProducts } from "@/lib/shopify";

export async function GET() {
  try {
    return Response.json(await getShopifyProducts());
  } catch {
    return Response.json(
      { error: "Impossible de charger les produits Shopify." },
      { status: 502 },
    );
  }
}

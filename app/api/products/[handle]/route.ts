import { getShopifyProductByHandle } from "@/lib/shopify";

type RouteContext = {
  params: Promise<{ handle: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { handle } = await params;
    return Response.json(await getShopifyProductByHandle(handle) ?? null);
  } catch {
    return Response.json(
      { error: "Impossible de charger ce produit Shopify." },
      { status: 502 },
    );
  }
}

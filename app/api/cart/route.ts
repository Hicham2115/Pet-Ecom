import {
  addShopifyCartLine,
  clearShopifyCart,
  getShopifyCart,
  updateShopifyCartLine,
} from "@/lib/shopify-cart";

const cartIdPattern = /^gid:\/\/shopify\/Cart\//;
const variantIdPattern = /^gid:\/\/shopify\/ProductVariant\//;
const lineIdPattern = /^gid:\/\/shopify\/CartLine\//;

function isValidQuantity(value: unknown, allowZero = false): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= (allowZero ? 0 : 1) &&
    value <= 99
  );
}

function reportCartError(error: unknown) {
  console.error("Shopify cart request failed:", error);
}

export async function GET(request: Request) {
  const cartId = new URL(request.url).searchParams.get("cartId");
  if (!cartId || !cartIdPattern.test(cartId)) {
    return Response.json({ error: "Identifiant de panier invalide." }, { status: 400 });
  }

  try {
    return Response.json({ cart: await getShopifyCart(cartId) });
  } catch (error) {
    reportCartError(error);
    return Response.json(
      { error: "Impossible de charger le panier. Réessayez." },
      { status: 502 },
    );
  }
}

export async function POST(request: Request) {
  let body: { cartId?: unknown; variantId?: unknown; quantity?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (
    (body.cartId != null &&
      (typeof body.cartId !== "string" || !cartIdPattern.test(body.cartId))) ||
    typeof body.variantId !== "string" ||
    !variantIdPattern.test(body.variantId) ||
    !isValidQuantity(body.quantity)
  ) {
    return Response.json({ error: "Informations de panier invalides." }, { status: 400 });
  }

  try {
    const cart = await addShopifyCartLine(
      typeof body.cartId === "string" ? body.cartId : undefined,
      body.variantId,
      body.quantity,
    );
    return Response.json({ cart });
  } catch (error) {
    reportCartError(error);
    return Response.json(
      { error: "Impossible d’ajouter ce produit au panier. Réessayez." },
      { status: 502 },
    );
  }
}

export async function PATCH(request: Request) {
  let body: { cartId?: unknown; lineId?: unknown; quantity?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (
    typeof body.cartId !== "string" ||
    !cartIdPattern.test(body.cartId) ||
    typeof body.lineId !== "string" ||
    !lineIdPattern.test(body.lineId) ||
    !isValidQuantity(body.quantity, true)
  ) {
    return Response.json({ error: "Informations de panier invalides." }, { status: 400 });
  }

  try {
    const cart = await updateShopifyCartLine(
      body.cartId,
      body.lineId,
      body.quantity,
    );
    return Response.json({ cart });
  } catch (error) {
    reportCartError(error);
    return Response.json(
      { error: "Impossible de mettre à jour le panier. Réessayez." },
      { status: 502 },
    );
  }
}

export async function DELETE(request: Request) {
  let body: { cartId?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (typeof body.cartId !== "string" || !cartIdPattern.test(body.cartId)) {
    return Response.json({ error: "Identifiant de panier invalide." }, { status: 400 });
  }

  try {
    return Response.json({ cart: await clearShopifyCart(body.cartId) });
  } catch (error) {
    reportCartError(error);
    return Response.json(
      { error: "Impossible de vider le panier. Réessayez." },
      { status: 502 },
    );
  }
}

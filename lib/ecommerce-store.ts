"use client";

import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import type { ShopifyCart } from "@/lib/shopify-cart";

type CartResponse = { cart: ShopifyCart | null };
type CartError = { error?: string };

type EcommerceState = {
  cartId: string | null;
  cart: ShopifyCart | null;
  wishlist: Product[];
  hasHydrated: boolean;
  pendingCartSlugs: string[];
  isCartClearing: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  refreshCart: () => Promise<void>;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  updateCartLine: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleWishlist: (product: Product) => void;
};

let cartRequestQueue: Promise<void> = Promise.resolve();
let cartSnapshotVersion = 0;

function getCartWithLineQuantity(
  cart: ShopifyCart,
  lineId: string,
  quantity: number,
): ShopifyCart {
  const line = cart.lines.nodes.find((item) => item.id === lineId);
  if (!line) return cart;

  const quantityChange = quantity - line.quantity;
  const priceChange = Number(line.merchandise.price.amount) * quantityChange;
  const nextLines =
    quantity === 0
      ? cart.lines.nodes.filter((item) => item.id !== lineId)
      : cart.lines.nodes.map((item) =>
          item.id === lineId ? { ...item, quantity } : item,
        );

  return {
    ...cart,
    totalQuantity: nextLines.reduce((total, item) => total + item.quantity, 0),
    cost: {
      subtotalAmount: {
        ...cart.cost.subtotalAmount,
        amount: String(
          Math.max(0, Number(cart.cost.subtotalAmount.amount) + priceChange),
        ),
      },
      totalAmount: {
        ...cart.cost.totalAmount,
        amount: String(
          Math.max(0, Number(cart.cost.totalAmount.amount) + priceChange),
        ),
      },
    },
    lines: { nodes: nextLines },
  };
}

function getEmptyCartSnapshot(cart: ShopifyCart): ShopifyCart {
  return {
    ...cart,
    totalQuantity: 0,
    cost: {
      subtotalAmount: { ...cart.cost.subtotalAmount, amount: "0" },
      totalAmount: { ...cart.cost.totalAmount, amount: "0" },
    },
    lines: { nodes: [] },
  };
}

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError<CartError>(error)) {
    return error.response?.data?.error ?? "Impossible de contacter Shopify.";
  }
  return "Une erreur est survenue. Réessayez.";
}

export const useEcommerceStore = create<EcommerceState>()(
  persist(
    (set, get) => ({
      cartId: null,
      cart: null,
      wishlist: [],
      hasHydrated: false,
      pendingCartSlugs: [],
      isCartClearing: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      refreshCart: async () => {
        const { cartId } = get();
        if (!cartId) return;
        const version = cartSnapshotVersion;

        try {
          const { data } = await axios.get<CartResponse>("/api/cart", {
            params: { cartId },
          });
          if (version === cartSnapshotVersion) set({ cart: data.cart });
          if (!data.cart) set({ cartId: null });
        } catch (error) {
          toast.error(getErrorMessage(error));
        }
      },
      addToCart: async (product, quantity = 1) => {
        if (!product.shopifyVariantId || product.availableForSale === false) {
          toast.error("Ce produit ne peut pas être ajouté au panier.");
          return;
        }

        if (get().pendingCartSlugs.includes(product.slug)) return;
        set((state) => ({
          pendingCartSlugs: [...state.pendingCartSlugs, product.slug],
        }));

        const request = cartRequestQueue.then(async () => {
          const version = cartSnapshotVersion;
          try {
            const { data } = await axios.post<CartResponse>("/api/cart", {
              cartId: get().cartId,
              variantId: product.shopifyVariantId,
              quantity,
            });
            set({ cartId: data.cart?.id ?? null });
            if (version === cartSnapshotVersion) set({ cart: data.cart });
            toast.success("Produit ajouté au panier.");
          } catch (error) {
            toast.error(getErrorMessage(error));
          } finally {
            set((state) => ({
              pendingCartSlugs: state.pendingCartSlugs.filter(
                (slug) => slug !== product.slug,
              ),
            }));
          }
        });

        cartRequestQueue = request.then(() => undefined);
        await request;
      },
      updateCartLine: async (lineId, quantity) => {
        const currentCart = get().cart;
        if (!get().cartId || !currentCart) return;

        const previousCart = currentCart;
        const nextCart = getCartWithLineQuantity(currentCart, lineId, quantity);
        const version = ++cartSnapshotVersion;
        set({ cart: nextCart });

        const request = cartRequestQueue.then(async () => {
          try {
            const { data } = await axios.patch<CartResponse>("/api/cart", {
              cartId: get().cartId,
              lineId,
              quantity,
            });
            if (version === cartSnapshotVersion) set({ cart: data.cart });
          } catch (error) {
            if (version === cartSnapshotVersion) set({ cart: previousCart });
            toast.error(getErrorMessage(error));
          }
        });

        cartRequestQueue = request.then(() => undefined);
        await request;
      },
      clearCart: async () => {
        const { cartId, cart: currentCart } = get();
        if (!cartId || !currentCart || get().isCartClearing) return;

        const previousCart = currentCart;
        const version = ++cartSnapshotVersion;
        set({ cart: getEmptyCartSnapshot(currentCart) });
        set({ isCartClearing: true });
        const request = cartRequestQueue.then(async () => {
          try {
            const { data } = await axios.delete<CartResponse>("/api/cart", {
              data: { cartId: get().cartId },
            });
            set({ cartId: data.cart?.id ?? null });
            if (version === cartSnapshotVersion) set({ cart: data.cart });
            toast.success("Le panier a été vidé.");
          } catch (error) {
            if (version === cartSnapshotVersion) set({ cart: previousCart });
            toast.error(getErrorMessage(error));
          } finally {
            set({ isCartClearing: false });
          }
        });

        cartRequestQueue = request.then(() => undefined);
        await request;
      },
      toggleWishlist: (product) => {
        const exists = get().wishlist.some((item) => item.slug === product.slug);
        set((state) => ({
          wishlist: exists
            ? state.wishlist.filter((item) => item.slug !== product.slug)
            : [...state.wishlist, product],
        }));
        toast.success(exists ? "Retiré des favoris." : "Ajouté aux favoris.");
      },
    }),
    {
      name: "pawwell-store",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        cartId: state.cartId,
        cart: state.cart,
        wishlist: state.wishlist,
      }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);

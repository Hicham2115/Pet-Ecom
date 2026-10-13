"use client";

import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import type { ShopifyCart } from "@/lib/shopify";

type CartResponse = { cart: ShopifyCart | null };
type CartError = { error?: string };

type EcommerceState = {
  cartId: string | null;
  cart: ShopifyCart | null;
  wishlist: Product[];
  hasHydrated: boolean;
  isCartPending: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  refreshCart: () => Promise<void>;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  updateCartLine: (lineId: string, quantity: number) => Promise<void>;
  toggleWishlist: (product: Product) => void;
};

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
      isCartPending: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      refreshCart: async () => {
        const { cartId } = get();
        if (!cartId) return;

        try {
          const { data } = await axios.get<CartResponse>("/api/cart", {
            params: { cartId },
          });
          set({ cart: data.cart });
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

        set({ isCartPending: true });
        try {
          const { data } = await axios.post<CartResponse>("/api/cart", {
            cartId: get().cartId,
            variantId: product.shopifyVariantId,
            quantity,
          });
          set({ cart: data.cart, cartId: data.cart?.id ?? null });
          toast.success("Produit ajouté au panier.");
        } catch (error) {
          toast.error(getErrorMessage(error));
        } finally {
          set({ isCartPending: false });
        }
      },
      updateCartLine: async (lineId, quantity) => {
        const { cartId } = get();
        if (!cartId) return;

        try {
          const { data } = await axios.patch<CartResponse>("/api/cart", {
            cartId,
            lineId,
            quantity,
          });
          set({ cart: data.cart });
        } catch (error) {
          toast.error(getErrorMessage(error));
        }
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

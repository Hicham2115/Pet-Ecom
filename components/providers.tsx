"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useEcommerceStore } from "@/lib/ecommerce-store";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, retry: 1 },
        },
      }),
  );

  useEffect(() => {
    void (async () => {
      try {
        await useEcommerceStore.persist.rehydrate();
      } catch (error) {
        console.error("Could not restore saved PawWell data:", error);
      } finally {
        useEcommerceStore.getState().setHasHydrated(true);
      }
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="bottom-right"
        offset={24}
        mobileOffset={{ bottom: 16, right: 12 }}
        toastOptions={{
          className:
            "!w-[min(380px,calc(100vw-24px))] !rounded-2xl !border !border-[#dce9f8] !bg-white !px-4 !py-3 !text-[#10284b] !shadow-[0_16px_48px_rgba(16,40,75,0.18)]",
          classNames: {
            title: "!text-sm !font-semibold !text-[#10284b]",
            description: "!text-xs !leading-5 !text-[#66809c]",
            icon: "!text-[#175ffc]",
            success: "!border-emerald-200",
            error: "!border-rose-200",
          },
        }}
      />
    </QueryClientProvider>
  );
}

"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const links = [
  ["Par animal", "#shop-by-category"],
  ["Alimentation", "#food"],
  ["Jouets", "#toys"],
  ["Hygiène & soins", "#hygiene-care"],
  ["Santé", "#health"],
  ["Couchage & maison", "#beds-home"],
  ["Voyage", "#travel"],
  ["Promotions", "#offers"],
  ["Conseils", "#expert-advice"],
];

export function Navbar() {
  return (
    <nav
      aria-label="Navigation principale"
      className="border-t border-blue-700 bg-blue-600"
    >
      <div className="flex min-h-9 w-full items-center px-0 sm:px-0 md:px-4 lg:px-8 xl:px-12">
        <NavigationMenu
          viewport={false}
          className="hidden w-full max-w-none justify-start md:flex [&>div]:w-full"
        >
          <NavigationMenuList className="w-full justify-between gap-0">
            {links.map(([label, href]) => (
              <NavigationMenuItem
                className="flex flex-1 items-center justify-center px-0.5 after:absolute after:right-0 after:top-1/2 after:h-4 after:w-px after:-translate-y-1/2 after:bg-white/35 last:after:hidden lg:px-2"
                key={label}
              >
                <NavigationMenuLink asChild>
                  <Link
                    className={`min-h-9 w-full whitespace-nowrap rounded-md px-0.5 py-1.5 text-[9px] font-semibold text-white transition-colors hover:bg-blue-700 hover:text-white focus-visible:bg-blue-700 focus-visible:text-white lg:px-1.5 lg:text-xs xl:px-2 ${label === "Promotions" ? "decoration-red-300 underline decoration-2 underline-offset-4" : ""} justify-center gap-0.5`}
                    href={href}
                    style={{
                      display: "inline-flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {label}
                    {label !== "Promotions" && (
                      <ChevronDown
                        aria-hidden="true"
                        className="size-2.5 shrink-0 text-white lg:size-3"
                      />
                    )}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Sheet>
          <SheetTrigger
            aria-label="Ouvrir le menu de navigation"
            className="inline-flex min-h-12 w-full items-center gap-3 px-4 text-[15px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
            type="button"
          >
            <Menu
              aria-hidden="true"
              className="size-5 text-white"
            />
            <span>Explorer les catégories</span>
            <ChevronDown
              aria-hidden="true"
              className="ml-auto size-4 text-blue-100"
            />
          </SheetTrigger>
          <SheetContent
            className="h-dvh w-[min(86vw,360px)] gap-0 border-r border-[#e2ebf6] bg-white p-0 text-[#10284b] shadow-[12px_0_36px_rgba(16,40,75,0.16)]"
            side="left"
            showCloseButton={false}
          >
            <SheetHeader className="flex-row items-center justify-between border-b border-[#e8eff7] px-5 py-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                  PawWell
                </p>
                <SheetTitle className="mt-1 text-lg font-bold text-[#10284b]">
                  Explorer les catégories
                </SheetTitle>
              </div>
              <SheetClose
                render={
                  <button
                    aria-label="Fermer le menu"
                    className="inline-flex size-10 items-center justify-center rounded-full text-[#49627d] transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    type="button"
                  />
                }
              >
                <X aria-hidden="true" className="size-5" />
              </SheetClose>
            </SheetHeader>
            <nav aria-label="Catégories" className="overflow-y-auto p-3">
              {links.map(([label, href]) => (
                <SheetClose
                  key={label}
                  render={
                    <Link
                      className={`flex min-h-12 items-center justify-between rounded-xl px-3 text-[15px] font-medium transition-colors hover:bg-blue-600 hover:text-white focus-visible:bg-blue-600 focus-visible:text-white active:bg-blue-700 active:text-white ${label === "Promotions" ? "text-red-600" : "text-[#10284b]"}`}
                      href={href}
                    />
                  }
                >
                  {label}
                  <ChevronDown
                    aria-hidden="true"
                    className="-rotate-90 size-4 text-[#8aa0b9]"
                  />
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

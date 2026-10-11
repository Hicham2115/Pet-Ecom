"use client";

import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
      className="border-t border-slate-100 bg-[#f4f9fd]"
    >
      <div className="flex min-h-9 w-full items-center px-4 sm:px-6 md:px-10 xl:px-12">
        <NavigationMenu
          viewport={false}
          className="hidden w-full max-w-none justify-start xl:flex [&>div]:w-full"
        >
          <NavigationMenuList className="w-full justify-between gap-1">
            {links.map(([label, href]) => (
              <NavigationMenuItem key={label}>
                <NavigationMenuLink asChild>
                  <Link
                    className={`whitespace-nowrap px-2 py-1.5 text-xs font-semibold transition-colors hover:text-blue-700 ${label === "Promotions" ? "text-red-600" : "text-[#10284b]"}`}
                    href={href}
                    style={{
                      display: "inline-flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {label}
                    {label !== "Promotions" && (
                      <ChevronDown
                        aria-hidden="true"
                        className="size-3 shrink-0"
                      />
                    )}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Popover>
          <PopoverTrigger
            aria-label="Ouvrir le menu de navigation"
            className="inline-flex min-h-10 items-center gap-2 py-2 text-sm font-semibold text-[#10284b] xl:hidden"
          >
            <Menu aria-hidden="true" className="size-5" /> Explorer les catégories
          </PopoverTrigger>
          <PopoverContent align="start" className="w-72 p-2 xl:hidden">
            <div className="flex flex-col">
              {links.map(([label, href]) => (
                <Link
                  className={`rounded-md px-3 py-2.5 text-sm font-medium hover:bg-blue-50 ${label === "Promotions" ? "text-red-600" : "text-[#10284b]"}`}
                  href={href}
                  key={label}
                >
                  {label}
                </Link>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}

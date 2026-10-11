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
      className="border-t border-[#e5eef8] bg-[#f4f9fd]"
    >
      <div className="flex min-h-9 w-full items-center px-0 sm:px-0 md:px-4 lg:px-8 xl:px-12">
        <NavigationMenu
          viewport={false}
          className="hidden w-full max-w-none justify-start md:flex [&>div]:w-full"
        >
          <NavigationMenuList className="w-full justify-between gap-0">
            {links.map(([label, href]) => (
              <NavigationMenuItem key={label}>
                <NavigationMenuLink asChild>
                  <Link
                    className={`whitespace-nowrap px-1 py-1.5 text-[10px] font-semibold transition-colors hover:text-blue-700 lg:px-1.5 lg:text-xs xl:px-2 ${label === "Promotions" ? "text-red-600" : "text-[#10284b]"} gap-0.5`}
                    href={href}
                    style={{
                      display: "inline-flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {label}
                    {label !== "Promotions" && (
                      <ChevronDown
                        aria-hidden="true"
                        className="size-2.5 shrink-0 lg:size-3"
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
            className="inline-flex min-h-12 w-full items-center gap-3 px-4 text-[15px] font-semibold text-[#183657] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 md:hidden"
          >
            <Menu aria-hidden="true" className="size-5 text-blue-600" />
            <span>Explorer les catégories</span>
            <ChevronDown
              aria-hidden="true"
              className="ml-auto size-4 text-[#55708f]"
            />
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[calc(100vw-2rem)] max-w-sm rounded-xl border border-[#e2ebf6] p-2 shadow-[0_12px_30px_rgba(16,40,75,0.14)] md:hidden"
          >
            <div className="flex flex-col">
              {links.map(([label, href]) => (
                <Link
                  className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-blue-50 ${label === "Promotions" ? "text-red-600" : "text-[#10284b]"}`}
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

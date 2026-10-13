"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  {
    label: "Par animal",
    href: "/products",
    items: [
      ["Chiens", "/products"],
      ["Chats", "/products"],
      ["Tous les produits", "/products"],
    ],
  },
  {
    label: "Alimentation",
    href: "/products",
    items: [
      ["Croquettes pour chien", "/products"],
      ["Croquettes pour chat", "/products"],
      ["Friandises pour chat", "/products"],
    ],
  },
  {
    label: "Jouets",
    href: "/products",
    items: [
      ["Jouets pour chiens", "/products"],
      ["Tous les produits", "/products"],
    ],
  },
  {
    label: "Hygiène & soins",
    href: "/products",
    items: [
      ["Lingettes pour animaux", "/products"],
      ["Tous les soins", "/products"],
    ],
  },
  {
    label: "Santé",
    href: "/products",
    items: [
      ["Bien-être quotidien", "/products"],
      ["Hygiène & soins", "/products"],
    ],
  },
  {
    label: "Couchage & maison",
    href: "/products",
    items: [
      ["Accessoires du quotidien", "/products"],
      ["Voir la boutique", "/products"],
    ],
  },
  {
    label: "Voyage",
    href: "/products",
    items: [
      ["Accessoires de voyage", "/products"],
      ["Voir la boutique", "/products"],
    ],
  },
  {
    label: "Promotions",
    href: "/products",
    items: [
      ["Offres du moment", "/products"],
      ["Voir tous les produits", "/products"],
    ],
  },
  {
    label: "Conseils",
    href: "/products",
    items: [
      ["Conseils alimentation", "/products"],
      ["Conseils de soin", "/products"],
    ],
  },
];

export function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(null);

  return (
    <nav
      aria-label="Navigation principale"
      className="border-t border-blue-700 bg-blue-600"
    >
      <div className="flex min-h-9 w-full items-center px-0 sm:px-0 md:px-4 lg:px-8 xl:px-12">
        <div className="hidden w-full items-center justify-between md:flex">
          {links.map(({ label, items }) => (
            <Select
              key={label}
              onValueChange={(value) => router.push(String(value))}
              value={null}
            >
              <SelectTrigger
                aria-label={`${label} — ouvrir les options`}
                className={`inline-flex min-h-9 items-center justify-center gap-1 whitespace-nowrap rounded-md border-transparent bg-transparent px-2 text-[9px] font-semibold !text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&_svg]:!text-white data-placeholder:!text-white lg:px-2.5 lg:text-xs ${label === "Promotions" ? "underline decoration-red-300 decoration-2 underline-offset-4" : ""}`}
              >
                {label}
              </SelectTrigger>
              <SelectContent align="start" className="min-w-[210px] border-[#dce8f5] p-1.5 text-[#10284b] shadow-[0_14px_38px_rgba(16,40,75,0.18)]">
                {items.map(([itemLabel, href]) => (
                  <SelectItem className="min-h-10 rounded-lg text-xs font-medium focus:bg-[#eef5ff] focus:text-[#175ffc]" key={itemLabel} value={href}>
                    {itemLabel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
        <Sheet onOpenChange={setMobileMenuOpen} open={mobileMenuOpen}>
          <SheetTrigger
            aria-label="Ouvrir le menu de navigation"
            className="inline-flex min-h-12 w-full items-center gap-3 px-4 text-[15px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
            type="button"
          >
            <Menu aria-hidden="true" className="size-5 text-white" />
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
              {links.map(({ label, items }, index) => {
                const isOpen = openMobileCategory === label;
                const submenuId = `mobile-category-${index}`;

                return (
                  <div key={label}>
                    <button
                      aria-controls={submenuId}
                      aria-expanded={isOpen}
                      className={`group flex min-h-12 w-full items-center justify-between rounded-xl px-3 text-[15px] font-medium transition-colors hover:bg-blue-600 hover:text-white focus-visible:bg-blue-600 focus-visible:text-white active:bg-blue-700 active:text-white ${label === "Promotions" ? "text-red-600" : "text-[#10284b]"}`}
                      onClick={() => setOpenMobileCategory(isOpen ? null : label)}
                      type="button"
                    >
                      {label}
                      <ChevronDown
                        aria-hidden="true"
                        className={`size-4 text-[#8aa0b9] transition-[color,transform] duration-200 group-hover:text-white group-focus-visible:text-white ${isOpen ? "rotate-0" : "-rotate-90"}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="mb-2 ml-3 border-l border-[#dce8f5] pl-3" id={submenuId}>
                        {items.map(([itemLabel, href]) => (
                          <SheetClose
                            key={itemLabel}
                            render={
                              <Link
                                className="flex min-h-10 items-center rounded-lg px-3 text-sm text-[#49627d] transition-colors hover:bg-[#f2f7fd] hover:text-[#175ffc] focus-visible:bg-[#f2f7fd] focus-visible:text-[#175ffc]"
                                href={href}
                              />
                            }
                          >
                            {itemLabel}
                          </SheetClose>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

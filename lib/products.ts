export type Product = {
  slug: string;
  brand: string;
  name: string;
  detail: string;
  price: number;
  unitPrice: string;
  reviews?: number;
  image: string;
  category: string;
  pet: string;
  description: string;
  composition: string;
  usage: string;
  shopifyVariantId?: string;
  availableForSale?: boolean;
};

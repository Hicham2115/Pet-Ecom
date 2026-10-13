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

export const products: Product[] = [
  {
    slug: "croquettes-chien-adulte",
    brand: "Meadowland",
    name: "Croquettes chien adulte",
    detail: "Poulet & riz complet · 12 kg",
    price: 420,
    unitPrice: "35 DH/kg",
    reviews: 428,
    image: "/products/dog-food.webp",
    category: "Alimentation",
    pet: "Chien",
    description:
      "Les croquettes Meadowland poulet & riz complet pour chien adulte offrent une nutrition complète et équilibrée, élaborée avec des ingrédients de qualité pour soutenir sa vitalité, une digestion optimale et un pelage en pleine santé. Une recette savoureuse, adaptée aux besoins quotidiens des chiens adultes.",
    composition:
      "Poulet, riz complet, céréales sélectionnées, légumes et matières grasses d’origine animale. Une recette pensée pour apporter des protéines et de l’énergie au quotidien.",
    usage:
      "Servez la ration quotidienne en vous référant aux indications du sac et adaptez-la selon l’âge, le poids et l’activité de votre chien. Laissez toujours de l’eau fraîche à sa disposition.",
  },
  {
    slug: "bouchees-fondantes-saumon-chat",
    brand: "PawWell",
    name: "Bouchées fondantes",
    detail: "Saumon · Friandises pour chat · 60 g",
    price: 29,
    unitPrice: "48 DH/100 g",
    reviews: 316,
    image: "/products/cat-treats.webp",
    category: "Friandises",
    pet: "Chat",
    description:
      "De tendres bouchées au saumon pour offrir à votre chat une petite récompense savoureuse au quotidien.",
    composition:
      "Friandises pour chat au saumon. Consultez l’emballage pour la liste complète des ingrédients et constituants analytiques.",
    usage:
      "À donner comme friandise en complément de l’alimentation habituelle. Laissez de l’eau fraîche à disposition et surveillez votre animal pendant la dégustation.",
  },
  {
    slug: "croquettes-chat-poulet",
    brand: "PureBowl",
    name: "Croquettes pour chat",
    detail: "Recette au poulet · 2 kg",
    price: 160,
    unitPrice: "80 DH/kg",
    reviews: 207,
    image: "/products/cat-food.webp",
    category: "Alimentation",
    pet: "Chat",
    description:
      "Une recette au poulet pensée pour les repas quotidiens de votre chat, avec des croquettes faciles à servir.",
    composition:
      "Recette au poulet. Pour la liste détaillée des ingrédients et les valeurs nutritionnelles, reportez-vous à l’emballage.",
    usage:
      "Servez la ration recommandée sur l’emballage et adaptez-la aux besoins de votre chat. Veillez à toujours laisser de l’eau propre à disposition.",
  },
  {
    slug: "corde-resistante-chien",
    brand: "PlayPaws",
    name: "Corde résistante",
    detail: "Jouet à tirer · Pour chiens actifs",
    price: 95,
    unitPrice: "",
    reviews: 184,
    image: "/products/rope-toy.webp",
    category: "Jouets",
    pet: "Chien",
    description:
      "Une corde colorée pour les jeux de traction et les moments de complicité avec votre chien.",
    composition:
      "Jouet en corde tressée. Inspectez régulièrement le jouet et retirez-le s’il est abîmé.",
    usage:
      "À utiliser sous surveillance pendant les moments de jeu. Ce jouet n’est pas destiné à être mâché ou avalé.",
  },
  {
    slug: "lingettes-animaux-aloe-vera",
    brand: "FreshPaws",
    name: "Lingettes pour animaux",
    detail: "Aloe vera & avoine · 100 pièces",
    price: 55,
    unitPrice: "0,55 DH/pièce",
    reviews: 521,
    image: "/products/pet-wipes.webp",
    category: "Soins",
    pet: "Chien & chat",
    description:
      "Des lingettes pratiques à l’aloe vera et à l’avoine pour rafraîchir votre compagnon entre deux bains.",
    composition:
      "Lingettes de soin à l’aloe vera et à l’avoine. Évitez le contact avec les yeux et les muqueuses.",
    usage:
      "Essuyez délicatement le pelage ou les pattes, puis jetez la lingette après usage. Ne pas jeter dans les toilettes.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

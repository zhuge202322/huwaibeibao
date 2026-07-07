import { LanguageCode, translateText } from "./translations";

export type LocalizableProduct = {
  name: string;
  material: string;
  category: string;
};

const categoryLabels: Record<string, string> = {
  running_vest: "Running Vest",
  bicycle_bag: "Bicycle Bag",
  motorcycle_bag: "Motorcycle Bag",
  hiking_outdoor_bag: "Hiking Outdoor Bag",
  waterproof_bag: "Waterproof Bag",
};

export function localizeCategoryLabel(category: string, language: LanguageCode) {
  return translateText(categoryLabels[category] || category, language);
}

export function localizeProduct<T extends LocalizableProduct>(product: T, language: LanguageCode): T {
  if (language === "EN") return product;

  return {
    ...product,
    name: translateText(product.name, language),
    material: translateText(product.material, language),
  };
}

export function localizeProducts<T extends LocalizableProduct>(products: T[], language: LanguageCode): T[] {
  if (language === "EN") return products;
  return products.map((product) => localizeProduct(product, language));
}

import { LanguageCode, translateText } from "./translations";
import categoriesData from "@/data/categories.json";

export type LocalizableProduct = {
  name: string;
  material: string;
  category: string;
  description?: string;
};

const categoryLabels: Record<string, string> = Object.fromEntries(
  (categoriesData as Array<{ slug: string; name: string }>).map((category) => [
    category.slug,
    category.name,
  ])
);

export function localizeCategoryLabel(category: string, language: LanguageCode) {
  return translateText(categoryLabels[category] || category, language);
}

export function localizeProduct<T extends LocalizableProduct>(product: T, language: LanguageCode): T {
  if (language === "EN") return product;

  return {
    ...product,
    name: translateText(product.name, language),
    material: translateText(product.material, language),
    description: product.description ? translateText(product.description, language) : product.description,
  };
}

export function localizeProducts<T extends LocalizableProduct>(products: T[], language: LanguageCode): T[] {
  if (language === "EN") return products;
  return products.map((product) => localizeProduct(product, language));
}

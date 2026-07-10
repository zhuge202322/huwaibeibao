import { promises as fs } from "fs";
import path from "path";
import productsData from "@/app/products/productsData.json";
import categoriesData from "@/data/categories.json";
import siteSettingsData from "@/data/siteSettings.json";
import type { AdminContent, ProductCategory, ProductHotspot, ProductRecord, SiteSettings } from "@/types/content";

const rootDir = process.cwd();
const productsPath = path.join(rootDir, "src", "app", "products", "productsData.json");
const categoriesPath = path.join(rootDir, "src", "data", "categories.json");
const siteSettingsPath = path.join(rootDir, "src", "data", "siteSettings.json");

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile(filePath: string, value: unknown) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function normalizeCategories(categories: ProductCategory[]): ProductCategory[] {
  return categories
    .map((category, index) => ({
      slug: String(category.slug || "").trim(),
      name: String(category.name || "").trim(),
      image: String(category.image || "").trim(),
      description: String(category.description || "").trim(),
      visible: Boolean(category.visible),
      sortOrder: Number.isFinite(Number(category.sortOrder)) ? Number(category.sortOrder) : index * 10,
    }))
    .filter((category) => category.slug && category.name)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

function normalizeHotspots(hotspots: ProductHotspot[] | undefined): ProductHotspot[] {
  if (!Array.isArray(hotspots)) return [];

  return hotspots
    .map((hotspot) => ({
      top: String(hotspot.top || "50%").trim() || "50%",
      left: String(hotspot.left || "50%").trim() || "50%",
      code: String(hotspot.code || "").trim(),
      title: String(hotspot.title || "").trim(),
      desc: String(hotspot.desc || "").trim(),
      active: hotspot.active !== false,
    }))
    .filter((hotspot) => hotspot.title || hotspot.desc || hotspot.code);
}

function normalizeProducts(products: ProductRecord[]): ProductRecord[] {
  return products
    .map((product) => {
      const image = String(product.image || "").trim();
      const gallery = Array.isArray(product.galleryImages)
        ? product.galleryImages.map((galleryImage) => String(galleryImage).trim()).filter(Boolean)
        : [];

      return {
        id: String(product.id || "").trim(),
        name: String(product.name || "").trim(),
        sku: String(product.sku || "").trim(),
        category: String(product.category || "").trim(),
        capacity: Number(product.capacity) || 0,
        material: String(product.material || "").trim(),
        moq: Number(product.moq) || 0,
        image,
        galleryImages: image ? [image, ...gallery.filter((galleryImage) => galleryImage !== image)] : gallery,
        description: String(product.description || "").trim(),
        hotspots: normalizeHotspots(product.hotspots),
        leadTime: Number(product.leadTime) || 0,
        isNew: Boolean(product.isNew),
        isBest: Boolean(product.isBest),
      };
    })
    .filter((product) => product.id && product.name);
}

function normalizeSiteSettings(settings: SiteSettings): SiteSettings {
  return {
    siteName: String(settings.siteName || "Ideas Cool Co., Limited").trim(),
    logoUrl: String(settings.logoUrl || "/logo.png").trim(),
    faviconUrl: String(settings.faviconUrl || settings.logoUrl || "/logo.png").trim(),
    contact: {
      phone: String(settings.contact?.phone || "").trim(),
      whatsapp: String(settings.contact?.whatsapp || "").trim(),
      email: String(settings.contact?.email || "").trim(),
      addressLines: Array.isArray(settings.contact?.addressLines)
        ? settings.contact.addressLines.map((line) => String(line).trim()).filter(Boolean)
        : [],
      mapEmbedUrl: String(settings.contact?.mapEmbedUrl || "").trim(),
      plantLabel: String(settings.contact?.plantLabel || "").trim(),
    },
  };
}

export async function readAdminContent(): Promise<AdminContent> {
  const [products, categories, siteSettings] = await Promise.all([
    readJsonFile<ProductRecord[]>(productsPath, productsData as ProductRecord[]),
    readJsonFile<ProductCategory[]>(categoriesPath, categoriesData as ProductCategory[]),
    readJsonFile<SiteSettings>(siteSettingsPath, siteSettingsData as SiteSettings),
  ]);

  return {
    products: normalizeProducts(products),
    categories: normalizeCategories(categories),
    siteSettings: normalizeSiteSettings(siteSettings),
  };
}

export async function writeAdminContent(content: AdminContent) {
  const normalized: AdminContent = {
    products: normalizeProducts(content.products || []),
    categories: normalizeCategories(content.categories || []),
    siteSettings: normalizeSiteSettings(content.siteSettings),
  };

  await Promise.all([
    writeJsonFile(productsPath, normalized.products),
    writeJsonFile(categoriesPath, normalized.categories),
    writeJsonFile(siteSettingsPath, normalized.siteSettings),
  ]);

  return normalized;
}

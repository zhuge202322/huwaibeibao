export type ProductCategory = {
  slug: string;
  name: string;
  image: string;
  description?: string;
  visible: boolean;
  sortOrder: number;
};

export type ProductRecord = {
  id: string;
  name: string;
  sku: string;
  category: string;
  capacity: number;
  material: string;
  moq: number;
  image: string;
  galleryImages?: string[];
  description?: string;
  leadTime: number;
  isNew?: boolean;
  isBest?: boolean;
};

export type SiteSettings = {
  siteName: string;
  logoUrl: string;
  faviconUrl: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    addressLines: string[];
    mapEmbedUrl: string;
    plantLabel: string;
  };
};

export type AdminContent = {
  products: ProductRecord[];
  categories: ProductCategory[];
  siteSettings: SiteSettings;
};

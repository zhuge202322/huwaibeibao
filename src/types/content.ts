export type ProductCategory = {
  slug: string;
  name: string;
  image: string;
  description?: string;
  visible: boolean;
  sortOrder: number;
};

export type ProductHotspot = {
  top: string;
  left: string;
  code: string;
  title: string;
  desc: string;
  active?: boolean;
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
  hotspots?: ProductHotspot[];
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

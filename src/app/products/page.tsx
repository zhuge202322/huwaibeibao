"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ChevronRight, Filter, Grid, List, RefreshCw, ShoppingCart, ShieldCheck, Award, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizeCategoryLabel, localizeProduct } from "@/i18n/productLocalization";
import categoriesData from "@/data/categories.json";
import type { ProductHotspot } from "@/types/content";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  capacity: number; // in liters
  material: string;
  moq: number;
  image: string;
  galleryImages?: string[];
  description?: string;
  hotspots?: ProductHotspot[];
  leadTime: number; // in days
  isNew?: boolean;
  isBest?: boolean;
}

const PRODUCT_CATEGORIES = (categoriesData as Array<{
  slug: string;
  name: string;
  visible: boolean;
  sortOrder: number;
}>)
  .filter((category) => category.visible)
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .map((category) => ({ value: category.slug, label: category.name }));

import productsData from "./productsData.json";
export const ALL_PRODUCTS: Product[] = productsData as Product[];

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const { language } = useLanguage();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [capacityRange, setCapacityRange] = useState<string>("all");
  const [features, setFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [categoryParam]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, capacityRange, features, sortBy]);

  // Toggle Category
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((item) => item !== cat) : [...prev, cat]
    );
  };

  // Toggle Feature
  const toggleFeature = (feat: string) => {
    setFeatures((prev) =>
      prev.includes(feat) ? prev.filter((item) => item !== feat) : [...prev, feat]
    );
  };

  // Clear filters
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setCapacityRange("all");
    setFeatures([]);
  };

  // Filter products
  const filteredProducts = ALL_PRODUCTS.filter((prod) => {
    // 1. Category Filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(prod.category)) {
      return false;
    }
    // 2. Capacity Filter
    if (capacityRange !== "all") {
      if (capacityRange === "10-30" && (prod.capacity < 10 || prod.capacity > 30)) return false;
      if (capacityRange === "30-50" && (prod.capacity < 30 || prod.capacity > 50)) return false;
      if (capacityRange === "50+" && prod.capacity < 50) return false;
    }
    // 3. Features Filter
    if (features.length > 0) {
      if (features.includes("waterproof") && prod.category !== "waterproof_bag" && !prod.name.toLowerCase().includes("waterproof")) return false;
      if (features.includes("heavy") && prod.capacity < 45) return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "moq-low") return a.moq - b.moq;
    if (sortBy === "moq-high") return b.moq - a.moq;
    if (sortBy === "capacity-high") return b.capacity - a.capacity;
    return 0; // Default or Best Match
  });

  // Pagination parameters
  const ITEMS_PER_PAGE = 30;
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="topographic-bg min-h-screen pb-section-gap">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop pt-12">
        
        {/* Breadcrumbs */}
        <nav className="mb-12 flex items-center gap-2 font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-mono">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-primary font-bold">Product Catalog</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-gutter">
          
          {/* Sidebar Filter (Hidden on Mobile) */}
          <aside className="hidden lg:block w-full lg:w-64 flex-shrink-0 bg-surface-container-low border border-outline-variant p-8 sticky top-28 self-start relative tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br">
            <div className="absolute inset-0 engineering-dots opacity-30 pointer-events-none" />
            <div className="space-y-10 relative z-10">
              
              {/* Categories */}
              <div>
                <h3 className="font-headline-md text-base text-primary mb-6 border-b-2 border-high-vis-orange pb-2 font-bold uppercase">
                  Categories
                </h3>
                <div className="space-y-3">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <label key={cat.value} className="flex items-center gap-3 group cursor-pointer text-sm">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat.value)}
                        onChange={() => toggleCategory(cat.value)}
                        className="w-4 h-4 border-2 border-outline-variant text-primary focus:ring-primary rounded-none" 
                      />
                      <span className={`group-hover:text-primary ${selectedCategories.includes(cat.value) ? "text-primary font-bold" : "text-secondary"}`}>
                        {localizeCategoryLabel(cat.value, language)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Capacity */}
              <div>
                <h3 className="font-headline-md text-base text-primary mb-6 border-b-2 border-high-vis-orange pb-2 font-bold uppercase">
                  Capacity (Liters)
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 group cursor-pointer text-sm">
                    <input 
                      type="radio" 
                      name="capacity" 
                      checked={capacityRange === "all"}
                      onChange={() => setCapacityRange("all")}
                      className="w-4 h-4 border-2 border-outline-variant text-primary focus:ring-primary rounded-none" 
                    />
                    <span className={`group-hover:text-primary ${capacityRange === "all" ? "text-primary font-bold" : "text-secondary"}`}>
                      All Capacities
                    </span>
                  </label>
                  <label className="flex items-center gap-3 group cursor-pointer text-sm">
                    <input 
                      type="radio" 
                      name="capacity" 
                      checked={capacityRange === "10-30"}
                      onChange={() => setCapacityRange("10-30")}
                      className="w-4 h-4 border-2 border-outline-variant text-primary focus:ring-primary rounded-none" 
                    />
                    <span className={`group-hover:text-primary ${capacityRange === "10-30" ? "text-primary font-bold" : "text-secondary"}`}>
                      10L - 30L Daypack
                    </span>
                  </label>
                  <label className="flex items-center gap-3 group cursor-pointer text-sm">
                    <input 
                      type="radio" 
                      name="capacity" 
                      checked={capacityRange === "30-50"}
                      onChange={() => setCapacityRange("30-50")}
                      className="w-4 h-4 border-2 border-outline-variant text-primary focus:ring-primary rounded-none" 
                    />
                    <span className={`group-hover:text-primary ${capacityRange === "30-50" ? "text-primary font-bold" : "text-secondary"}`}>
                      30L - 50L Mid-size Pack
                    </span>
                  </label>
                  <label className="flex items-center gap-3 group cursor-pointer text-sm">
                    <input 
                      type="radio" 
                      name="capacity" 
                      checked={capacityRange === "50+"}
                      onChange={() => setCapacityRange("50+")}
                      className="w-4 h-4 border-2 border-outline-variant text-primary focus:ring-primary rounded-none" 
                    />
                    <span className={`group-hover:text-primary ${capacityRange === "50+" ? "text-primary font-bold" : "text-secondary"}`}>
                      50L+ Heavy Expedition
                    </span>
                  </label>
                </div>
              </div>

              {/* Technical Features */}
              <div>
                <h3 className="font-headline-md text-base text-primary mb-6 border-b-2 border-high-vis-orange pb-2 font-bold uppercase">
                  Technical Specs
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 group cursor-pointer text-sm">
                    <input 
                      type="checkbox" 
                      checked={features.includes("waterproof")}
                      onChange={() => toggleFeature("waterproof")}
                      className="w-4 h-4 border-2 border-outline-variant text-primary focus:ring-primary rounded-none" 
                    />
                    <span className="group-hover:text-primary text-secondary">
                      Waterproof Fabric / Zip
                    </span>
                  </label>
                  <label className="flex items-center gap-3 group cursor-pointer text-sm">
                    <input 
                      type="checkbox" 
                      checked={features.includes("heavy")}
                      onChange={() => toggleFeature("heavy")}
                      className="w-4 h-4 border-2 border-outline-variant text-primary focus:ring-primary rounded-none" 
                    />
                    <span className="group-hover:text-primary text-secondary">
                      Heavy Load Frame
                    </span>
                  </label>
                </div>
              </div>

              {/* Clear button */}
              <div className="pt-6">
                <button 
                  onClick={handleClearFilters}
                  className="w-full border-2 border-high-vis-orange py-3 font-bold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer text-sm"
                >
                  Clear All Filters
                </button>
              </div>

            </div>
          </aside>

          {/* Mobile Filters Drawer (Left slide-in) */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-[150] lg:hidden flex">
              <div 
                className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-sm"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div 
                className="relative mr-auto ml-0 w-80 max-w-[85vw] h-full shadow-2xl flex flex-col justify-between p-6 border-r border-outline-variant z-10 animate-slide-in-left"
                style={{ backgroundColor: "#ffffff" }}
              >
                <div>
                  <div className="flex justify-between items-center pb-4 border-b border-outline-variant mb-6">
                    <span className="font-label-sm text-[10px] text-outline font-mono">FILTER OPTIONS</span>
                    <button 
                      onClick={() => setMobileFiltersOpen(false)}
                      className="text-secondary hover:text-primary cursor-pointer p-1"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="flex-grow overflow-y-auto space-y-6 max-h-[70vh] pr-1">
                    {/* Categories */}
                    <div>
                      <h4 className="font-label-sm text-xs text-primary mb-3 font-bold uppercase font-mono tracking-wider">Categories</h4>
                      <div className="space-y-2.5">
                        {PRODUCT_CATEGORIES.map((cat) => (
                          <label key={cat.value} className="flex items-center gap-3 group cursor-pointer text-sm">
                            <input 
                              type="checkbox" 
                              checked={selectedCategories.includes(cat.value)}
                              onChange={() => toggleCategory(cat.value)}
                              className="w-4 h-4 border-2 border-outline-variant text-primary focus:ring-primary rounded-none" 
                            />
                            <span className={`group-hover:text-primary ${selectedCategories.includes(cat.value) ? "text-primary font-bold" : "text-secondary"}`}>
                              {localizeCategoryLabel(cat.value, language)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Capacity */}
                    <div>
                      <h4 className="font-label-sm text-xs text-primary mb-3 font-bold uppercase font-mono tracking-wider">Capacity</h4>
                      <div className="space-y-2.5">
                        <label className="flex items-center gap-3 group cursor-pointer text-sm">
                          <input 
                            type="radio" 
                            name="mobile-capacity" 
                            checked={capacityRange === "all"}
                            onChange={() => setCapacityRange("all")}
                            className="w-4 h-4 border-2 border-outline-variant text-primary focus:ring-primary rounded-none" 
                          />
                          <span className={`group-hover:text-primary ${capacityRange === "all" ? "text-primary font-bold" : "text-secondary"}`}>
                            All Capacities
                          </span>
                        </label>
                        <label className="flex items-center gap-3 group cursor-pointer text-sm">
                          <input 
                            type="radio" 
                            name="mobile-capacity" 
                            checked={capacityRange === "10-30"}
                            onChange={() => setCapacityRange("10-30")}
                            className="w-4 h-4 border-2 border-outline-variant text-primary focus:ring-primary rounded-none" 
                          />
                          <span className={`group-hover:text-primary ${capacityRange === "10-30" ? "text-primary font-bold" : "text-secondary"}`}>
                            10L - 30L Daypack
                          </span>
                        </label>
                        <label className="flex items-center gap-3 group cursor-pointer text-sm">
                          <input 
                            type="radio" 
                            name="mobile-capacity" 
                            checked={capacityRange === "30-50"}
                            onChange={() => setCapacityRange("30-50")}
                            className="w-4 h-4 border-2 border-outline-variant text-primary focus:ring-primary rounded-none" 
                          />
                          <span className={`group-hover:text-primary ${capacityRange === "30-50" ? "text-primary font-bold" : "text-secondary"}`}>
                            30L - 50L Mid-size Pack
                          </span>
                        </label>
                        <label className="flex items-center gap-3 group cursor-pointer text-sm">
                          <input 
                            type="radio" 
                            name="mobile-capacity" 
                            checked={capacityRange === "50+"}
                            onChange={() => setCapacityRange("50+")}
                            className="w-4 h-4 border-2 border-outline-variant text-primary focus:ring-primary rounded-none" 
                          />
                          <span className={`group-hover:text-primary ${capacityRange === "50+" ? "text-primary font-bold" : "text-secondary"}`}>
                            50L+ Heavy Expedition
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Technical Features */}
                    <div>
                      <h4 className="font-label-sm text-xs text-primary mb-3 font-bold uppercase font-mono tracking-wider">Technical Specs</h4>
                      <div className="space-y-2.5">
                        <label className="flex items-center gap-3 group cursor-pointer text-sm">
                          <input 
                            type="checkbox" 
                            checked={features.includes("waterproof")}
                            onChange={() => toggleFeature("waterproof")}
                            className="w-4 h-4 border-2 border-outline-variant text-primary focus:ring-primary rounded-none" 
                          />
                          <span className="group-hover:text-primary text-secondary">
                            Waterproof Fabric / Zip
                          </span>
                        </label>
                        <label className="flex items-center gap-3 group cursor-pointer text-sm">
                          <input 
                            type="checkbox" 
                            checked={features.includes("heavy")}
                            onChange={() => toggleFeature("heavy")}
                            className="w-4 h-4 border-2 border-outline-variant text-primary focus:ring-primary rounded-none" 
                          />
                          <span className="group-hover:text-primary text-secondary">
                            Heavy Load Frame
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant space-y-2">
                  <button 
                    onClick={handleClearFilters}
                    className="w-full border border-high-vis-orange py-2 text-xs font-bold text-primary hover:bg-slate-50 cursor-pointer"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full bg-primary text-white py-2 text-xs font-bold hover:bg-primary-container cursor-pointer uppercase tracking-wider"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Product Section */}
          <section className="flex-grow">
            
            {/* Header & Sorting */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
              <div>
                <h1 className="font-headline-lg text-headline-lg text-primary uppercase mb-2 font-bold">
                  B2B Product Manufacturing Catalog
                </h1>
                <p className="font-body-lg text-secondary text-sm">
                  Engineered carry solutions for global distributors, brands, and OEM/ODM clients.
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-4 bg-white border border-outline-variant p-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant px-4 whitespace-nowrap">Sort By:</span>
                <select 
                  className="bg-transparent border-none font-bold text-primary focus:ring-0 cursor-pointer py-1 pr-10 text-sm focus:outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Default Match</option>
                  <option value="moq-low">MOQ: Low to High</option>
                  <option value="moq-high">MOQ: High to Low</option>
                  <option value="capacity-high">Capacity: High to Low</option>
                </select>
              </div>
            </div>

            {/* Mobile Filter Options Trigger Bar */}
            <div className="flex gap-3 mb-6 lg:hidden">
              <button 
                onClick={() => setMobileFiltersOpen(true)}
                className="flex-grow flex items-center justify-center gap-2 border border-outline-variant bg-white py-3 text-xs font-bold text-primary active:bg-slate-50 cursor-pointer"
              >
                <Filter size={14} /> Filter Options
              </button>
              <div className="flex items-center gap-2 border border-outline-variant bg-white px-3 py-3 text-xs w-[45%]">
                <select 
                  className="bg-transparent border-none font-bold text-primary focus:ring-0 cursor-pointer w-full text-xs focus:outline-none py-0"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Default Match</option>
                  <option value="moq-low">MOQ: Low-High</option>
                  <option value="moq-high">MOQ: High-Low</option>
                  <option value="capacity-high">Capacity: High-Low</option>
                </select>
              </div>
            </div>

            {/* Product count */}
            <div className="mb-6 text-sm text-secondary font-mono flex justify-between items-center">
              <span>Found <span className="text-primary font-bold">{sortedProducts.length}</span> products</span>
            </div>

            {/* Product Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-outline-variant">
                <p className="text-secondary">No products match your filters. Please reset filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {paginatedProducts.map((prod) => {
                  const localizedProduct = localizeProduct(prod, language);

                  return (
                  <div 
                    key={prod.id}
                    className="bg-white border border-high-vis-orange group hover:border-primary hover:shadow-xl transition-all duration-300 flex flex-col relative tech-corner-tl tech-corner-tr tech-corner-bl tech-corner-br"
                  >
                    <div className="aspect-[4/5] relative overflow-hidden bg-surface-container-low">
                      <Image 
                        src={prod.image}
                        alt={localizedProduct.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {prod.isNew && (
                        <div className="absolute top-4 left-4 bg-high-vis-orange text-white px-3 py-1 font-label-sm text-[10px] tracking-widest uppercase">
                          NEW RELEASES
                        </div>
                      )}
                      {prod.isBest && (
                        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 font-label-sm text-[10px] tracking-widest uppercase">
                          BEST SELLER
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-headline-md text-xs sm:text-sm text-primary mb-1.5 font-bold group-hover:text-high-vis-orange transition-colors line-clamp-3 min-h-[45px] sm:min-h-[60px]" title={localizedProduct.name}>
                            <Link href={`/products/${prod.id}`}>
                              {localizedProduct.name}
                            </Link>
                          </h3>
                          <p className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                            SKU: {prod.sku}
                          </p>
                        </div>
                      </div>

                      <div className="bg-surface-container p-3 space-y-2 mb-6 text-xs flex-grow">
                        <div className="flex justify-between uppercase">
                          <span className="text-on-surface-variant">Shell Material</span>
                          <span className="font-bold text-primary text-right pl-2 truncate">{localizedProduct.material}</span>
                        </div>
                        <div className="flex justify-between uppercase">
                          <span className="text-on-surface-variant">Capacity</span>
                          <span className="font-bold text-primary">{prod.capacity} Liters</span>
                        </div>
                        <div className="flex justify-between uppercase">
                          <span className="text-on-surface-variant">Lead Time</span>
                          <span className="font-bold text-primary">{prod.leadTime} Days</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t border-outline-variant pt-4">
                        <span className="font-headline-md text-sm text-primary font-bold font-mono">
                          MOQ: {prod.moq} Pcs
                        </span>
                        <Link href="/contact">
                          <button className="bg-high-vis-orange text-white p-3 hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer">
                            <ShoppingCart size={16} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-20 border-t border-outline-variant pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="font-label-sm text-xs text-on-surface-variant uppercase font-mono">
                  Page {currentPage} of {totalPages} (Total {sortedProducts.length} items)
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 flex items-center justify-center border border-outline-variant font-mono ${
                      currentPage === 1 
                        ? "text-outline/40 bg-slate-50 cursor-not-allowed" 
                        : "text-secondary bg-white hover:bg-primary hover:text-white hover:border-high-vis-orange transition-colors cursor-pointer"
                    }`}
                  >
                    &lt;
                  </button>

                  {/* Dynamic page buttons */}
                  {Array.from({ length: totalPages }, (_, idx) => {
                    const pageNum = idx + 1;
                    if (
                      pageNum === 1 || 
                      pageNum === totalPages || 
                      (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 flex items-center justify-center font-bold font-mono border transition-all cursor-pointer ${
                            currentPage === pageNum
                              ? "bg-primary text-white border-high-vis-orange"
                              : "border-outline-variant text-secondary bg-white hover:bg-primary hover:text-white hover:border-high-vis-orange"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
                      return (
                        <span key={pageNum} className="px-1 text-secondary font-mono">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 flex items-center justify-center border border-outline-variant font-mono ${
                      currentPage === totalPages 
                        ? "text-outline/40 bg-slate-50 cursor-not-allowed" 
                        : "text-secondary bg-white hover:bg-primary hover:text-white hover:border-high-vis-orange transition-colors cursor-pointer"
                    }`}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            )}

          </section>

        </div>

      </div>
    </div>
  );
}

export default function ProductsCatalog() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-secondary">Loading Catalog...</div>}>
      <ProductsCatalogContent />
    </Suspense>
  );
}

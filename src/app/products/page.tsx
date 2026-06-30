"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ChevronRight, Filter, Grid, List, RefreshCw, ShoppingCart, ShieldCheck, Award, X } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 
    | "running_vest" 
    | "bicycle_bag" 
    | "backpack" 
    | "motorcycle_bag" 
    | "hiking_outdoor_bag" 
    | "waterproof_bag" 
    | "baby_diaper_bag" 
    | "travel_bag" 
    | "pet_carrier_bag" 
    | "other" 
    | "ungrouped";
  capacity: number; // in liters
  material: string;
  moq: number;
  image: string;
  leadTime: number; // in days
  isNew?: boolean;
  isBest?: boolean;
}

const PRODUCT_CATEGORIES = [
  { value: "running_vest", label: "Running Vest" },
  { value: "bicycle_bag", label: "Bicycle Bag" },
  { value: "backpack", label: "Backpack" },
  { value: "motorcycle_bag", label: "Motorcycle Bag" },
  { value: "hiking_outdoor_bag", label: "Hiking Outdoor Bag" },
  { value: "waterproof_bag", label: "Waterproof Bag" },
  { value: "baby_diaper_bag", label: "Baby Diaper Bag" },
  { value: "travel_bag", label: "Travel Bag" },
  { value: "pet_carrier_bag", label: "Pet Carrier Bag" },
  { value: "other", label: "Other" },
  { value: "ungrouped", label: "Ungrouped" }
];

export const ALL_PRODUCTS: Product[] = [
  {
    id: "apex-50l",
    name: "Apex Expedition 50L Hiking Backpack",
    sku: "EX-BK-50A-SLT",
    category: "hiking_outdoor_bag",
    capacity: 50,
    material: "420D Diamond Ripstop Nylon",
    moq: 300,
    image: "https://sc02.alicdn.com/kf/H1f9620073a9a4393b3398d61c7849221s.png",
    leadTime: 45,
    isBest: true
  },
  {
    id: "summit-45x",
    name: "Summit 45X Motorcycle Tail Bag",
    sku: "EX-BK-45X-GRN",
    category: "motorcycle_bag",
    capacity: 45,
    material: "1000D Tarpaulin Composite Mesh",
    moq: 500,
    image: "https://sc02.alicdn.com/kf/Hecbb21dbc69746e9942861be3b326ab02.png",
    leadTime: 30,
    isNew: true
  },
  {
    id: "urban-scout",
    name: "Urban Scout SL Business Laptop Bag",
    sku: "EX-BK-20S-CHR",
    category: "backpack",
    capacity: 20,
    material: "Lightweight Anti-Scratch Ripstop Nylon",
    moq: 1000,
    image: "https://sc02.alicdn.com/kf/H543d932d058e40f3b0328997cbcbcc169.png",
    leadTime: 25
  },
  {
    id: "stormseal-30l",
    name: "StormSeal 30L Waterproof Dry Bag",
    sku: "EX-DRY-30B",
    category: "waterproof_bag",
    capacity: 30,
    material: "Double-Sided High-Freq Welded 500D TPU",
    moq: 1000,
    image: "https://sc02.alicdn.com/kf/H623d4e0b82374152bfe93a92f3341081Q.png",
    leadTime: 60,
    isBest: true
  },
  {
    id: "guardian-city",
    name: "Guardian City 15L Waterproof Commuter Bag",
    sku: "EX-BK-15G-BLK",
    category: "backpack",
    capacity: 15,
    material: "Laminated TPU Composite Leather",
    moq: 500,
    image: "https://sc02.alicdn.com/kf/H543d932d058e40f3b0328997cbcbcc169.png",
    leadTime: 25
  },
  {
    id: "rescue-one",
    name: "Rescue One Motorcycle Pannier Side Bag",
    sku: "EX-BK-RS1-ORG",
    category: "motorcycle_bag",
    capacity: 35,
    material: "1200D High-Frequency Seamless PVC",
    moq: 200,
    image: "https://sc02.alicdn.com/kf/Hecbb21dbc69746e9942861be3b326ab02.png",
    leadTime: 35,
    isNew: true
  },
  {
    id: "nomad-airflow",
    name: "Nomad Air-Flow 50L Hiking Backpack",
    sku: "EX-BK-50N-TAN",
    category: "hiking_outdoor_bag",
    capacity: 50,
    material: "Tear-Resistant Aero-Mesh Honeycomb Fabric",
    moq: 500,
    image: "https://sc02.alicdn.com/kf/H1f9620073a9a4393b3398d61c7849221s.png",
    leadTime: 40
  },
  {
    id: "range-pack",
    name: "Range Pack Pro Premium Commuter Backpack",
    sku: "EX-BK-VAR-MUL",
    category: "travel_bag",
    capacity: 30,
    material: "900D Laminated Water-Resistant Polyester",
    moq: 1000,
    image: "https://sc02.alicdn.com/kf/H543d932d058e40f3b0328997cbcbcc169.png",
    leadTime: 30
  },
  {
    id: "peak-trail",
    name: "Peak Trail 28L Classic Daypack",
    sku: "EX-BK-28P-BLU",
    category: "backpack",
    capacity: 28,
    material: "210D High-Elastic Ripstop Nylon",
    moq: 500,
    image: "https://sc02.alicdn.com/kf/H1f9620073a9a4393b3398d61c7849221s.png",
    leadTime: 35
  },
  {
    id: "alpine-ascent",
    name: "Alpine Ascent 60L Heavy Expedition Pack",
    sku: "EX-BK-60A-RED",
    category: "hiking_outdoor_bag",
    capacity: 60,
    material: "1000D Ballistic Reinforced Nylon",
    moq: 300,
    image: "https://sc02.alicdn.com/kf/H1f9620073a9a4393b3398d61c7849221s.png",
    leadTime: 45,
    isNew: true
  },
  {
    id: "hydrosheath",
    name: "HydroSheath 25L Airtight Dry Backpack",
    sku: "EX-DRY-25Y",
    category: "waterproof_bag",
    capacity: 25,
    material: "0.5mm High-Frequency Welded TPU Bladder Pack",
    moq: 500,
    image: "https://sc02.alicdn.com/kf/H623d4e0b82374152bfe93a92f3341081Q.png",
    leadTime: 30
  },
  {
    id: "command-tactical",
    name: "Command 55L Modular Moto Tail Rack Bag",
    sku: "EX-BK-55C-CAM",
    category: "motorcycle_bag",
    capacity: 55,
    material: "1000D Wear-Resistant Heavy Tarpaulin",
    moq: 400,
    image: "https://sc02.alicdn.com/kf/Hecbb21dbc69746e9942861be3b326ab02.png",
    leadTime: 40
  },
  {
    id: "running-vest-pro",
    name: "PaceBreaker 8L Hydration Running Vest",
    sku: "EX-VT-08R-BLK",
    category: "running_vest",
    capacity: 8,
    material: "3D Spacer Air-Mesh with Elastic Lycra",
    moq: 500,
    image: "https://sc02.alicdn.com/kf/H1f9620073a9a4393b3398d61c7849221s.png",
    leadTime: 30,
    isBest: true
  },
  {
    id: "bicycle-pannier-front",
    name: "AeroRoll 12L Waterproof Bicycle Handlebar Bag",
    sku: "EX-BY-12H-SLT",
    category: "bicycle_bag",
    capacity: 12,
    material: "840D TPU Seamless Laminated Fabric",
    moq: 300,
    image: "https://sc02.alicdn.com/kf/Hecbb21dbc69746e9942861be3b326ab02.png",
    leadTime: 35,
    isNew: true
  },
  {
    id: "nappy-backpack-pro",
    name: "ParentComfort Multi-pocket Baby Diaper Bag",
    sku: "EX-DP-24B-GRY",
    category: "baby_diaper_bag",
    capacity: 24,
    material: "Waterproof Oxford fabric with USB charging port",
    moq: 500,
    image: "https://sc02.alicdn.com/kf/H543d932d058e40f3b0328997cbcbcc169.png",
    leadTime: 25
  },
  {
    id: "rover-pet-carrier",
    name: "Rover-Vent Breathable Pet Carrier Backpack",
    sku: "EX-PT-28C-BLU",
    category: "pet_carrier_bag",
    capacity: 28,
    material: "Breathable PVC Mesh & Anti-Scratch 900D Nylon",
    moq: 500,
    image: "https://sc02.alicdn.com/kf/H1f9620073a9a4393b3398d61c7849221s.png",
    leadTime: 35,
    isBest: true
  },
  {
    id: "tactical-accessory-pouch",
    name: "MOLLE Utility EDC Accessory Pouch",
    sku: "EX-AC-02T-TAN",
    category: "other",
    capacity: 2,
    material: "1000D Cordura Ripstop",
    moq: 1000,
    image: "https://sc02.alicdn.com/kf/Hecbb21dbc69746e9942861be3b326ab02.png",
    leadTime: 15
  },
  {
    id: "uncategorized-sample",
    name: "Pre-Production Sample Industrial Carrying Pack",
    sku: "EX-UG-40S-WHT",
    category: "ungrouped",
    capacity: 40,
    material: "Heavy Canvas & PVC Base",
    moq: 100,
    image: "https://sc02.alicdn.com/kf/H1f9620073a9a4393b3398d61c7849221s.png",
    leadTime: 20
  }
];

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [capacityRange, setCapacityRange] = useState<string>("all");
  const [features, setFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [categoryParam]);

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

  return (
    <div className="topographic-bg min-h-screen pb-section-gap">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-12">
        
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
          <aside className="hidden lg:block w-full lg:w-64 flex-shrink-0 bg-white border border-outline-variant p-8 sticky top-28 self-start shadow-sm">
            <div className="space-y-10">
              
              {/* Categories */}
              <div>
                <h3 className="font-headline-md text-base text-primary mb-6 border-b-2 border-primary pb-2 font-bold uppercase">
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
                        {cat.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Capacity */}
              <div>
                <h3 className="font-headline-md text-base text-primary mb-6 border-b-2 border-primary pb-2 font-bold uppercase">
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
                <h3 className="font-headline-md text-base text-primary mb-6 border-b-2 border-primary pb-2 font-bold uppercase">
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
                  className="w-full border-2 border-primary py-3 font-bold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer text-sm"
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
                              {cat.label}
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
                    className="w-full border border-primary py-2 text-xs font-bold text-primary hover:bg-slate-50 cursor-pointer"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-gutter">
                {sortedProducts.map((prod) => (
                  <div 
                    key={prod.id}
                    className="bg-white border border-outline-variant group hover:border-primary transition-all duration-300 flex flex-col"
                  >
                    <div className="aspect-[4/5] relative overflow-hidden bg-surface-container">
                      <Image 
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                          <h3 className="font-headline-md text-base text-primary mb-1 font-bold group-hover:text-high-vis-orange transition-colors">
                            <Link href={`/products/${prod.id}`}>
                              {prod.name}
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
                          <span className="font-bold text-primary text-right pl-2 truncate">{prod.material}</span>
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
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-20 border-t border-outline-variant pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="font-label-sm text-label-sm text-on-surface-variant uppercase font-mono">
                Page 1 of 1 (Total {sortedProducts.length} items)
              </div>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center border border-outline-variant text-secondary bg-white hover:bg-primary hover:text-white transition-colors cursor-not-allowed" disabled>
                  &lt;
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-primary text-white font-bold font-mono">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center border border-outline-variant text-secondary bg-white hover:bg-primary hover:text-white transition-colors cursor-not-allowed" disabled>
                  &gt;
                </button>
              </div>
            </div>

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

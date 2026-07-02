"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Star, CheckCircle, Download, Award, Shield, ShoppingBag, Box, Truck, Layers, Compass, ArrowLeft, ThermometerSun, Zap, Activity, Info, Barcode, ClipboardCheck, X, Maximize2, MessageCircle } from "lucide-react";
import { ALL_PRODUCTS, Product } from "../page";

// Category specs mapper
interface TechnicalSpecs {
  shell: string;
  base: string;
  frame: string;
  waterproof: string;
  weight: string;
  load: string;
  carton: string;
  extra: string;
}

const getCategorySpecs = (category: string): TechnicalSpecs => {
  switch (category) {
    case "running_vest":
      return {
        shell: "70D Elastic Lycra & Hexagonal Air-Mesh",
        base: "Double-layered 3D Spacer Fabric",
        frame: "Frameless, body-mapping wrap structure",
        waterproof: "Quick-dry hydrophobic weave",
        weight: "0.28 kg / 0.62 lbs (superlight)",
        load: "5 - 8 kg load capacity",
        carton: "60 x 40 x 40 cm (40 pcs/ctn)",
        extra: "Dual front hydration pockets (fits 500ml flask)"
      };
    case "bicycle_bag":
      return {
        shell: "840D Nylon TPU Double-Sided Laminated",
        base: "Reinforced rigid PE board support",
        frame: "Quick-release handlebar mounts & velcro webbing",
        waterproof: "IPX6 certified airtight seamless welds",
        weight: "0.55 kg / 1.21 lbs",
        load: "8 - 12 kg carrying capacity",
        carton: "65 x 45 x 50 cm (20 pcs/ctn)",
        extra: "Includes detachable shoulder strap & high-vis safety logo"
      };
    case "motorcycle_bag":
      return {
        shell: "1200D High-Density PVC Tarpaulin",
        base: "Molded ABS rigid protective shield base",
        frame: "4-point quick-release alloy locking bracket system",
        waterproof: "100% dustproof & watertight high-frequency welds",
        weight: "1.45 kg / 3.20 lbs",
        load: "20 - 25 kg load limit",
        carton: "70 x 50 x 55 cm (8 pcs/ctn)",
        extra: "Fitted with dynamic airflow drag reduction curves"
      };
    case "hiking_outdoor_bag":
      return {
        shell: "420D Diamond Ripstop Nylon with PU coating",
        base: "1000D Ballistic Nylon compound reinforced base",
        frame: "Dual T6 6061 tempered aluminum alloy stays",
        waterproof: "1500mm Hydrostatic DWR coating & hidden rain cover",
        weight: "1.85 kg / 4.07 lbs",
        load: "25 - 30 kg safe carrying limit",
        carton: "75 x 45 x 60 cm (10 pcs/ctn)",
        extra: "Ergo-vent adjustable torso height system"
      };
    case "waterproof_bag":
      return {
        shell: "Double-Sided 500D TPU laminated polyester mesh",
        base: "Welded reinforced anti-friction round base",
        frame: "Ergonomic shoulder harness with chest strap buckle",
        waterproof: "IPX6 certified roll-top airtight lock system",
        weight: "0.85 kg / 1.87 lbs",
        load: "15 - 20 kg load limit",
        carton: "60 x 50 x 45 cm (15 pcs/ctn)",
        extra: "Submersible airtight seam welding"
      };
    default:
      return {
        shell: "600D Laminated DWR Polyester fabric",
        base: "Reinforced anti-abrasion base layer",
        frame: "Ergonomic foam shoulder strap pack harness",
        waterproof: "Drizzle-resistant surface coating",
        weight: "0.75 kg / 1.65 lbs",
        load: "10 - 15 kg safe limit",
        carton: "60 x 40 x 45 cm (20 pcs/ctn)",
        extra: "Standard wholesale customization options"
      };
  }
};

// Interactive Hotspot config type
interface Hotspot {
  top: string;
  left: string;
  code: string;
  title: string;
  desc: string;
}

const getCategoryHotspots = (category: string): Hotspot[] => {
  switch (category) {
    case "running_vest":
      return [
        {
          top: "22%",
          left: "30%",
          code: "VEST-FLASK-01",
          title: "Speed-Flask Pocket",
          desc: "Dual front hydration pockets tailored with elastic security loops to fit 500ml soft flasks securely during intense runs."
        },
        {
          top: "45%",
          left: "50%",
          code: "VEST-MESH-02",
          title: "3D Air-Mesh Panel",
          desc: "Highly breathable structural mesh back panel that transfers heat and wicks moisture away, preventing chaffing."
        },
        {
          top: "70%",
          left: "25%",
          code: "VEST-POUCH-03",
          title: "Kangaroo Stash Sleeve",
          desc: "Lower back horizontal elastic pocket designed for rapid rain shell retrieval without removing the pack."
        }
      ];
    case "bicycle_bag":
      return [
        {
          top: "20%",
          left: "50%",
          code: "BIKE-SEAL-01",
          title: "IPX6 Airtight Seal",
          desc: "Heat-welded fold-over seal locking out moisture and dirt. Fits handlebars and stays stable under vibration."
        },
        {
          top: "55%",
          left: "35%",
          code: "BIKE-MOUNT-02",
          title: "Quick-Release Mount",
          desc: "Abrasion-resistant straps paired with heavy-duty metal tension hooks for secure attachment to frame tubes."
        },
        {
          top: "75%",
          left: "65%",
          code: "BIKE-SHELL-03",
          title: "Rigid PE Board Base",
          desc: "Inner structural poly-board shield that preserves the aerodynamic bag shape even under max capacity loads."
        }
      ];
    case "motorcycle_bag":
      return [
        {
          top: "18%",
          left: "50%",
          code: "MOTO-SEAL-01",
          title: "Waterproof Roll-Top",
          desc: "Sealed roll-down closure with durable release buckles. Provides complete watertight and dustproof protection."
        },
        {
          top: "48%",
          left: "25%",
          code: "MOTO-ABS-02",
          title: "Molded ABS Side Shield",
          desc: "Shock-absorbing rigid outer panels engineered to protect gear against crashes, impact, and heavy highway drag."
        },
        {
          top: "75%",
          left: "65%",
          code: "MOTO-MOUNT-03",
          title: "Alloy Quick-Latch system",
          desc: "Secure 4-point latch harness for instant tail rack docking. Tested at high speeds to ensure zero wobbling."
        }
      ];
    case "hiking_outdoor_bag":
      return [
        {
          top: "15%",
          left: "50%",
          code: "HIKE-LID-01",
          title: "Floating Storm Lid",
          desc: "Extendable lid with a dual-zipper compartment and taped weather seams to prevent rain seepage from top openings."
        },
        {
          top: "50%",
          left: "28%",
          code: "HIKE-SUSP-02",
          title: "Suspended Mesh back",
          desc: "Ergonomic mesh back-panel supported by lightweight dual aluminum stays, leaving a cooling ventilation gap."
        },
        {
          top: "85%",
          left: "50%",
          code: "HIKE-RAIN-03",
          title: "Rain Cover Compartment",
          desc: "Dedicated base pocket housing an integrated high-visibility orange polyurethane rain cover for sudden monsoons."
        }
      ];
    case "waterproof_bag":
      return [
        {
          top: "18%",
          left: "50%",
          code: "DRY-ROLL-01",
          title: "Watertight Roll-Down",
          desc: "3-fold roll closure lined with reinforcing bands to create a reliable hermetic seal against submersions."
        },
        {
          top: "50%",
          left: "48%",
          code: "DRY-WELD-02",
          title: "HF Sealed Seams",
          desc: "Electro-magnetic heat welds that fuse the double TPU sheets, outlasting stitched seams under high hydrostatic pressure."
        },
        {
          top: "85%",
          left: "50%",
          code: "DRY-BASE-03",
          title: "Anti-Friction Base",
          desc: "Reinforced heavy-gauge bottom designed for drag and drop resistance on rocky beaches and boat decks."
        }
      ];
    default:
      return [
        {
          top: "15%",
          left: "50%",
          code: "GEN-HD-01",
          title: "Reinforced Padded Grip",
          desc: "Neoprene-padded wrap handle designed for heavy hand loads and rapid luggage trolley handle sleeves."
        },
        {
          top: "50%",
          left: "30%",
          code: "GEN-ZIP-02",
          title: "YKK Reverse Zippers",
          desc: "Inverted coil zippers with water-shedding PU lips for superior weather protection and smooth operation."
        },
        {
          top: "80%",
          left: "50%",
          code: "GEN-BASE-03",
          title: "Anti-Abrasion Base",
          desc: "Double-reinforced bottom panel with wear-resistant backing, preventing punctures on rough grounds."
        }
      ];
  }
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  // Active product matching
  const product = ALL_PRODUCTS.find((p) => p.id === id) || ALL_PRODUCTS[0];
  const specs = getCategorySpecs(product.category);
  const hotspots = getCategoryHotspots(product.category);

  const [activeTab, setActiveTab] = useState<"tech" | "custom">("tech");
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  // Gallery images list (using product primary image plus fallbacks)
  const images = [
    product.image,
    "https://sc02.alicdn.com/kf/H1f9620073a9a4393b3398d61c7849221s.png",
    "https://sc02.alicdn.com/kf/Hecbb21dbc69746e9942861be3b326ab02.png",
    "https://sc02.alicdn.com/kf/H543d932d058e40f3b0328997cbcbcc169.png",
    "https://sc02.alicdn.com/kf/H623d4e0b82374152bfe93a92f3341081Q.png"
  ];

  // Dynamic accessories recommendations
  const [recommended, setRecommended] = useState<Product[]>([]);
  useEffect(() => {
    const list = ALL_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
    setRecommended(list);
    // Reset selected image & active hotspot when ID changes
    setSelectedImage(0);
    setActiveHotspot(null);
  }, [product]);

  return (
    <div className="topographic-bg min-h-screen pb-20 font-body text-on-surface bg-white">
      
      {/* Breadcrumbs Navigation */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6">
        <nav className="flex items-center gap-2 font-label-sm text-[11px] uppercase tracking-wider text-secondary font-mono">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            Home
          </Link>
          <ChevronRight size={10} />
          <Link href="/products" className="hover:text-primary transition-colors">B2B Catalog</Link>
          <ChevronRight size={10} />
          <span className="text-on-surface font-bold truncate max-w-[200px] md:max-w-none">
            {product.name}
          </span>
        </nav>
      </section>

      {/* Main Showcase Layout */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16">
        
        {/* Left: Image Viewer Panel with Interactive Hotspots (7 Columns) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          
          {/* Media Header (Highlights Instructions) */}
          <div className="flex justify-between items-center border-b border-outline-variant pb-3 text-xs">
            <span className="font-label-sm font-bold tracking-widest uppercase text-primary">
              📸 High-Res Photo Gallery
            </span>
            {selectedImage === 0 && (
              <span className="font-mono text-outline text-[10px] hidden sm:inline">
                ℹ️ Click orange dots on the image to view product highlights
              </span>
            )}
          </div>

          {/* Media Viewport with hotspots */}
          <div className="relative aspect-[4/3] bg-surface-container-low border border-outline-variant overflow-hidden shadow-sm flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image 
                src={images[selectedImage]} 
                alt={product.name}
                fill
                className="object-contain p-4 transition-all duration-300 cursor-zoom-in"
                priority
                onClick={() => setActiveLightboxImage(images[selectedImage])}
              />
              <div className="absolute top-4 left-4 bg-primary text-white font-label-sm text-[9px] px-2.5 py-1 tracking-widest font-mono uppercase shadow-sm">
                QC Passed
              </div>
              <button 
                onClick={() => setActiveLightboxImage(images[selectedImage])}
                className="absolute top-4 right-4 bg-white hover:bg-primary hover:text-white transition-colors text-primary p-2 border border-outline-variant shadow-sm z-10 cursor-pointer rounded-sm"
                title="Zoom Image"
              >
                <Maximize2 size={16} />
              </button>

              {/* Interactive Hotspots Layer (Only visible on primary image) */}
              {selectedImage === 0 && hotspots.map((spot, idx) => (
                <div 
                  key={idx} 
                  className="absolute"
                  style={{ top: spot.top, left: spot.left }}
                >
                  {/* Ping Animation Ring */}
                  <span className="absolute -top-3.5 -left-3.5 w-7 h-7 bg-high-vis-orange/40 rounded-full animate-ping pointer-events-none" />
                  
                  {/* Pin Dot */}
                  <button
                    onClick={() => setActiveHotspot(idx)}
                    className={`w-5.5 h-5.5 rounded-full flex items-center justify-center font-bold text-[10px] shadow-lg transition-colors cursor-pointer relative -top-2.5 -left-2.5 z-10 ${
                      activeHotspot === idx ? "bg-primary text-white" : "bg-high-vis-orange hover:bg-primary text-white"
                    }`}
                  >
                    +
                  </button>
                </div>
              ))}

              {/* Hotspot Highlight Info Card */}
              {selectedImage === 0 && activeHotspot !== null && (
                <div className="absolute bottom-4 right-4 bg-white/95 border border-primary p-4 shadow-xl max-w-[280px] z-20 animate-fade-in">
                  {/* Close btn */}
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="absolute top-2.5 right-3 text-secondary hover:text-primary cursor-pointer transition-colors"
                  >
                    <X size={14} />
                  </button>
                  {/* Detail */}
                  <h4 className="font-headline-md text-xs text-primary font-bold uppercase tracking-wider mb-2 font-mono">
                    {hotspots[activeHotspot].title}
                  </h4>
                  <p className="text-secondary text-[11px] leading-relaxed mb-3">
                    {hotspots[activeHotspot].desc}
                  </p>
                  <div className="h-[1px] bg-outline-variant/60 my-2" />
                  <div className="flex justify-between items-center text-[9px] font-mono text-outline">
                    <span>POS: {hotspots[activeHotspot].code}</span>
                    <span className="text-high-vis-orange font-bold">ACTIVE</span>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Photo Gallery Thumbnails */}
          <div className="grid grid-cols-5 gap-3">
            {images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => {
                  setSelectedImage(idx);
                  setActiveHotspot(null); // Close active hotspot card on thumbnail change
                }}
                className={`aspect-square border-2 transition-all relative overflow-hidden bg-white ${
                  selectedImage === idx ? "border-primary" : "border-outline-variant hover:border-outline"
                }`}
              >
                <div className="w-full h-full relative">
                  <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: B2B Specifications & Quote CTA (5 Columns) */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 justify-between">
          <div>
            <span className="font-label-sm text-[10px] text-secondary uppercase tracking-[0.2em] font-mono block mb-1">
              BULK WHOLESALE CATALOG
            </span>
            <span className="font-label-sm text-[10px] text-high-vis-orange font-mono block">
              SKU: {product.sku}
            </span>
            
            <h1 className="font-bold text-on-surface mt-3 leading-tight uppercase text-lg sm:text-xl md:text-2xl font-display">
              {product.name}
            </h1>

            {/* Ratings & Certs */}
            <div className="flex items-center gap-3 mt-4 text-xs">
              <div className="flex text-high-vis-orange">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="text-secondary font-mono">(Verified OEM Partner)</span>
            </div>

            <div className="h-[1px] bg-outline-variant my-6" />

            {/* Premium Unified B2B Specs Card */}
            <div className="border border-outline-variant bg-slate-50 p-6 space-y-4 mb-6 shadow-sm">
              <h3 className="font-label-sm text-[11px] text-primary font-bold uppercase tracking-wider border-b border-outline-variant/60 pb-2">
                B2B Bulk Specifications
              </h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-outline-variant/40">
                  <span className="text-secondary font-mono uppercase tracking-wider text-[10px]">Minimum Order (MOQ)</span>
                  <span className="font-bold text-primary font-mono">{product.moq} Pieces</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-outline-variant/40">
                  <span className="text-secondary font-mono uppercase tracking-wider text-[10px]">FOB Lead Time</span>
                  <span className="font-bold text-primary font-mono">{product.leadTime} Days</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-outline-variant/40">
                  <span className="text-secondary font-mono uppercase tracking-wider text-[10px]">Core Material</span>
                  <span className="font-semibold text-on-surface text-right truncate max-w-[200px]" title={product.material}>
                    {product.material}
                  </span>
                </div>
                <div className="flex justify-between items-start py-1">
                  <span className="text-secondary font-mono uppercase tracking-wider text-[10px] pt-0.5">Certificates</span>
                  <div className="flex flex-col items-end gap-0.5 text-[10px] text-right font-mono text-secondary">
                    <span>ISO 9001 Approved</span>
                    <span>GRS Recycled nylon</span>
                    <span>BSCI Social Audited</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wholesale Quote CTA Panel */}
          <div className="space-y-3">
            <Link href="/contact" className="block w-full">
              <button className="w-full py-4.5 bg-high-vis-orange hover:bg-high-vis-orange/90 text-white font-headline-md text-sm font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer uppercase tracking-wider rounded-none">
                <ShoppingBag size={16} /> GET FOB WHOLESALE QUOTE
              </button>
            </Link>
            <a 
              href="https://wa.me/8615160088966" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full"
            >
              <button className="w-full py-4.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-headline-md text-sm font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer uppercase tracking-wider rounded-none">
                <MessageCircle size={16} /> INQUIRE VIA WHATSAPP
              </button>
            </a>
          </div>

        </div>
      </section>

      {/* Details Tabbed Section */}
      <section className="bg-surface-container-low border-y border-outline-variant w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          
          {/* Tabs switch */}
          <div className="flex border-b border-outline-variant text-sm overflow-x-auto">
            <button 
              className={`px-8 py-5 font-headline-md text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "tech" ? "border-b-4 border-primary text-primary bg-surface-container-lowest" : "text-secondary hover:text-primary"
              }`}
              onClick={() => setActiveTab("tech")}
            >
              Technical Parameters
            </button>
            <button 
              className={`px-8 py-5 font-headline-md text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "custom" ? "border-b-4 border-primary text-primary bg-surface-container-lowest" : "text-secondary hover:text-primary"
              }`}
              onClick={() => setActiveTab("custom")}
            >
              OEM/ODM Customization
            </button>
          </div>

          {/* Tab content panel */}
          <div className="py-12 min-h-[350px]">
            
            {/* Tech Specs Tab */}
            {activeTab === "tech" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Table: Materials */}
                <div className="space-y-4">
                  <h4 className="font-headline-md text-base text-primary font-bold border-l-2 border-primary pl-3">
                    Fabric & Structural Specifications
                  </h4>
                  <div className="border border-outline-variant bg-white shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                      <tbody>
                        <tr className="border-b border-outline-variant bg-slate-50 text-[10px] text-outline font-mono">
                          <th className="py-3 px-4 w-1/3">SPECIFICATION</th>
                          <th className="py-3 px-4">TECHNICAL DESCRIPTION</th>
                        </tr>
                        <tr className="border-b border-outline-variant hover:bg-slate-50/30 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-primary font-mono uppercase tracking-wider text-[10px]">Main Fabric</td>
                          <td className="py-3.5 px-4 text-secondary">{specs.shell}</td>
                        </tr>
                        <tr className="border-b border-outline-variant hover:bg-slate-50/30 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-primary font-mono uppercase tracking-wider text-[10px]">Reinforcement</td>
                          <td className="py-3.5 px-4 text-secondary">{specs.base}</td>
                        </tr>
                        <tr className="border-b border-outline-variant hover:bg-slate-50/30 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-primary font-mono uppercase tracking-wider text-[10px]">Internal Frame</td>
                          <td className="py-3.5 px-4 text-secondary">{specs.frame}</td>
                        </tr>
                        <tr className="hover:bg-slate-50/30 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-primary font-mono uppercase tracking-wider text-[10px]">Waterproofing</td>
                          <td className="py-3.5 px-4 text-secondary">{specs.waterproof}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Table: Logistics */}
                <div className="space-y-4">
                  <h4 className="font-headline-md text-base text-primary font-bold border-l-2 border-primary pl-3">
                    Logistics & Packaging Parameters
                  </h4>
                  <div className="border border-outline-variant bg-white shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                      <tbody>
                        <tr className="border-b border-outline-variant bg-slate-50 text-[10px] text-outline font-mono">
                          <th className="py-3 px-4 w-1/3">PARAMETER</th>
                          <th className="py-3 px-4">CARGO VALUE</th>
                        </tr>
                        <tr className="border-b border-outline-variant hover:bg-slate-50/30 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-primary font-mono uppercase tracking-wider text-[10px]">Cargo Net Weight</td>
                          <td className="py-3.5 px-4 text-secondary">{specs.weight}</td>
                        </tr>
                        <tr className="border-b border-outline-variant hover:bg-slate-50/30 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-primary font-mono uppercase tracking-wider text-[10px]">Max Load Limit</td>
                          <td className="py-3.5 px-4 text-secondary">{specs.load}</td>
                        </tr>
                        <tr className="border-b border-outline-variant hover:bg-slate-50/30 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-primary font-mono uppercase tracking-wider text-[10px]">Export Carton</td>
                          <td className="py-3.5 px-4 text-secondary">{specs.carton}</td>
                        </tr>
                        <tr className="hover:bg-slate-50/30 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-primary font-mono uppercase tracking-wider text-[10px]">Special Feature</td>
                          <td className="py-3.5 px-4 text-secondary truncate max-w-[280px]" title={specs.extra}>{specs.extra}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* Customization Tab */}
            {activeTab === "custom" && (
              <div className="space-y-8">
                <div className="border-l-2 border-primary pl-3">
                  <h4 className="font-headline-md text-base text-primary font-bold">ODM & Custom Branding Solutions</h4>
                  <p className="text-secondary text-xs leading-relaxed mt-1">
                    We support full private labeling. Provide us your brand handbook or vectors, and our sample team will generate custom mockups in 3 days.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-l-2 border-primary pl-4">
                    <h5 className="font-headline-md text-xs text-primary font-bold uppercase tracking-wider">Logo Branding Options</h5>
                    <p className="text-secondary text-[11px] mt-1 leading-snug">Woven labels, embossed rubber patches, screen printing, high-frequency embossing, or leather accents.</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <h5 className="font-headline-md text-xs text-primary font-bold uppercase tracking-wider">Custom Packaging</h5>
                    <p className="text-secondary text-[11px] mt-1 leading-snug">Recycled GRS certified polybags, custom hangtags, inner corrugated box branded designs.</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <h5 className="font-headline-md text-xs text-primary font-bold uppercase tracking-wider">Hardware Upgrades</h5>
                    <p className="text-secondary text-[11px] mt-1 leading-snug">Upgrade zippers to YKK® AquaGuard® waterproof lines or buckles to Duraflex® heavy-duty composites.</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <h5 className="font-headline-md text-xs text-primary font-bold uppercase tracking-wider">Fabric Swaps</h5>
                    <p className="text-secondary text-[11px] mt-1 leading-snug">Available in Cordura® Nylon, GRS Recycled Polyester, 1680D Ballistic weave, or TPU composite grids.</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Accessories Recommended Section */}
      {recommended.length > 0 && (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-20">
          <div className="text-center mb-12">
            <span className="font-label-sm text-primary uppercase tracking-widest block mb-2 font-mono">RELATED GEAR</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">Recommended Bulk Accessories</h2>
            <div className="h-1 w-16 bg-high-vis-orange mx-auto mt-3" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {recommended.map((item) => (
              <div 
                key={item.id} 
                className="group border border-outline-variant hover:border-primary hover:shadow-md transition-all bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/5] bg-surface-container-low overflow-hidden relative border-b border-outline-variant">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>
                  <div className="p-6">
                    <span className="font-label-sm text-[10px] text-outline uppercase font-mono block">SKU: {item.sku}</span>
                    <h3 className="font-headline-md text-xs text-on-surface mt-2 mb-4 font-bold group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/products/${item.id}`}>
                        {item.name}
                      </Link>
                    </h3>
                  </div>
                </div>
                <div className="p-6 pt-0 flex justify-between items-center text-[11px] font-mono border-t border-outline-variant/60 mt-4 pt-4 text-secondary">
                  <span>MOQ: {item.moq} pcs</span>
                  <Link href={`/products/${item.id}`} className="text-high-vis-orange font-bold hover:underline">
                    View Info
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {activeLightboxImage && (
        <div 
          className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          onClick={() => setActiveLightboxImage(null)}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveLightboxImage(null); }}
            className="absolute top-6 right-6 text-white hover:text-high-vis-orange transition-colors p-2 z-[310] cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X size={36} />
          </button>
          <div className="relative max-w-full max-h-[85vh] aspect-auto flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={activeLightboxImage} 
              alt="Zoomed Product View" 
              className="max-w-full max-h-[85vh] object-contain shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}

    </div>
  );
}

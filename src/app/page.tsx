"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Factory, Award, Globe, Leaf, ArrowRight, Star, Users, Cpu, Barcode, Layers, ShieldAlert, Zap, ThermometerSun, Activity, Bike, Backpack, Heart, Compass } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HERO_SLIDES = [
  {
    image: "https://sc02.alicdn.com/kf/H4c630229a2d94284ba9fe77aa0e566eeH.jpg",
    tag: "INDUSTRIAL-GRADE GEAR • OEM/ODM SPECIALIST",
    title: "ENGINEERED FOR EXTREME ENVIRONMENTS",
    desc: "Direct-to-factory wholesale solutions. 15+ years of supplying high-load, weather-resistant outdoor gear to world-class brands.",
  },
  {
    image: "https://sc02.alicdn.com/kf/Hec2951bf31884dfb88f7485f1c30d7e0u.jpg",
    tag: "HIGH-FREQUENCY SEAMLESS BONDING",
    title: "100% WATERPROOF DRY BAG SOLUTIONS",
    desc: "IPX6 certified airtight waterproof structures. Perfect for marine exploration, paddleboarding, and extreme storm protection.",
  },
  {
    image: "https://sc02.alicdn.com/kf/Hc1f85db72c7d421a886a35ac7fddd8cd8.png",
    tag: "RUGGED RIDER & BIKE PACKS",
    title: "INNOVATIVE MOTORCYCLE & CYCLING LUGGAGE",
    desc: "Equipped with quick-release locks, anti-abrasion back panels, and heavy-duty load bearing. Ready for heavy adventure touring.",
  }
];

const HOMEPAGE_CATEGORIES = [
  {
    name: "Running Vest",
    slug: "running_vest",
    image: "https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=600",
  },
  {
    name: "Bicycle Bag",
    slug: "bicycle_bag",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=600",
  },
  {
    name: "Backpack",
    slug: "backpack",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600",
  },
  {
    name: "Motorcycle Bag",
    slug: "motorcycle_bag",
    image: "https://sc02.alicdn.com/kf/Hecbb21dbc69746e9942861be3b326ab02.png",
  },
  {
    name: "Hiking Outdoor Bag",
    slug: "hiking_outdoor_bag",
    image: "https://sc02.alicdn.com/kf/H1f9620073a9a4393b3398d61c7849221s.png",
  },
  {
    name: "Waterproof Bag",
    slug: "waterproof_bag",
    image: "https://sc02.alicdn.com/kf/H623d4e0b82374152bfe93a92f3341081Q.png",
  },
  {
    name: "Baby Diaper Bag",
    slug: "baby_diaper_bag",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600",
  },
  {
    name: "Travel Bag",
    slug: "travel_bag",
    image: "https://sc02.alicdn.com/kf/H543d932d058e40f3b0328997cbcbcc169.png",
  },
  {
    name: "Pet Carrier Bag",
    slug: "pet_carrier_bag",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600",
  },
  {
    name: "Other Accessories",
    slug: "other",
    image: "https://images.unsplash.com/photo-1608541737042-87a12275d313?q=80&w=600",
  },
  {
    name: "Ungrouped Samples",
    slug: "ungrouped",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600",
  }
];

import productsData from "./products/productsData.json";

interface FeaturedProduct {
  id: string;
  name: string;
  sku: string;
  moq: number;
  leadTime: number;
  image: string;
}

const FEATURED_PRODUCTS: FeaturedProduct[] = (productsData as any[])
  .filter((p) => p.isBest || p.isNew)
  .slice(0, 16)
  .map((p) => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    moq: p.moq,
    leadTime: p.leadTime,
    image: p.image
  }));

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const valPropRef = useRef<HTMLDivElement>(null);
  const scenarioRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const strengthRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Auto-play slider
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    // 1. Value Proposition Animations
    const valCards = valPropRef.current?.querySelectorAll(".val-card");
    if (valCards) {
      gsap.fromTo(
        valCards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: valPropRef.current,
            start: "top 85%",
          },
        }
      );
    }

    // 2. Scenario trigger animation
    const scenarioCards = scenarioRef.current?.querySelectorAll(".scenario-card");
    if (scenarioCards) {
      gsap.fromTo(
        scenarioCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: scenarioRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // 3. Material Bento Grid Animations
    const bentoCards = bentoRef.current?.querySelectorAll(".bento-card");
    if (bentoCards) {
      gsap.fromTo(
        bentoCards,
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top 75%",
          },
        }
      );
    }

    // 4. Product Showcase Animations
    const prodCards = showcaseRef.current?.querySelectorAll(".prod-card");
    if (prodCards) {
      gsap.fromTo(
        prodCards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: "top 75%",
          },
        }
      );
    }

    // 5. Strength Section Animations
    const strengthItems = strengthRef.current?.querySelectorAll(".strength-item");
    if (strengthItems) {
      gsap.fromTo(
        strengthItems,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: strengthRef.current,
            start: "top 70%",
          },
        }
      );
    }

    // 6. OEM Customization Timeline Animation
    const timelineItems = timelineRef.current?.querySelectorAll(".timeline-step");
    if (timelineItems) {
      gsap.fromTo(
        timelineItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  return (
    <div className="w-full relative overflow-x-hidden bg-white text-on-surface">
      
      {/* 1. Hero Section (Autoplay Slideshow) */}
      <section 
        ref={heroRef}
        className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-primary"
      >
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center" style={{
              backgroundImage: `url('${slide.image}')`
            }} />
            {/* Gradient Overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/70 to-[#0f172a]/20 z-10" />

            {/* Slide Content */}
            <div className="relative z-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full h-full flex items-center text-white">
              <div className="max-w-3xl">
                <span className="font-label-sm text-high-vis-orange uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs mb-3 sm:mb-4 block">
                  {slide.tag}
                </span>
                <h1 className="font-display-xl text-3xl sm:text-4xl md:text-5xl lg:text-display-xl mb-4 sm:mb-6 leading-tight lg:leading-none uppercase">
                  {slide.title}
                </h1>
                <p className="font-body-lg text-xs sm:text-sm md:text-body-lg mb-8 sm:mb-10 text-white/80 max-w-xl">
                  {slide.desc}
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <Link href="/products">
                    <button className="bg-high-vis-orange text-white px-6 py-3.5 sm:px-10 sm:py-5 font-headline-md text-xs sm:text-base uppercase font-bold hover:brightness-110 transition-all cursor-pointer">
                      View Catalog
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="border-2 border-white text-white px-6 py-3.5 sm:px-10 sm:py-5 font-headline-md text-xs sm:text-base uppercase font-bold hover:bg-white hover:text-[#0f172a] transition-all cursor-pointer">
                      Inquire Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Dots Pagination */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === idx ? "bg-high-vis-orange w-6" : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. Value Proposition */}
      <section ref={valPropRef} className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative">
        <div className="absolute inset-0 topographic-bg pointer-events-none opacity-20" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter relative z-10">
          
          <div className="px-5 py-8 md:px-6 border border-outline-variant bg-white hover:border-primary hover:shadow-lg transition-all group val-card opacity-0">
            <Factory className="text-primary mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="font-headline-md text-sm sm:text-base lg:text-[13px] xl:text-base whitespace-nowrap mb-2 text-on-surface">Direct Factory Price</h3>
            <p className="text-secondary text-sm">Direct connection to factory quotes. No middleman markups, ensuring healthy margins and price transparency.</p>
          </div>
          
          <div className="px-5 py-8 md:px-6 border border-outline-variant bg-white hover:border-primary hover:shadow-lg transition-all group val-card opacity-0">
            <Award className="text-primary mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="font-headline-md text-sm sm:text-base lg:text-[13px] xl:text-base whitespace-nowrap mb-2 text-on-surface">15+ Years Expertise</h3>
            <p className="text-secondary text-sm">Decades of research in technical fabrics and structural weight distribution, engineered to withstand extreme climates.</p>
          </div>
          
          <div className="px-5 py-8 md:px-6 border border-outline-variant bg-white hover:border-primary hover:shadow-lg transition-all group val-card opacity-0">
            <Globe className="text-primary mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="font-headline-md text-sm sm:text-base lg:text-[13px] xl:text-base whitespace-nowrap mb-2 text-on-surface">Global Logistics</h3>
            <p className="text-secondary text-sm">Experienced in international freight, supporting multi-port LCL container consolidations and smooth customs clearance.</p>
          </div>
          
          <div className="px-5 py-8 md:px-6 border border-outline-variant bg-white hover:border-primary hover:shadow-lg transition-all group val-card opacity-0">
            <Leaf className="text-primary mb-4 group-hover:scale-110 transition-transform" size={40} />
            <h3 className="font-headline-md text-sm sm:text-base lg:text-[13px] xl:text-base whitespace-nowrap mb-2 text-on-surface">GRS Recycled Tech</h3>
            <p className="text-secondary text-sm">Supplying certified recycled nylon fabrics and PFC-free water-resistant coating to meet international ecological compliance.</p>
          </div>

        </div>
      </section>

      {/* 3. Product Categories Grid */}
      <section ref={scenarioRef} className="py-16 md:py-24 bg-surface-container-low border-y border-outline-variant w-full">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fade-trigger">
            <span className="font-label-sm text-primary uppercase tracking-widest block mb-2 font-mono">WHOLESALE CATALOG</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">Explore All Product Categories</h2>
            <div className="h-1 w-20 bg-high-vis-orange mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {HOMEPAGE_CATEGORIES.map((cat) => {
              const count = (productsData as any[]).filter((p) => p.category === cat.slug).length;
              return (
                <Link 
                  key={cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className="bg-white border border-outline-variant hover:border-primary hover:shadow-lg transition-all group flex flex-col scenario-card opacity-0 overflow-hidden"
                >
                  {/* Image Area */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-low">
                    <Image 
                      src={cat.image} 
                      alt={cat.name} 
                      fill 
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    {/* Item Count Overlay Badge */}
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm text-on-surface text-[9px] sm:text-[10px] font-bold font-mono px-2 py-0.5 sm:px-3 sm:py-1 shadow-sm rounded-none border border-outline-variant">
                      {count} Items
                    </div>
                  </div>
                  {/* Text Area */}
                  <div className="p-3 sm:p-5 text-center flex-grow flex flex-col justify-center">
                    <h3 className="font-headline-md text-xs sm:text-base text-on-surface font-bold mb-1 group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-[9px] sm:text-[10px] text-outline group-hover:text-high-vis-orange transition-colors font-mono tracking-wider uppercase">
                      Explore Collection
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Material & Technology Bento Grid */}
      <section ref={bentoRef} className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="text-center mb-16">
          <span className="font-label-sm text-primary uppercase tracking-widest block mb-2 font-mono">CRAFT & MATERIALS</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">Advanced Materials & Technology</h2>
          <div className="h-1 w-20 bg-high-vis-orange mx-auto mt-4" />
        </div>

        {/* Bento Layout Grid */}
        <div className="grid grid-cols-12 gap-gutter">
          
          {/* Big Box 1: Cordura */}
          <div className="col-span-12 md:col-span-8 bg-surface-container-low border border-outline-variant p-8 md:p-12 flex flex-col justify-between group bento-card opacity-0 min-h-[300px]">
            <div className="flex justify-between items-start">
              <Layers className="text-primary group-hover:rotate-6 transition-transform" size={40} />
              <span className="font-label-sm text-[10px] text-primary border border-primary px-3 py-1 font-mono uppercase">Tensile Core</span>
            </div>
            <div className="mt-8">
              <h3 className="font-headline-lg text-xl text-on-surface font-bold mb-2">High-Density Ripstop Fabric</h3>
              <p className="text-secondary text-sm max-w-xl">
                We utilize high-density Cordura® & 420D double-line ripstop nylon with premium polyurethane DWR coatings. Tested to withstand extreme tearing forces and direct friction.
              </p>
            </div>
          </div>

          {/* Box 2: High frequency welding */}
          <div className="col-span-12 md:col-span-4 bg-surface-container-low border border-outline-variant p-8 flex flex-col justify-between group bento-card opacity-0 min-h-[300px]">
            <div className="flex justify-between items-start">
              <Zap className="text-primary group-hover:scale-110 transition-transform" size={40} />
              <span className="font-label-sm text-[10px] text-outline border border-outline px-3 py-1 font-mono uppercase">100% Sealed</span>
            </div>
            <div className="mt-8">
              <h3 className="font-headline-lg text-base text-on-surface font-bold mb-2">High-Frequency Seamless Welding</h3>
              <p className="text-secondary text-xs">
                Perfect for waterproof lines. Using electro-magnetic energy to fuse PVC/TPU layers, forming seamless water-tight bonds that easily handle IPX6 submersions.
              </p>
            </div>
          </div>

          {/* Box 3: Ergo Mesh */}
          <div className="col-span-12 md:col-span-4 bg-surface-container-low border border-outline-variant p-8 flex flex-col justify-between group bento-card opacity-0 min-h-[300px]">
            <div className="flex justify-between items-start">
              <ThermometerSun className="text-primary group-hover:-translate-y-1 transition-transform" size={40} />
              <span className="font-label-sm text-[10px] text-outline border border-outline px-3 py-1 font-mono uppercase">Air Flow</span>
            </div>
            <div className="mt-8">
              <h3 className="font-headline-lg text-base text-on-surface font-bold mb-2">Ergo-Vent Back Systems</h3>
              <p className="text-secondary text-xs">
                Suspended structural mesh panels combined with dual-density foam shoulder straps decrease contact back temperatures by up to 3°C for long-duration carry comfort.
              </p>
            </div>
          </div>

          {/* Big Box 4: Impact Hardshell */}
          <div className="col-span-12 md:col-span-8 bg-surface-container-low border border-outline-variant p-8 md:p-12 flex flex-col justify-between group bento-card opacity-0 min-h-[300px]">
            <div className="flex justify-between items-start">
              <ShieldAlert className="text-primary group-hover:scale-110 transition-transform" size={40} />
              <span className="font-label-sm text-[10px] text-primary border border-primary px-3 py-1 font-mono uppercase">Rider Protect</span>
            </div>
            <div className="mt-8">
              <h3 className="font-headline-lg text-xl text-on-surface font-bold mb-2">Impact Hardshell & Polycarbonate Armor</h3>
              <p className="text-secondary text-sm max-w-xl">
                Specially designed for cycling and motorcycle luggage lines. Molded rigid composite shields resist dynamic impact forces, protecting sensitive inner items.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Product Showcase */}
      <section ref={showcaseRef} className="py-section-gap bg-surface-container-low border-y border-outline-variant w-full">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
          <div className="text-center mb-16">
            <span className="font-label-sm text-primary uppercase tracking-widest block mb-2 font-mono">BEST SELLERS</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">Featured Wholesale Products</h2>
            <div className="h-1 w-20 bg-high-vis-orange mx-auto mt-4" />
          </div>

          {/* 4x4 Grid (16 Product Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {FEATURED_PRODUCTS.map((prod) => (
              <div 
                key={prod.id}
                className="border border-outline-variant bg-white flex flex-col group prod-card opacity-0"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low">
                  <Image 
                    src={prod.image}
                    alt={prod.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-primary text-white font-label-sm px-3 py-1 uppercase tracking-tight text-[10px] font-mono">
                    MOQ {prod.moq}
                  </span>
                </div>
                <div className="p-6 border-t border-outline-variant bg-surface-container-low flex-grow flex flex-col justify-between">
                  <div>
                    <p className="font-label-sm text-outline mb-1 font-mono text-[10px]">SKU: {prod.sku}</p>
                    <h4 className="font-headline-md text-sm mb-4 text-on-surface font-bold group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/products/${prod.id}`}>
                        {prod.name}
                      </Link>
                    </h4>
                  </div>
                  <div className="flex justify-between items-center text-xs text-secondary border-t border-outline-variant pt-4 font-mono">
                    <span>MOQ: {prod.moq} pcs</span>
                    <span>Lead: {prod.leadTime} Days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More Button */}
          <div className="flex justify-center mt-16">
            <Link href="/products">
              <button className="bg-primary text-white px-10 py-5 font-headline-md text-sm uppercase font-bold hover:bg-high-vis-orange transition-all cursor-pointer">
                View More Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Manufacturing Strength */}
      <section ref={strengthRef} className="py-section-gap bg-primary text-white relative overflow-hidden w-full">
        <div className="absolute inset-0 topographic-bg opacity-10" />
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-section-gap items-center relative z-10 animate-fade-trigger">
          
          <div className="space-y-8">
            <span className="font-label-sm text-high-vis-orange uppercase tracking-widest block">FACTORY CAPABILITY</span>
            <h2 className="font-headline-lg text-headline-lg text-white">Industrial Scale & R&D Excellence</h2>
            
            <div className="space-y-8">
              
              <div className="flex items-start strength-item opacity-0">
                <div className="w-12 h-12 flex-shrink-0 bg-primary-container flex items-center justify-center mr-6">
                  <Users className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-headline-md text-base mb-1 text-white font-bold">R&D and Engineering Depth</h4>
                  <p className="text-white/60 text-sm">Dedicated design lab with 45 experienced R&D technicians and structural engineers specializing in ergonomic load distribution.</p>
                </div>
              </div>

              <div className="flex items-start strength-item opacity-0">
                <div className="w-12 h-12 flex-shrink-0 bg-primary-container flex items-center justify-center mr-6">
                  <Cpu className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-headline-md text-base mb-1 text-white font-bold">State-of-the-Art Equipment</h4>
                  <p className="text-white/60 text-sm">24 modular lean sewing lines, equipped with CNC smart lasers and computerized automatic bar-tacking stations.</p>
                </div>
              </div>

              <div className="flex items-start strength-item opacity-0">
                <div className="w-12 h-12 flex-shrink-0 bg-primary-container flex items-center justify-center mr-6">
                  <Barcode className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-headline-md text-base mb-1 text-white font-bold">Traceable Digital Inspection</h4>
                  <p className="text-white/60 text-sm">Rigorous 4-stage quality control from imported yarn inspection to final carton packing, fully registered in our supply trace system.</p>
                </div>
              </div>

            </div>

            <Link href="/contact" className="inline-block mt-4">
              <button className="border-2 border-high-vis-orange text-high-vis-orange px-8 py-4 font-label-sm uppercase font-bold hover:bg-high-vis-orange hover:text-white transition-colors cursor-pointer">
                Schedule Factory Video Tour
              </button>
            </Link>
          </div>

          <div className="relative h-[480px] md:h-[600px] w-full bg-black">
            <div className="absolute top-0 right-0 w-[95%] h-[95%] border-4 border-high-vis-orange -z-10 translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8" />
            <div className="w-full h-full relative overflow-hidden">
              <video 
                src="/images/video.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300" 
              />
            </div>
          </div>

        </div>
      </section>

      {/* 7. OEM/ODM B2B custom process interactive timeline */}
      <section ref={timelineRef} className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="text-center mb-16">
          <span className="font-label-sm text-primary uppercase tracking-widest block mb-2 font-mono">PARTNERSHIP PROCESS</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">OEM/ODM Customization Timeline</h2>
          <div className="h-1 w-20 bg-high-vis-orange mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {/* Horizontal connecting line on desktop */}
          <div className="hidden md:block absolute top-[68px] left-[10%] right-[10%] h-[2px] bg-outline-variant -z-10" />

          {/* Step 1 */}
          <div className="bg-surface-container-low border border-outline-variant p-6 hover:shadow-md hover:border-primary transition-all text-center group timeline-step opacity-0">
            <div className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-full mx-auto mb-4 font-mono font-bold group-hover:scale-110 transition-transform">
              01
            </div>
            <h4 className="font-headline-md text-sm text-on-surface font-bold mb-2">Inquiry & RFQ</h4>
            <p className="text-secondary text-xs">Send specifications, drawings or sketches. 24h fast feedback.</p>
          </div>

          {/* Step 2 */}
          <div className="bg-surface-container-low border border-outline-variant p-6 hover:shadow-md hover:border-primary transition-all text-center group timeline-step opacity-0">
            <div className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-full mx-auto mb-4 font-mono font-bold group-hover:scale-110 transition-transform">
              02
            </div>
            <h4 className="font-headline-md text-sm text-on-surface font-bold mb-2">Design & CAD</h4>
            <p className="text-secondary text-xs">CAD modeling, material verification, and quote options within 3 Days.</p>
          </div>

          {/* Step 3 */}
          <div className="bg-surface-container-low border border-outline-variant p-6 hover:shadow-md hover:border-primary transition-all text-center group timeline-step opacity-0">
            <div className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-full mx-auto mb-4 font-mono font-bold group-hover:scale-110 transition-transform">
              03
            </div>
            <h4 className="font-headline-md text-sm text-on-surface font-bold mb-2">Prototyping</h4>
            <p className="text-secondary text-xs">Fast sample room cutting and stitch preparation in 5 Days.</p>
          </div>

          {/* Step 4 */}
          <div className="bg-surface-container-low border border-outline-variant p-6 hover:shadow-md hover:border-primary transition-all text-center group timeline-step opacity-0">
            <div className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-full mx-auto mb-4 font-mono font-bold group-hover:scale-110 transition-transform">
              04
            </div>
            <h4 className="font-headline-md text-sm text-on-surface font-bold mb-2">Bulk Manufacture</h4>
            <p className="text-secondary text-xs">24 modular lean assembly sewing lines complete bulk orders in 20-30 Days.</p>
          </div>

          {/* Step 5 */}
          <div className="bg-surface-container-low border border-outline-variant p-6 hover:shadow-md hover:border-primary transition-all text-center group timeline-step opacity-0">
            <div className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-full mx-auto mb-4 font-mono font-bold group-hover:scale-110 transition-transform">
              05
            </div>
            <h4 className="font-headline-md text-sm text-on-surface font-bold mb-2">QC & Delivery</h4>
            <p className="text-secondary text-xs">Materials test chamber certificate, final shipping and customs consolidation.</p>
          </div>
        </div>
      </section>

      {/* 8. Industry Trust / Testimonials */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full border-t border-outline-variant">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-1">
            <span className="font-label-sm text-primary uppercase tracking-widest mb-4 block">INDUSTRY TRUST</span>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Client Testimonials</h2>
            <p className="text-secondary">Direct reviews from product managers and logistics coordinators who trust us with their annual supplies.</p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-gutter">
            
            <div className="bg-surface-container p-10 border-l-4 border-high-vis-orange space-y-4">
              <div className="flex text-high-vis-orange">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="font-body-lg italic text-sm text-on-surface">
                &ldquo;Blink Dreams' precision on seam stitching tension and robust frame support redefined our flagship technical pack line. They hit our exact specifications.&rdquo;
              </p>
              <div>
                <p className="font-bold text-primary text-sm">Marcus Thorne</p>
                <p className="font-label-sm text-outline">Director of Product Design, NorthPeak Gear</p>
              </div>
            </div>

            <div className="bg-surface-container p-10 border-l-4 border-high-vis-orange space-y-4">
              <div className="flex text-high-vis-orange">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="font-body-lg italic text-sm text-on-surface">
                &ldquo;Thanks to their advanced high-frequency welding machines and leak pressure tests, we confidently expanded our waterproof order from 5,000 to 50,000 units.&rdquo;
              </p>
              <div>
                <p className="font-bold text-primary text-sm">Elena Rodriguez</p>
                <p className="font-label-sm text-outline">VP of Supply Chain, AquaVentures</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Exhibition Showcase */}
      <section className="py-section-gap bg-surface-container-low border-t border-outline-variant w-full">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <span className="font-label-sm text-primary uppercase tracking-widest block mb-2 font-mono">GLOBAL ENGAGEMENT</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold uppercase">Our Global Exhibitions</h2>
              <div className="h-1 w-20 bg-high-vis-orange mt-4" />
            </div>
            {/* Carousel navigation buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  const track = document.getElementById("exhibition-track");
                  if (track) {
                    track.scrollBy({ left: -track.clientWidth * 0.75, behavior: "smooth" });
                  }
                }}
                className="w-10 h-10 flex items-center justify-center border border-outline-variant text-primary bg-white hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-pointer font-bold font-mono"
                aria-label="Previous Slide"
              >
                &lt;
              </button>
              <button 
                onClick={() => {
                  const track = document.getElementById("exhibition-track");
                  if (track) {
                    track.scrollBy({ left: track.clientWidth * 0.75, behavior: "smooth" });
                  }
                }}
                className="w-10 h-10 flex items-center justify-center border border-outline-variant text-primary bg-white hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-pointer font-bold font-mono"
                aria-label="Next Slide"
              >
                &gt;
              </button>
            </div>
          </div>

          {/* Horizontal scroll track with 4 avif images */}
          <div 
            id="exhibition-track"
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar py-4 scroll-smooth"
          >
            {[
              "/images/1.avif",
              "/images/2.avif",
              "/images/3.avif",
              "/images/4.avif"
            ].map((src, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start relative aspect-[4/3] border border-outline-variant bg-white shadow-sm group overflow-hidden"
              >
                <Image 
                  src={src} 
                  alt={`Exhibition Booth Showcase ${index + 1}`} 
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                  <span className="text-white font-mono text-xs uppercase tracking-wider">Blink Dreams Exhibition Booth #{index + 1}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="font-body-md text-secondary text-sm text-center mt-10 max-w-2xl mx-auto">
            Inspect our high-performance samples and meet our engineering team face-to-face at global trade shows. We welcome outdoor brands, retailers, and OEM/ODM distributors to build joint partnerships.
          </p>
        </div>
      </section>

    </div>
  );
}

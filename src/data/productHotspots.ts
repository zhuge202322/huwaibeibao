import type { ProductHotspot } from "@/types/content";

export const getCategoryHotspots = (category: string): ProductHotspot[] => {
  switch (category) {
    case "running_vest":
      return [
        {
          top: "22%",
          left: "30%",
          code: "VEST-FLASK-01",
          title: "Speed-Flask Pocket",
          desc: "Dual front hydration pockets tailored with elastic security loops to fit 500ml soft flasks securely during intense runs.",
        },
        {
          top: "45%",
          left: "50%",
          code: "VEST-MESH-02",
          title: "3D Air-Mesh Panel",
          desc: "Highly breathable structural mesh back panel that transfers heat and wicks moisture away, preventing chaffing.",
        },
        {
          top: "70%",
          left: "25%",
          code: "VEST-POUCH-03",
          title: "Kangaroo Stash Sleeve",
          desc: "Lower back horizontal elastic pocket designed for rapid rain shell retrieval without removing the pack.",
        },
      ];
    case "bicycle_bag":
      return [
        {
          top: "20%",
          left: "50%",
          code: "BIKE-SEAL-01",
          title: "IPX6 Airtight Seal",
          desc: "Heat-welded fold-over seal locking out moisture and dirt. Fits handlebars and stays stable under vibration.",
        },
        {
          top: "55%",
          left: "35%",
          code: "BIKE-MOUNT-02",
          title: "Quick-Release Mount",
          desc: "Abrasion-resistant straps paired with heavy-duty metal tension hooks for secure attachment to frame tubes.",
        },
        {
          top: "75%",
          left: "65%",
          code: "BIKE-SHELL-03",
          title: "Rigid PE Board Base",
          desc: "Inner structural poly-board shield that preserves the aerodynamic bag shape even under max capacity loads.",
        },
      ];
    case "motorcycle_bag":
      return [
        {
          top: "18%",
          left: "50%",
          code: "MOTO-SEAL-01",
          title: "Waterproof Roll-Top",
          desc: "Sealed roll-down closure with durable release buckles. Provides complete watertight and dustproof protection.",
        },
        {
          top: "48%",
          left: "25%",
          code: "MOTO-ABS-02",
          title: "Molded ABS Side Shield",
          desc: "Shock-absorbing rigid outer panels engineered to protect gear against crashes, impact, and heavy highway drag.",
        },
        {
          top: "75%",
          left: "65%",
          code: "MOTO-MOUNT-03",
          title: "Alloy Quick-Latch system",
          desc: "Secure 4-point latch harness for instant tail rack docking. Tested at high speeds to ensure zero wobbling.",
        },
      ];
    case "hiking_outdoor_bag":
      return [
        {
          top: "15%",
          left: "50%",
          code: "HIKE-LID-01",
          title: "Floating Storm Lid",
          desc: "Extendable lid with a dual-zipper compartment and taped weather seams to prevent rain seepage from top openings.",
        },
        {
          top: "50%",
          left: "28%",
          code: "HIKE-SUSP-02",
          title: "Suspended Mesh back",
          desc: "Ergonomic mesh back-panel supported by lightweight dual aluminum stays, leaving a cooling ventilation gap.",
        },
        {
          top: "85%",
          left: "50%",
          code: "HIKE-RAIN-03",
          title: "Rain Cover Compartment",
          desc: "Dedicated base pocket housing an integrated high-visibility orange polyurethane rain cover for sudden monsoons.",
        },
      ];
    case "waterproof_bag":
      return [
        {
          top: "18%",
          left: "50%",
          code: "DRY-ROLL-01",
          title: "Watertight Roll-Down",
          desc: "3-fold roll closure lined with reinforcing bands to create a reliable hermetic seal against submersions.",
        },
        {
          top: "50%",
          left: "48%",
          code: "DRY-WELD-02",
          title: "HF Sealed Seams",
          desc: "Electro-magnetic heat welds that fuse the double TPU sheets, outlasting stitched seams under high hydrostatic pressure.",
        },
        {
          top: "85%",
          left: "50%",
          code: "DRY-BASE-03",
          title: "Anti-Friction Base",
          desc: "Reinforced heavy-gauge bottom designed for drag and drop resistance on rocky beaches and boat decks.",
        },
      ];
    default:
      return [
        {
          top: "15%",
          left: "50%",
          code: "GEN-HD-01",
          title: "Reinforced Padded Grip",
          desc: "Neoprene-padded wrap handle designed for heavy hand loads and rapid luggage trolley handle sleeves.",
        },
        {
          top: "50%",
          left: "30%",
          code: "GEN-ZIP-02",
          title: "YKK Reverse Zippers",
          desc: "Inverted coil zippers with water-shedding PU lips for superior weather protection and smooth operation.",
        },
        {
          top: "80%",
          left: "50%",
          code: "GEN-BASE-03",
          title: "Anti-Abrasion Base",
          desc: "Double-reinforced bottom panel with wear-resistant backing, preventing punctures on rough grounds.",
        },
      ];
  }
};

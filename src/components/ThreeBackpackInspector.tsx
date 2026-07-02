"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Hotspot {
  id: string;
  label: string;
  desc: string;
  pos: THREE.Vector3;
  screenPos: { x: number; y: number };
}

export default function ThreeBackpackInspector() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [hotspots, setHotspots] = useState<Hotspot[]>([
    {
      id: "rolltop",
      label: "防水卷顶收口",
      desc: "采用 IPX6 级卷顶闭合系统，配合压胶防水拉链，提供极端天气下的极致防水保护。",
      pos: new THREE.Vector3(0, 3.2, 0),
      screenPos: { x: 0, y: 0 }
    },
    {
      id: "fabric",
      label: "420D 钻石抗撕裂尼龙",
      desc: "轻量化高拉伸强度面料，外层防泼水涂层，提供极佳的耐磨损与抗撕裂性能。",
      pos: new THREE.Vector3(0, 0.8, 1.1),
      screenPos: { x: 0, y: 0 }
    },
    {
      id: "buckles",
      label: "Duraflex® 工业扣件",
      desc: "专业攀登级耐低温扣件，即使在零下40度的严寒环境中依然保持韧性与强度，单扣抗拉强度达120kg。",
      pos: new THREE.Vector3(1.1, -0.6, 0.8),
      screenPos: { x: 0, y: 0 }
    },
    {
      id: "straps",
      label: "Ergo-Flow 散热背负",
      desc: "3D立体成型背板配合高透气蜂窝网格，实现背部空气高效循环，减负与散热并存。",
      pos: new THREE.Vector3(-0.9, 1.2, -0.8),
      screenPos: { x: 0, y: 0 }
    },
    {
      id: "base",
      label: "1000D 弹道尼龙补强",
      desc: "背包底部采用超耐磨 1000D 弹道尼龙进行双层拼贴补强，保护内部物品不受粗糙岩石磨损。",
      pos: new THREE.Vector3(0, -2.8, 0),
      screenPos: { x: 0, y: 0 }
    }
  ]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 10);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Group for entire backpack to allow rotation
    const packGroup = new THREE.Group();
    scene.add(packGroup);

    // --- PROCEDURAL 3D BACKPACK MOCK MODEL ---
    // Materials
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d3a27, // Forest green primary
      roughness: 0.8,
      metalness: 0.1,
    });
    const secondaryMaterial = new THREE.MeshStandardMaterial({
      color: 0x474747, // Slate grey secondary
      roughness: 0.9,
      metalness: 0.0,
    });
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.4,
      metalness: 0.8,
    });
    const orangeMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b35, // High-Vis Orange accents
      roughness: 0.6,
      metalness: 0.2,
    });

    // 1. Main Pack Body (Rounded Capsule-like block)
    const bodyGeo = new THREE.CylinderGeometry(1.2, 1.1, 4.5, 16);
    const bodyMesh = new THREE.Mesh(bodyGeo, mainMaterial);
    bodyMesh.position.y = 0;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    packGroup.add(bodyMesh);

    // 2. Reinforced Base (Lower cup)
    const baseGeo = new THREE.CylinderGeometry(1.12, 1.1, 1.0, 16);
    const baseMesh = new THREE.Mesh(baseGeo, secondaryMaterial);
    baseMesh.position.y = -1.8;
    packGroup.add(baseMesh);

    // 3. Roll Top Cylinder
    const rollGeo = new THREE.CylinderGeometry(0.5, 0.5, 2.2, 12);
    rollGeo.rotateZ(Math.PI / 2);
    const rollMesh = new THREE.Mesh(rollGeo, secondaryMaterial);
    rollMesh.position.set(0, 2.35, 0);
    packGroup.add(rollMesh);

    // Roll Top center strap
    const topStrapGeo = new THREE.BoxGeometry(0.3, 0.8, 1.2);
    const topStrapMesh = new THREE.Mesh(topStrapGeo, orangeMaterial);
    topStrapMesh.position.set(0, 2.2, 0.4);
    packGroup.add(topStrapMesh);

    // 4. Front Pocket (lower front block)
    const frontPocketGeo = new THREE.BoxGeometry(1.4, 1.8, 0.6);
    const frontPocketMesh = new THREE.Mesh(frontPocketGeo, mainMaterial);
    frontPocketMesh.position.set(0, -0.6, 0.9);
    packGroup.add(frontPocketMesh);

    // Front pocket orange zipper detail
    const zipLineGeo = new THREE.BoxGeometry(0.08, 1.4, 0.62);
    const zipLineMesh = new THREE.Mesh(zipLineGeo, orangeMaterial);
    zipLineMesh.position.set(0, -0.6, 1.2);
    packGroup.add(zipLineMesh);

    // 5. Left & Right Side Compression Straps (Cylinders/Tubes)
    const strapLGeo = new THREE.BoxGeometry(0.1, 0.15, 2.3);
    const strapL = new THREE.Mesh(strapLGeo, metalMaterial);
    strapL.position.set(-1.1, 0.8, 0);
    packGroup.add(strapL);

    const strapRGeo = new THREE.BoxGeometry(0.1, 0.15, 2.3);
    const strapR = new THREE.Mesh(strapRGeo, metalMaterial);
    strapR.position.set(1.1, 0.8, 0);
    packGroup.add(strapR);

    // Small Buckles on compression straps
    const buckleL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.25, 0.3), metalMaterial);
    buckleL.position.set(-1.15, 0.8, 0.8);
    packGroup.add(buckleL);

    const buckleR = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.25, 0.3), metalMaterial);
    buckleR.position.set(1.15, 0.8, 0.8);
    packGroup.add(buckleR);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(5, 10, 7);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xaaccee, 0.4);
    dirLight2.position.set(-5, -2, -5);
    scene.add(dirLight2);

    // --- INTERACTION & LOGIC ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let autoRotate = true;
    let rotationSpeed = 0.005;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      autoRotate = false;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      packGroup.rotation.y += deltaMove.x * 0.01;
      packGroup.rotation.x += deltaMove.y * 0.01;

      // Keep rotation x in bounds to prevent upside down flips
      packGroup.rotation.x = Math.max(-0.6, Math.min(0.6, packGroup.rotation.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
      // Re-enable autoRotate after 3 seconds of inactivity
      setTimeout(() => {
        if (!isDragging) autoRotate = true;
      }, 4000);
    };

    // Attach drag events to the canvas container
    const domEl = renderer.domElement;
    domEl.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Project coordinates to 2D
    const tempV = new THREE.Vector3();
    const updateHotspots = () => {
      setHotspots((prev) =>
        prev.map((hs) => {
          // Get absolute position of the hotspot point based on group's current rotation
          tempV.copy(hs.pos);
          tempV.applyMatrix4(packGroup.matrixWorld);

          // Project to 2D
          tempV.project(camera);

          // Convert normalized device coords to screen coords (0 to width/height)
          const x = (tempV.x * 0.5 + 0.5) * width;
          const y = (-(tempV.y * 0.5) + 0.5) * height;

          return { ...hs, screenPos: { x, y } };
        })
      );
    };

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate) {
        packGroup.rotation.y += rotationSpeed;
        // Smoothly return rotation.x to normal tilt
        packGroup.rotation.x += (0.1 - packGroup.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
      updateHotspots();
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      bodyGeo.dispose();
      baseGeo.dispose();
      rollGeo.dispose();
      frontPocketGeo.dispose();
      strapLGeo.dispose();
      strapRGeo.dispose();
      topStrapGeo.dispose();
      mainMaterial.dispose();
      secondaryMaterial.dispose();
      metalMaterial.dispose();
      orangeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[450px] md:min-h-[600px] border border-outline-variant bg-white select-none overflow-hidden group">
      
      {/* 3D Canvas container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Dynamic Hotspot Markers */}
      {hotspots.map((hs) => {
        // Only show if the point is somewhat in front of the camera (behind z-plane)
        const isFarAway = hs.pos.z < 0 && Math.abs(hs.pos.x) > 0.5;
        // We can just render them directly
        return (
          <div
            key={hs.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center pointer-events-auto"
            style={{
              left: `${hs.screenPos.x}px`,
              top: `${hs.screenPos.y}px`,
            }}
            onClick={() => setActiveHotspot(hs)}
          >
            {/* Pulsing ring */}
            <div className="w-5 h-5 bg-high-vis-orange/40 rounded-full animate-ping absolute" />
            {/* Center dot */}
            <div className={`w-3.5 h-3.5 rounded-full border-2 border-white transition-all shadow-md ${
              activeHotspot?.id === hs.id ? "bg-primary scale-125" : "bg-high-vis-orange"
            }`} />
          </div>
        );
      })}

      {/* Instructions Overlay */}
      <div className="absolute bottom-4 left-4 font-label-sm text-[10px] text-on-surface-variant bg-surface/80 border border-outline-variant px-3 py-1.5 uppercase font-mono tracking-wider pointer-events-none">
        按住鼠标拖拽可 360° 旋转检视模型 • 点击热点查看技术解析
      </div>

      {/* Info panel */}
      {activeHotspot && (
        <div className="absolute top-4 left-4 right-4 md:right-auto md:w-80 bg-surface/95 border-2 border-high-vis-orange p-6 shadow-2xl z-20 backdrop-blur-md transition-all duration-300">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-headline-md text-base text-primary font-bold">{activeHotspot.label}</h4>
            <button 
              className="text-secondary hover:text-primary font-bold text-sm cursor-pointer"
              onClick={() => setActiveHotspot(null)}
            >
              ✕
            </button>
          </div>
          <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
            {activeHotspot.desc}
          </p>
          <div className="mt-4 pt-3 border-t border-outline-variant flex justify-between items-center text-[10px] font-mono text-primary font-bold">
            <span>POSITION: PRO-EXP-3D</span>
            <span className="text-high-vis-orange">ACTIVE</span>
          </div>
        </div>
      )}
    </div>
  );
}

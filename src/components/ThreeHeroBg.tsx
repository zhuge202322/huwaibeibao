"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHeroBg() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera - set slightly lower to look up at the mountain peaks for a grander feel
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 12, 28);
    camera.lookAt(0, 2, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Grid Topography Geometry (high division count for realistic terrain details)
    const size = 60;
    const divisions = 70;
    const geometry = new THREE.PlaneGeometry(size, size, divisions, divisions);
    geometry.rotateX(-Math.PI / 2); // Lay it flat

    // Materials
    // 1. Solid low-poly faceted mountain body
    const solidMaterial = new THREE.MeshStandardMaterial({
      color: 0x182413, // Stitch Forest Green
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true, // Faceted edges for stylized realism
      side: THREE.DoubleSide,
    });
    const solidMesh = new THREE.Mesh(geometry, solidMaterial);
    scene.add(solidMesh);

    // 2. Technical wireframe overlay
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b35, // High-Vis Orange topographic wireframe
      wireframe: true,
      transparent: true,
      opacity: 0.15, // Subtle overlay
    });
    const wireMesh = new THREE.Mesh(geometry, wireMaterial);
    scene.add(wireMesh);

    // 3. Glowing orange points on vertex peaks
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xff6b35,
      size: 0.08,
      transparent: true,
      opacity: 0.35,
    });
    const points = new THREE.Points(geometry, pointsMaterial);
    scene.add(points);

    // Lighting (Contrasting warm and cool lights for realistic shading)
    const ambientLight = new THREE.AmbientLight(0x182413, 0.8); // Ambient Forest Green fill
    scene.add(ambientLight);

    // Warm Sun Directional Light (creates gold mountain highlights)
    const sunLight = new THREE.DirectionalLight(0xffae73, 2.0);
    sunLight.position.set(30, 25, 10);
    scene.add(sunLight);

    // Cool Sky Directional Light (creates cool blue shadows in valleys)
    const skyLight = new THREE.DirectionalLight(0x73aeff, 1.0);
    skyLight.position.set(-30, 15, -10);
    scene.add(skyLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Dynamic mountain height calculation
      const pos = geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);

        // Fractal-like noise combining waves to make realistic mountain ridges
        // Macro terrain shape
        let heightVal = Math.sin(x * 0.07 + time * 0.04) * Math.cos(z * 0.07 + time * 0.03) * 8.5;
        // Medium mountain ridges
        heightVal += Math.sin(x * 0.18 - time * 0.08) * Math.sin(z * 0.18 + time * 0.06) * 2.5;
        // Micro rock roughness details
        heightVal += Math.sin(x * 0.45) * Math.cos(z * 0.45) * 0.6;
        heightVal += Math.sin(x * 0.9) * Math.sin(z * 0.9) * 0.15;

        // Peak accentuation & valley flattening
        if (heightVal < -1.5) {
          heightVal = -1.5 + (heightVal + 1.5) * 0.12;
        } else if (heightVal > 2.0) {
          heightVal += (heightVal - 2.0) * 0.5;
        }

        pos.setY(i, heightVal);
      }
      pos.needsUpdate = true;
      geometry.computeVertexNormals(); // Crucial to update standard material lighting normals

      // Smooth mouse camera drift
      targetX += (mouseX * 10 - targetX) * 0.04;
      targetY += (mouseY * 6 - targetY) * 0.04;

      camera.position.x = targetX;
      camera.position.y = 12 - targetY;
      camera.lookAt(0, 2, 0);

      renderer.render(scene, camera);
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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      solidMaterial.dispose();
      wireMaterial.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 w-full h-full bg-[#182413]/5"
      style={{ pointerEvents: "none" }}
    />
  );
}

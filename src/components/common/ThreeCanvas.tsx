import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface SectionTransform {
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
  color: number;
  geometryType: 'torusKnot' | 'octahedron' | 'icosahedron' | 'box' | 'torus' | 'cone' | 'cylinder' | 'sphere' | 'dodecahedron';
}

const SECTION_TRANSFORMS: SectionTransform[] = [
  { pos: [1.4, 0, 0], rot: [0.5, 0.5, 0], scale: 1.3, color: 0xFFDE42, geometryType: 'torusKnot' },       // Hero: Glowing gold TorusKnot (Right)
  { pos: [1.3, 0.1, 0], rot: [0.8, -0.2, 0.5], scale: 1.2, color: 0x4C5C2D, geometryType: 'octahedron' }, // About: Olive Octahedron (Right)
  { pos: [-1.3, -0.1, 0], rot: [-0.3, 0.8, 0.2], scale: 1.1, color: 0xFFDE42, geometryType: 'icosahedron' }, // Skills: Golden Icosahedron (Left)
  { pos: [0, 0, 0], rot: [0.5, 0.5, 0.5], scale: 1.3, color: 0x00E5FF, geometryType: 'box' },           // Project 1 (Hexacore): Box (Center - Cyan, custom wave movement)
  { pos: [1.4, 0.1, 0], rot: [0.2, 0.9, 0.4], scale: 1.2, color: 0xFF69B4, geometryType: 'torus' },         // Project 2 (Invitaciones): Torus (Right - Pink)
  { pos: [-1.3, -0.1, 0], rot: [0.8, 0.3, 0.1], scale: 1.2, color: 0xAEEA00, geometryType: 'cone' },        // Project 3 (Smart Farm): Cone (Left - Green)
  { pos: [1.3, 0.1, 0], rot: [0.1, 0.5, 0.9], scale: 1.1, color: 0xFF3366, geometryType: 'cylinder' },     // Project 4 (Zotz): Cylinder (Right - Red)
  { pos: [-1.3, 0, 0], rot: [0.4, 0.4, 0.4], scale: 1.2, color: 0x00FFCC, geometryType: 'sphere' },       // Project 5 (AI Dashboard): Sphere (Left - Cyan/Green)
  { pos: [0, 0.4, -0.6], rot: [0.5, 0.5, 0.5], scale: 1.6, color: 0xFFE97A, geometryType: 'dodecahedron' }  // Contact: Dodecahedron at center
];

export const ThreeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    
    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 4. Lights Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffde42, 0.5); // Warm accent light
    dirLight2.position.set(-5, -5, 2);
    scene.add(dirLight2);

    // 5. Instantiating geometries
    const meshes: THREE.Mesh[] = [];
    const group = new THREE.Group();
    scene.add(group);

    SECTION_TRANSFORMS.forEach((transform) => {
      let geometry: THREE.BufferGeometry;

      switch (transform.geometryType) {
        case 'torusKnot':
          geometry = new THREE.TorusKnotGeometry(0.5, 0.16, 100, 16);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(0.6);
          break;
        case 'icosahedron':
          geometry = new THREE.IcosahedronGeometry(0.6);
          break;
        case 'box':
          geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
          break;
        case 'torus':
          geometry = new THREE.TorusGeometry(0.5, 0.18, 16, 100);
          break;
        case 'cone':
          geometry = new THREE.ConeGeometry(0.5, 0.9, 4);
          break;
        case 'cylinder':
          geometry = new THREE.CylinderGeometry(0.4, 0.4, 0.9, 8);
          break;
        case 'sphere':
          geometry = new THREE.SphereGeometry(0.6, 8, 8); // Flat faceted sphere
          break;
        case 'dodecahedron':
          geometry = new THREE.DodecahedronGeometry(0.7);
          break;
        default:
          geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      }

      const material = new THREE.MeshPhysicalMaterial({
        color: transform.color,
        metalness: 0.8,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        emissive: transform.color,
        emissiveIntensity: 0.15,
        flatShading: true
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(0, 0, 0); // Start hidden
      mesh.visible = false;
      group.add(mesh);
      meshes.push(mesh);
    });

    // Load GLTF Model for Hexacore (Project 1 — Section index 3)
    const loader = new GLTFLoader();
    loader.load('/hexacore.glb', (gltf) => {
      const model = gltf.scene;

      // Normalize size of the loaded model and center its pivot
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const scaleFactor = 0.9 / maxDim;
      
      model.scale.set(scaleFactor, scaleFactor, scaleFactor);
      model.position.set(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor);

      // Traversal to apply unified metalness/glass shader
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const meshChild = child as THREE.Mesh;
          meshChild.material = new THREE.MeshPhysicalMaterial({
            color: 0x00E5FF,
            metalness: 0.8,
            roughness: 0.15,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            emissive: 0x00E5FF,
            emissiveIntensity: 0.15,
            flatShading: true
          });
        }
      });

      // Safely dispose and remove placeholder
      const placeholder = meshes[3];
      group.remove(placeholder);
      placeholder.geometry.dispose();
      if (Array.isArray(placeholder.material)) {
        placeholder.material.forEach((m) => m.dispose());
      } else {
        placeholder.material.dispose();
      }

      // Create wrapper to apply scroll-based scale transitions on normalized mesh
      const wrapperGroup = new THREE.Group();
      wrapperGroup.add(model);
      wrapperGroup.scale.set(0, 0, 0);
      wrapperGroup.visible = false;

      group.add(wrapperGroup);
      meshes[3] = wrapperGroup as any;
    }, undefined, (error) => {
      console.warn('Could not load hexacore.glb, using low-poly fallback box:', error);
    });

    // 6. Handle Scroll listener
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 7. Handle Resize listener
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation & Render Loop
    let lastTime = 0;
    let animationFrameId: number;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const deltaTime = (time - lastTime) * 0.001;
      lastTime = time;

      // Scroll progression calculation
      const viewportHeight = window.innerHeight || 1;
      const progress = scrollYRef.current / viewportHeight;

      // Bound progress between 0 and transforms length - 1
      const maxIdx = SECTION_TRANSFORMS.length - 1;
      const boundedProgress = Math.max(0, Math.min(progress, maxIdx));

      const currentIdx = Math.floor(boundedProgress);
      const nextIdx = Math.min(currentIdx + 1, maxIdx);
      const ratio = boundedProgress - currentIdx;

      // Lerp Position and Base Rotation of the group
      const currentTransform = SECTION_TRANSFORMS[currentIdx];
      const nextTransform = SECTION_TRANSFORMS[nextIdx];

      // Lerp position
      group.position.x = THREE.MathUtils.lerp(currentTransform.pos[0], nextTransform.pos[0], ratio);
      group.position.y = THREE.MathUtils.lerp(currentTransform.pos[1], nextTransform.pos[1], ratio);
      group.position.z = THREE.MathUtils.lerp(currentTransform.pos[2], nextTransform.pos[2], ratio);

      // Rotate group or individual mesh slowly over time
      meshes.forEach((mesh, index) => {
        // Tent function for transition scaling
        const targetWeight = Math.max(0, 1 - Math.abs(boundedProgress - index));
        const finalScale = SECTION_TRANSFORMS[index].scale * targetWeight;

        if (targetWeight > 0.01) {
          mesh.visible = true;
          mesh.scale.set(finalScale, finalScale, finalScale);
          
          // Continuous rotation (multiplied by deltaTime for frame-rate independence)
          mesh.rotation.y += 0.25 * deltaTime;
          mesh.rotation.x += 0.12 * deltaTime;

          // Special horizontal wave logic for Master Ball (index 3)
          if (index === 3) {
            const waveTime = time * 0.001;
            // Horizontal sweep: oscillate X between -2.2 (left) and 2.2 (right)
            const waveX = Math.sin(waveTime * 0.8) * 2.2;
            // Vertical wave component: oscillate Y based on time
            const waveY = Math.cos(waveTime * 2.0) * 0.4;
            
            mesh.position.x = waveX;
            mesh.position.y = waveY;
          } else {
            mesh.position.set(0, 0, 0);
          }
        } else {
          mesh.visible = false;
          mesh.scale.set(0, 0, 0);
        }
      });

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => mat.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="three-canvas-container" />;
};

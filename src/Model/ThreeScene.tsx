import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface ThreeSceneProps {
  onSelectBodyPart: (part: string) => void;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ onSelectBodyPart }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 🧹 Dọn sạch trước khi khởi tạo (tránh bị 2 canvas)
    mountRef.current.innerHTML = "";

    // === Cấu hình cơ bản ===
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f7fb);

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.5, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // === Điều khiển xoay ===
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.target.set(0, 1, 0);

    // === Ánh sáng ===
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(3, 5, 3);
    scene.add(light);

    // === Load model người ===
    const loader = new GLTFLoader();
    let model: THREE.Group | null = null;

    loader.load(
      "/human_glb.glb",
      (gltf: GLTF) => {
        model = gltf.scene;
        model.scale.set(0.3, 0.3, 0.3); // ⚙️ chỉnh kích cỡ model
        model.position.set(0, 1.5, 0); // ⚙️ chỉnh vị trí model
  
        scene.add(model);
      },
      undefined,
      (error: unknown) => console.error("❌ Lỗi load model:", error)
    );

    // === Hotspots ===
    const hotspots: { position: THREE.Vector3; label: string }[] = [
      { position: new THREE.Vector3(0, 1.8, 0.18), label: "Đầu" },
      { position: new THREE.Vector3(0, 1.5, 0.12), label: "Ngực" },
      { position: new THREE.Vector3(0, 1.2, 0.18), label: "Bụng" },
      { position: new THREE.Vector3(-0.3, 1.3, 0.04), label: "Tay trái" },
      { position: new THREE.Vector3(0.3, 1.3, 0.04), label: "Tay phải" },
      { position: new THREE.Vector3(-0.15, 0.6, 0.14), label: "Chân trái" },
       { position: new THREE.Vector3(0.15, 0.6, 0.14), label: "Chân phải" },
    ];

    const hotspotMeshes: THREE.Mesh[] = [];
    const hotspotMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.8,
    });

    hotspots.forEach((h) => {
      const geo = new THREE.SphereGeometry(0.045, 32, 32); // ⚙️ chỉnh kích cỡ hotspot
      const mesh = new THREE.Mesh(geo, hotspotMaterial.clone());
      mesh.position.copy(h.position);
      (mesh as any).label = h.label;
      scene.add(mesh);
      hotspotMeshes.push(mesh);
    });

    // === Xử lý click ===
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hotspotMeshes);
      if (intersects.length > 0) {
        const part = (intersects[0].object as any).label;
        onSelectBodyPart(part);
      }
    };
    renderer.domElement.addEventListener("click", onClick);

    // === Animation ===
    const animate = () => {
      requestAnimationFrame(animate);
      hotspotMeshes.forEach((mesh, i) => {
        mesh.scale.setScalar(1 + Math.sin(Date.now() * 0.003 + i) * 0.08);
      });
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // === Xử lý resize ===
    const handleResize = () => {
      if (!mountRef.current) return;
      const { clientWidth, clientHeight } = mountRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // === Cleanup ===
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("click", onClick);
      controls.dispose();
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [onSelectBodyPart]);

  return (
    <div
      ref={mountRef}
      className="model3d-container"
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "20px",
        overflow: "hidden",
        background: "linear-gradient(120deg, #eef3ff, #f8faff)",
      }}
    />
  );
};

export default ThreeScene;
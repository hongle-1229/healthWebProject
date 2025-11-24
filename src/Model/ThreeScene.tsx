import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { div } from "three/src/nodes/TSL.js";

interface ThreeSceneProps {
  onSelectBodyPart: (part: string) => void;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ onSelectBodyPart }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(onSelectBodyPart);

  useEffect(() => {
    onSelectRef.current = onSelectBodyPart;
  }, [onSelectBodyPart]);

  useEffect(() => {
    if (!mountRef.current) return;
    mountRef.current.innerHTML = "";

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

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.target.set(0, 1, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(3, 5, 3);
    scene.add(light);

    const loader = new GLTFLoader();
    let model: THREE.Group | null = null;
    loader.load(
      "/human_glb.glb",
      (gltf: GLTF) => {
        model = gltf.scene;
        model.scale.set(0.3, 0.3, 0.3);
        model.position.set(0, 1.5, 0);
        scene.add(model);
      },
      undefined,
      (error) => console.error("❌ Lỗi load model:", error)
    );

    // --- Hotspots ---
    const hotspots: { position: THREE.Vector3; label: string }[] = [
      { position: new THREE.Vector3(0, 1.85, 0.16), label: "Đầu & Não" },
      { position: new THREE.Vector3(0.05, 1.8, 0.165), label: "Mắt" },
      { position: new THREE.Vector3(0, 1.75, 0.18), label: "Mũi – Xoang" },
      { position: new THREE.Vector3(0, 1.7, 0.165), label: "Miệng – Lưỡi" },
      { position: new THREE.Vector3(0, 1.6, 0.07), label: "Họng – Cổ" },
      { position: new THREE.Vector3(0, 1.45, 0.14), label: "Ngực – Tim – Phổi" },
      { position: new THREE.Vector3(-0.1, 1.42, 0.155), label: "Tim mạch – Mạch máu" },
      { position: new THREE.Vector3(0, 1.25, 0.18), label: "Gan – Mật" },
      { position: new THREE.Vector3(0, 1.15, 0.18), label: "Hệ tiêu hóa (dạ dày, ruột)" },
      { position: new THREE.Vector3(0, 1, 0.18), label: "Thận – Đường tiết niệu" },
      { position: new THREE.Vector3(0, 0.86, 0.175), label: "Hệ sinh dục – Hậu môn" },
      { position: new THREE.Vector3(-0.3, 1.3, 0.04), label: "Tay trái" },
      { position: new THREE.Vector3(0.3, 1.3, 0.04), label: "Tay phải" },
      { position: new THREE.Vector3(-0.15, 0.6, 0.14), label: "Chân trái" },
      { position: new THREE.Vector3(0.15, 0.6, 0.14), label: "Chân phải" },
      { position: new THREE.Vector3(0.3, 1.48, 0.02), label: "Da – Móng – Phản ứng dị ứng" },
      { position: new THREE.Vector3(-0.05, 1.32, 0.18), label: "Toàn thân – Không đặc hiệu" },
      { position: new THREE.Vector3(0.05, 1.32, 0.18), label: "Triệu chứng nghiêm trọng toàn thân" },
    ];

    const hotspotMeshes: THREE.Mesh[] = [];
    const hotspotMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.8,
    });

    hotspots.forEach((h) => {
      const geo = new THREE.SphereGeometry(0.02, 32, 32);
      const mesh = new THREE.Mesh(geo, hotspotMaterial.clone());
      mesh.position.copy(h.position);
      (mesh as any).label = h.label;
      scene.add(mesh);
      hotspotMeshes.push(mesh);
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // --- Tooltip DOM element ---
    const tooltip = document.createElement("div");
    tooltip.style.position = "absolute";
    tooltip.style.pointerEvents = "none"; // don't block pointer events
    tooltip.style.padding = "6px 10px";
    tooltip.style.borderRadius = "6px";
    tooltip.style.background = "rgba(20,20,30,0.9)";
    tooltip.style.color = "white";
    tooltip.style.fontSize = "13px";
    tooltip.style.whiteSpace = "nowrap";
    tooltip.style.transform = "translate(-50%, -130%)";
    tooltip.style.transition = "opacity 120ms ease, transform 120ms ease";
    tooltip.style.opacity = "0";
    tooltip.style.boxShadow = "0 6px 18px rgba(0,0,0,0.18)";
    tooltip.style.zIndex = "5";
    if (mountRef.current) {
      mountRef.current.style.position = "relative"; // make sure container is position context
      mountRef.current.appendChild(tooltip);
    }

    // Helper: project a 3D position to 2D relative to mountRef
    const worldToContainerXY = (pos: THREE.Vector3) => {
      const projected = pos.clone().project(camera);
      const rect = mountRef.current!.getBoundingClientRect();
      const x = (projected.x * 0.5 + 0.5) * rect.width;
      const y = (-projected.y * 0.5 + 0.5) * rect.height;
      return { x, y };
    };

    // mousemove for hover
    const onPointerMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hotspotMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as any;
        // show tooltip near world position of the hotspot
        const worldPos = hit.getWorldPosition(new THREE.Vector3());
        const { x, y } = worldToContainerXY(worldPos);
        tooltip.textContent = hit.label || "Hotspot";
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.style.opacity = "1";
        // enlarge slightly for feedback
        hit.scale.setScalar(1.15);
        renderer.domElement.style.cursor = "pointer";
      } else {
        // hide tooltip
        tooltip.style.opacity = "0";
        hotspotMeshes.forEach((m) => m.scale.setScalar(1));
        renderer.domElement.style.cursor = "default";
      }
    };

    // click handler (keep existing behavior)
    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hotspotMeshes);
      if (intersects.length > 0) {
        const part = (intersects[0].object as any).label;
        onSelectRef.current(part);
      }
    };

    renderer.domElement.addEventListener("mousemove", onPointerMove);
    renderer.domElement.addEventListener("click", onClick);

    const animate = () => {
      requestAnimationFrame(animate);
      hotspotMeshes.forEach((mesh, i) => {
        // subtle breathing; keep base scale = 1
        const base = mesh.scale.x > 0.9 ? 1 : 1; // ensure consistency
        mesh.scale.setScalar(
          base + Math.sin(Date.now() * 0.003 + i) * 0.03
        );
      });
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const { clientWidth, clientHeight } = mountRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", onPointerMove);
      renderer.domElement.removeEventListener("click", onClick);
      controls.dispose();
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (mountRef.current?.contains(tooltip)) {
        mountRef.current.removeChild(tooltip);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
       <h1 style={{marginTop:"100px", textAlign:"center", fontSize:"30px"}}>Hệ thống tư vấn sức khỏe dựa trên các triệu chứng</h1>
      <div
      ref={mountRef}
      className="model3d-container"
      style={{
        // width: "100%",
        // height: "500px",
        borderRadius: "20px",
        overflow: "hidden",
        background: "linear-gradient(120deg, #eef3ff, #f8faff)",
      }}
    ></div>
  </div>
  );
};

export default ThreeScene;
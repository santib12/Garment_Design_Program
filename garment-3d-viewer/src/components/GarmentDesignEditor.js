import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const INITIAL_MODEL_FILES = [
  "pants.glb",
  "baggy_pants_free.glb",
];

function PantsModel({ modelPath }) {
  const gltf = useGLTF(modelPath);
  return <primitive object={gltf.scene} scale={1.5} />;
}

export default function GarmentDesignEditor() {
  const [modelFiles, setModelFiles] = useState(INITIAL_MODEL_FILES.map(f => `/${f}`));
  const [modelIndex, setModelIndex] = useState(0);

  const modelPath = modelFiles[modelIndex];

  const handlePrev = () => {
    setModelIndex((prev) => (prev - 1 + modelFiles.length) % modelFiles.length);
  };
  const handleNext = () => {
    setModelIndex((prev) => (prev + 1) % modelFiles.length);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.name.endsWith('.glb')) return;
    const url = URL.createObjectURL(file);
    setModelFiles((prev) => [...prev, url]);
    setModelIndex(modelFiles.length); // Show the new model immediately
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#fdf6e3", display: 'flex', flexDirection: 'column' }}>
      <header style={{
        width: '100%',
        padding: '2.5rem 0',
        background: '#fdf6e3',
        color: '#333',
        fontSize: '2.8rem',
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: '0.05em',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        Garment 3D-visualizer
      </header>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            onClick={handlePrev}
            style={{
              alignSelf: 'center',
              marginRight: 16,
              background: 'none',
              color: 'black',
              border: 'none',
              borderRadius: 0,
              width: 48,
              height: 48,
              fontSize: 32,
              cursor: 'pointer',
              zIndex: 3,
              opacity: 1
            }}
            aria-label="Previous Model"
          >
            {'<'}
          </button>
          <div style={{
            width: 500,
            height: 600,
            background: '#fdf6e3',
            position: 'relative',
            boxShadow: '0 8px 32px rgba(0,0,0,0.22), 0 1.5px 6px rgba(0,0,0,0.12)',
            border: '2px solid #d3d3d3',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Canvas camera={{ position: [0, 1, 3], fov: 50 }} style={{ background: '#fdf6e3', borderRadius: 16 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 10, 7]} intensity={1} />
              <Suspense fallback={null}>
                <PantsModel modelPath={modelPath} />
              </Suspense>
              <OrbitControls enablePan={false} enableZoom={true} minDistance={2} maxDistance={10} target={[0, 0.75, 0]} />
            </Canvas>
          </div>
          <button
            onClick={handleNext}
            style={{
              alignSelf: 'center',
              marginLeft: 16,
              background: 'none',
              color: 'black',
              border: 'none',
              borderRadius: 0,
              width: 48,
              height: 48,
              fontSize: 32,
              cursor: 'pointer',
              zIndex: 3,
              opacity: 1
            }}
            aria-label="Next Model"
          >
            {'>'}
          </button>
        </div>
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <label style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: 8, display: 'block' }}>
            Upload a .glb 3D model:
          </label>
          <input
            type="file"
            accept=".glb"
            onChange={handleFileUpload}
            style={{ marginTop: 8 }}
          />
          <div style={{ color: '#888', fontSize: '0.95rem', marginTop: 8 }}>
            Uploaded models are only available during this session.
          </div>
        </div>
      </div>
    </div>
  );
} 
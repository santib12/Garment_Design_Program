import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Initial model filenames
const INITIAL_MODEL_FILES = [
  "pants.glb",
  "baggy_pants_free.glb",
];

function PantsModel({ modelPath }) {
  const gltf = useGLTF(modelPath);
  return <primitive object={gltf.scene} scale={1.5} />;
}

function App() {
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
    <div style={{ width: "100vw", minHeight: "100vh", background: "#f5f5f5", display: 'flex', flexDirection: 'column' }}>
      <header style={{
        width: '100%',
        padding: '1.5rem 0',
        background: '#fff',
        color: '#333',
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: '0.05em',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        zIndex: 2
      }}>
        Garment 3D-visualizer
      </header>
      <div style={{ flex: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: '32px 0 0 0' }}>
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          style={{
            alignSelf: 'center',
            marginRight: 0,
            marginLeft: 0,
            background: 'transparent',
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
        {/* 3D Viewer */}
        <div style={{ width: 500, height: 500, background: '#f5f5f5', position: 'relative', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Canvas camera={{ position: [0, 1, 5], fov: 50 }} style={{ background: '#f5f5f5', borderRadius: 16 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 7]} intensity={1} />
            <Suspense fallback={null}>
              <PantsModel modelPath={modelPath} />
            </Suspense>
            <OrbitControls enablePan={false} enableZoom={true} minDistance={2} maxDistance={10} target={[0, 1, 0]} />
          </Canvas>
        </div>
        {/* Right Arrow */}
        <button
          onClick={handleNext}
          style={{
            alignSelf: 'center',
            marginLeft: 0,
            marginRight: 0,
            background: 'transparent',
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
      {/* Separator line */}
      <hr style={{ width: 540, margin: '32px auto 0 auto', border: 'none', borderTop: '2px solid #ddd' }} />
      {/* Upload section */}
      <div style={{ width: 540, margin: '24px auto 0 auto', textAlign: 'center' }}>
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
  );
}

export default App;

// Preload initial models
INITIAL_MODEL_FILES.forEach((file) => useGLTF.preload(`/${file}`));

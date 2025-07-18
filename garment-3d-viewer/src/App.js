import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function PantsModel() {
  // Load the GLB model from the public folder
  const gltf = useGLTF("/pants.glb");
  return <primitive object={gltf.scene} scale={1.5} />;
}

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#f5f5f5", display: 'flex', flexDirection: 'column' }}>
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
      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [0, 1, 5], fov: 50 }} style={{ background: '#f5f5f5' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 7]} intensity={1} />
          <Suspense fallback={null}>
            <PantsModel />
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={true} minDistance={2} maxDistance={10} target={[0, 1, 0]} />
        </Canvas>
      </div>
    </div>
  );
}

export default App;

// Required for GLTF loading
useGLTF.preload("/pants.glb");

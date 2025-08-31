import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Simple building component
const Building = ({ position, color, size, name }: any) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Simple ground
const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#333333" />
    </mesh>
  );
};

// Simple lighting
const Lighting = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </>
  );
};

// Main city scene
const CityScene = () => {
  const buildings = [
    { position: [0, 0, 0], color: '#00ffff', size: [10, 20, 10], name: 'Central Tower' },
    { position: [20, 0, 20], color: '#ff00ff', size: [15, 15, 15], name: 'Research Lab' },
    { position: [-20, 0, 20], color: '#ffff00', size: [12, 18, 12], name: 'Energy Plant' },
    { position: [20, 0, -20], color: '#00ff00', size: [18, 12, 18], name: 'Residential' },
    { position: [-20, 0, -20], color: '#ff8800', size: [14, 16, 14], name: 'Transport Hub' },
  ];

  return (
    <>
      <Lighting />
      <Ground />
      {buildings.map((building, index) => (
        <Building key={index} {...building} />
      ))}
    </>
  );
};

// Main component
const Basic3DCity = () => {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold">Loading 3D City...</h2>
          <p className="text-gray-400">Initializing 3D environment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-900">
      {/* Header */}
      <div className="absolute top-4 left-4 z-10 bg-black/80 text-white px-4 py-2 rounded-lg">
        <h1 className="text-lg font-bold">3D AI City</h1>
        <p className="text-sm text-gray-300">Symbiotic Digital City 2070</p>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [50, 30, 50], fov: 60 }}
        style={{ background: '#0a0a1a' }}
      >
        <CityScene />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={100}
          minDistance={10}
        />
      </Canvas>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-10 bg-black/80 text-white px-4 py-2 rounded-lg text-sm">
        <p>Mouse: Orbit, Scroll: Zoom, Right-click: Pan</p>
      </div>
    </div>
  );
};

export default Basic3DCity;

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';

// Simple building data
const BUILDINGS = [
  {
    id: 'central-tower',
    name: 'Central AI Tower',
    position: [0, 0, 0],
    size: [15, 30, 15],
    color: '#00ffff',
    description: 'Main AI control center and city hub'
  },
  {
    id: 'research-lab',
    name: 'Research Laboratory',
    position: [40, 0, 20],
    size: [20, 25, 20],
    color: '#ff00ff',
    description: 'Advanced technology research facility'
  },
  {
    id: 'energy-plant',
    name: 'Energy Plant',
    position: [-35, 0, 15],
    size: [18, 20, 18],
    color: '#ffff00',
    description: 'Renewable energy generation center'
  },
  {
    id: 'residential-complex',
    name: 'Residential Complex',
    position: [25, 0, -30],
    size: [25, 18, 25],
    color: '#00ff00',
    description: 'Smart living spaces for citizens'
  },
  {
    id: 'transport-center',
    name: 'Transport Center',
    position: [-25, 0, -35],
    size: [22, 16, 22],
    color: '#ff8800',
    description: 'Advanced transportation hub'
  },
  {
    id: 'education-hub',
    name: 'Education Hub',
    position: [0, 0, 45],
    size: [28, 22, 28],
    color: '#ff0080',
    description: 'Learning and knowledge center'
  }
];

// Simple Building Component
const Building = ({ building, onBuildingClick, selectedBuilding, setSelectedBuilding }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selectedBuilding === building.id);
  }, [selectedBuilding, building.id]);

  useFrame((state) => {
    if (meshRef.current) {
      // Simple floating animation
      meshRef.current.position.y = building.position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      
      // Glow effect when hovered or selected
      if (hovered || isSelected) {
        (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4;
        meshRef.current.scale.setScalar(1.05);
      } else {
        (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const handleClick = () => {
    onBuildingClick(building);
    setSelectedBuilding(building.id);
  };

  return (
    <group>
      {/* Main building */}
      <mesh
        ref={meshRef}
        position={building.position}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={building.size} />
        <meshStandardMaterial
          color={building.color}
          transparent
          opacity={0.9}
          metalness={0.8}
          roughness={0.2}
          emissive={building.color}
          emissiveIntensity={0}
        />
      </mesh>
      
      {/* Glowing outline when hovered */}
      {(hovered || isSelected) && (
        <mesh position={building.position}>
          <boxGeometry args={building.size.map((s: number) => s + 0.8)} />
          <meshBasicMaterial
            color={building.color}
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      )}
      
      {/* Building name */}
      <Html position={[building.position[0], building.position[1] + building.size[1] / 2 + 2, building.position[2]]}>
        <div className="text-center">
          <div 
            className="text-sm font-bold px-3 py-2 rounded-lg backdrop-blur-md"
            style={{ 
              color: building.color,
              textShadow: `0 0 10px ${building.color}`,
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: `1px solid ${building.color}`,
              minWidth: '120px'
            }}
          >
            {building.name}
          </div>
        </div>
      </Html>
    </group>
  );
};

// Roads connecting buildings
const Roads = () => {
  const roadGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const points: THREE.Vector3[] = [];
    
    // Create road network
    BUILDINGS.forEach((building, i) => {
      BUILDINGS.slice(i + 1).forEach((otherBuilding) => {
        points.push(
          new THREE.Vector3(...building.position),
          new THREE.Vector3(...otherBuilding.position)
        );
      });
    });
    
    geometry.setFromPoints(points);
    return geometry;
  }, []);

  return (
    <line geometry={roadGeometry}>
      <lineBasicMaterial color="#00ffff" transparent opacity={0.6} />
    </line>
  );
};

// Floating vehicles
const FloatingVehicles = () => {
  const vehiclesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (vehiclesRef.current) {
      vehiclesRef.current.children.forEach((vehicle, index) => {
        const time = state.clock.elapsedTime;
        const speed = 0.3 + index * 0.2;
        const radius = 40 + index * 8;
        
        vehicle.position.x = Math.cos(time * speed) * radius;
        vehicle.position.z = Math.sin(time * speed) * radius;
        vehicle.position.y = 20 + Math.sin(time * speed * 2) * 5;
        vehicle.rotation.y = time * speed;
      });
    }
  });

  return (
    <group ref={vehiclesRef}>
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[0, 20, 0]}>
          <boxGeometry args={[1.5, 0.8, 2.5]} />
          <meshStandardMaterial
            color={['#ff0080', '#8000ff', '#00ff80', '#ff8000', '#0080ff', '#ff0080'][i]}
            emissive={['#ff0080', '#8000ff', '#00ff80', '#ff8000', '#0080ff', '#ff0080'][i]}
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

// Ground plane
const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial
        color="#1a1a2e"
        transparent
        opacity={0.9}
        emissive="#0a0a1a"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

// Lighting
const Lighting = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 60, 0]} intensity={1.5} color="#ffffff" />
      <pointLight position={[50, 40, 50]} intensity={1} color="#00ffff" />
      <pointLight position={[-50, 40, -50]} intensity={1} color="#ff00ff" />
      <pointLight position={[0, 30, 0]} intensity={0.8} color="#ffff00" />
    </>
  );
};

// Info Panel
const InfoPanel = ({ building, onClose, onTeleport, camera }: any) => {
  const handleTeleport = () => {
    onTeleport(building, camera);
    onClose();
  };

  return (
    <Html position={[building.position[0], building.position[1] + building.size[1] / 2 + 5, building.position[2]]}>
      <div className="bg-black/90 backdrop-blur-md border border-cyan-400 rounded-xl p-6 text-white min-w-[280px] shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: building.color + '20', color: building.color }}
            >
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: building.color }}></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-400">{building.name}</h3>
              <p className="text-sm text-gray-400">AI-Powered Facility</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Description</h4>
            <p className="text-sm text-gray-400">{building.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Height:</span>
              <div className="text-white font-semibold">{building.size[1]}m</div>
            </div>
            <div>
              <span className="text-gray-400">Area:</span>
              <div className="text-white font-semibold">{building.size[0]} × {building.size[2]}m</div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <button
              onClick={handleTeleport}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <div className="w-4 h-4 rounded-full bg-white"></div>
              Teleport to Building
            </button>
          </div>
        </div>
      </div>
    </Html>
  );
};

// Mini Map
const MiniMap = ({ buildings, selectedBuilding, onBuildingSelect }: any) => {
  return (
    <div className="fixed top-4 right-4 bg-black/80 backdrop-blur-md border border-cyan-400 rounded-xl p-4 text-white z-50">
      <h4 className="text-sm font-bold text-cyan-400 mb-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
        City Map
      </h4>
      <div className="space-y-2">
        {buildings.map((building: any) => (
          <button
            key={building.id}
            onClick={() => onBuildingSelect(building.id)}
            className={`flex items-center space-x-2 text-xs p-2 rounded-lg transition-all duration-200 ${
              selectedBuilding === building.id
                ? 'bg-cyan-500 text-white shadow-lg'
                : 'hover:bg-gray-700/50 hover:scale-105'
            }`}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: building.color }}
            />
            <span className="truncate">{building.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Main City Scene
const CityScene = ({ onBuildingClick, selectedBuilding, setSelectedBuilding }: any) => {
  const { camera } = useThree();
  
  const handleTeleport = (building: any, camera: any) => {
    const targetPosition = new THREE.Vector3(
      building.position[0],
      building.position[1] + building.size[1] / 2 + 15,
      building.position[2] + 20
    );
    
    const startPosition = camera.position.clone();
    const duration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const easedProgress = easeInOutCubic(progress);
      
      camera.position.lerpVectors(startPosition, targetPosition, easedProgress);
      camera.lookAt(building.position[0], building.position[1] + building.size[1] / 2, building.position[2]);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  };

  return (
    <>
      <Lighting />
      <Ground />
      <Roads />
      <FloatingVehicles />
      
      {BUILDINGS.map((building) => (
        <Building
          key={building.id}
          building={building}
          onBuildingClick={onBuildingClick}
          selectedBuilding={selectedBuilding}
          setSelectedBuilding={setSelectedBuilding}
        />
      ))}
      
      {selectedBuilding && (
        <InfoPanel
          building={BUILDINGS.find((b: any) => b.id === selectedBuilding)}
          onClose={() => setSelectedBuilding(null)}
          onTeleport={handleTeleport}
          camera={camera}
        />
      )}
    </>
  );
};

// Main Component
const Simple3DCity = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const handleBuildingClick = (building: any) => {
    setSelectedBuilding(building.id);
  };

  const handleBuildingSelect = (buildingId: string) => {
    setSelectedBuilding(buildingId);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Fullscreen toggle button */}
      <button
        onClick={toggleFullscreen}
        className="fixed top-4 left-4 z-10 bg-black/80 backdrop-blur-md border border-cyan-400 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-500 hover:text-white transition-all duration-200"
      >
        {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </button>

      {/* Mini Map */}
      <MiniMap
        buildings={BUILDINGS}
        selectedBuilding={selectedBuilding}
        onBuildingSelect={handleBuildingSelect}
      />

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [80, 50, 80], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #0a0a1a, #1a1a2e, #16213e)' }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <PerspectiveCamera makeDefault position={[80, 50, 80]} />
        <CityScene
          onBuildingClick={handleBuildingClick}
          selectedBuilding={selectedBuilding}
          setSelectedBuilding={setSelectedBuilding}
        />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={150}
          minDistance={20}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Simple3DCity;

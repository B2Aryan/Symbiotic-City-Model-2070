import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, PerspectiveCamera, Text, Float, Environment, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import AICityMap from './AICityMap';

// Enhanced building data with smart features
const SMART_BUILDINGS = [
  {
    id: 'quantum-hub',
    name: 'Quantum Computing Hub',
    description: 'Advanced quantum computing center with AI research labs and neural network training facilities.',
    color: '#00ffff',
    size: [12, 25, 12],
    position: [0, 0, 0],
    features: ['Quantum Processors', 'AI Training', 'Neural Networks', 'Research Labs'],
    energyLevel: 95,
    population: '1,247 researchers',
    holographic: true,
    floating: true
  },
  {
    id: 'bio-tech-center',
    name: 'Bio-Tech Innovation Center',
    description: 'Cutting-edge biotechnology research with genetic engineering and sustainable living solutions.',
    color: '#00ff00',
    size: [15, 20, 15],
    position: [30, 0, 25],
    features: ['Genetic Research', 'Bio-Engineering', 'Sustainable Tech', 'Health Innovation'],
    energyLevel: 88,
    population: '892 scientists',
    holographic: false,
    floating: false
  },
  {
    id: 'neural-academy',
    name: 'Neural Academy',
    description: 'Advanced learning institution with brain-computer interfaces and immersive education.',
    color: '#ff00ff',
    size: [18, 22, 18],
    position: [-25, 0, 20],
    features: ['Brain Interfaces', 'Immersive Learning', 'AI Tutors', 'Knowledge Transfer'],
    energyLevel: 92,
    population: '2,156 students',
    holographic: true,
    floating: true
  },
  {
    id: 'energy-nexus',
    name: 'Energy Nexus',
    description: 'Fusion power plant and renewable energy management center.',
    color: '#ffff00',
    size: [20, 18, 20],
    position: [20, 0, -30],
    features: ['Fusion Power', 'Energy Grid', 'Renewable Sources', 'Power Distribution'],
    energyLevel: 99,
    population: '456 engineers',
    holographic: false,
    floating: false
  },
  {
    id: 'smart-residential',
    name: 'Smart Residential Complex',
    description: 'Intelligent living spaces with AI home management and sustainable architecture.',
    color: '#ff8800',
    size: [25, 16, 25],
    position: [-20, 0, -35],
    features: ['AI Homes', 'Smart Systems', 'Sustainable Living', 'Community AI'],
    energyLevel: 85,
    population: '8,947 residents',
    holographic: true,
    floating: false
  },
  {
    id: 'transport-hub',
    name: 'Transportation Hub',
    description: 'Advanced mobility center with flying vehicles and teleportation systems.',
    color: '#ff0080',
    size: [16, 14, 16],
    position: [0, 0, 40],
    features: ['Flying Vehicles', 'Teleportation', 'Smart Traffic', 'Mobility AI'],
    energyLevel: 91,
    population: '1,234 travelers',
    holographic: true,
    floating: true
  }
];

// Smart Infrastructure Components
const SmartInfrastructure = () => {
  const infrastructureRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (infrastructureRef.current) {
      infrastructureRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={infrastructureRef}>
      {/* Floating Energy Orbs */}
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[
            Math.cos(i * Math.PI / 4) * 60,
            15 + Math.sin(state.clock.elapsedTime + i) * 5,
            Math.sin(i * Math.PI / 4) * 60
          ]}>
            <sphereGeometry args={[2, 16, 16]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}

      {/* Smart Roads with Energy Lines */}
      <SmartRoads />
      
      {/* Floating Data Centers */}
      <FloatingDataCenters />
      
      {/* Environmental Sensors */}
      <EnvironmentalSensors />
    </group>
  );
};

// Smart Roads with Energy Lines
const SmartRoads = () => {
  const roadGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const points: THREE.Vector3[] = [];
    
    // Create smart road network
    SMART_BUILDINGS.forEach((building, i) => {
      SMART_BUILDINGS.slice(i + 1).forEach((otherBuilding) => {
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
    <>
      {/* Main Roads */}
      <line geometry={roadGeometry}>
        <lineBasicMaterial color="#00ffff" transparent opacity={0.8} />
      </line>
      
      {/* Energy Lines */}
      <line geometry={roadGeometry}>
        <lineBasicMaterial color="#ffff00" transparent opacity={0.4} />
      </line>
      
      {/* Data Transmission Lines */}
      <line geometry={roadGeometry}>
        <lineBasicMaterial color="#ff00ff" transparent opacity={0.3} />
      </line>
    </>
  );
};

// Floating Data Centers
const FloatingDataCenters = () => {
  const dataCentersRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (dataCentersRef.current) {
      dataCentersRef.current.children.forEach((center, index) => {
        const time = state.clock.elapsedTime;
        const speed = 0.3 + index * 0.1;
        const radius = 45 + index * 8;
        
        center.position.x = Math.cos(time * speed) * radius;
        center.position.z = Math.sin(time * speed) * radius;
        center.position.y = 20 + Math.sin(time * speed * 2) * 8;
        center.rotation.y = time * speed;
      });
    }
  });

  return (
    <group ref={dataCentersRef}>
      {[...Array(6)].map((_, i) => (
        <Float key={i} speed={1} rotationIntensity={1} floatIntensity={0.5}>
          <mesh position={[0, 20, 0]}>
            <octahedronGeometry args={[3]} />
            <meshStandardMaterial
              color={['#ff0080', '#8000ff', '#00ff80', '#ff8000', '#0080ff', '#ff0080'][i]}
              emissive={['#ff0080', '#8000ff', '#00ff80', '#ff8000', '#0080ff', '#ff0080'][i]}
              emissiveIntensity={0.7}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Environmental Sensors
const EnvironmentalSensors = () => {
  const sensorsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (sensorsRef.current) {
      sensorsRef.current.children.forEach((sensor, index) => {
        const time = state.clock.elapsedTime;
        sensor.position.y = 5 + Math.sin(time * 2 + index) * 2;
        sensor.rotation.y = time * 0.5;
      });
    }
  });

  return (
    <group ref={sensorsRef}>
      {[...Array(12)].map((_, i) => (
        <mesh key={i} position={[
          Math.cos(i * Math.PI / 6) * 80,
          5,
          Math.sin(i * Math.PI / 6) * 80
        ]}>
          <cylinderGeometry args={[0.5, 0.5, 4, 8]} />
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

// Enhanced Building Component
const SmartBuilding = ({ building, onBuildingClick, selectedBuilding, setSelectedBuilding }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selectedBuilding === building.id);
  }, [selectedBuilding, building.id]);

  useFrame((state) => {
    if (meshRef.current) {
      // Enhanced floating animation for floating buildings
      if (building.floating) {
        meshRef.current.position.y = building.position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
      }
      
      // Enhanced glow effects
      if (hovered || isSelected) {
        (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6;
        meshRef.current.scale.setScalar(1.1);
      } else {
        (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.1;
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
      {/* Main Building */}
      <Float speed={building.floating ? 2 : 0} rotationIntensity={building.floating ? 0.5 : 0}>
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
            metalness={0.95}
            roughness={0.05}
            emissive={building.color}
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>
      
      {/* Holographic Effects */}
      {building.holographic && (
        <mesh position={building.position}>
          <boxGeometry args={building.size.map((s: number) => s + 1)} />
          <meshBasicMaterial
            color={building.color}
            transparent
            opacity={0.2}
            wireframe
          />
        </mesh>
      )}
      
      {/* Energy Field */}
      {(hovered || isSelected) && (
        <mesh position={building.position}>
          <sphereGeometry args={[Math.max(...building.size) * 0.8, 16, 16]} />
          <meshBasicMaterial
            color={building.color}
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      
      {/* Building Label */}
      <Html position={[building.position[0], building.position[1] + building.size[1] / 2 + 3, building.position[2]]}>
        <div className="text-center">
          <div 
            className="text-sm font-bold px-3 py-2 rounded-lg backdrop-blur-md"
            style={{ 
              color: building.color,
              textShadow: `0 0 15px ${building.color}`,
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: `1px solid ${building.color}`,
              boxShadow: `0 0 20px ${building.color}40`
            }}
          >
            {building.name}
          </div>
        </div>
      </Html>

      {/* Energy Level Indicator */}
      <Html position={[building.position[0] - building.size[0] / 2 - 2, building.position[1] + building.size[1] / 2, building.position[2]]}>
        <div className="bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg p-2 text-white text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span>{building.energyLevel}%</span>
          </div>
        </div>
      </Html>
    </group>
  );
};

// Smart Transportation System
const SmartTransportation = () => {
  const transportRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (transportRef.current) {
      transportRef.current.children.forEach((vehicle, index) => {
        const time = state.clock.elapsedTime;
        const speed = 0.8 + index * 0.3;
        const radius = 35 + index * 6;
        const height = 25 + index * 3;
        
        vehicle.position.x = Math.cos(time * speed) * radius;
        vehicle.position.z = Math.sin(time * speed) * radius;
        vehicle.position.y = height + Math.sin(time * speed * 3) * 8;
        vehicle.rotation.y = time * speed;
        vehicle.rotation.z = Math.sin(time * speed * 2) * 0.2;
      });
    }
  });

  return (
    <group ref={transportRef}>
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
          <mesh position={[0, 25, 0]}>
            <dodecahedronGeometry args={[1.5]} />
            <meshStandardMaterial
              color={['#ff0080', '#8000ff', '#00ff80', '#ff8000', '#0080ff', '#ff0080', '#8000ff', '#00ff80'][i]}
              emissive={['#ff0080', '#8000ff', '#00ff80', '#ff8000', '#0080ff', '#ff0080', '#8000ff', '#00ff80'][i]}
              emissiveIntensity={0.8}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Enhanced Ground with Smart Grid
const SmartGround = () => {
  const groundRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (groundRef.current) {
      const material = groundRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <>
      {/* Main Ground */}
      <mesh ref={groundRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial
          color="#1a1a2e"
          transparent
          opacity={0.9}
          emissive="#0a0a1a"
          emissiveIntensity={0.1}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Smart Grid Pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <planeGeometry args={[300, 300]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </>
  );
};

// Enhanced Lighting System
const SmartLighting = () => {
  const lightsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (lightsRef.current) {
      lightsRef.current.children.forEach((light, index) => {
        const time = state.clock.elapsedTime;
        const intensity = 0.8 + Math.sin(time * 2 + index) * 0.2;
        (light as THREE.PointLight).intensity = intensity;
      });
    }
  });

  return (
    <group ref={lightsRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 60, 0]} intensity={1.2} color="#ffffff" />
      <pointLight position={[60, 40, 60]} intensity={1} color="#00ffff" />
      <pointLight position={[-60, 40, -60]} intensity={1} color="#ff00ff" />
      <pointLight position={[0, 30, 0]} intensity={0.8} color="#ffff00" />
      <pointLight position={[40, 35, -40]} intensity={0.9} color="#ff0080" />
      <pointLight position={[-40, 35, 40]} intensity={0.9} color="#8000ff" />
    </group>
  );
};

// Enhanced Info Panel
const SmartInfoPanel = ({ building, onClose, onTeleport, camera }: any) => {
  const handleTeleport = () => {
    onTeleport(building, camera);
    onClose();
  };

  return (
    <Html position={[building.position[0], building.position[1] + building.size[1] / 2 + 8, building.position[2]]}>
      <div className="bg-black/90 backdrop-blur-md border border-cyan-400 rounded-xl p-6 text-white min-w-[300px] shadow-2xl">
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
              <p className="text-sm text-gray-400">{building.energyLevel}% Energy</p>
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
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Smart Features</h4>
            <div className="grid grid-cols-2 gap-2">
              {building.features.map((feature: string, index: number) => (
                <div key={index} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded border border-gray-700">
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Population:</span>
            <span className="text-white font-semibold">{building.population}</span>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <button
              onClick={handleTeleport}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <div className="w-4 h-4 rounded-full bg-white"></div>
              Teleport to Facility
            </button>
          </div>
        </div>
      </div>
    </Html>
  );
};

// Enhanced Mini-Map
const SmartMiniMap = ({ buildings, selectedBuilding, onBuildingSelect }: any) => {
  return (
    <div className="fixed top-4 right-4 bg-black/80 backdrop-blur-md border border-cyan-400 rounded-xl p-4 text-white z-50">
      <h4 className="text-sm font-bold text-cyan-400 mb-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
        Smart City Map
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
              className={`w-3 h-3 rounded-full ${building.holographic ? 'animate-pulse' : ''}`}
              style={{ backgroundColor: building.color }}
            />
            <span className="truncate">{building.name}</span>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Smart City Scene
const SmartCityScene = ({ onBuildingClick, selectedBuilding, setSelectedBuilding }: any) => {
  const { camera } = useThree();
  
  const handleTeleport = (building: any, camera: any) => {
    const targetPosition = new THREE.Vector3(
      building.position[0],
      building.position[1] + building.size[1] / 2 + 15,
      building.position[2] + 20
    );
    
    const startPosition = camera.position.clone();
    const duration = 2500;
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
      <SmartLighting />
      <SmartGround />
      <SmartInfrastructure />
      <SmartTransportation />
      
      {SMART_BUILDINGS.map((building) => (
        <SmartBuilding
          key={building.id}
          building={building}
          onBuildingClick={onBuildingClick}
          selectedBuilding={selectedBuilding}
          setSelectedBuilding={setSelectedBuilding}
        />
      ))}
      
      {selectedBuilding && (
        <SmartInfoPanel
          building={SMART_BUILDINGS.find((b: any) => b.id === selectedBuilding)}
          onClose={() => setSelectedBuilding(null)}
          onTeleport={handleTeleport}
          camera={camera}
        />
      )}
    </>
  );
};

// Error boundary component
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('3D Scene Error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return <AICityMap />;
  }

  return <>{children}</>;
};

// Main FuturisticCity component
const FuturisticCity = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [viewMode, setViewMode] = useState<'3d' | 'ai-map'>('3d');

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

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

  if (!webglSupported) {
    return <AICityMap />;
  }

  return (
    <div className="relative w-full h-screen">
      {/* View toggle button */}
      <button
        onClick={() => setViewMode(viewMode === '3d' ? 'ai-map' : '3d')}
        className="fixed top-4 left-4 z-10 bg-black/80 backdrop-blur-md border border-cyan-400 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-500 hover:text-white transition-all duration-200 font-semibold"
      >
        {viewMode === '3d' ? '🌐 AI Map View' : '🏗️ 3D City View'}
      </button>

      {/* Fullscreen toggle button */}
      <button
        onClick={toggleFullscreen}
        className="fixed top-16 left-4 z-10 bg-black/80 backdrop-blur-md border border-cyan-400 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-500 hover:text-white transition-all duration-200"
      >
        {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </button>

      {viewMode === '3d' ? (
        <>
          {/* Smart Mini-Map */}
          <SmartMiniMap
            buildings={SMART_BUILDINGS}
            selectedBuilding={selectedBuilding}
            onBuildingSelect={handleBuildingSelect}
          />

          {/* 3D Canvas */}
          <ErrorBoundary>
            <Canvas
              shadows
              camera={{ position: [80, 50, 80], fov: 60 }}
              style={{ background: 'linear-gradient(to bottom, #0a0a1a, #1a1a2e, #16213e, #0f3460)' }}
              gl={{ 
                antialias: true,
                alpha: false,
                powerPreference: "high-performance",
                shadowMap: true
              }}
            >
              <PerspectiveCamera makeDefault position={[80, 50, 80]} />
              <Suspense fallback={null}>
                <SmartCityScene
                  onBuildingClick={handleBuildingClick}
                  selectedBuilding={selectedBuilding}
                  setSelectedBuilding={setSelectedBuilding}
                />
              </Suspense>
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                maxDistance={150}
                minDistance={20}
                maxPolarAngle={Math.PI / 2}
              />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <Environment preset="night" />
            </Canvas>
          </ErrorBoundary>
        </>
      ) : (
        <AICityMap />
      )}
    </div>
  );
};

export default FuturisticCity;

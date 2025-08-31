import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced building data
const EXPANDED_BUILDINGS = [
  {
    id: 'central-ai-tower',
    name: 'Central AI Tower',
    description: 'Main AI control center and city hub with quantum computing facilities',
    position: [0, 0, 0],
    size: [20, 40, 20],
    color: '#00ffff',
    type: 'tower',
    features: ['AI Control Systems', 'Quantum Computing', 'City Management', 'Data Processing'],
    population: '3,500 AI specialists',
    energyLevel: 98,
    status: 'Active'
  },
  {
    id: 'quantum-research-lab',
    name: 'Quantum Research Lab',
    description: 'Advanced quantum technology research and development center',
    position: [45, 0, 30],
    size: [25, 30, 25],
    color: '#ff00ff',
    type: 'lab',
    features: ['Quantum Research', 'AI Development', 'Innovation Hub', 'Tech Incubator'],
    population: '2,200 researchers',
    energyLevel: 95,
    status: 'Researching'
  },
  {
    id: 'fusion-energy-plant',
    name: 'Fusion Energy Plant',
    description: 'Advanced fusion power generation and renewable energy center',
    position: [-40, 0, 25],
    size: [30, 25, 30],
    color: '#ffff00',
    type: 'plant',
    features: ['Fusion Power', 'Solar Energy', 'Wind Power', 'Energy Storage'],
    population: '1,200 engineers',
    energyLevel: 99,
    status: 'Generating'
  },
  {
    id: 'smart-residential-complex',
    name: 'Smart Residential Complex',
    description: 'Intelligent living spaces with AI home management and sustainable architecture',
    position: [35, 0, -40],
    size: [35, 20, 35],
    color: '#00ff00',
    type: 'residential',
    features: ['Smart Homes', 'AI Management', 'Community Spaces', 'Sustainable Living'],
    population: '15,000 residents',
    energyLevel: 92,
    status: 'Living'
  },
  {
    id: 'transportation-hub',
    name: 'Transportation Hub',
    description: 'Advanced mobility center with flying vehicles and teleportation systems',
    position: [-35, 0, -45],
    size: [28, 18, 28],
    color: '#ff8800',
    type: 'transport',
    features: ['Flying Vehicles', 'Teleportation', 'Smart Traffic', 'Mobility AI'],
    population: '4,500 travelers',
    energyLevel: 94,
    status: 'Operating'
  },
  {
    id: 'education-university',
    name: 'Education University',
    description: 'Comprehensive learning institution with virtual reality and AI tutors',
    position: [0, 0, 55],
    size: [40, 25, 40],
    color: '#ff0080',
    type: 'education',
    features: ['Virtual Learning', 'AI Tutors', 'Research Labs', 'Knowledge Exchange'],
    population: '12,000 students',
    energyLevel: 96,
    status: 'Learning'
  },
  {
    id: 'medical-center',
    name: 'Medical Center',
    description: 'Advanced healthcare facility with AI diagnostics and robotic surgery',
    position: [55, 0, 0],
    size: [22, 22, 22],
    color: '#00ff80',
    type: 'medical',
    features: ['AI Diagnostics', 'Robotic Surgery', 'Health Monitoring', 'Research Labs'],
    population: '2,800 medical staff',
    energyLevel: 97,
    status: 'Operating'
  },
  {
    id: 'entertainment-hub',
    name: 'Entertainment Hub',
    description: 'Virtual reality entertainment and cultural center',
    position: [-55, 0, 0],
    size: [26, 20, 26],
    color: '#8000ff',
    type: 'entertainment',
    features: ['VR Entertainment', 'Cultural Events', 'Gaming Centers', 'Social Spaces'],
    population: '6,500 visitors',
    energyLevel: 89,
    status: 'Active'
  }
];

// Road network data
const ROAD_NETWORK = [
  { start: [0, 0, 0], end: [45, 0, 30], type: 'arterial', width: 3 },
  { start: [0, 0, 0], end: [-40, 0, 25], type: 'arterial', width: 3 },
  { start: [0, 0, 0], end: [35, 0, -40], type: 'arterial', width: 3 },
  { start: [0, 0, 0], end: [-35, 0, -45], type: 'arterial', width: 3 },
  { start: [0, 0, 0], end: [0, 0, 55], type: 'arterial', width: 3 },
  { start: [0, 0, 0], end: [55, 0, 0], type: 'arterial', width: 3 },
  { start: [0, 0, 0], end: [-55, 0, 0], type: 'arterial', width: 3 }
];

// Enhanced Building Component
const EnhancedBuilding = ({ building, onBuildingClick, selectedBuilding, setSelectedBuilding }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selectedBuilding === building.id);
  }, [selectedBuilding, building.id]);

  useFrame((state) => {
    if (meshRef.current) {
      const floatHeight = building.type === 'tower' ? 0.8 : 0.4;
      meshRef.current.position.y = building.position[1] + Math.sin(state.clock.elapsedTime * 0.6) * floatHeight;
      
      if (hovered || isSelected) {
        (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6;
        meshRef.current.scale.setScalar(1.08);
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

  const getBuildingGeometry = () => {
    switch (building.type) {
      case 'tower':
        return <cylinderGeometry args={[building.size[0] / 2, building.size[0] / 2, building.size[1], 8]} />;
      case 'plant':
        return <cylinderGeometry args={[building.size[0] / 2, building.size[0] / 2, building.size[1], 12]} />;
      default:
        return <boxGeometry args={building.size} />;
    }
  };

  return (
    <group>
      <Float speed={building.type === 'tower' ? 3 : 2} rotationIntensity={building.type === 'tower' ? 0.8 : 0.5}>
        <mesh
          ref={meshRef}
          position={building.position}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {getBuildingGeometry()}
          <meshStandardMaterial
            color={building.color}
            transparent
            opacity={0.9}
            metalness={0.9}
            roughness={0.1}
            emissive={building.color}
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>
      
      {(hovered || isSelected) && (
        <mesh position={building.position}>
          <sphereGeometry args={[Math.max(...building.size) * 0.9, 16, 16]} />
          <meshBasicMaterial
            color={building.color}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      
      <Html position={[building.position[0], building.position[1] + building.size[1] / 2 + 3, building.position[2]]}>
        <div className="text-center">
          <div 
            className="text-sm font-bold px-3 py-2 rounded-lg backdrop-blur-md"
            style={{ 
              color: building.color,
              textShadow: `0 0 15px ${building.color}`,
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: `1px solid ${building.color}`,
              boxShadow: `0 0 20px ${building.color}40`,
              minWidth: '140px'
            }}
          >
            {building.name}
          </div>
        </div>
      </Html>

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

// Enhanced Roads
const EnhancedRoads = () => {
  const roadGroup = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (roadGroup.current) {
      roadGroup.current.children.forEach((road, index) => {
        const material = road.material as THREE.LineBasicMaterial;
        const time = state.clock.elapsedTime;
        material.opacity = 0.6 + Math.sin(time * 2 + index) * 0.2;
      });
    }
  });

  return (
    <group ref={roadGroup}>
      {ROAD_NETWORK.map((road, index) => (
        <Road key={index} road={road} />
      ))}
    </group>
  );
};

const Road = ({ road }: any) => {
  const roadGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const points = [
      new THREE.Vector3(...road.start),
      new THREE.Vector3(...road.end)
    ];
    geometry.setFromPoints(points);
    return geometry;
  }, [road]);

  return (
    <line geometry={roadGeometry}>
      <lineBasicMaterial 
        color="#00ffff" 
        transparent 
        opacity={0.8}
        linewidth={road.width}
      />
    </line>
  );
};

// Floating Infrastructure
const FloatingInfrastructure = () => {
  const infrastructureRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (infrastructureRef.current) {
      infrastructureRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      infrastructureRef.current.children.forEach((element, index) => {
        const time = state.clock.elapsedTime;
        const speed = 0.5 + index * 0.2;
        element.position.y = 20 + Math.sin(time * speed) * 8;
        element.rotation.y = time * speed;
      });
    }
  });

  return (
    <group ref={infrastructureRef}>
      {[...Array(12)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.8} floatIntensity={0.6}>
          <mesh position={[
            Math.cos(i * Math.PI / 6) * 70,
            20,
            Math.sin(i * Math.PI / 6) * 70
          ]}>
            <sphereGeometry args={[2.5, 16, 16]} />
            <meshStandardMaterial
              color={['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff8800', '#ff0080'][i % 6]}
              emissive={['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff8800', '#ff0080'][i % 6]}
              emissiveIntensity={0.7}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Enhanced Ground
const EnhancedGround = () => {
  const groundRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (groundRef.current) {
      const material = groundRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <>
      <mesh ref={groundRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial
          color="#1a1a2e"
          transparent
          opacity={0.95}
          emissive="#0a0a1a"
          emissiveIntensity={0.1}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
        <planeGeometry args={[300, 300]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
    </>
  );
};

// Enhanced Lighting
const EnhancedLighting = () => {
  const lightsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (lightsRef.current) {
      lightsRef.current.children.forEach((light, index) => {
        const time = state.clock.elapsedTime;
        const intensity = 0.8 + Math.sin(time * 1.5 + index) * 0.3;
        (light as THREE.PointLight).intensity = intensity;
      });
    }
  });

  return (
    <group ref={lightsRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 80, 0]} intensity={1.5} color="#ffffff" />
      <pointLight position={[80, 50, 80]} intensity={1.2} color="#00ffff" />
      <pointLight position={[-80, 50, -80]} intensity={1.2} color="#ff00ff" />
      <pointLight position={[0, 40, 0]} intensity={1} color="#ffff00" />
      <pointLight position={[60, 45, -60]} intensity={1.1} color="#ff0080" />
      <pointLight position={[-60, 45, 60]} intensity={1.1} color="#8000ff" />
    </group>
  );
};

// Main City Scene
const ExpandedCityScene = ({ onBuildingClick, selectedBuilding, setSelectedBuilding }: any) => {
  const { camera } = useThree();
  
  const handleTeleport = (building: any, camera: any) => {
    const targetPosition = new THREE.Vector3(
      building.position[0],
      building.position[1] + building.size[1] / 2 + 20,
      building.position[2] + 25
    );
    
    const startPosition = camera.position.clone();
    const duration = 3000;
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
      <EnhancedLighting />
      <EnhancedGround />
      <EnhancedRoads />
      <FloatingInfrastructure />
      
      {EXPANDED_BUILDINGS.map((building) => (
        <EnhancedBuilding
          key={building.id}
          building={building}
          onBuildingClick={onBuildingClick}
          selectedBuilding={selectedBuilding}
          setSelectedBuilding={setSelectedBuilding}
        />
      ))}
    </>
  );
};

// Main Component
const Expanded3DCity = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const handleBuildingClick = (building: any) => {
    setSelectedBuilding(building.id);
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
      <button
        onClick={toggleFullscreen}
        className="fixed top-4 left-4 z-10 bg-black/80 backdrop-blur-md border border-cyan-400 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-500 hover:text-white transition-all duration-200"
      >
        {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </button>

      <Canvas
        shadows
        camera={{ position: [100, 60, 100], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #0a0a1a, #1a1a2e, #16213e, #0f3460)' }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          shadowMap: true
        }}
      >
        <PerspectiveCamera makeDefault position={[100, 60, 100]} />
        <ExpandedCityScene
          onBuildingClick={handleBuildingClick}
          selectedBuilding={selectedBuilding}
          setSelectedBuilding={setSelectedBuilding}
        />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={200}
          minDistance={30}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Expanded3DCity;

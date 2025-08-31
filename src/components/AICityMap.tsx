import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, GraduationCap, Stethoscope, Users, Home, Navigation, Zap, Brain, Eye } from 'lucide-react';

// City districts data with AI-enhanced descriptions
const CITY_DISTRICTS = [
  {
    id: 'office-hub',
    name: 'Office Hub',
    description: 'Central business district where AI-powered avatars collaborate, attend virtual meetings, and manage digital enterprises.',
    icon: Building2,
    color: '#00ffff',
    position: { x: 50, y: 30 },
    features: ['AI Meeting Rooms', 'Virtual Offices', 'Collaboration Spaces', 'Digital Workspaces'],
    aiInsights: 'High productivity zone with 24/7 AI assistance and seamless virtual collaboration tools.',
    status: 'Active',
    population: '2,847 avatars'
  },
  {
    id: 'university',
    name: 'University District',
    description: 'Advanced learning center featuring AI tutors, virtual laboratories, and immersive educational experiences.',
    icon: GraduationCap,
    color: '#ff00ff',
    position: { x: 80, y: 60 },
    features: ['AI Tutors', 'Virtual Labs', 'Research Centers', 'Knowledge Exchange'],
    aiInsights: 'Innovation hub with cutting-edge AI research and adaptive learning systems.',
    status: 'Learning',
    population: '1,923 students'
  },
  {
    id: 'medical-center',
    name: 'Medical Center',
    description: 'State-of-the-art healthcare facility with AI diagnostics, virtual consultations, and wellness monitoring.',
    icon: Stethoscope,
    color: '#00ff00',
    position: { x: 20, y: 60 },
    features: ['AI Diagnostics', 'Virtual Consultations', 'Wellness Monitoring', 'Health Analytics'],
    aiInsights: 'Preventive healthcare powered by real-time AI monitoring and predictive analytics.',
    status: 'Healthy',
    population: '456 patients'
  },
  {
    id: 'social-hub',
    name: 'Social Hub',
    description: 'Vibrant entertainment district where avatars socialize, attend events, and experience digital culture.',
    icon: Users,
    color: '#ffff00',
    position: { x: 70, y: 80 },
    features: ['Virtual Events', 'Social Spaces', 'Entertainment', 'Cultural Activities'],
    aiInsights: 'Social interaction optimized with AI matchmaking and personalized entertainment recommendations.',
    status: 'Social',
    population: '3,241 avatars'
  },
  {
    id: 'residential',
    name: 'Residential District',
    description: 'Smart living spaces with AI home management, community amenities, and sustainable living solutions.',
    icon: Home,
    color: '#ff8800',
    position: { x: 30, y: 80 },
    features: ['Smart Homes', 'AI Management', 'Community Spaces', 'Sustainable Living'],
    aiInsights: 'Living spaces enhanced with AI automation and community-driven sustainability initiatives.',
    status: 'Living',
    population: '5,892 residents'
  }
];

// AI System Status
const AI_SYSTEMS = [
  { name: 'City AI Core', status: 'Optimal', efficiency: 98, color: '#00ff00' },
  { name: 'Traffic Management', status: 'Smooth', efficiency: 95, color: '#00ff00' },
  { name: 'Energy Grid', status: 'Efficient', efficiency: 92, color: '#00ff00' },
  { name: 'Security Network', status: 'Secure', efficiency: 99, color: '#00ff00' },
  { name: 'Environmental Control', status: 'Balanced', efficiency: 89, color: '#ffff00' }
];

// AI Insights Panel Component
const AIInsightsPanel = ({ district, onClose }: { district: any; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: district.color + '20', color: district.color }}
            >
              <district.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{district.name}</h3>
              <p className="text-sm text-gray-400">{district.status}</p>
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
            <h4 className="text-sm font-semibold text-gray-300 mb-2">AI Insights</h4>
            <p className="text-sm text-gray-400">{district.aiInsights}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Features</h4>
            <div className="grid grid-cols-2 gap-2">
              {district.features.map((feature, index) => (
                <div key={index} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Population:</span>
            <span className="text-white font-semibold">{district.population}</span>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
              <Navigation className="w-4 h-4" />
              Navigate to District
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// AI Systems Monitor Component
const AISystemsMonitor = () => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Brain className="w-4 h-4 text-blue-400" />
        <h3 className="text-sm font-semibold text-white">AI Systems Status</h3>
      </div>
      <div className="space-y-2">
        {AI_SYSTEMS.map((system, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <span className="text-gray-400">{system.name}</span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-gray-700 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${system.efficiency}%`, 
                    backgroundColor: system.color 
                  }}
                />
              </div>
              <span className="text-white font-mono">{system.efficiency}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main AI City Map Component
const AICityMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [mapMode, setMapMode] = useState<'overview' | 'detailed'>('overview');
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  // Generate AI insights
  useEffect(() => {
    const insights = [
      "City AI systems operating at 98% efficiency",
      "Traffic flow optimized for peak performance",
      "Energy consumption reduced by 23% this month",
      "Social interaction patterns show increased engagement",
      "Environmental sensors detect optimal air quality"
    ];
    setAiInsights(insights);
  }, []);

  const handleDistrictClick = (district: any) => {
    setSelectedDistrict(district);
  };

  const handleDistrictHover = (districtId: string | null) => {
    setHoveredDistrict(districtId);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md border-b border-gray-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AI City Map</h1>
                <p className="text-sm text-gray-300">Symbiotic Digital City 2070 • New Singapore</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMapMode(mapMode === 'overview' ? 'detailed' : 'overview')}
                className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {mapMode === 'overview' ? 'Detailed' : 'Overview'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Systems Monitor */}
      <div className="absolute top-20 left-4 z-30">
        <AISystemsMonitor />
      </div>

      {/* AI Insights Feed */}
      <div className="absolute top-20 right-4 z-30 max-w-xs">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-yellow-400" />
            <h3 className="text-sm font-semibold text-white">AI Insights</h3>
          </div>
          <div className="space-y-2">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-xs text-gray-300 bg-gray-800/50 p-2 rounded"
              >
                {insight}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* City Map */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Districts */}
        {CITY_DISTRICTS.map((district) => (
          <motion.div
            key={district.id}
            className="absolute cursor-pointer"
            style={{
              left: `${district.position.x}%`,
              top: `${district.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleDistrictClick(district)}
            onMouseEnter={() => handleDistrictHover(district.id)}
            onMouseLeave={() => handleDistrictHover(null)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* District Icon */}
            <div 
              className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                hoveredDistrict === district.id ? 'scale-110 shadow-2xl' : ''
              }`}
              style={{ 
                backgroundColor: district.color + '20',
                borderColor: district.color,
                boxShadow: hoveredDistrict === district.id ? `0 0 30px ${district.color}` : 'none'
              }}
            >
              <district.icon 
                className="w-8 h-8" 
                style={{ color: district.color }}
              />
            </div>

            {/* District Label */}
            <motion.div
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: hoveredDistrict === district.id ? 1 : 0, y: hoveredDistrict === district.id ? 0 : -10 }}
            >
              <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {district.name}
              </div>
            </motion.div>

            {/* Connection Lines */}
            {mapMode === 'detailed' && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {CITY_DISTRICTS.filter(d => d.id !== district.id).map((otherDistrict) => (
                  <line
                    key={`${district.id}-${otherDistrict.id}`}
                    x1="50%"
                    y1="50%"
                    x2={`${((otherDistrict.position.x - district.position.x) / 100) * 100}%`}
                    y2={`${((otherDistrict.position.y - district.position.y) / 100) * 100}%`}
                    stroke={district.color}
                    strokeWidth="2"
                    opacity="0.3"
                    strokeDasharray="5,5"
                  />
                ))}
              </svg>
            )}
          </motion.div>
        ))}

        {/* Central Hub Indicator */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center border-4 border-white shadow-2xl"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(0,255,255,0.5)",
                "0 0 40px rgba(0,255,255,0.8)",
                "0 0 20px rgba(0,255,255,0.5)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center">
            <div className="bg-black/80 backdrop-blur-sm text-white text-sm px-3 py-1 rounded">
              AI Core Hub
            </div>
          </div>
        </div>
      </div>

      {/* District Info Panel */}
      <AnimatePresence>
        {selectedDistrict && (
          <AIInsightsPanel 
            district={selectedDistrict} 
            onClose={() => setSelectedDistrict(null)} 
          />
        )}
      </AnimatePresence>

      {/* Floating AI Assistant */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl shadow-2xl cursor-pointer hover:scale-105 transition-transform">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6" />
            <div>
              <div className="font-semibold">AI Assistant</div>
              <div className="text-xs opacity-90">Ready to help</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AICityMap;

import React, { useState } from 'react';

// City districts data
const CITY_DISTRICTS = [
  {
    id: 'central-tower',
    name: 'Central AI Tower',
    description: 'Main AI control center and city hub',
    color: '#00ffff',
    features: ['AI Control Systems', 'City Management', 'Data Processing', 'Command Center'],
    population: '2,500 AI specialists',
    status: 'Active'
  },
  {
    id: 'research-lab',
    name: 'Research Laboratory',
    description: 'Advanced technology research facility',
    color: '#ff00ff',
    features: ['Quantum Computing', 'AI Research', 'Innovation Hub', 'Tech Development'],
    population: '1,800 researchers',
    status: 'Researching'
  },
  {
    id: 'energy-plant',
    name: 'Energy Plant',
    description: 'Renewable energy generation center',
    color: '#ffff00',
    features: ['Fusion Power', 'Solar Energy', 'Wind Power', 'Energy Storage'],
    population: '950 engineers',
    status: 'Generating'
  },
  {
    id: 'residential-complex',
    name: 'Residential Complex',
    description: 'Smart living spaces for citizens',
    color: '#00ff00',
    features: ['Smart Homes', 'AI Management', 'Community Spaces', 'Sustainable Living'],
    population: '12,000 residents',
    status: 'Living'
  },
  {
    id: 'transport-hub',
    name: 'Transport Center',
    description: 'Advanced transportation hub',
    color: '#ff8800',
    features: ['Flying Vehicles', 'Teleportation', 'Smart Traffic', 'Mobility AI'],
    population: '3,200 travelers',
    status: 'Operating'
  },
  {
    id: 'education-hub',
    name: 'Education Hub',
    description: 'Learning and knowledge center',
    color: '#ff0080',
    features: ['Virtual Learning', 'AI Tutors', 'Research Labs', 'Knowledge Exchange'],
    population: '8,500 students',
    status: 'Learning'
  }
];

// District Card Component
const DistrictCard = ({ district, onSelect }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
        isHovered ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg'
      }`}
      style={{
        backgroundColor: `${district.color}10`,
        borderColor: district.color,
        boxShadow: isHovered ? `0 0 30px ${district.color}40` : `0 0 20px ${district.color}20`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(district)}
    >
      {/* Status indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div 
          className="w-3 h-3 rounded-full animate-pulse"
          style={{ backgroundColor: district.color }}
        ></div>
        <span className="text-xs font-medium text-gray-600">{district.status}</span>
      </div>

      {/* District icon */}
      <div 
        className="w-16 h-16 rounded-lg flex items-center justify-center mb-4"
        style={{ backgroundColor: `${district.color}20` }}
      >
        <div 
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: district.color }}
        ></div>
      </div>

      {/* District name */}
      <h3 
        className="text-xl font-bold mb-2"
        style={{ color: district.color }}
      >
        {district.name}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-4 text-sm">
        {district.description}
      </p>

      {/* Features */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
        <div className="grid grid-cols-2 gap-2">
          {district.features.map((feature, index) => (
            <div key={index} className="text-xs bg-white/50 px-2 py-1 rounded border border-gray-200">
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Population */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Population:</span>
        <span className="font-semibold text-gray-800">{district.population}</span>
      </div>
    </div>
  );
};

// City Stats Component
const CityStats = () => {
  const stats = [
    { label: 'Total Population', value: '28,950', color: '#00ffff' },
    { label: 'AI Systems', value: '98%', color: '#ff00ff' },
    { label: 'Energy Efficiency', value: '95%', color: '#ffff00' },
    { label: 'Smart Buildings', value: '6', color: '#00ff00' }
  ];

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-xl mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">City Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div 
              className="text-3xl font-bold mb-2"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="text-sm text-gray-300">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Fallback City Component
const FallbackCity = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleDistrictSelect = (district: any) => {
    setSelectedDistrict(district);
  };

  const closeModal = () => {
    setSelectedDistrict(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏙️ Symbiotic Digital City 2070
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            New Singapore • AI-Powered Urban Living
          </p>
          
          {/* View Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              🏗️ Grid View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              📋 List View
            </button>
          </div>
        </div>

        {/* City Stats */}
        <CityStats />
      </div>

      {/* Districts Grid */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          City Districts
        </h2>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CITY_DISTRICTS.map((district) => (
              <DistrictCard
                key={district.id}
                district={district}
                onSelect={handleDistrictSelect}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {CITY_DISTRICTS.map((district) => (
              <div
                key={district.id}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleDistrictSelect(district)}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${district.color}20` }}
                  >
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: district.color }}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{district.name}</h3>
                    <p className="text-gray-600">{district.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{district.population}</div>
                    <div className="text-xs text-gray-400">{district.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* District Modal */}
      {selectedDistrict && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${selectedDistrict.color}20` }}
                >
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: selectedDistrict.color }}
                  ></div>
                </div>
                <div>
                  <h2 
                    className="text-2xl font-bold"
                    style={{ color: selectedDistrict.color }}
                  >
                    {selectedDistrict.name}
                  </h2>
                  <p className="text-gray-600">{selectedDistrict.status}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600">{selectedDistrict.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedDistrict.features.map((feature, index) => (
                    <div key={index} className="bg-gray-50 px-3 py-2 rounded border border-gray-200">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Population:</span>
                <span className="font-semibold text-gray-900">{selectedDistrict.population}</span>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                >
                  Explore District
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FallbackCity;

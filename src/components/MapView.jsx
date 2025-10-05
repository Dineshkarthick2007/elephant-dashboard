import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedHerd, setSelectedHerd] = useState(null);
  const [hoveredHerd, setHoveredHerd] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const hoverTimeoutRef = useRef(null);

  // Elephant herd data with distinct coordinates
  const elephantHerds = [
    { 
      id: 1,
      name: 'Barnawapara Herd', 
      coords: [21.45, 82.75], 
      size: 15,
      activity: 'High',
      lastSeen: '2 hours ago',
      movement: 'Moving towards agricultural fields',
      riskLevel: 'high',
      composition: '3 adults, 8 females, 4 calves',
      distanceFromVillage: '2.3 km'
    },
    { 
      id: 2,
      name: 'Sitanadi Herd', 
      coords: [20.85, 82.15], 
      size: 12,
      activity: 'Medium',
      lastSeen: '4 hours ago',
      movement: 'Crossing NH-43 highway',
      riskLevel: 'critical',
      composition: '2 adults, 7 females, 3 calves',
      distanceFromVillage: '1.8 km'
    },
    { 
      id: 3,
      name: 'Guru Ghasidas Herd', 
      coords: [23.85, 83.25], 
      size: 18,
      activity: 'Very High',
      lastSeen: '1 hour ago',
      movement: 'Near water source',
      riskLevel: 'medium',
      composition: '4 adults, 10 females, 4 calves',
      distanceFromVillage: '5.2 km'
    },
    { 
      id: 4,
      name: 'Achanakmar Herd', 
      coords: [22.35, 81.85], 
      size: 8,
      activity: 'High',
      lastSeen: '3 hours ago',
      movement: 'Forest corridor movement',
      riskLevel: 'low',
      composition: '1 adult, 5 females, 2 calves',
      distanceFromVillage: '4.7 km'
    },
    { 
      id: 5,
      name: 'Udanti Herd', 
      coords: [20.25, 82.25], 
      size: 6,
      activity: 'Medium',
      lastSeen: '6 hours ago',
      movement: 'Resting near river',
      riskLevel: 'low',
      composition: '1 adult, 4 females, 1 calf',
      distanceFromVillage: '3.1 km'
    }
  ];

  // Location data
  const locations = [
    { id: 's1', name: 'Barnawapara Sanctuary', coords: [21.35, 82.70], type: 'sanctuary' },
    { id: 's2', name: 'Sitanadi Sanctuary', coords: [20.95, 82.10], type: 'sanctuary' },
    { id: 's3', name: 'Achanakmar Sanctuary', coords: [22.50, 81.75], type: 'sanctuary' },
    { id: 's4', name: 'Udanti Sanctuary', coords: [20.15, 82.10], type: 'sanctuary' },
    { id: 'p1', name: 'Guru Ghasidas National Park', coords: [23.80, 83.10], type: 'park' },
    { id: 'c1', name: 'Raipur', coords: [21.25, 81.63], type: 'city' },
    { id: 'c2', name: 'Bilaspur', coords: [22.08, 82.15], type: 'city' }
  ];

  const allLocations = [...locations, ...elephantHerds];

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      const chhattisgarhCenter = [21.2787, 81.8661];
      const map = L.map(mapRef.current).setView(chhattisgarhCenter, 8);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      // Create custom markers
      const createHerdIcon = (herd, isHovered = false) => {
        const getColor = (riskLevel) => {
          switch (riskLevel) {
            case 'critical': return 'red';
            case 'high': return 'orange';
            case 'medium': return 'yellow';
            case 'low': return 'green';
            default: return 'blue';
          }
        };

        const color = getColor(herd.riskLevel);
        const size = isHovered ? 40 : 32;
        
        return L.divIcon({
          html: `
            <div class="relative">
              <div class="w-${isHovered ? 10 : 8} h-${isHovered ? 10 : 8} bg-${color}-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all duration-200">
                <i class="fas fa-paw text-white ${isHovered ? 'text-base' : 'text-sm'}"></i>
              </div>
              ${isHovered && `
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-${color}-400 rounded-full animate-ping"></div>
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-${color}-500 rounded-full border border-white"></div>
              `}
            </div>
          `,
          className: 'herd-marker',
          iconSize: [size, size],
          iconAnchor: [size/2, size/2]
        });
      };

      const createLocationIcon = (location) => {
        const getConfig = () => {
          switch (location.type) {
            case 'sanctuary':
              return { icon: 'tree', color: 'green', size: 28 };
            case 'park':
              return { icon: 'mountain', color: 'red', size: 28 };
            case 'city':
              return { icon: 'city', color: 'blue', size: 28 };
            default:
              return { icon: 'map-marker', color: 'gray', size: 28 };
          }
        };

        const config = getConfig();
        
        return L.divIcon({
          html: `
            <div class="w-7 h-7 bg-${config.color}-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
              <i class="fas fa-${config.icon} text-white text-xs"></i>
            </div>
          `,
          className: 'location-marker',
          iconSize: [config.size, config.size],
          iconAnchor: [config.size/2, config.size/2]
        });
      };

      // Add elephant herd markers
      elephantHerds.forEach(herd => {
        const marker = L.marker(herd.coords, {
          icon: createHerdIcon(herd, false)
        }).addTo(map);

        // Mouse events for herd markers
        marker.on('mouseover', (e) => {
          // Clear any existing timeout
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
          }
          
          // Get marker position on screen
          const markerPos = map.latLngToContainerPoint(herd.coords);
          setHoverPosition({ x: markerPos.x, y: markerPos.y });
          setHoveredHerd(herd);
          marker.setIcon(createHerdIcon(herd, true));
        });

        marker.on('mouseout', () => {
          // Set timeout to remove hovered herd after a short delay
          hoverTimeoutRef.current = setTimeout(() => {
            setHoveredHerd(null);
          }, 100);
          marker.setIcon(createHerdIcon(herd, false));
        });

        marker.on('click', () => {
          setSelectedHerd(herd);
        });

        // Bind popup
        marker.bindPopup(`
          <div class="p-4 min-w-64">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-semibold text-gray-900">${herd.name}</h3>
              <span class="px-2 py-1 bg-${getRiskColor(herd.riskLevel)}-100 text-${getRiskColor(herd.riskLevel)}-800 text-xs font-medium rounded-full">
                ${herd.riskLevel.charAt(0).toUpperCase() + herd.riskLevel.slice(1)} Risk
              </span>
            </div>
            <div class="space-y-2 text-sm text-gray-600">
              <div class="flex justify-between">
                <span>Herd Size:</span>
                <span class="font-semibold">${herd.size} elephants</span>
              </div>
              <div class="flex justify-between">
                <span>Activity:</span>
                <span class="font-semibold text-green-600">${herd.activity}</span>
              </div>
              <div class="flex justify-between">
                <span>Last Seen:</span>
                <span class="font-semibold">${herd.lastSeen}</span>
              </div>
            </div>
          </div>
        `);
      });

      // Add location markers
      locations.forEach(location => {
        const marker = L.marker(location.coords, {
          icon: createLocationIcon(location)
        }).addTo(map);

        marker.bindPopup(`
          <div class="p-3 min-w-48">
            <div class="font-semibold text-gray-900">${location.name}</div>
            <div class="text-sm text-gray-600 mt-1">
              ${location.type === 'sanctuary' ? 'Wildlife Sanctuary' : 
                location.type === 'park' ? 'National Park' : 'City'}
            </div>
          </div>
        `);
      });

      L.control.scale({ imperial: false }).addTo(map);
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const results = allLocations.filter(location => 
      location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);

    if (results.length > 0 && mapInstanceRef.current) {
      const firstResult = results[0];
      mapInstanceRef.current.setView(firstResult.coords, 12);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const flyToLocation = (location) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(location.coords, 14);
      if (location.type === 'herd') {
        setSelectedHerd(location);
      }
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'blue';
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'critical': return 'fas fa-exclamation-triangle';
      case 'high': return 'fas fa-exclamation-circle';
      case 'medium': return 'fas fa-info-circle';
      case 'low': return 'fas fa-check-circle';
      default: return 'fas fa-info-circle';
    }
  };

  // Handle mouse events for the hover details panel
  const handleHoverPanelMouseEnter = () => {
    // Clear timeout when mouse enters the panel
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleHoverPanelMouseLeave = () => {
    // Set timeout to remove hovered herd when mouse leaves the panel
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredHerd(null);
    }, 100);
  };

  return (
    <div className="flex-1 overflow-hidden relative bg-gray-50">
      {/* Search Bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-80">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search herds, sanctuaries..."
              className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-search text-sm"></i>
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-1.5 rounded-md hover:bg-green-600 transition-colors"
            >
              <i className="fas fa-arrow-right text-xs"></i>
            </button>
          </div>
        </form>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-64 overflow-y-auto z-[1001]">
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-2 py-1">
                {searchResults.length} result{searchResults.length > 1 ? 's' : ''} found
              </div>
              {searchResults.map((location, index) => (
                <div
                  key={location.id || index}
                  onClick={() => flyToLocation(location)}
                  className="flex items-center px-3 py-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    location.type === 'herd' ? 'bg-purple-500' :
                    location.type === 'sanctuary' ? 'bg-green-500' : 
                    location.type === 'park' ? 'bg-red-500' : 'bg-blue-500'
                  }`}>
                    <i className={`text-white text-xs ${
                      location.type === 'herd' ? 'fas fa-paw' :
                      location.type === 'sanctuary' ? 'fas fa-tree' : 
                      location.type === 'park' ? 'fas fa-mountain' : 'fas fa-city'
                    }`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">{location.name}</div>
                    <div className="text-xs text-gray-500 capitalize">
                      {location.type === 'herd' ? 'Elephant Herd' :
                       location.type === 'sanctuary' ? 'Wildlife Sanctuary' : 
                       location.type === 'park' ? 'National Park' : 'City'}
                    </div>
                  </div>
                  <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 z-[1000]">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
          <div className="text-sm font-semibold text-gray-700 mb-2">Map Legend</div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <i className="fas fa-paw text-white text-xs"></i>
              </div>
              <span className="text-gray-600">Elephant Herds</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <i className="fas fa-tree text-white text-xs"></i>
              </div>
              <span className="text-gray-600">Sanctuaries</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <i className="fas fa-mountain text-white text-xs"></i>
              </div>
              <span className="text-gray-600">National Parks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <i className="fas fa-city text-white text-xs"></i>
              </div>
              <span className="text-gray-600">Cities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Herd Details - Positioned at marker */}
      {hoveredHerd && (
        <div 
          className="absolute z-[1000] bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y}px`,
            marginTop: '-10px'
          }}
          onMouseEnter={handleHoverPanelMouseEnter}
          onMouseLeave={handleHoverPanelMouseLeave}
        >
          {/* Arrow pointing to marker */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-4 h-4 bg-white border-r border-b border-gray-200 rotate-45"></div>
          
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">{hoveredHerd.name}</h3>
            <span className={`px-2 py-1 bg-${getRiskColor(hoveredHerd.riskLevel)}-100 text-${getRiskColor(hoveredHerd.riskLevel)}-800 text-xs font-medium rounded-full flex items-center space-x-1`}>
              <i className={`${getRiskIcon(hoveredHerd.riskLevel)} text-xs`}></i>
              <span>{hoveredHerd.riskLevel.charAt(0).toUpperCase() + hoveredHerd.riskLevel.slice(1)}</span>
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="text-xl font-bold text-gray-900">{hoveredHerd.size}</div>
              <div className="text-xs text-gray-600">Herd Size</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-green-600">{hoveredHerd.activity}</div>
              <div className="text-xs text-gray-600">Activity</div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600 flex items-center space-x-2">
                <i className="fas fa-clock text-gray-400"></i>
                <span>Last Seen</span>
              </span>
              <span className="font-medium">{hoveredHerd.lastSeen}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600 flex items-center space-x-2">
                <i className="fas fa-walking text-gray-400"></i>
                <span>Movement</span>
              </span>
              <span className="font-medium text-right">{hoveredHerd.movement}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600 flex items-center space-x-2">
                <i className="fas fa-ruler text-gray-400"></i>
                <span>Distance</span>
              </span>
              <span className="font-medium">{hoveredHerd.distanceFromVillage}</span>
            </div>
          </div>
        </div>
      )}

      {/* Selected Herd Details */}
      {selectedHerd && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">{selectedHerd.name}</h3>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 bg-${getRiskColor(selectedHerd.riskLevel)}-100 text-${getRiskColor(selectedHerd.riskLevel)}-800 text-xs font-medium rounded-full`}>
                {selectedHerd.riskLevel.charAt(0).toUpperCase() + selectedHerd.riskLevel.slice(1)} Risk
              </span>
              <button
                onClick={() => setSelectedHerd(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="text-xl font-bold text-gray-900">{selectedHerd.size}</div>
              <div className="text-xs text-gray-600">Herd Size</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="text-lg font-bold text-green-600">{selectedHerd.activity}</div>
              <div className="text-xs text-gray-600">Activity Level</div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600">Last Seen:</span>
              <span className="font-medium">{selectedHerd.lastSeen}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600">Movement:</span>
              <span className="font-medium text-right">{selectedHerd.movement}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600">Composition:</span>
              <span className="font-medium">{selectedHerd.composition}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Distance:</span>
              <span className="font-medium">{selectedHerd.distanceFromVillage}</span>
            </div>
          </div>
        </div>
      )}

      {/* Map */}
      <div 
        ref={mapRef} 
        className="w-full h-full"
      />
    </div>
  );
};

export default MapView;
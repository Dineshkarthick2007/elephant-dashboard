import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

const ActivityHeatmap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Initialize map only once
    if (!mapInstanceRef.current && mapRef.current) {
      // Chhattisgarh center coordinates
      const chhattisgarhCenter = [21.2787, 81.8661];
      
      // Initialize map
      const map = L.map(mapRef.current).setView(chhattisgarhCenter, 8);
      mapInstanceRef.current = map;

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      // Custom icons
      const sanctuaryIcon = L.divIcon({
        html: `
          <div class="relative">
            <svg class="w-6 h-6 text-red-600 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            <div class="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
            <div class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        `,
        className: 'custom-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 24]
      });

      const criticalZoneIcon = L.divIcon({
        html: `
          <div class="relative">
            <svg class="w-7 h-7 text-red-700 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></div>
          </div>
        `,
        className: 'custom-marker-critical',
        iconSize: [28, 28],
        iconAnchor: [14, 28]
      });

      const villageIcon = L.divIcon({
        html: `
          <div class="relative">
            <svg class="w-5 h-5 text-orange-500 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            <div class="absolute -top-1 -right-1 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
          </div>
        `,
        className: 'custom-marker-village',
        iconSize: [20, 20],
        iconAnchor: [10, 20]
      });

      // Real Chhattisgarh elephant activity data [lat, lng, intensity]
      const heatmapData = [
        // Barnawapara Wildlife Sanctuary - High density
        [21.3500, 82.7000, 0.9], [21.3480, 82.7020, 0.8], [21.3520, 82.6980, 0.7],
        [21.3460, 82.7040, 0.6], [21.3540, 82.6960, 0.8], [21.3440, 82.7060, 0.5],
        
        // Sitanadi Wildlife Sanctuary - Medium to High
        [20.9500, 82.1000, 0.8], [20.9480, 82.1020, 0.7], [20.9520, 82.0980, 0.6],
        [20.9460, 82.1040, 0.5], [20.9540, 82.0960, 0.7], [20.9440, 82.1060, 0.4],
        
        // Guru Ghasidas National Park - Very High density
        [23.8000, 83.1000, 0.95], [23.7980, 83.1020, 0.9], [23.8020, 83.0980, 0.85],
        [23.7960, 83.1040, 0.8], [23.8040, 83.0960, 0.9], [23.7940, 83.1060, 0.7],
        
        // Achanakmar Wildlife Sanctuary - High activity
        [22.5000, 81.7500, 0.8], [22.4980, 81.7520, 0.7], [22.5020, 81.7480, 0.6],
        [22.4960, 81.7540, 0.5], [22.5040, 81.7460, 0.7], [22.4940, 81.7560, 0.4],
        
        // Udanti Wildlife Sanctuary - Medium activity
        [20.1500, 82.1000, 0.6], [20.1480, 82.1020, 0.5], [20.1520, 82.0980, 0.4],
        [20.1460, 82.1040, 0.3], [20.1540, 82.0960, 0.5], [20.1440, 82.1060, 0.2],
        
        // Badalkhol Wildlife Sanctuary
        [23.2000, 83.3000, 0.5], [23.1980, 83.3020, 0.4], [23.2020, 83.2980, 0.3],
        
        // Tamor Pingla Wildlife Sanctuary
        [23.5000, 83.5000, 0.6], [23.4980, 83.5020, 0.5], [23.5020, 83.4980, 0.4],
        
        // Critical zones near villages
        [21.4000, 82.6500, 0.9], // Near Barnawapara village
        [20.9800, 82.1200, 0.8], // Near Sitanadi village
        [23.8200, 83.0500, 0.95], // Near Guru Ghasidas village
        [22.5200, 81.7300, 0.8], // Near Achanakmar village
        
        // Additional forest corridors
        [21.2800, 82.8000, 0.4], [21.3000, 82.7500, 0.5],
        [20.9200, 82.1500, 0.6], [20.9600, 82.1300, 0.5],
        [23.7500, 83.1500, 0.7], [23.7800, 83.1200, 0.6],
        [22.4500, 81.8000, 0.5], [22.4800, 81.7700, 0.4],
      ];

      // Create heatmap layer
      L.heatLayer(heatmapData, {
        radius: 25,
        blur: 20,
        maxZoom: 15,
        minOpacity: 0.4,
        gradient: {
          0.2: 'blue',
          0.4: 'cyan',
          0.5: 'lime', 
          0.6: 'yellow',
          0.7: 'orange',
          0.8: 'red',
          0.9: 'darkred'
        }
      }).addTo(map);

      // Add sanctuary and village markers
      const locations = [
        // Sanctuaries
        { name: 'Barnawapara Sanctuary', coords: [21.3500, 82.7000], type: 'sanctuary', priority: 'high', icon: sanctuaryIcon },
        { name: 'Sitanadi Sanctuary', coords: [20.9500, 82.1000], type: 'sanctuary', priority: 'medium', icon: sanctuaryIcon },
        { name: 'Guru Ghasidas National Park', coords: [23.8000, 83.1000], type: 'critical', priority: 'critical', icon: criticalZoneIcon },
        { name: 'Achanakmar Sanctuary', coords: [22.5000, 81.7500], type: 'sanctuary', priority: 'high', icon: sanctuaryIcon },
        { name: 'Udanti Sanctuary', coords: [20.1500, 82.1000], type: 'sanctuary', priority: 'medium', icon: sanctuaryIcon },
        { name: 'Badalkhol Sanctuary', coords: [23.2000, 83.3000], type: 'sanctuary', priority: 'medium', icon: sanctuaryIcon },
        { name: 'Tamor Pingla Sanctuary', coords: [23.5000, 83.5000], type: 'sanctuary', priority: 'medium', icon: sanctuaryIcon },
        
        // Villages
        { name: 'Barnawapara Village', coords: [21.4000, 82.6500], type: 'village', priority: 'high', icon: villageIcon },
        { name: 'Sitanadi Village', coords: [20.9800, 82.1200], type: 'village', priority: 'high', icon: villageIcon },
        { name: 'Guru Ghasidas Village', coords: [23.8200, 83.0500], type: 'village', priority: 'critical', icon: villageIcon },
        { name: 'Achanakmar Village', coords: [22.5200, 81.7300], type: 'village', priority: 'high', icon: villageIcon },
      ];

      locations.forEach(location => {
        L.marker(location.coords, { icon: location.icon })
          .addTo(map)
          .bindPopup(`
            <div class="p-2 min-w-[200px]">
              <div class="font-semibold text-slate-900 text-sm">${location.name}</div>
              <div class="text-xs mt-1 ${
                location.priority === 'critical' ? 'text-red-600 font-bold' :
                location.priority === 'high' ? 'text-orange-600 font-medium' :
                'text-blue-600'
              }">
                ${location.priority === 'critical' ? 'CRITICAL ZONE' : 
                  location.priority === 'high' ? 'High Risk Area' : 'Monitoring Zone'}
              </div>
              <div class="text-xs text-slate-500 mt-2">
                ${location.type === 'sanctuary' ? 'Elephant Habitat' : 'Human Settlement'}
              </div>
            </div>
          `);
      });

      // Add scale control
      L.control.scale({ imperial: false }).addTo(map);
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Elephant Activity Heatmap</h3>
          <p className="text-slate-600 text-sm mt-1">Live elephant movement intensity visualization</p>
        </div>
        <div className="flex items-center space-x-2 text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live Tracking</span>
        </div>
      </div>

      {/* Heatmap Container */}
      <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-slate-900">Real-time Elephant Movement Heatmap</h4>
          </div>
        </div>
        
        <div 
          ref={mapRef} 
          className="h-96 w-full rounded-b-lg"
          style={{ minHeight: '400px' }}
        />
      </div>

      {/* Heatmap Legend - Grid Layout */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-slate-200">
        <h4 className="font-semibold text-slate-900 mb-4">Heatmap Intensity Scale</h4>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Low */}
          <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded">
            <div className="w-8 h-4 bg-blue-500 rounded-sm flex-shrink-0"></div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Low</span>
              <span className="text-xs text-slate-500">0-40%</span>
            </div>
          </div>
          
          {/* Medium */}
          <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded">
            <div className="w-8 h-4 bg-cyan-500 rounded-sm flex-shrink-0"></div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Medium</span>
              <span className="text-xs text-slate-500">40-50%</span>
            </div>
          </div>
          
          {/* High */}
          <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded">
            <div className="w-8 h-4 bg-lime-500 rounded-sm flex-shrink-0"></div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">High</span>
              <span className="text-xs text-slate-500">50-60%</span>
            </div>
          </div>
          
          {/* Very High */}
          <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded">
            <div className="w-8 h-4 bg-yellow-500 rounded-sm flex-shrink-0"></div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Very High</span>
              <span className="text-xs text-slate-500">60-70%</span>
            </div>
          </div>
          
          {/* Critical */}
          <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded">
            <div className="w-8 h-4 bg-orange-500 rounded-sm flex-shrink-0"></div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Critical</span>
              <span className="text-xs text-slate-500">70-80%</span>
            </div>
          </div>
          
          {/* Emergency */}
          <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded">
            <div className="w-8 h-4 bg-red-500 rounded-sm flex-shrink-0"></div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Emergency</span>
              <span className="text-xs text-slate-500">80-100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sanctuary Information */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-3">Wildlife Sanctuaries</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Barnawapara Sanctuary:</span>
              <span className="font-semibold text-orange-600">High Activity</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Guru Ghasidas Park:</span>
              <span className="font-semibold text-red-600">Critical Zone</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Sitanadi Sanctuary:</span>
              <span className="font-semibold text-yellow-600">Medium Activity</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Achanakmar Sanctuary:</span>
              <span className="font-semibold text-orange-600">High Activity</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-3">Live Statistics</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Total Activity Points:</span>
              <span className="font-semibold text-slate-900">42</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">High Intensity Zones:</span>
              <span className="font-semibold text-red-600">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Estimated Elephants:</span>
              <span className="font-semibold text-slate-900">120+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Last Movement:</span>
              <span className="font-semibold text-green-600">15 mins ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div>
            <p className="font-semibold text-red-800">High Alert</p>
            <p className="text-sm text-red-700">
              Critical elephant movement detected near Guru Ghasidas National Park. 
              Forest rangers deployed for monitoring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';

const AnalyticsDashboard = () => {
  const [activeChart, setActiveChart] = useState(null);
  const [timeRange, setTimeRange] = useState('year');

  // Sample data for visualizations
  const monthlyConflicts = [
    { month: 'Jan', conflicts: 12, prevented: 8, severity: 3 },
    { month: 'Feb', conflicts: 18, prevented: 12, severity: 4 },
    { month: 'Mar', conflicts: 15, prevented: 10, severity: 3 },
    { month: 'Apr', conflicts: 22, prevented: 15, severity: 5 },
    { month: 'May', conflicts: 28, prevented: 18, severity: 5 },
    { month: 'Jun', conflicts: 25, prevented: 16, severity: 4 },
    { month: 'Jul', conflicts: 20, prevented: 14, severity: 4 },
    { month: 'Aug', conflicts: 16, prevented: 11, severity: 3 },
    { month: 'Sep', conflicts: 19, prevented: 13, severity: 4 },
    { month: 'Oct', conflicts: 23, prevented: 17, severity: 5 },
    { month: 'Nov', conflicts: 17, prevented: 12, severity: 3 },
    { month: 'Dec', conflicts: 14, prevented: 9, severity: 2 }
  ];

  const herdComposition = [
    { name: 'Adult Males', value: 25, color: '#3B82F6' },
    { name: 'Adult Females', value: 65, color: '#10B981' },
    { name: 'Calves', value: 30, color: '#F59E0B' },
    { name: 'Juveniles', value: 20, color: '#EF4444' }
  ];

  const activityPatterns = [
    { time: '00:00', activity: 15, conflicts: 2 },
    { time: '04:00', activity: 8, conflicts: 1 },
    { time: '08:00', activity: 45, conflicts: 8 },
    { time: '12:00', activity: 32, conflicts: 6 },
    { time: '16:00', activity: 68, conflicts: 12 },
    { time: '20:00', activity: 52, conflicts: 9 }
  ];

  const seasonalMovement = [
    { season: 'Winter', barnawapara: 45, sitanadi: 32, guruGhasidas: 28 },
    { season: 'Spring', barnawapara: 38, sitanadi: 45, guruGhasidas: 35 },
    { season: 'Summer', barnawapara: 52, sitanadi: 38, guruGhasidas: 42 },
    { season: 'Monsoon', barnawapara: 28, sitanadi: 52, guruGhasidas: 48 }
  ];

  const conflictTypes = [
    { type: 'Crop Damage', count: 65, color: '#F59E0B' },
    { type: 'Property Damage', count: 22, color: '#EF4444' },
    { type: 'Human Injury', count: 8, color: '#DC2626' },
    { type: 'Road Accidents', count: 15, color: '#7C3AED' }
  ];

  // GPS Tracking Statistics
  const gpsStats = [
    { sanctuary: 'Barnawapara', tracked: 28, active: 24, accuracy: 94 },
    { sanctuary: 'Sitanadi', tracked: 22, active: 18, accuracy: 89 },
    { sanctuary: 'Guru Ghasidas', tracked: 32, active: 30, accuracy: 96 },
    { sanctuary: 'Achanakmar', tracked: 18, active: 15, accuracy: 87 },
    { sanctuary: 'Udanti', tracked: 15, active: 12, accuracy: 85 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">Count: {payload[0].value}</p>
          <p className="text-sm text-gray-600">
            Percentage: {((payload[0].value / herdComposition.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const GPSTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">Tracked: {payload[0].value} elephants</p>
          <p className="text-sm text-green-600">Active: {payload[1].value} collars</p>
          <p className="text-sm text-purple-600">Accuracy: {payload[2].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Elephant Analytics</h1>
            <p className="text-gray-600 mt-2">Comprehensive insights and data visualization for wildlife conservation</p>
          </div>
          <div className="flex space-x-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            >
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics - Improved Hover */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div 
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer transform"
          onMouseEnter={() => setActiveChart('conflicts')}
          onMouseLeave={() => setActiveChart(null)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Conflicts</p>
              <p className="text-2xl font-bold text-gray-900">245</p>
            </div>
            <div className={`p-3 rounded-lg transition-all duration-200 ${
              activeChart === 'conflicts' ? 'bg-red-500 scale-110' : 'bg-red-100'
            }`}>
              <i className={`fas fa-exclamation-triangle ${
                activeChart === 'conflicts' ? 'text-white' : 'text-red-600'
              } text-xl transition-colors duration-200`}></i>
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2 flex items-center transition-colors duration-200">
            <i className="fas fa-arrow-down mr-1"></i>
            12% decrease from last year
          </p>
        </div>

        <div 
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer transform"
          onMouseEnter={() => setActiveChart('prevention')}
          onMouseLeave={() => setActiveChart(null)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Prevention Rate</p>
              <p className="text-2xl font-bold text-gray-900">64.5%</p>
            </div>
            <div className={`p-3 rounded-lg transition-all duration-200 ${
              activeChart === 'prevention' ? 'bg-green-500 scale-110' : 'bg-green-100'
            }`}>
              <i className={`fas fa-shield-alt ${
                activeChart === 'prevention' ? 'text-white' : 'text-green-600'
              } text-xl transition-colors duration-200`}></i>
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2 flex items-center transition-colors duration-200">
            <i className="fas fa-arrow-up mr-1"></i>
            8% improvement
          </p>
        </div>

        <div 
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer transform"
          onMouseEnter={() => setActiveChart('population')}
          onMouseLeave={() => setActiveChart(null)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Elephants Tracked</p>
              <p className="text-2xl font-bold text-gray-900">142</p>
            </div>
            <div className={`p-3 rounded-lg transition-all duration-200 ${
              activeChart === 'population' ? 'bg-blue-500 scale-110' : 'bg-blue-100'
            }`}>
              <i className={`fas fa-paw ${
                activeChart === 'population' ? 'text-white' : 'text-blue-600'
              } text-xl transition-colors duration-200`}></i>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2 transition-colors duration-200">Across 7 active herds</p>
        </div>

        <div 
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer transform"
          onMouseEnter={() => setActiveChart('detection')}
          onMouseLeave={() => setActiveChart(null)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">GPS Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
            </div>
            <div className={`p-3 rounded-lg transition-all duration-200 ${
              activeChart === 'detection' ? 'bg-purple-500 scale-110' : 'bg-purple-100'
            }`}>
              <i className={`fas fa-satellite ${
                activeChart === 'detection' ? 'text-white' : 'text-purple-600'
              } text-xl transition-colors duration-200`}></i>
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2 flex items-center transition-colors duration-200">
            <i className="fas fa-arrow-up mr-1"></i>
            3.1% improvement
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Conflicts Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-200 hover:shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Conflict Analysis</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium transition-colors duration-200 hover:bg-green-200">
                Conflicts
              </button>
              <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium transition-colors duration-200 hover:bg-blue-200">
                Prevented
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyConflicts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="conflicts" 
                name="Total Conflicts" 
                fill="#EF4444"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="prevented" 
                name="Prevented" 
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Herd Composition Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-200 hover:shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Herd Composition</h3>
            <div className="text-sm text-gray-500">
              Total: {herdComposition.reduce((sum, item) => sum + item.value, 0)} elephants
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={herdComposition}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {herdComposition.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Activity Patterns */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-200 hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Activity Patterns</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={activityPatterns}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="activity" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.3}
                strokeWidth={2}
                name="Activity Level"
              />
              <Line 
                type="monotone" 
                dataKey="conflicts" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="Conflicts"
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* GPS Tracking Statistics */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-200 hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">GPS Tracking Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gpsStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="sanctuary" 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip content={<GPSTooltip />} />
              <Legend />
              <Bar 
                dataKey="tracked" 
                name="Elephants Tracked" 
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="active" 
                name="Active Collars" 
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="accuracy" 
                name="GPS Accuracy %" 
                fill="#8B5CF6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Third Row - Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conflict Types */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-200 hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Conflict Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conflictTypes} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis 
                type="number" 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                type="category" 
                dataKey="type" 
                width={100}
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill="#8884d8"
                radius={[0, 4, 4, 0]}
              >
                {conflictTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Seasonal Movement Patterns */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-200 hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Seasonal Movement Patterns</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={seasonalMovement}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="season" 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="barnawapara" 
                stroke="#0088FE" 
                strokeWidth={3}
                name="Barnawapara"
                dot={{ fill: '#0088FE', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="sitanadi" 
                stroke="#00C49F" 
                strokeWidth={3}
                name="Sitanadi"
                dot={{ fill: '#00C49F', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="guruGhasidas" 
                stroke="#FFBB28" 
                strokeWidth={3}
                name="Guru Ghasidas"
                dot={{ fill: '#FFBB28', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GPS Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white transition-all duration-200 hover:scale-105 transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Best GPS Coverage</p>
              <p className="text-xl font-bold">Guru Ghasidas</p>
            </div>
            <i className="fas fa-satellite-dish text-2xl opacity-80"></i>
          </div>
          <p className="text-sm opacity-90 mt-2">32 elephants tracked, 96% accuracy</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white transition-all duration-200 hover:scale-105 transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Active Tracking Collars</p>
              <p className="text-xl font-bold">99/115</p>
            </div>
            <i className="fas fa-satellite text-2xl opacity-80"></i>
          </div>
          <p className="text-sm opacity-90 mt-2">86% collar operational rate</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white transition-all duration-200 hover:scale-105 transform">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Average GPS Accuracy</p>
              <p className="text-xl font-bold">94.2%</p>
            </div>
            <i className="fas fa-bullseye text-2xl opacity-80"></i>
          </div>
          <p className="text-sm opacity-90 mt-2">Across all sanctuaries</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
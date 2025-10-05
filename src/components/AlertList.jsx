import React from 'react';

const AlertList = () => {
  // Elephant herd detection alerts only - all in red
  const elephantAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Elephant Herd Detected',
      message: 'Elephant herd detected near Village A - 15 elephants moving toward agricultural fields',
      location: 'Near Barnawapara Sanctuary',
      time: '2 minutes ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'critical',
      title: 'Elephant Herd Movement',
      message: 'Large herd of 12 elephants crossing NH-43 near Sitanadi Wildlife Sanctuary',
      location: 'Highway 43, Sitanadi',
      time: '15 minutes ago',
      priority: 'high'
    },
    {
      id: 3,
      type: 'critical',
      title: 'Elephant Herd Detected',
      message: 'Herd of 8 elephants approaching residential area near Guru Ghasidas National Park',
      location: 'Guru Ghasidas Buffer Zone',
      time: '25 minutes ago',
      priority: 'high'
    },
    {
      id: 4,
      type: 'critical',
      title: 'Elephant Herd Spotted',
      message: 'Group of 10 elephants detected near water source in Achanakmar Sanctuary',
      location: 'Achanakmar Wildlife Sanctuary',
      time: '40 minutes ago',
      priority: 'medium'
    },
    {
      id: 5,
      type: 'critical',
      title: 'Elephant Herd Movement',
      message: 'Herd of 6 elephants moving toward village outskirts near Tamor Pingla',
      location: 'Tamor Pingla Sanctuary',
      time: '1 hour ago',
      priority: 'high'
    },
    {
      id: 6,
      type: 'critical',
      title: 'Elephant Herd Detected',
      message: 'Large herd of 18 elephants crossing river near Udanti Sanctuary',
      location: 'Udanti River Basin',
      time: '1 hour 15 minutes ago',
      priority: 'high'
    },
    {
      id: 7,
      type: 'critical',
      title: 'Elephant Herd Spotted',
      message: 'Group of 7 elephants near agricultural fields in Badalkhol zone',
      location: 'Badalkhol Wildlife Sanctuary',
      time: '1 hour 30 minutes ago',
      priority: 'medium'
    },
    {
      id: 8,
      type: 'critical',
      title: 'Elephant Herd Movement',
      message: 'Herd of 14 elephants detected moving along forest corridor',
      location: 'Barnawapara Corridor',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 9,
      type: 'critical',
      title: 'Elephant Herd Detected',
      message: 'Elephants approaching human settlement near Sitanadi buffer zone',
      location: 'Sitanadi Buffer Zone',
      time: '2 hours 20 minutes ago',
      priority: 'high'
    },
    {
      id: 10,
      type: 'critical',
      title: 'Elephant Herd Spotted',
      message: 'Group of 9 elephants near water reservoir in central zone',
      location: 'Central Forest Division',
      time: '3 hours ago',
      priority: 'medium'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
        return 'Low Priority';
      default:
        return 'High Priority';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Real-time Elephant Alerts</h3>
          <p className="text-slate-600 text-sm mt-1">Live elephant herd detection alerts</p>
        </div>
        <div className="flex items-center space-x-2 text-red-600">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live Alerts</span>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {elephantAlerts.map((alert) => (
          <div
            key={alert.id}
            className="border border-red-200 rounded-lg p-4 bg-red-50 hover:bg-red-100 transition-colors duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 ${getPriorityColor(alert.priority)} rounded-full animate-pulse`}></div>
                <span className="text-sm font-semibold text-red-800">{alert.title}</span>
              </div>
              <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                {getPriorityText(alert.priority)}
              </span>
            </div>
            
            <p className="text-sm text-red-700 mb-2">{alert.message}</p>
            
            <div className="flex justify-between items-center text-xs text-red-600">
              <span>{alert.location}</span>
              <span>{alert.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="font-semibold text-slate-900 mb-3">Alert Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Total Active Alerts:</span>
            <span className="font-semibold text-red-600">{elephantAlerts.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">High Priority:</span>
            <span className="font-semibold text-red-600">
              {elephantAlerts.filter(alert => alert.priority === 'high').length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Elephants Tracked:</span>
            <span className="font-semibold text-slate-900">120+</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Response Teams:</span>
            <span className="font-semibold text-green-600">8 Active</span>
          </div>
        </div>
      </div>

      {/* Live Status */}
      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-red-800">LIVE MONITORING ACTIVE</span>
        </div>
        <p className="text-xs text-red-700 mt-1">
          Forest rangers and response teams actively monitoring all elephant movements
        </p>
      </div>
    </div>
  );
};

export default AlertList;
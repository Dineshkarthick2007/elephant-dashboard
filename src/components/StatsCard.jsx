import React from 'react';

const StatsCard = ({ title, value, change, changeType, icon }) => {
  const isPositive = changeType === 'positive';

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-2xl font-semibold text-slate-900 mt-2">{value}</p>
          <div className={`flex items-center mt-2 text-sm ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <i className={`fas ${isPositive ? 'fa-arrow-up' : 'fa-arrow-down'} mr-1`}></i>
            <span>{change}</span>
          </div>
        </div>
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <i className={`${icon} text-blue-600 text-lg`}></i>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
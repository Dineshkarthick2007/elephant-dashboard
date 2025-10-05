import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: 'fas fa-chart-line', path: '/dashboard' },
    { name: 'Analytics', icon: 'fas fa-chart-bar', path: '/analytics' },
    { name: 'Map View', icon: 'fas fa-map', path: '/mapview' }
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`
      relative
      bg-gradient-to-b from-green-800 to-green-900
      min-h-screen border-r border-green-700
      transition-all duration-500 ease-in-out
      ${isCollapsed ? 'w-20' : 'w-64'}
      overflow-hidden
    `}>
      
      {/* Header Section */}
      <div className="p-6 border-b border-green-700 relative">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
            <i className="fas fa-paw text-white text-lg"></i>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}>
            <h1 className="text-lg font-semibold text-white whitespace-nowrap">
              ElephantTrack
            </h1>
            <p className="text-green-200 text-xs whitespace-nowrap">
              Wildlife Monitoring
            </p>
          </div>
        </div>

        {/* Toggle Arrow Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 
                   w-6 h-6 bg-green-600 border-2 border-green-500 
                   rounded-full flex items-center justify-center 
                   shadow-lg hover:bg-green-500 hover:scale-110 
                   transition-all duration-300 z-10"
        >
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} 
                         text-white text-xs transition-transform duration-300`}></i>
        </button>
      </div>

      {/* Main Menu Title */}
      <div className={`px-6 py-4 transition-all duration-300 ${
        isCollapsed ? 'opacity-0' : 'opacity-100'
      }`}>
        <h2 className="text-xs uppercase tracking-wider text-green-300 font-medium whitespace-nowrap">
          Main Menu
        </h2>
      </div>

      {/* Menu Items */}
      <nav className="px-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`
              flex items-center rounded-lg mb-1 cursor-pointer transition-all duration-300
              group relative
              ${isCollapsed ? 'px-2 py-3 justify-center' : 'px-3 py-3'}
              ${location.pathname === item.path 
                ? 'bg-green-700 text-white shadow-sm' 
                : 'text-green-100 hover:bg-green-750 hover:text-white'
              }
            `}
          >
            <div className={`
              rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300
              ${isCollapsed ? 'w-10 h-10 mx-auto' : 'w-8 h-8 mr-3'}
              ${location.pathname === item.path ? 'bg-green-600' : 'bg-green-800 group-hover:bg-green-700'}
            `}>
              <i className={`
                ${item.icon} transition-colors duration-300
                ${location.pathname === item.path ? 'text-white' : 'text-green-300 group-hover:text-white'}
                ${isCollapsed ? 'text-lg' : 'text-base'}
              `}></i>
            </div>
            
            {/* Menu Text */}
            <span className={`
              font-medium text-sm transition-all duration-300 overflow-hidden
              ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-0'}
            `}>
              {item.name}
            </span>

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-3 py-2 bg-green-700 text-white text-sm rounded-lg 
                            shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 
                            whitespace-nowrap z-50 border border-green-600 transform translate-x-2 
                            group-hover:translate-x-0 pointer-events-none">
                {item.name}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 
                              w-2 h-2 bg-green-700 rotate-45"></div>
              </div>
            )}
          </Link>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-700 bg-green-800">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center 
                         border border-green-600 flex-shrink-0">
            <i className="fas fa-user text-green-200 text-sm"></i>
          </div>
          <div className={`
            ml-3 transition-all duration-300 overflow-hidden
            ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
          `}>
            <p className="text-sm font-medium text-white whitespace-nowrap">Admin User</p>
            <p className="text-xs text-green-300 whitespace-nowrap">Administrator</p>
          </div>
        </div>
      </div>

      {/* Collapsed State Indicator */}
      {isCollapsed && (
        <div className="absolute bottom-20 left-0 right-0 text-center">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mx-auto"></div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
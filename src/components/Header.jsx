import React, { useState, useEffect } from 'react';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="bg-gradient-to-r from-green-700 to-green-600 border-b border-green-600 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Title */}
        <div>
          <h1 className="text-xl font-semibold text-white">
            Elephant Monitoring Dashboard
          </h1>
          <p className="text-green-100 text-sm mt-1">
            Real-time wildlife protection analytics
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Time */}
          <div className="text-right">
            <p className="text-sm font-medium text-white">{formatTime(currentTime)}</p>
            <p className="text-xs text-green-200">{formatDate(currentTime)}</p>
          </div>

          {/* Location */}
          <div className="flex items-center text-green-100 bg-green-700 bg-opacity-50 px-3 py-2 rounded-lg border border-green-600">
            <i className="fas fa-map-marker-alt mr-2 text-green-300"></i>
            <span className="text-sm font-medium">Chhattisgarh</span>
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center border border-green-500">
              <i className="fas fa-user text-white"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
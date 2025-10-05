import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MapViewComponent from '../components/MapView';

const MapView = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Map View Component */}
        <MapViewComponent />
      </div>
    </div>
  );
};

export default MapView;
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

const Analytics = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <AnalyticsDashboard />
      </div>
    </div>
  );
};

export default Analytics;
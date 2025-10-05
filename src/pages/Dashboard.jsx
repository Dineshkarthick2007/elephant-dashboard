import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import ActivityHeatmap from '../components/ActivityHeatmap';
import AlertList from '../components/AlertList';

const Dashboard = () => {
  const statsData = [
    {
      title: 'Total Alerts Today',
      value: '12',
      change: '8% from yesterday',
      changeType: 'negative',
      icon: 'fas fa-bell'
    },
    {
      title: 'Conflicts Prevented',
      value: '45',
      change: '12% from last week',
      changeType: 'negative',
      icon: 'fas fa-shield-alt'
    },
    {
      title: 'Sensors Online',
      value: '24/26',
      change: '92% uptime',
      changeType: 'positive',
      icon: 'fas fa-microchip'
    },
    {
      title: 'AI Detection Accuracy',
      value: '96.8%',
      change: '1.2% improvement',
      changeType: 'positive',
      icon: 'fas fa-brain'
    }
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
                icon={stat.icon}
              />
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Chhattisgarh Heatmap */}
            <ActivityHeatmap />
            
            {/* Right Column - Alerts */}
            <AlertList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
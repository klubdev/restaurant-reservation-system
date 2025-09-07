'use client';

import React, { useState, useEffect } from 'react';
import { mockDashboardMetrics } from '@/data/mockData';
import ReservationStats from './ReservationStats';
import RevenueChart from './RevenueChart';
import PopularTimesChart from './PopularTimesChart';
import TopGuests from './TopGuests';
import TodayReservations from './TodayReservations';

const RestaurantDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const metrics = mockDashboardMetrics;

  useEffect(() => {
    // Set the time on the client side to avoid hydration issues
    setCurrentTime(new Date().toLocaleString());
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Restaurant Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening at your restaurant today.
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {currentTime || 'Loading...'}
        </div>
      </div>

      {/* Key Metrics */}
      <ReservationStats metrics={metrics} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <PopularTimesChart popularTimes={metrics.popularTimes} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopGuests guests={metrics.topGuests} />
        <TodayReservations />
      </div>
    </div>
  );
};

export default RestaurantDashboard;

'use client';

import React from 'react';
import { DashboardMetrics } from '@/types/restaurant';

interface ReservationStatsProps {
  metrics: DashboardMetrics;
}

const ReservationStats: React.FC<ReservationStatsProps> = ({ metrics }) => {
  const stats = [
    {
      title: 'Total Reservations',
      value: metrics.totalReservations,
      change: '+12%',
      changeType: 'positive' as const,
      icon: '📅',
      color: 'blue'
    },
    {
      title: 'Confirmed',
      value: metrics.confirmedReservations,
      change: '+8%',
      changeType: 'positive' as const,
      icon: '✅',
      color: 'green'
    },
    {
      title: 'Pending',
      value: metrics.pendingReservations,
      change: '-2%',
      changeType: 'negative' as const,
      icon: '⏳',
      color: 'yellow'
    },
    {
      title: 'Revenue',
      value: `€${metrics.totalRevenue.toLocaleString()}`,
      change: '+15%',
      changeType: 'positive' as const,
      icon: '💰',
      color: 'purple'
    },
    {
      title: 'Occupancy Rate',
      value: `${metrics.occupancyRate}%`,
      change: '+5%',
      changeType: 'positive' as const,
      icon: '📊',
      color: 'indigo'
    },
    {
      title: 'Avg Party Size',
      value: metrics.averagePartySize.toFixed(1),
      change: '+0.2',
      changeType: 'positive' as const,
      icon: '👥',
      color: 'pink'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className="text-2xl">{stat.icon}</div>
          </div>
          <div className="mt-4 flex items-center">
            <span
              className={`text-sm font-medium ${
                stat.changeType === 'positive'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              vs last month
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservationStats;

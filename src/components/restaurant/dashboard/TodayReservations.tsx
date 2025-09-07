'use client';

import React from 'react';
import { mockReservations } from '@/data/mockData';

const TodayReservations: React.FC = () => {
  // Filter reservations for today (mock data shows future dates, so we'll show all for demo)
  const todayReservations = mockReservations.slice(0, 4);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'no-show':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Today's Reservations
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          View Calendar
        </button>
      </div>
      
      <div className="space-y-4">
        {todayReservations.map((reservation) => (
          <div key={reservation.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {reservation.guest.firstName[0]}{reservation.guest.lastName[0]}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {reservation.guest.firstName} {reservation.guest.lastName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {reservation.time} • Party of {reservation.partySize}
                  {reservation.tableNumber && ` • Table ${reservation.tableNumber}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(reservation.status)}`}>
                {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {todayReservations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No reservations for today</p>
        </div>
      )}
    </div>
  );
};

export default TodayReservations;

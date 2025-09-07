'use client';

import React from 'react';
import { Guest } from '@/types/restaurant';

interface TopGuestsProps {
  guests: Guest[];
}

const TopGuests: React.FC<TopGuestsProps> = ({ guests }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Top Guests
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {guests.map((guest, index) => (
          <div key={guest.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {guest.firstName[0]}{guest.lastName[0]}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {guest.firstName} {guest.lastName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {guest.email}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {guest.vipStatus && (
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                  VIP
                </span>
              )}
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                #{index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopGuests;

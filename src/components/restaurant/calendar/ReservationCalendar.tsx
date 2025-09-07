'use client';

import React, { useState, useEffect } from 'react';
import { mockReservations, mockRestaurantSettings } from '@/data/mockData';
import ManualReservationModal from '../reservation/ManualReservationModal';

const ReservationCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isClient, setIsClient] = useState(false);
  const [showManualReservationModal, setShowManualReservationModal] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reservation Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your restaurant reservations
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowManualReservationModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Reservation
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        {/* Reservation Status Legend */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reservation Status</h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Confirmed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Cancelled</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-500 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">No Show</span>
            </div>
          </div>
        </div>
        
        {/* Daily Statistics Legend */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Daily Statistics</h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900/20 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">👥 Total Guests</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 dark:bg-green-900/20 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">🪑 Free Couverts</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-100 dark:bg-purple-900/20 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">💰 Prepayment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {isClient ? (
          <div className="space-y-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  ←
                </button>
                <button
                  onClick={() => setSelectedDate(new Date())}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Today
                </button>
                <button
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  →
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i - 6);
                const dayReservations = mockReservations.filter(
                  reservation => reservation.date === date.toISOString().split('T')[0]
                );
                const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                const isToday = date.toDateString() === new Date().toDateString();
                
                // Calculate daily statistics
                const totalGuests = dayReservations.reduce((sum, reservation) => sum + reservation.partySize, 0);
                const freeCouverts = mockRestaurantSettings.totalCapacity - totalGuests;
                const prepaymentTotal = totalGuests * mockRestaurantSettings.prepaymentAmount;
                
                return (
                  <div
                    key={i}
                    className={`min-h-[120px] p-1 border border-gray-200 dark:border-gray-700 ${
                      isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
                    } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className={`text-sm font-medium ${isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                      {date.getDate()}
                    </div>
                    
                    {/* Daily Statistics */}
                    {isCurrentMonth && (
                      <div className="mt-1 space-y-1">
                        {/* Total Guests */}
                        <div className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-1 py-0.5 rounded">
                          👥 {totalGuests} guests
                        </div>
                        
                        {/* Free Couverts */}
                        <div className={`text-xs px-1 py-0.5 rounded ${
                          freeCouverts > 10 ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' :
                          freeCouverts > 0 ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200' :
                          'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                        }`}>
                          🪑 {freeCouverts} free
                        </div>
                        
                        {/* Prepayment Amount */}
                        <div className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 px-1 py-0.5 rounded">
                          💰 €{prepaymentTotal}
                        </div>
                      </div>
                    )}
                    
                    {/* Reservations */}
                    <div className="space-y-1 mt-1">
                      {dayReservations.slice(0, 1).map((reservation) => (
                        <div
                          key={reservation.id}
                          className={`text-xs p-1 rounded truncate ${
                            reservation.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            reservation.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                          }`}
                        >
                          {reservation.guest.firstName} ({reservation.partySize})
                        </div>
                      ))}
                      {dayReservations.length > 1 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          +{dayReservations.length - 1} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading calendar...</p>
            </div>
          </div>
        )}
      </div>

      {/* Manual Reservation Modal */}
      <ManualReservationModal
        isOpen={showManualReservationModal}
        onClose={() => setShowManualReservationModal(false)}
      />
    </div>
  );
};

export default ReservationCalendar;

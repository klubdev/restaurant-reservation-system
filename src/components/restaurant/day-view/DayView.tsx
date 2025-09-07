'use client';

import React, { useState, useMemo } from 'react';
import { mockReservations, mockTables, mockRestaurantSettings } from '@/data/mockData';
import { Reservation } from '@/types/restaurant';
import ManualReservationModal from '../reservation/ManualReservationModal';
import ReservationDetail from '../reservation/ReservationDetail';

const DayView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [showManualReservationModal, setShowManualReservationModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'tables' | 'events' | 'payments' | 'settings'>('timeline');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Generate time slots (every 30 minutes from 5 PM to 11 PM)
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 17; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  }, []);

  // Local mutable copy of day reservations to support actions (accept/decline/change table)
  const [dayReservations, setDayReservations] = useState(
    () => mockReservations.filter(r => r.date === selectedDate)
  );
  // Refresh local list when date changes
  React.useEffect(() => {
    setDayReservations(mockReservations.filter(r => r.date === selectedDate));
  }, [selectedDate]);

  // Business Intelligence Calculations
  const businessMetrics = useMemo(() => {
    const totalGuests = dayReservations.reduce((sum, reservation) => sum + reservation.partySize, 0);
    const totalCapacity = mockRestaurantSettings.totalCapacity;
    const occupancyRate = (totalGuests / totalCapacity) * 100;
    
    // Revenue projections (mock data)
    const averageSpendPerGuest = 45; // €45 per guest
    const projectedRevenue = totalGuests * averageSpendPerGuest;
    const prepaymentTotal = totalGuests * mockRestaurantSettings.prepaymentAmount;
    
    // Special events
    const specialEvents = dayReservations.filter(r => r.specialRequests?.includes('Valentine') || r.specialRequests?.includes('Wine'));
    
    // VIP guests
    const vipGuests = dayReservations.filter(r => r.guest.vipStatus);
    
    // Allergy warnings
    const allergyWarnings = dayReservations.filter(r => 
      r.guest.dietaryRestrictions && r.guest.dietaryRestrictions.length > 0
    );

    return {
      totalGuests,
      totalCapacity,
      occupancyRate,
      projectedRevenue,
      prepaymentTotal,
      specialEvents: specialEvents.length,
      vipGuests: vipGuests.length,
      allergyWarnings: allergyWarnings.length,
      freeCouverts: totalCapacity - totalGuests
    };
  }, [dayReservations]);

  // Waitlist data (mock)
  const waitlistData = [
    { id: '1', name: 'John Doe', partySize: 4, phone: '+31 6 12345678', waitTime: '15 min', priority: 'high' },
    { id: '2', name: 'Jane Smith', partySize: 2, phone: '+31 6 87654321', waitTime: '25 min', priority: 'normal' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700';
      case 'no-show':
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700';
    }
  };

  const getReservationStatus = (reservation: Reservation) => {
    // Enhanced status logic
    if (reservation.status === 'confirmed') {
      return { status: 'Approved', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' };
    } else if (reservation.status === 'pending') {
      // Check if prepayment is required
      const prepaymentAmount = reservation.partySize * mockRestaurantSettings.prepaymentAmount;
      if (prepaymentAmount > 0) {
        return { status: 'Waiting for Prepayment', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' };
      } else {
        return { status: 'Pending Approval', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' };
      }
    } else if (reservation.status === 'cancelled') {
      return { status: 'Cancelled', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' };
    } else if (reservation.status === 'no-show') {
      return { status: 'No Show', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' };
    }
    return { status: 'Unknown', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' };
  };

  const getReservationsForTime = (time: string) => {
    return dayReservations.filter(reservation => reservation.time === time);
  };

  // Actions
  const acceptReservation = (id: string) => {
    setDayReservations(prev => prev.map(r => r.id === id ? { ...r, status: 'confirmed' } : r));
  };
  const declineReservation = (id: string) => {
    setDayReservations(prev => prev.map(r => r.id === id ? { ...r, status: 'cancelled' } : r));
  };
  const changeTable = (id: string) => {
    const table = prompt('Enter new table number');
    if (!table) return;
    setDayReservations(prev => prev.map(r => r.id === id ? { ...r, tableNumber: table } : r));
  };
  const sendMessage = (id: string) => {
    const msg = prompt('Message to guest');
    if (msg) alert(`Message queued: "${msg}"`);
  };

  // Navigation functions
  const goToPreviousDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const goToNextDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const goToToday = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isToday = selectedDate === new Date().toISOString().split('T')[0];
  const isTomorrow = selectedDate === new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const isYesterday = selectedDate === new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // Time Grid Component
  const TimeGrid = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Time Grid - {formatDate(selectedDate)}
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Confirmed</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Cancelled</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        {timeSlots.map((time) => {
          const reservations = getReservationsForTime(time);
          const totalGuests = reservations.reduce((sum, r) => sum + r.partySize, 0);
          
          return (
            <div
              key={time}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedTimeSlot === time
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
              onClick={() => setSelectedTimeSlot(selectedTimeSlot === time ? null : time)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-mono text-gray-900 dark:text-white min-w-[60px]">
                    {formatTime(time)}
                  </div>
                  <div className="flex-1">
                    {reservations.length > 0 ? (
                      <div className="space-y-2">
                        {reservations.map((reservation) => (
                          <div
                            key={reservation.id}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(reservation.status)}`}
                          >
                            {reservation.guest.firstName} {reservation.guest.lastName} ({reservation.partySize})
                            {reservation.tableNumber && ` • Table ${reservation.tableNumber}`}
                            {reservation.guest.vipStatus && ' • VIP'}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">No reservations</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {totalGuests} guests
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {reservations.length} reservation{reservations.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Visual table floorplan inspired by provided mock
  const TableFloorplan = () => {
    const nowIso = new Date().toISOString().split('T')[1]?.slice(0,5) || '00:00';
    const reservationsByTable = new Map<string, Reservation | undefined>();
    mockTables.forEach((t) => {
      const forTable = dayReservations
        .filter((r) => r.tableNumber === t.number)
        .sort((a, b) => (a.time < b.time ? -1 : 1));
      // choose next upcoming at/after now, or the first of the day
      const next = forTable.find((r) => r.time >= nowIso) || forTable[0];
      reservationsByTable.set(t.number, next);
    });

    const renderTable = (tableNumber: string, capacity: number) => {
      const r = reservationsByTable.get(tableNumber);
      const statusColor = r?.status === 'confirmed'
        ? 'ring-2 ring-green-400'
        : r?.status === 'pending'
        ? 'ring-2 ring-amber-400'
        : r?.status === 'cancelled'
        ? 'ring-2 ring-red-400'
        : 'ring-1 ring-gray-300 dark:ring-gray-600';

      return (
        <div key={tableNumber} className="flex flex-col items-center gap-2">
          <div
            className={`relative flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 ${statusColor}`}
            style={{ width: capacity >= 6 ? 96 : 64, height: capacity >= 6 ? 96 : 64, borderRadius: capacity >= 6 ? 9999 : 8 }}
            title={r ? `${r.guest.firstName} ${r.guest.lastName} • ${r.time} • ${r.partySize}p` : `Table ${tableNumber}`}
          >
            <span className="text-xs leading-none">{capacity}</span>
            {r?.guest.vipStatus && (
              <span className="absolute -top-2 -right-2 text-[10px] bg-yellow-400 text-yellow-900 rounded-full px-1">VIP</span>
            )}
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-700 dark:text-gray-300">Table {tableNumber}</div>
            {r ? (
              <div className="text-[11px] text-gray-500 dark:text-gray-400">
                {r.guest.firstName} {r.guest.lastName.charAt(0)}. • {r.time}
              </div>
            ) : (
              <div className="text-[11px] text-gray-400">Available</div>
            )}
          </div>
        </div>
      );
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Table Management • Floorplan</h3>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400"><span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span> Confirmed</div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Pending</div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400"><span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span> Cancelled</div>
          </div>
        </div>

        {/* Yard/grid */}
        <div className="grid grid-cols-4 gap-10 justify-items-center">
          {mockTables.map((t) => renderTable(t.number, t.capacity))}
        </div>

        {/* Side rail for small 2-top booths like in mockup */}
        <div className="mt-8 grid grid-cols-6 gap-6">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-16 rounded-md bg-gray-200 dark:bg-gray-700 ring-1 ring-gray-300 dark:ring-gray-600 flex items-center justify-center text-[11px] text-gray-700 dark:text-gray-300">2</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Booth {i}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Table Management Component
  const TableManagement = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Interactive Floor Plan
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Occupied</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Reserved</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mockTables.map((table) => {
          const tableReservation = dayReservations.find(r => r.tableNumber === table.number);
          const isOccupied = tableReservation && tableReservation.status === 'confirmed';
          const isReserved = tableReservation && tableReservation.status === 'pending';
          
          return (
            <div
              key={table.id}
              className={`p-4 rounded-lg border-2 ${
                isOccupied 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                  : isReserved
                  ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                  : 'border-green-500 bg-green-50 dark:bg-green-900/20'
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  Table {table.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {table.capacity} seats
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {table.location}
                </div>
                {tableReservation && (
                  <div className="mt-2 text-xs">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {tableReservation.guest.firstName} {tableReservation.guest.lastName}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {tableReservation.partySize} guests
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {tableReservation.time}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Special Events Component
  const SpecialEvents = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Special Events
        </h3>
        <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Add Event
        </button>
      </div>
      
      <div className="space-y-4">
        {dayReservations.filter(r => r.specialRequests?.includes('Valentine') || r.specialRequests?.includes('Wine')).map((reservation) => (
          <div key={reservation.id} className="border border-purple-200 dark:border-purple-700 rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {reservation.specialRequests?.includes('Valentine') ? 'Valentine\'s Dinner' : 'Wine Tasting'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {reservation.guest.firstName} {reservation.guest.lastName} • {reservation.partySize} guests
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {reservation.time} • Table {reservation.tableNumber}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  €{reservation.specialRequests?.includes('Valentine') ? 100 : 75}/guest
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total: €{(reservation.specialRequests?.includes('Valentine') ? 100 : 75) * reservation.partySize}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {dayReservations.filter(r => r.specialRequests?.includes('Valentine') || r.specialRequests?.includes('Wine')).length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-gray-500 dark:text-gray-400">No special events scheduled for this day</p>
          </div>
        )}
      </div>
    </div>
  );

  // Payment Tracking Component
  const PaymentTracking = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Payment Tracking
        </h3>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
            Process Payment
          </button>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Gift Card
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            €{businessMetrics.prepaymentTotal}
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">
            Prepayments Collected
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            €{businessMetrics.projectedRevenue - businessMetrics.prepaymentTotal}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            Outstanding Balance
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            €{businessMetrics.projectedRevenue}
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300">
            Total Projected Revenue
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 dark:text-white">Payment Details by Reservation</h4>
        {dayReservations.map((reservation) => {
          const prepaymentAmount = reservation.partySize * mockRestaurantSettings.prepaymentAmount;
          const totalAmount = reservation.partySize * 45; // Average spend per guest
          const outstanding = totalAmount - prepaymentAmount;
          
          return (
            <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {reservation.guest.firstName} {reservation.guest.lastName}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {reservation.time} • {reservation.partySize} guests
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm">
                  <span className="text-green-600 dark:text-green-400">€{prepaymentAmount} paid</span>
                  {outstanding > 0 && (
                    <span className="text-red-600 dark:text-red-400 ml-2">€{outstanding} due</span>
                  )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Total: €{totalAmount}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Daily Settings Component
  const DailySettings = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Daily Settings & Configuration
        </h3>
        <button className="px-3 py-1 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700">
          Save Changes
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Opening Hours</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Opening Time</span>
              <input
                type="time"
                defaultValue="17:00"
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Closing Time</span>
              <input
                type="time"
                defaultValue="23:00"
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Blocked Tables</h4>
          <div className="space-y-2">
            {mockTables.slice(0, 3).map((table) => (
              <label key={table.id} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Table {table.number} ({table.capacity} seats)
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Waitlist Management</h4>
        <div className="space-y-3">
          {waitlistData.map((guest) => (
            <div key={guest.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{guest.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {guest.partySize} guests • {guest.phone}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  guest.priority === 'high' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {guest.waitTime}
                </span>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Seat Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left Sidebar - Reservations List */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Reservations
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatDate(selectedDate)}
          </p>
        </div>

        {/* Reservations List (compact) */}
        <div className="flex-1 overflow-y-auto">
          {dayReservations.length > 0 ? (
            <div className="p-3 space-y-2">
              {dayReservations.map((reservation) => {
                const reservationStatus = getReservationStatus(reservation);
                const prepaymentAmount = reservation.partySize * mockRestaurantSettings.prepaymentAmount;
                
                return (
                  <div
                    key={reservation.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedReservation?.id === reservation.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedReservationId(reservation.id)}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {reservation.guest.firstName[0]}{reservation.guest.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {reservation.guest.firstName} {reservation.guest.lastName}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {reservation.partySize} guests
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <button
                          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === reservation.id ? null : reservation.id); }}
                          aria-label="More actions"
                        >
                          <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM8 16a2 2 0 104 0 2 2 0 00-4 0z"/></svg>
                        </button>
                        {openMenuId === reservation.id && (
                          <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20" onClick={(e)=>e.stopPropagation()}>
                            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700" onClick={()=>{acceptReservation(reservation.id); setOpenMenuId(null);}}>Accept</button>
                            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700" onClick={()=>{declineReservation(reservation.id); setOpenMenuId(null);}}>Decline</button>
                            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700" onClick={()=>{sendMessage(reservation.id); setOpenMenuId(null);}}>Send Message</button>
                            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700" onClick={()=>{changeTable(reservation.id); setOpenMenuId(null);}}>Change Table</button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Time</span>
                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                          {formatTime(reservation.time)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Table</span>
                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                          {reservation.tableNumber ? `Table ${reservation.tableNumber}` : 'Auto-assign'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Prepay</span>
                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                          €{prepaymentAmount}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Status</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${reservationStatus.color}`}>
                          {reservationStatus.status}
                        </span>
                      </div>

                      {reservation.specialRequests && (
                        <div className="mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Special: {reservation.specialRequests}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-center">
              <div className="text-4xl mb-4">📅</div>
              <p className="text-gray-500 dark:text-gray-400">No reservations for this day</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Day View
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage reservations for {formatDate(selectedDate)}
              </p>
            </div>
            <button 
              onClick={() => setShowManualReservationModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              New Reservation
            </button>
          </div>

          {/* Enhanced Day Navigation */}
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={goToPreviousDay}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatDate(selectedDate)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {isToday && 'Today'}
                  {isTomorrow && 'Tomorrow'}
                  {isYesterday && 'Yesterday'}
                  {!isToday && !isTomorrow && !isYesterday && 'Selected Day'}
                </div>
              </div>
              
              <button
                onClick={goToNextDay}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={goToToday}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  isToday
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Today
              </button>
              
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Business Intelligence Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Guests</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{businessMetrics.totalGuests}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {businessMetrics.freeCouverts} free couverts
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Occupancy Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{businessMetrics.occupancyRate.toFixed(1)}%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${Math.min(businessMetrics.occupancyRate, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Projected Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">€{businessMetrics.projectedRevenue}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  €{businessMetrics.prepaymentTotal} prepaid
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Special Events</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{businessMetrics.specialEvents}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎉</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {businessMetrics.vipGuests} VIP guests
                </span>
              </div>
            </div>
          </div>

          {/* Alerts & Notifications */}
          {(businessMetrics.allergyWarnings > 0 || businessMetrics.vipGuests > 0) && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Important Notifications
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <ul className="list-disc list-inside space-y-1">
                      {businessMetrics.allergyWarnings > 0 && (
                        <li>{businessMetrics.allergyWarnings} reservations with dietary restrictions</li>
                      )}
                      {businessMetrics.vipGuests > 0 && (
                        <li>{businessMetrics.vipGuests} VIP guests arriving today</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Top Tabs (only additional sections) */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
            <nav className="flex space-x-8">
              {[
                { id: 'events', label: 'Special Events', icon: '🎉' },
                { id: 'payments', label: 'Payment Tracking', icon: '💳' },
                { id: 'settings', label: 'Daily Settings', icon: '⚙️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content (non-duplicate sections) */}
          {activeTab === 'events' && <SpecialEvents />}
          {activeTab === 'payments' && <PaymentTracking />}
          {activeTab === 'settings' && <DailySettings />}

          {/* Combined View: Time Grid + Floorplan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TimeGrid />
            <TableFloorplan />
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">Add Walk-in</div>
              </button>
              <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="text-2xl mb-2">📱</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">Send Reminders</div>
              </button>
              <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="text-2xl mb-2">💬</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">Chatwoot Inbox</div>
              </button>
              <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">Daily Report</div>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {[
                { id: 'timeline', label: 'Time Grid', icon: '⏰' },
                { id: 'tables', label: 'Table Management', icon: '🪑' },
                { id: 'events', label: 'Special Events', icon: '🎉' },
                { id: 'payments', label: 'Payment Tracking', icon: '💳' },
                { id: 'settings', label: 'Daily Settings', icon: '⚙️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'timeline' && <TimeGrid />}
          {activeTab === 'tables' && <TableFloorplan />}
          {activeTab === 'events' && <SpecialEvents />}
          {activeTab === 'payments' && <PaymentTracking />}
          {activeTab === 'settings' && <DailySettings />}
        </div>
      </div>

      {/* Modals */}
      <ManualReservationModal
        isOpen={showManualReservationModal}
        onClose={() => setShowManualReservationModal(false)}
        selectedDate={selectedDate}
      />
      {selectedReservationId && (
        <ReservationDetail reservationId={selectedReservationId} onClose={()=>setSelectedReservationId(null)} />
      )}
    </div>
  );
};

export default DayView;
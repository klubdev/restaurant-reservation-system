'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import RestaurantDashboard from '@/components/restaurant/dashboard/RestaurantDashboard';
import ReservationCalendar from '@/components/restaurant/calendar/ReservationCalendar';
import DayView from '@/components/restaurant/day-view/DayView';
import GuestOverview from '@/components/restaurant/guests/GuestOverview';
import RestaurantSettings from '@/components/restaurant/settings/RestaurantSettings';
import NewReservations from '@/components/restaurant/reservations/NewReservations';
import Prepayments from '@/components/restaurant/prepayments/Prepayments';
import GiftCards from '@/components/restaurant/gift-cards/GiftCards';
import KanbanBoard from '@/components/restaurant/kanban/KanbanBoard';
import ReservationDetail from '@/components/restaurant/reservation/ReservationDetail';
import GuestDetail from '@/components/restaurant/guests/GuestDetail';

type RestaurantPage = 'dashboard' | 'calendar' | 'day-view' | 'guests' | 'reservations' | 'prepayments' | 'gift-cards' | 'tasks' | 'settings';

const RestaurantPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const [activePage, setActivePage] = useState<RestaurantPage>('dashboard');
  const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);

  // Handle URL parameters for different views
  useEffect(() => {
    const view = searchParams.get('view');
    if (view && ['dashboard', 'calendar', 'day-view', 'guests', 'reservations', 'prepayments', 'gift-cards', 'tasks', 'settings'].includes(view)) {
      setActivePage(view as RestaurantPage);
    }
  }, [searchParams]);


  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <RestaurantDashboard />;
      case 'calendar':
        return <ReservationCalendar />;
      case 'day-view':
        return <DayView />;
      case 'guests':
        return <GuestOverview onGuestSelect={setSelectedGuestId} />;
      case 'reservations':
        return <NewReservations />;
      case 'prepayments':
        return <Prepayments />;
      case 'gift-cards':
        return <GiftCards />;
      case 'tasks':
        return <KanbanBoard />;
      case 'settings':
        return <RestaurantSettings />;
      default:
        return <RestaurantDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </div>

      {/* Modals */}
      {selectedReservationId && (
        <ReservationDetail
          reservationId={selectedReservationId}
          onClose={() => setSelectedReservationId(null)}
        />
      )}
      
      {selectedGuestId && (
        <GuestDetail
          guestId={selectedGuestId}
          onClose={() => setSelectedGuestId(null)}
        />
      )}
    </div>
  );
};

const RestaurantPage: React.FC = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading restaurant system...</p>
      </div>
    </div>}>
      <RestaurantPageContent />
    </Suspense>
  );
};

export default RestaurantPage;

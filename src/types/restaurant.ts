export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  dietaryRestrictions?: string[];
  notes?: string;
  vipStatus: boolean;
  totalSpent?: number;
  visitCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id: string;
  guestId: string;
  guest: Guest;
  date: string;
  time: string;
  partySize: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'no-show' | 'completed';
  tableNumber?: string;
  specialRequests?: string;
  internalComments?: string;
  source: 'phone' | 'online' | 'walk-in' | 'repeat';
  estimatedDuration: number; // in minutes
  actualArrivalTime?: string;
  actualDepartureTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Table {
  id: string;
  number: string;
  capacity: number;
  location: 'main' | 'patio' | 'private' | 'bar';
  isAvailable: boolean;
  features: string[]; // e.g., ['window', 'booth', 'wheelchair-accessible']
}

export interface RestaurantSettings {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  defaultReservationDuration: number; // in minutes
  maxPartySize: number;
  advanceBookingDays: number;
  cancellationPolicy: string;
  depositRequired: boolean;
  depositAmount?: number;
  autoConfirmReservations: boolean;
  sendReminders: boolean;
  reminderTime: number; // hours before reservation
  totalCapacity: number; // Total restaurant capacity
  prepaymentAmount: number; // Prepayment amount per guest
}

export interface Visit {
  id: string;
  guestId: string;
  reservationId: string;
  date: string;
  partySize: number;
  totalSpent: number;
  rating?: number;
  feedback?: string;
  serverName?: string;
  tableNumber?: string;
}

export interface Prepayment {
  id: string;
  guestId: string;
  guest: Guest;
  reservationId: string;
  reservation: Reservation;
  amount: number;
  paymentMethod: 'credit_card' | 'bank_transfer' | 'cash' | 'paypal' | 'other';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentDate: string;
  refundedDate?: string;
  refundAmount?: number;
  transactionId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'staff' | 'host' | 'server' | 'kitchen';
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  assignedUser?: User;
  reservationId?: string;
  reservation?: Reservation;
  dueDate?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  createdByUser?: User;
}

export interface EmailTemplate {
  id: string;
  name: string;
  type: 'restaurant_new_reservation' | 'restaurant_cancelled_reservation' | 'guest_new_reservation' | 'guest_accepted_reservation' | 'guest_declined_reservation';
  subject: string;
  body: string;
  isActive: boolean;
  variables: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GiftCard {
  id: string;
  code: string;
  amount: number;
  currency: 'EUR';
  remainingBalance: number;
  status: 'active' | 'redeemed' | 'expired' | 'void';
  issuedToGuestId?: string;
  issuedToGuest?: Guest;
  purchaserName?: string;
  purchaserEmail?: string;
  message?: string;
  issuedDate: string;
  expiryDate?: string;
  redeemedReservationId?: string;
  redeemedReservation?: Reservation;
  redeemedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GiftCardSale {
  id: string;
  giftCardId: string;
  giftCard: GiftCard;
  saleAmount: number;
  paymentMethod: 'credit_card' | 'bank_transfer' | 'cash' | 'paypal' | 'other';
  purchaserName: string;
  purchaserEmail: string;
  saleDate: string;
}

export interface DashboardMetrics {
  totalReservations: number;
  confirmedReservations: number;
  pendingReservations: number;
  cancelledReservations: number;
  noShowReservations: number;
  totalRevenue: number;
  averagePartySize: number;
  occupancyRate: number;
  topGuests: Guest[];
  popularTimes: { time: string; count: number }[];
}

export interface ReservationFilters {
  date?: string;
  status?: string;
  partySize?: number;
  source?: string;
  tableNumber?: string;
  guestName?: string;
}

import { Guest, Reservation, Table, RestaurantSettings, Visit, DashboardMetrics, Prepayment, User, Task, EmailTemplate } from '@/types/restaurant';

export const mockGuests: Guest[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    dateOfBirth: '1985-03-15',
    dietaryRestrictions: ['vegetarian'],
    notes: 'Prefers quiet tables, wine enthusiast',
    vipStatus: true,
    totalSpent: 1250.00,
    visitCount: 8,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@email.com',
    phone: '+1-555-0124',
    dateOfBirth: '1990-07-22',
    dietaryRestrictions: ['gluten-free'],
    notes: 'Business dinners, prefers private tables',
    vipStatus: false,
    totalSpent: 890.50,
    visitCount: 5,
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'mike.brown@email.com',
    phone: '+1-555-0125',
    dateOfBirth: '1978-11-08',
    notes: 'Regular customer, loves wine, sommelier knowledge',
    vipStatus: true,
    totalSpent: 2100.75,
    visitCount: 12,
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-10T09:15:00Z'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@email.com',
    phone: '+1-555-0126',
    dateOfBirth: '1992-04-12',
    dietaryRestrictions: ['vegan', 'nut-allergy'],
    notes: 'Health-conscious, brings friends for special occasions',
    vipStatus: false,
    totalSpent: 650.25,
    visitCount: 4,
    createdAt: '2024-01-25T16:45:00Z',
    updatedAt: '2024-01-25T16:45:00Z'
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@email.com',
    phone: '+1-555-0127',
    dateOfBirth: '1988-09-30',
    notes: 'First-time visitor, interested in chef\'s table',
    vipStatus: false,
    totalSpent: 0,
    visitCount: 0,
    createdAt: '2024-01-28T11:20:00Z',
    updatedAt: '2024-01-28T11:20:00Z'
  },
  {
    id: '6',
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@email.com',
    phone: '+1-555-0128',
    dateOfBirth: '1983-12-05',
    dietaryRestrictions: ['dairy-free'],
    notes: 'Anniversary celebrations, prefers window tables',
    vipStatus: true,
    totalSpent: 1680.00,
    visitCount: 9,
    createdAt: '2024-01-05T08:30:00Z',
    updatedAt: '2024-01-05T08:30:00Z'
  },
  {
    id: '7',
    firstName: 'Robert',
    lastName: 'Taylor',
    email: 'robert.taylor@email.com',
    phone: '+1-555-0129',
    dateOfBirth: '1975-06-18',
    notes: 'Business client, frequent large group dinners',
    vipStatus: true,
    totalSpent: 3200.50,
    visitCount: 15,
    createdAt: '2024-01-02T12:00:00Z',
    updatedAt: '2024-01-02T12:00:00Z'
  },
  {
    id: '8',
    firstName: 'Jennifer',
    lastName: 'Martinez',
    email: 'jennifer.martinez@email.com',
    phone: '+1-555-0130',
    dateOfBirth: '1991-02-14',
    dietaryRestrictions: ['kosher'],
    notes: 'Valentine\'s Day regular, loves romantic atmosphere',
    vipStatus: false,
    totalSpent: 750.00,
    visitCount: 6,
    createdAt: '2024-01-18T15:20:00Z',
    updatedAt: '2024-01-18T15:20:00Z'
  },
  {
    id: '9',
    firstName: 'Christopher',
    lastName: 'Garcia',
    email: 'chris.garcia@email.com',
    phone: '+1-555-0131',
    dateOfBirth: '1987-08-25',
    notes: 'Wine collector, interested in tastings',
    vipStatus: false,
    totalSpent: 1100.25,
    visitCount: 7,
    createdAt: '2024-01-12T10:45:00Z',
    updatedAt: '2024-01-12T10:45:00Z'
  },
  {
    id: '10',
    firstName: 'Amanda',
    lastName: 'White',
    email: 'amanda.white@email.com',
    phone: '+1-555-0132',
    dateOfBirth: '1994-01-03',
    dietaryRestrictions: ['halal'],
    notes: 'Birthday celebrations, loves desserts',
    vipStatus: false,
    totalSpent: 420.75,
    visitCount: 3,
    createdAt: '2024-01-30T13:15:00Z',
    updatedAt: '2024-01-30T13:15:00Z'
  },
  {
    id: '11',
    firstName: 'James',
    lastName: 'Lee',
    email: 'james.lee@email.com',
    phone: '+1-555-0133',
    dateOfBirth: '1980-05-20',
    notes: 'Chef\'s table enthusiast, food blogger',
    vipStatus: true,
    totalSpent: 1950.00,
    visitCount: 10,
    createdAt: '2024-01-08T11:30:00Z',
    updatedAt: '2024-01-08T11:30:00Z'
  },
  {
    id: '12',
    firstName: 'Michelle',
    lastName: 'Clark',
    email: 'michelle.clark@email.com',
    phone: '+1-555-0134',
    dateOfBirth: '1986-10-12',
    dietaryRestrictions: ['low-sodium'],
    notes: 'Health-focused, prefers early dining',
    vipStatus: false,
    totalSpent: 680.50,
    visitCount: 5,
    createdAt: '2024-01-22T09:00:00Z',
    updatedAt: '2024-01-22T09:00:00Z'
  },
  {
    id: '13',
    firstName: 'Daniel',
    lastName: 'Rodriguez',
    email: 'daniel.rodriguez@email.com',
    phone: '+1-555-0135',
    dateOfBirth: '1979-03-28',
    notes: 'Corporate events organizer',
    vipStatus: true,
    totalSpent: 2800.75,
    visitCount: 18,
    createdAt: '2024-01-03T14:45:00Z',
    updatedAt: '2024-01-03T14:45:00Z'
  },
  {
    id: '14',
    firstName: 'Ashley',
    lastName: 'Lewis',
    email: 'ashley.lewis@email.com',
    phone: '+1-555-0136',
    dateOfBirth: '1993-07-15',
    dietaryRestrictions: ['shellfish-allergy'],
    notes: 'Date nights, prefers intimate tables',
    vipStatus: false,
    totalSpent: 520.00,
    visitCount: 4,
    createdAt: '2024-01-26T16:30:00Z',
    updatedAt: '2024-01-26T16:30:00Z'
  },
  {
    id: '15',
    firstName: 'Matthew',
    lastName: 'Walker',
    email: 'matthew.walker@email.com',
    phone: '+1-555-0137',
    dateOfBirth: '1984-11-22',
    notes: 'Wine tasting events, sommelier connections',
    vipStatus: false,
    totalSpent: 1350.25,
    visitCount: 8,
    createdAt: '2024-01-14T12:15:00Z',
    updatedAt: '2024-01-14T12:15:00Z'
  }
];

export const mockTables: Table[] = [
  { id: '1', number: '1', capacity: 2, location: 'main', isAvailable: true, features: ['window'] },
  { id: '2', number: '2', capacity: 4, location: 'main', isAvailable: true, features: ['booth'] },
  { id: '3', number: '3', capacity: 6, location: 'main', isAvailable: false, features: ['round'] },
  { id: '4', number: '4', capacity: 2, location: 'patio', isAvailable: true, features: ['outdoor'] },
  { id: '5', number: '5', capacity: 8, location: 'private', isAvailable: true, features: ['private', 'soundproof'] },
  { id: '6', number: '6', capacity: 4, location: 'bar', isAvailable: true, features: ['bar-height'] },
  { id: '7', number: '7', capacity: 2, location: 'main', isAvailable: true, features: ['wheelchair-accessible'] },
  { id: '8', number: '8', capacity: 4, location: 'patio', isAvailable: true, features: ['outdoor', 'heating'] },
  { id: '9', number: '9', capacity: 6, location: 'main', isAvailable: true, features: ['window', 'romantic'] },
  { id: '10', number: '10', capacity: 4, location: 'private', isAvailable: true, features: ['private', 'business'] },
  { id: '11', number: '11', capacity: 2, location: 'main', isAvailable: true, features: ['quiet'] },
  { id: '12', number: '12', capacity: 8, location: 'main', isAvailable: true, features: ['large-group'] }
];

// Generate dates for the next 30 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const dates = generateDates();

export const mockReservations: Reservation[] = [
  // Today's reservations
  {
    id: '1',
    guestId: '1',
    guest: mockGuests[0],
    date: dates[0],
    time: '19:00',
    partySize: 2,
    status: 'confirmed',
    tableNumber: '1',
    specialRequests: 'Anniversary dinner, please prepare a special dessert',
    internalComments: 'VIP customer, ensure best service',
    source: 'phone',
    estimatedDuration: 120,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z'
  },
  {
    id: '2',
    guestId: '2',
    guest: mockGuests[1],
    date: dates[0],
    time: '20:30',
    partySize: 4,
    status: 'pending',
    tableNumber: '2',
    specialRequests: 'Gluten-free menu required',
    source: 'online',
    estimatedDuration: 90,
    createdAt: '2024-02-12T14:30:00Z',
    updatedAt: '2024-02-12T14:30:00Z'
  },
  {
    id: '3',
    guestId: '6',
    guest: mockGuests[5],
    date: dates[0],
    time: '18:30',
    partySize: 2,
    status: 'confirmed',
    tableNumber: '9',
    specialRequests: 'Window table preferred, dairy-free options',
    internalComments: 'VIP customer, anniversary celebration',
    source: 'phone',
    estimatedDuration: 150,
    createdAt: '2024-02-08T16:20:00Z',
    updatedAt: '2024-02-08T16:20:00Z'
  },
  {
    id: '4',
    guestId: '7',
    guest: mockGuests[6],
    date: dates[0],
    time: '19:30',
    partySize: 8,
    status: 'confirmed',
    tableNumber: '12',
    specialRequests: 'Business dinner, private area preferred',
    internalComments: 'High-value corporate client',
    source: 'phone',
    estimatedDuration: 180,
    createdAt: '2024-02-11T09:15:00Z',
    updatedAt: '2024-02-11T09:15:00Z'
  },

  // Tomorrow's reservations
  {
    id: '5',
    guestId: '3',
    guest: mockGuests[2],
    date: dates[1],
    time: '18:30',
    partySize: 2,
    status: 'confirmed',
    tableNumber: '6',
    specialRequests: 'Wine pairing recommendations',
    internalComments: 'Regular customer, knows the menu well',
    source: 'repeat',
    estimatedDuration: 150,
    createdAt: '2024-02-08T16:20:00Z',
    updatedAt: '2024-02-08T16:20:00Z'
  },
  {
    id: '6',
    guestId: '4',
    guest: mockGuests[3],
    date: dates[1],
    time: '19:30',
    partySize: 6,
    status: 'confirmed',
    tableNumber: '3',
    specialRequests: 'Vegan options and nut-free preparation',
    source: 'online',
    estimatedDuration: 120,
    createdAt: '2024-02-11T09:15:00Z',
    updatedAt: '2024-02-11T09:15:00Z'
  },
  {
    id: '7',
    guestId: '8',
    guest: mockGuests[7],
    date: dates[1],
    time: '20:00',
    partySize: 2,
    status: 'pending',
    tableNumber: '9',
    specialRequests: 'Romantic dinner, kosher menu',
    source: 'online',
    estimatedDuration: 120,
    createdAt: '2024-02-13T11:45:00Z',
    updatedAt: '2024-02-13T11:45:00Z'
  },
  {
    id: '8',
    guestId: '9',
    guest: mockGuests[8],
    date: dates[1],
    time: '19:00',
    partySize: 4,
    status: 'confirmed',
    tableNumber: '2',
    specialRequests: 'Wine tasting experience',
    internalComments: 'Wine enthusiast, recommend premium selections',
    source: 'phone',
    estimatedDuration: 180,
    createdAt: '2024-02-09T14:20:00Z',
    updatedAt: '2024-02-09T14:20:00Z'
  },

  // Day after tomorrow
  {
    id: '9',
    guestId: '11',
    guest: mockGuests[10],
    date: dates[2],
    time: '18:00',
    partySize: 6,
    status: 'confirmed',
    tableNumber: '5',
    specialRequests: 'Chef\'s table experience, food blogger',
    internalComments: 'Influencer, ensure exceptional experience',
    source: 'online',
    estimatedDuration: 240,
    createdAt: '2024-02-07T12:30:00Z',
    updatedAt: '2024-02-07T12:30:00Z'
  },
  {
    id: '10',
    guestId: '12',
    guest: mockGuests[11],
    date: dates[2],
    time: '17:30',
    partySize: 2,
    status: 'confirmed',
    tableNumber: '11',
    specialRequests: 'Low-sodium menu, early dining',
    source: 'phone',
    estimatedDuration: 90,
    createdAt: '2024-02-10T08:45:00Z',
    updatedAt: '2024-02-10T08:45:00Z'
  },
  {
    id: '11',
    guestId: '13',
    guest: mockGuests[12],
    date: dates[2],
    time: '19:00',
    partySize: 10,
    status: 'confirmed',
    tableNumber: '12',
    specialRequests: 'Corporate event, presentation setup needed',
    internalComments: 'Large corporate group, high revenue potential',
    source: 'phone',
    estimatedDuration: 180,
    createdAt: '2024-02-05T15:00:00Z',
    updatedAt: '2024-02-05T15:00:00Z'
  },

  // Weekend reservations
  {
    id: '12',
    guestId: '14',
    guest: mockGuests[13],
    date: dates[3],
    time: '20:00',
    partySize: 2,
    status: 'confirmed',
    tableNumber: '9',
    specialRequests: 'Date night, intimate atmosphere, shellfish allergy',
    source: 'online',
    estimatedDuration: 120,
    createdAt: '2024-02-12T10:30:00Z',
    updatedAt: '2024-02-12T10:30:00Z'
  },
  {
    id: '13',
    guestId: '15',
    guest: mockGuests[14],
    date: dates[3],
    time: '19:30',
    partySize: 4,
    status: 'pending',
    tableNumber: '2',
    specialRequests: 'Wine tasting event, sommelier consultation',
    source: 'phone',
    estimatedDuration: 150,
    createdAt: '2024-02-13T16:15:00Z',
    updatedAt: '2024-02-13T16:15:00Z'
  },

  // Special events
  {
    id: '14',
    guestId: '8',
    guest: mockGuests[7],
    date: dates[4],
    time: '19:00',
    partySize: 2,
    status: 'confirmed',
    tableNumber: '9',
    specialRequests: 'Valentine\'s Day dinner, romantic setup, kosher menu',
    internalComments: 'Valentine\'s Day special, ensure romantic atmosphere',
    source: 'online',
    estimatedDuration: 150,
    createdAt: '2024-02-01T12:00:00Z',
    updatedAt: '2024-02-01T12:00:00Z'
  },
  {
    id: '15',
    guestId: '1',
    guest: mockGuests[0],
    date: dates[4],
    time: '20:30',
    partySize: 2,
    status: 'confirmed',
    tableNumber: '1',
    specialRequests: 'Valentine\'s Day dinner, vegetarian menu, wine pairing',
    internalComments: 'VIP customer, Valentine\'s Day celebration',
    source: 'phone',
    estimatedDuration: 180,
    createdAt: '2024-02-01T14:30:00Z',
    updatedAt: '2024-02-01T14:30:00Z'
  },

  // Wine tasting events
  {
    id: '16',
    guestId: '3',
    guest: mockGuests[2],
    date: dates[5],
    time: '18:00',
    partySize: 6,
    status: 'confirmed',
    tableNumber: '5',
    specialRequests: 'Wine tasting event, premium selection',
    internalComments: 'Wine expert, recommend rare bottles',
    source: 'phone',
    estimatedDuration: 240,
    createdAt: '2024-02-02T11:00:00Z',
    updatedAt: '2024-02-02T11:00:00Z'
  },
  {
    id: '17',
    guestId: '9',
    guest: mockGuests[8],
    date: dates[5],
    time: '19:30',
    partySize: 4,
    status: 'confirmed',
    tableNumber: '2',
    specialRequests: 'Wine tasting, collector interested in rare wines',
    source: 'online',
    estimatedDuration: 180,
    createdAt: '2024-02-03T13:45:00Z',
    updatedAt: '2024-02-03T13:45:00Z'
  },

  // More diverse reservations across the week
  {
    id: '18',
    guestId: '5',
    guest: mockGuests[4],
    date: dates[6],
    time: '20:00',
    partySize: 2,
    status: 'cancelled',
    source: 'phone',
    estimatedDuration: 90,
    createdAt: '2024-02-13T11:45:00Z',
    updatedAt: '2024-02-13T11:45:00Z'
  },
  {
    id: '19',
    guestId: '10',
    guest: mockGuests[9],
    date: dates[6],
    time: '19:00',
    partySize: 4,
    status: 'confirmed',
    tableNumber: '3',
    specialRequests: 'Birthday celebration, halal menu, dessert special',
    internalComments: 'Birthday celebration, prepare special dessert',
    source: 'online',
    estimatedDuration: 120,
    createdAt: '2024-02-11T16:20:00Z',
    updatedAt: '2024-02-11T16:20:00Z'
  },
  {
    id: '20',
    guestId: '2',
    guest: mockGuests[1],
    date: dates[7],
    time: '18:30',
    partySize: 6,
    status: 'pending',
    tableNumber: '3',
    specialRequests: 'Business dinner, gluten-free options, private area',
    source: 'phone',
    estimatedDuration: 150,
    createdAt: '2024-02-12T14:30:00Z',
    updatedAt: '2024-02-12T14:30:00Z'
  },
  {
    id: '21',
    guestId: '6',
    guest: mockGuests[5],
    date: dates[7],
    time: '20:00',
    partySize: 2,
    status: 'confirmed',
    tableNumber: '9',
    specialRequests: 'Anniversary dinner, window table, dairy-free menu',
    internalComments: 'VIP customer, anniversary celebration',
    source: 'phone',
    estimatedDuration: 150,
    createdAt: '2024-02-10T15:30:00Z',
    updatedAt: '2024-02-10T15:30:00Z'
  },
  {
    id: '22',
    guestId: '7',
    guest: mockGuests[6],
    date: dates[8],
    time: '19:00',
    partySize: 8,
    status: 'confirmed',
    tableNumber: '12',
    specialRequests: 'Corporate event, presentation setup, business menu',
    internalComments: 'High-value corporate client, ensure professional service',
    source: 'phone',
    estimatedDuration: 180,
    createdAt: '2024-02-08T12:00:00Z',
    updatedAt: '2024-02-08T12:00:00Z'
  },
  {
    id: '23',
    guestId: '11',
    guest: mockGuests[10],
    date: dates[8],
    time: '18:00',
    partySize: 4,
    status: 'confirmed',
    tableNumber: '5',
    specialRequests: 'Chef\'s table experience, food photography',
    internalComments: 'Food blogger, ensure Instagram-worthy presentation',
    source: 'online',
    estimatedDuration: 200,
    createdAt: '2024-02-09T10:15:00Z',
    updatedAt: '2024-02-09T10:15:00Z'
  },
  {
    id: '24',
    guestId: '12',
    guest: mockGuests[11],
    date: dates[9],
    time: '17:30',
    partySize: 2,
    status: 'confirmed',
    tableNumber: '11',
    specialRequests: 'Early dining, low-sodium menu, quiet table',
    source: 'phone',
    estimatedDuration: 90,
    createdAt: '2024-02-11T09:30:00Z',
    updatedAt: '2024-02-11T09:30:00Z'
  },
  {
    id: '25',
    guestId: '13',
    guest: mockGuests[12],
    date: dates[9],
    time: '19:30',
    partySize: 12,
    status: 'confirmed',
    tableNumber: '12',
    specialRequests: 'Large corporate group, private dining, presentation',
    internalComments: 'Major corporate client, high revenue potential',
    source: 'phone',
    estimatedDuration: 200,
    createdAt: '2024-02-06T14:45:00Z',
    updatedAt: '2024-02-06T14:45:00Z'
  },

  // More reservations for the following week
  {
    id: '26',
    guestId: '14',
    guest: mockGuests[13],
    date: dates[10],
    time: '20:30',
    partySize: 2,
    status: 'pending',
    tableNumber: '9',
    specialRequests: 'Date night, intimate atmosphere, shellfish allergy',
    source: 'online',
    estimatedDuration: 120,
    createdAt: '2024-02-13T18:20:00Z',
    updatedAt: '2024-02-13T18:20:00Z'
  },
  {
    id: '27',
    guestId: '15',
    guest: mockGuests[14],
    date: dates[10],
    time: '19:00',
    partySize: 6,
    status: 'confirmed',
    tableNumber: '3',
    specialRequests: 'Wine tasting event, sommelier consultation',
    internalComments: 'Wine enthusiast, recommend premium selections',
    source: 'phone',
    estimatedDuration: 180,
    createdAt: '2024-02-12T11:30:00Z',
    updatedAt: '2024-02-12T11:30:00Z'
  },
  {
    id: '28',
    guestId: '1',
    guest: mockGuests[0],
    date: dates[11],
    time: '19:30',
    partySize: 2,
    status: 'confirmed',
    tableNumber: '1',
    specialRequests: 'Regular dinner, vegetarian menu, wine pairing',
    internalComments: 'VIP customer, regular visit',
    source: 'phone',
    estimatedDuration: 120,
    createdAt: '2024-02-13T16:45:00Z',
    updatedAt: '2024-02-13T16:45:00Z'
  },
  {
    id: '29',
    guestId: '3',
    guest: mockGuests[2],
    date: dates[11],
    time: '18:30',
    partySize: 2,
    status: 'confirmed',
    tableNumber: '6',
    specialRequests: 'Wine pairing, sommelier consultation',
    internalComments: 'Wine expert, regular customer',
    source: 'repeat',
    estimatedDuration: 150,
    createdAt: '2024-02-13T14:20:00Z',
    updatedAt: '2024-02-13T14:20:00Z'
  },
  {
    id: '30',
    guestId: '8',
    guest: mockGuests[7],
    date: dates[12],
    time: '20:00',
    partySize: 2,
    status: 'confirmed',
    tableNumber: '9',
    specialRequests: 'Romantic dinner, kosher menu, window table',
    source: 'online',
    estimatedDuration: 120,
    createdAt: '2024-02-13T12:15:00Z',
    updatedAt: '2024-02-13T12:15:00Z'
  }
];

export const mockVisits: Visit[] = [
  {
    id: '1',
    guestId: '1',
    reservationId: '1',
    date: '2024-01-15',
    partySize: 2,
    totalSpent: 185.50,
    rating: 5,
    feedback: 'Excellent service and food quality',
    serverName: 'Alice Johnson',
    tableNumber: '1'
  },
  {
    id: '2',
    guestId: '2',
    reservationId: '2',
    date: '2024-01-20',
    partySize: 4,
    totalSpent: 320.75,
    rating: 4,
    feedback: 'Great atmosphere, food was good',
    serverName: 'Bob Smith',
    tableNumber: '2'
  },
  {
    id: '3',
    guestId: '3',
    reservationId: '3',
    date: '2024-01-10',
    partySize: 2,
    totalSpent: 245.00,
    rating: 5,
    feedback: 'Perfect wine selection',
    serverName: 'Alice Johnson',
    tableNumber: '6'
  },
  {
    id: '4',
    guestId: '1',
    reservationId: '4',
    date: '2024-01-22',
    partySize: 2,
    totalSpent: 195.25,
    rating: 5,
    feedback: 'Outstanding vegetarian options',
    serverName: 'Carol Davis',
    tableNumber: '1'
  },
  {
    id: '5',
    guestId: '3',
    reservationId: '5',
    date: '2024-01-25',
    partySize: 2,
    totalSpent: 280.00,
    rating: 5,
    feedback: 'Exceptional wine pairing',
    serverName: 'Alice Johnson',
    tableNumber: '6'
  },
  {
    id: '6',
    guestId: '6',
    reservationId: '6',
    date: '2024-01-18',
    partySize: 2,
    totalSpent: 220.50,
    rating: 5,
    feedback: 'Perfect anniversary dinner',
    serverName: 'Bob Smith',
    tableNumber: '9'
  },
  {
    id: '7',
    guestId: '7',
    reservationId: '7',
    date: '2024-01-12',
    partySize: 8,
    totalSpent: 850.75,
    rating: 4,
    feedback: 'Great for business dinners',
    serverName: 'Carol Davis',
    tableNumber: '12'
  },
  {
    id: '8',
    guestId: '11',
    reservationId: '8',
    date: '2024-01-28',
    partySize: 6,
    totalSpent: 450.00,
    rating: 5,
    feedback: 'Chef\'s table was amazing',
    serverName: 'Alice Johnson',
    tableNumber: '5'
  }
];

export const mockRestaurantSettings: RestaurantSettings = {
  id: '1',
  name: 'Bella Vista Restaurant',
  address: '123 Main Street, Downtown, NY 10001',
  phone: '+1-555-RESTAURANT',
  email: 'info@bellavista.com',
  website: 'www.bellavista.com',
  operatingHours: {
    monday: { open: '17:00', close: '22:00', isOpen: true },
    tuesday: { open: '17:00', close: '22:00', isOpen: true },
    wednesday: { open: '17:00', close: '22:00', isOpen: true },
    thursday: { open: '17:00', close: '22:00', isOpen: true },
    friday: { open: '17:00', close: '23:00', isOpen: true },
    saturday: { open: '16:00', close: '23:00', isOpen: true },
    sunday: { open: '16:00', close: '21:00', isOpen: true }
  },
  defaultReservationDuration: 120,
  maxPartySize: 12,
  advanceBookingDays: 30,
  cancellationPolicy: 'Cancellations must be made at least 2 hours in advance',
  depositRequired: false,
  depositAmount: 25,
  autoConfirmReservations: true,
  sendReminders: true,
  reminderTime: 24,
  totalCapacity: 80, // Total restaurant capacity
  prepaymentAmount: 15 // Prepayment amount per guest
};

export const mockPrepayments: Prepayment[] = [
  {
    id: '1',
    guestId: '1',
    guest: mockGuests[0],
    reservationId: '1',
    reservation: mockReservations[0],
    amount: 30.00,
    paymentMethod: 'credit_card',
    paymentStatus: 'completed',
    paymentDate: '2024-02-10T10:30:00Z',
    transactionId: 'TXN_001_CC_20240210',
    notes: 'VIP customer prepayment',
    createdAt: '2024-02-10T10:30:00Z',
    updatedAt: '2024-02-10T10:30:00Z'
  },
  {
    id: '2',
    guestId: '2',
    guest: mockGuests[1],
    reservationId: '2',
    reservation: mockReservations[1],
    amount: 60.00,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'pending',
    paymentDate: '2024-02-12T14:45:00Z',
    transactionId: 'TXN_002_BT_20240212',
    notes: 'Awaiting bank confirmation',
    createdAt: '2024-02-12T14:45:00Z',
    updatedAt: '2024-02-12T14:45:00Z'
  },
  {
    id: '3',
    guestId: '3',
    guest: mockGuests[2],
    reservationId: '3',
    reservation: mockReservations[2],
    amount: 30.00,
    paymentMethod: 'credit_card',
    paymentStatus: 'completed',
    paymentDate: '2024-02-08T16:25:00Z',
    transactionId: 'TXN_003_CC_20240208',
    notes: 'Regular customer, wine enthusiast',
    createdAt: '2024-02-08T16:25:00Z',
    updatedAt: '2024-02-08T16:25:00Z'
  },
  {
    id: '4',
    guestId: '4',
    guest: mockGuests[3],
    reservationId: '4',
    reservation: mockReservations[3],
    amount: 90.00,
    paymentMethod: 'paypal',
    paymentStatus: 'completed',
    paymentDate: '2024-02-11T09:20:00Z',
    transactionId: 'TXN_004_PP_20240211',
    notes: 'Vegan group booking',
    createdAt: '2024-02-11T09:20:00Z',
    updatedAt: '2024-02-11T09:20:00Z'
  },
  {
    id: '5',
    guestId: '5',
    guest: mockGuests[4],
    reservationId: '5',
    reservation: mockReservations[4],
    amount: 30.00,
    paymentMethod: 'credit_card',
    paymentStatus: 'refunded',
    paymentDate: '2024-02-13T11:50:00Z',
    refundedDate: '2024-02-14T09:15:00Z',
    refundAmount: 30.00,
    transactionId: 'TXN_005_CC_20240213',
    notes: 'Cancelled reservation, full refund processed',
    createdAt: '2024-02-13T11:50:00Z',
    updatedAt: '2024-02-14T09:15:00Z'
  },
  {
    id: '6',
    guestId: '6',
    guest: mockGuests[5],
    reservationId: '6',
    reservation: mockReservations[5],
    amount: 30.00,
    paymentMethod: 'credit_card',
    paymentStatus: 'completed',
    paymentDate: '2024-02-08T16:25:00Z',
    transactionId: 'TXN_006_CC_20240208',
    notes: 'Anniversary celebration',
    createdAt: '2024-02-08T16:25:00Z',
    updatedAt: '2024-02-08T16:25:00Z'
  },
  {
    id: '7',
    guestId: '7',
    guest: mockGuests[6],
    reservationId: '7',
    reservation: mockReservations[6],
    amount: 120.00,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'completed',
    paymentDate: '2024-02-11T09:20:00Z',
    transactionId: 'TXN_007_BT_20240211',
    notes: 'Corporate group booking',
    createdAt: '2024-02-11T09:20:00Z',
    updatedAt: '2024-02-11T09:20:00Z'
  },
  {
    id: '8',
    guestId: '8',
    guest: mockGuests[7],
    reservationId: '8',
    reservation: mockReservations[7],
    amount: 30.00,
    paymentMethod: 'credit_card',
    paymentStatus: 'failed',
    paymentDate: '2024-02-13T11:50:00Z',
    transactionId: 'TXN_008_CC_20240213',
    notes: 'Card declined, customer to provide new payment method',
    createdAt: '2024-02-13T11:50:00Z',
    updatedAt: '2024-02-13T11:50:00Z'
  },
  {
    id: '9',
    guestId: '9',
    guest: mockGuests[8],
    reservationId: '9',
    reservation: mockReservations[8],
    amount: 60.00,
    paymentMethod: 'credit_card',
    paymentStatus: 'completed',
    paymentDate: '2024-02-09T14:25:00Z',
    transactionId: 'TXN_009_CC_20240209',
    notes: 'Wine tasting event',
    createdAt: '2024-02-09T14:25:00Z',
    updatedAt: '2024-02-09T14:25:00Z'
  },
  {
    id: '10',
    guestId: '10',
    guest: mockGuests[9],
    reservationId: '10',
    reservation: mockReservations[9],
    amount: 30.00,
    paymentMethod: 'cash',
    paymentStatus: 'completed',
    paymentDate: '2024-02-10T08:50:00Z',
    transactionId: 'TXN_010_CASH_20240210',
    notes: 'Cash payment at restaurant',
    createdAt: '2024-02-10T08:50:00Z',
    updatedAt: '2024-02-10T08:50:00Z'
  },
  {
    id: '11',
    guestId: '11',
    guest: mockGuests[10],
    reservationId: '11',
    reservation: mockReservations[10],
    amount: 90.00,
    paymentMethod: 'credit_card',
    paymentStatus: 'completed',
    paymentDate: '2024-02-07T12:35:00Z',
    transactionId: 'TXN_011_CC_20240207',
    notes: 'Chef\'s table experience',
    createdAt: '2024-02-07T12:35:00Z',
    updatedAt: '2024-02-07T12:35:00Z'
  },
  {
    id: '12',
    guestId: '12',
    guest: mockGuests[11],
    reservationId: '12',
    reservation: mockReservations[11],
    amount: 30.00,
    paymentMethod: 'credit_card',
    paymentStatus: 'completed',
    paymentDate: '2024-02-11T09:35:00Z',
    transactionId: 'TXN_012_CC_20240211',
    notes: 'Early dining preference',
    createdAt: '2024-02-11T09:35:00Z',
    updatedAt: '2024-02-11T09:35:00Z'
  },
  {
    id: '13',
    guestId: '13',
    guest: mockGuests[12],
    reservationId: '13',
    reservation: mockReservations[12],
    amount: 180.00,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'completed',
    paymentDate: '2024-02-05T15:05:00Z',
    transactionId: 'TXN_013_BT_20240205',
    notes: 'Large corporate group',
    createdAt: '2024-02-05T15:05:00Z',
    updatedAt: '2024-02-05T15:05:00Z'
  },
  {
    id: '14',
    guestId: '14',
    guest: mockGuests[13],
    reservationId: '14',
    reservation: mockReservations[13],
    amount: 30.00,
    paymentMethod: 'credit_card',
    paymentStatus: 'completed',
    paymentDate: '2024-02-12T10:35:00Z',
    transactionId: 'TXN_014_CC_20240212',
    notes: 'Date night reservation',
    createdAt: '2024-02-12T10:35:00Z',
    updatedAt: '2024-02-12T10:35:00Z'
  },
  {
    id: '15',
    guestId: '15',
    guest: mockGuests[14],
    reservationId: '15',
    reservation: mockReservations[14],
    amount: 60.00,
    paymentMethod: 'credit_card',
    paymentStatus: 'pending',
    paymentDate: '2024-02-13T16:20:00Z',
    transactionId: 'TXN_015_CC_20240213',
    notes: 'Wine tasting event, payment processing',
    createdAt: '2024-02-13T16:20:00Z',
    updatedAt: '2024-02-13T16:20:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Eva',
    lastName: 'Eekman',
    email: 'eva.eekman@restaurant.com',
    role: 'admin',
    avatar: '/images/user/eva.jpg',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    firstName: 'Marco',
    lastName: 'van der Berg',
    email: 'marco.vandenberg@restaurant.com',
    role: 'manager',
    avatar: '/images/user/user-1.jpg',
    isActive: true,
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    firstName: 'Sophie',
    lastName: 'Jansen',
    email: 'sophie.jansen@restaurant.com',
    role: 'host',
    avatar: '/images/user/user-2.jpg',
    isActive: true,
    createdAt: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    firstName: 'Lars',
    lastName: 'de Vries',
    email: 'lars.devries@restaurant.com',
    role: 'server',
    avatar: '/images/user/user-3.jpg',
    isActive: true,
    createdAt: '2024-01-04T00:00:00Z'
  },
  {
    id: '5',
    firstName: 'Anna',
    lastName: 'Bakker',
    email: 'anna.bakker@restaurant.com',
    role: 'kitchen',
    avatar: '/images/user/user-4.jpg',
    isActive: true,
    createdAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '6',
    firstName: 'Tom',
    lastName: 'Mulder',
    email: 'tom.mulder@restaurant.com',
    role: 'staff',
    avatar: '/images/user/user-5.jpg',
    isActive: true,
    createdAt: '2024-01-06T00:00:00Z'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Prepare VIP table for Valentine\'s Dinner',
    description: 'Set up table 12 with special decorations, candles, and rose petals for the Valentine\'s dinner reservation at 19:30.',
    status: 'in-progress',
    priority: 'high',
    assignedTo: '4',
    assignedUser: mockUsers[3],
    reservationId: '1',
    reservation: mockReservations[0],
    dueDate: '2024-02-14T19:00:00Z',
    tags: ['VIP', 'Valentine\'s', 'Setup'],
    createdAt: '2024-02-14T10:00:00Z',
    updatedAt: '2024-02-14T10:00:00Z',
    createdBy: '1',
    createdByUser: mockUsers[0]
  },
  {
    id: '2',
    title: 'Check wine inventory for wine tasting',
    description: 'Verify that all wines for the wine tasting event are available and properly stored.',
    status: 'todo',
    priority: 'medium',
    assignedTo: '2',
    assignedUser: mockUsers[1],
    reservationId: '9',
    reservation: mockReservations[8],
    dueDate: '2024-02-15T14:00:00Z',
    tags: ['Wine', 'Inventory', 'Event'],
    createdAt: '2024-02-14T11:00:00Z',
    updatedAt: '2024-02-14T11:00:00Z',
    createdBy: '1',
    createdByUser: mockUsers[0]
  },
  {
    id: '3',
    title: 'Follow up on failed prepayment',
    description: 'Contact guest about failed credit card payment and arrange alternative payment method.',
    status: 'todo',
    priority: 'urgent',
    assignedTo: '3',
    assignedUser: mockUsers[2],
    reservationId: '8',
    reservation: mockReservations[7],
    dueDate: '2024-02-14T16:00:00Z',
    tags: ['Payment', 'Customer Service', 'Urgent'],
    createdAt: '2024-02-14T12:00:00Z',
    updatedAt: '2024-02-14T12:00:00Z',
    createdBy: '2',
    createdByUser: mockUsers[1]
  },
  {
    id: '4',
    title: 'Prepare special dietary requirements',
    description: 'Ensure kitchen is aware of vegan requirements for table 8 and prepare appropriate menu options.',
    status: 'done',
    priority: 'medium',
    assignedTo: '5',
    assignedUser: mockUsers[4],
    reservationId: '4',
    reservation: mockReservations[3],
    dueDate: '2024-02-14T18:00:00Z',
    tags: ['Dietary', 'Kitchen', 'Vegan'],
    createdAt: '2024-02-14T09:00:00Z',
    updatedAt: '2024-02-14T15:00:00Z',
    createdBy: '3',
    createdByUser: mockUsers[2]
  },
  {
    id: '5',
    title: 'Set up Chef\'s Table experience',
    description: 'Prepare the Chef\'s Table area with special seating and ensure all equipment is ready.',
    status: 'review',
    priority: 'high',
    assignedTo: '6',
    assignedUser: mockUsers[5],
    reservationId: '11',
    reservation: mockReservations[10],
    dueDate: '2024-02-14T19:00:00Z',
    tags: ['Chef\'s Table', 'Setup', 'Special Event'],
    createdAt: '2024-02-14T08:00:00Z',
    updatedAt: '2024-02-14T14:00:00Z',
    createdBy: '2',
    createdByUser: mockUsers[1]
  },
  {
    id: '6',
    title: 'Update reservation status',
    description: 'Mark the cancelled reservation as processed and update guest communication.',
    status: 'done',
    priority: 'low',
    assignedTo: '3',
    assignedUser: mockUsers[2],
    reservationId: '5',
    reservation: mockReservations[4],
    dueDate: '2024-02-14T12:00:00Z',
    tags: ['Administration', 'Cancellation'],
    createdAt: '2024-02-14T07:00:00Z',
    updatedAt: '2024-02-14T11:00:00Z',
    createdBy: '1',
    createdByUser: mockUsers[0]
  },
  {
    id: '7',
    title: 'Prepare anniversary celebration',
    description: 'Set up special decorations and arrange for complimentary dessert for the anniversary couple.',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: '4',
    assignedUser: mockUsers[3],
    reservationId: '6',
    reservation: mockReservations[5],
    dueDate: '2024-02-14T20:00:00Z',
    tags: ['Anniversary', 'Special Occasion', 'Dessert'],
    createdAt: '2024-02-14T13:00:00Z',
    updatedAt: '2024-02-14T13:00:00Z',
    createdBy: '3',
    createdByUser: mockUsers[2]
  },
  {
    id: '8',
    title: 'Check table availability for walk-ins',
    description: 'Review current reservations and identify potential tables for walk-in customers.',
    status: 'todo',
    priority: 'low',
    assignedTo: '3',
    assignedUser: mockUsers[2],
    dueDate: '2024-02-14T17:00:00Z',
    tags: ['Walk-ins', 'Table Management'],
    createdAt: '2024-02-14T14:00:00Z',
    updatedAt: '2024-02-14T14:00:00Z',
    createdBy: '2',
    createdByUser: mockUsers[1]
  },
  {
    id: '9',
    title: 'Prepare corporate group menu',
    description: 'Coordinate with kitchen for the large corporate group menu and special dietary requirements.',
    status: 'in-progress',
    priority: 'high',
    assignedTo: '5',
    assignedUser: mockUsers[4],
    reservationId: '13',
    reservation: mockReservations[12],
    dueDate: '2024-02-15T12:00:00Z',
    tags: ['Corporate', 'Menu', 'Large Group'],
    createdAt: '2024-02-14T10:30:00Z',
    updatedAt: '2024-02-14T10:30:00Z',
    createdBy: '2',
    createdByUser: mockUsers[1]
  },
  {
    id: '10',
    title: 'Update restaurant website',
    description: 'Add new seasonal menu items to the website and update pricing information.',
    status: 'todo',
    priority: 'medium',
    assignedTo: '1',
    assignedUser: mockUsers[0],
    dueDate: '2024-02-16T18:00:00Z',
    tags: ['Website', 'Menu', 'Marketing'],
    createdAt: '2024-02-14T15:00:00Z',
    updatedAt: '2024-02-14T15:00:00Z',
    createdBy: '1',
    createdByUser: mockUsers[0]
  }
];

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Restaurant New Reservation',
    type: 'restaurant_new_reservation',
    subject: 'New Reservation - {{guestName}} - {{date}} at {{time}}',
    body: `Dear Restaurant Team,

A new reservation has been made:

Guest: {{guestName}}
Email: {{guestEmail}}
Phone: {{guestPhone}}
Date: {{date}}
Time: {{time}}
Party Size: {{partySize}}
Table: {{tableNumber}}
Special Requests: {{specialRequests}}

Reservation Type: {{reservationType}}
Source: {{source}}

Please prepare accordingly.

Best regards,
Restaurant Management System`,
    isActive: true,
    variables: ['guestName', 'guestEmail', 'guestPhone', 'date', 'time', 'partySize', 'tableNumber', 'specialRequests', 'reservationType', 'source'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Restaurant Cancelled Reservation',
    type: 'restaurant_cancelled_reservation',
    subject: 'Reservation Cancelled - {{guestName}} - {{date}} at {{time}}',
    body: `Dear Restaurant Team,

A reservation has been cancelled:

Guest: {{guestName}}
Email: {{guestEmail}}
Phone: {{guestPhone}}
Date: {{date}}
Time: {{time}}
Party Size: {{partySize}}
Table: {{tableNumber}}

Cancellation Reason: {{cancellationReason}}
Cancelled By: {{cancelledBy}}

The table is now available for other reservations.

Best regards,
Restaurant Management System`,
    isActive: true,
    variables: ['guestName', 'guestEmail', 'guestPhone', 'date', 'time', 'partySize', 'tableNumber', 'cancellationReason', 'cancelledBy'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Guest New Reservation',
    type: 'guest_new_reservation',
    subject: 'Reservation Confirmation - {{restaurantName}}',
    body: `Dear {{guestName}},

Thank you for making a reservation with {{restaurantName}}!

Reservation Details:
Date: {{date}}
Time: {{time}}
Party Size: {{partySize}}
Table: {{tableNumber}}

Special Requests: {{specialRequests}}

We look forward to welcoming you to our restaurant. If you need to make any changes to your reservation, please contact us at {{restaurantPhone}} or reply to this email.

Important Notes:
- Please arrive 5 minutes before your reservation time
- We hold reservations for 15 minutes past the scheduled time
- Cancellations must be made at least 2 hours in advance

Best regards,
{{restaurantName}} Team
{{restaurantAddress}}
{{restaurantPhone}}
{{restaurantEmail}}`,
    isActive: true,
    variables: ['guestName', 'restaurantName', 'date', 'time', 'partySize', 'tableNumber', 'specialRequests', 'restaurantPhone', 'restaurantAddress', 'restaurantEmail'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Guest Accepted Reservation',
    type: 'guest_accepted_reservation',
    subject: 'Reservation Confirmed - {{restaurantName}}',
    body: `Dear {{guestName}},

Great news! Your reservation has been confirmed.

Reservation Details:
Date: {{date}}
Time: {{time}}
Party Size: {{partySize}}
Table: {{tableNumber}}

Special Requests: {{specialRequests}}

We're excited to have you join us! Our team is preparing to provide you with an exceptional dining experience.

Reminder:
- Please arrive 5 minutes before your reservation time
- We hold reservations for 15 minutes past the scheduled time
- If you need to make any changes, please contact us at {{restaurantPhone}}

We look forward to seeing you soon!

Best regards,
{{restaurantName}} Team
{{restaurantAddress}}
{{restaurantPhone}}
{{restaurantEmail}}`,
    isActive: true,
    variables: ['guestName', 'restaurantName', 'date', 'time', 'partySize', 'tableNumber', 'specialRequests', 'restaurantPhone', 'restaurantAddress', 'restaurantEmail'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Guest Declined Reservation',
    type: 'guest_declined_reservation',
    subject: 'Reservation Update - {{restaurantName}}',
    body: `Dear {{guestName}},

Thank you for your interest in dining with {{restaurantName}}.

Unfortunately, we are unable to accommodate your reservation request for:
Date: {{date}}
Time: {{time}}
Party Size: {{partySize}}

Reason: {{declineReason}}

We sincerely apologize for any inconvenience this may cause. We would be delighted to welcome you on another occasion.

Alternative Options:
- We have availability on {{alternativeDate}} at {{alternativeTime}}
- You can join our waitlist for the same date/time
- We can notify you if a table becomes available

Please contact us at {{restaurantPhone}} to discuss alternative arrangements or to make a new reservation.

We look forward to serving you soon!

Best regards,
{{restaurantName}} Team
{{restaurantAddress}}
{{restaurantPhone}}
{{restaurantEmail}}`,
    isActive: true,
    variables: ['guestName', 'restaurantName', 'date', 'time', 'partySize', 'declineReason', 'alternativeDate', 'alternativeTime', 'restaurantPhone', 'restaurantAddress', 'restaurantEmail'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalReservations: 156,
  confirmedReservations: 142,
  pendingReservations: 8,
  cancelledReservations: 4,
  noShowReservations: 2,
  totalRevenue: 24580.50,
  averagePartySize: 3.2,
  occupancyRate: 78.5,
  topGuests: [mockGuests[0], mockGuests[2], mockGuests[1]],
  popularTimes: [
    { time: '19:00', count: 45 },
    { time: '20:00', count: 38 },
    { time: '18:30', count: 32 },
    { time: '19:30', count: 28 },
    { time: '20:30', count: 25 }
  ]
};
# Restaurant Reservation Management System

A comprehensive restaurant reservation management system built with Next.js, TypeScript, and Tailwind CSS, based on the Tailadmin template.

## Features

### 🏠 Dashboard
- Key metrics and statistics
- Revenue charts and analytics
- Popular reservation times
- Top guests overview
- Today's reservations summary

### 📅 Calendar View
- Full calendar integration with FullCalendar
- Month, week, and day views
- Color-coded reservation status
- Interactive event handling
- Click to view reservation details

### 📋 Day View
- Daily reservation management
- Time slot organization
- Table status overview
- Reservation statistics for the day
- Quick access to reservation details

### 👥 Guest Management
- Comprehensive guest overview with search and filtering
- Guest detail pages with visit history
- VIP status tracking
- Dietary restrictions management
- Guest notes and comments

### 📝 Reservation Details
- Detailed reservation information
- Internal comments system
- Status management
- Guest information display
- Special requests handling

### ⚙️ Settings
- Restaurant information management
- Operating hours configuration
- Reservation policies
- Notification settings
- Deposit and cancellation policies

## File Structure

```
src/
├── types/
│   └── restaurant.ts              # TypeScript interfaces
├── data/
│   └── mockData.ts                # Sample data
├── components/
│   └── restaurant/
│       ├── dashboard/             # Dashboard components
│       ├── calendar/              # Calendar components
│       ├── day-view/              # Day view components
│       ├── guests/                # Guest management
│       ├── reservation/           # Reservation details
│       └── settings/              # Settings components
└── app/
    └── (admin)/
        └── restaurant/
            └── page.tsx           # Main restaurant page
```

## Data Models

### Guest
- Personal information (name, email, phone)
- VIP status
- Dietary restrictions
- Visit history and statistics

### Reservation
- Date and time
- Party size
- Status (confirmed, pending, cancelled, no-show)
- Table assignment
- Special requests
- Internal comments

### Table
- Table number and capacity
- Location (main, patio, private, bar)
- Features and availability
- Accessibility options

### Restaurant Settings
- Operating hours
- Reservation policies
- Notification preferences
- Contact information

## Usage

1. Navigate to `/restaurant` in the application
2. Use the top navigation to switch between different views:
   - **Dashboard**: Overview of restaurant metrics
   - **Calendar**: Full calendar view of reservations
   - **Day View**: Daily reservation management
   - **Guests**: Guest management and history
   - **Settings**: Restaurant configuration

## Key Components

- **RestaurantDashboard**: Main dashboard with metrics and charts
- **ReservationCalendar**: FullCalendar integration for reservation viewing
- **DayView**: Daily reservation management interface
- **GuestOverview**: Guest list with search and filtering
- **GuestDetail**: Detailed guest information and history
- **ReservationDetail**: Reservation details with comments
- **RestaurantSettings**: Configuration management

## Technologies Used

- **Next.js 15**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **FullCalendar**: Calendar component
- **ApexCharts**: Data visualization
- **React Hooks**: State management

## Mock Data

The system includes comprehensive mock data for:
- 5 sample guests with different profiles
- 5 sample reservations with various statuses
- 8 tables with different capacities and locations
- 3 sample visits with ratings and feedback
- Complete restaurant settings configuration

## Future Enhancements

- Real-time notifications
- Email/SMS reminders
- Online reservation booking
- Payment processing
- Staff management
- Inventory tracking
- Reporting and analytics
- Mobile app integration

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Navigate to `http://localhost:3000/restaurant`
4. Explore the different features and views

The system is fully functional with mock data and ready for integration with a real backend API.

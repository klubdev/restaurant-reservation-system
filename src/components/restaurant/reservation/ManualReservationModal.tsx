'use client';

import React, { useState } from 'react';
import { mockGuests, mockTables } from '@/data/mockData';

interface ManualReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: string;
  selectedTime?: string;
}

const ManualReservationModal: React.FC<ManualReservationModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  selectedTime
}) => {
  const [formData, setFormData] = useState({
    // Reservation Type
    reservationType: 'standard',
    specialEventType: '',
    
    // Guest Information
    guestType: 'new', // 'new' or 'existing'
    existingGuestId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Reservation Details
    date: selectedDate || new Date().toISOString().split('T')[0],
    time: selectedTime || '19:00',
    partySize: 2,
    
    // Special Features
    vipStatus: false,
    languagePreference: 'english',
    tableAssignment: '',
    
    // Requests and Notes
    specialRequests: '',
    dietaryRestrictions: [] as string[],
    internalNotes: '',
    
    // Contact Preferences
    sendConfirmation: true,
    sendReminder: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const reservationTypes = [
    { value: 'standard', label: 'Standard Dining', description: 'Regular lunch/dinner reservation' },
    { value: 'business', label: 'Business Appointment', description: 'Business meeting or corporate dining' },
    { value: 'special', label: 'Special Event', description: 'Valentine\'s Dinner, Wine Tasting, Chef\'s Table' }
  ];

  const specialEvents = [
    { value: 'valentines', label: 'Valentine\'s Dinner', price: 100, description: 'Romantic dinner experience' },
    { value: 'wine-tasting', label: 'Wine Tasting', price: 75, description: 'Curated wine selection with food pairings' },
    { value: 'chefs-table', label: 'Chef\'s Table', price: 150, description: 'Exclusive dining experience with chef interaction' }
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Nut Allergy', 'Shellfish Allergy', 
    'Dairy-Free', 'Kosher', 'Halal', 'Low Sodium', 'Diabetic'
  ];

  const availableTables = mockTables.filter(table => table.isAvailable);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleDietaryRestrictionChange = (restriction: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: checked 
        ? [...prev.dietaryRestrictions, restriction]
        : prev.dietaryRestrictions.filter(r => r !== restriction)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.guestType === 'new') {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    } else {
      if (!formData.existingGuestId) newErrors.existingGuestId = 'Please select a guest';
    }

    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (formData.partySize < 1) newErrors.partySize = 'Party size must be at least 1';

    if (formData.reservationType === 'special' && !formData.specialEventType) {
      newErrors.specialEventType = 'Please select a special event type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Reservation data:', formData);
    
    // For now, just close the modal
    onClose();
    
    // Reset form
    setFormData({
      reservationType: 'standard',
      specialEventType: '',
      guestType: 'new',
      existingGuestId: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      partySize: 2,
      vipStatus: false,
      languagePreference: 'english',
      tableAssignment: '',
      specialRequests: '',
      dietaryRestrictions: [],
      internalNotes: '',
      sendConfirmation: true,
      sendReminder: true
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[9999] backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Manual Reservation Entry
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Reservation Type Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Reservation Type
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {reservationTypes.map((type) => (
                  <label key={type.value} className="relative">
                    <input
                      type="radio"
                      name="reservationType"
                      value={type.value}
                      checked={formData.reservationType === type.value}
                      onChange={(e) => handleInputChange('reservationType', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.reservationType === type.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {type.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {type.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Event Selection */}
            {formData.reservationType === 'special' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Special Event Type
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {specialEvents.map((event) => (
                    <label key={event.value} className="relative">
                      <input
                        type="radio"
                        name="specialEventType"
                        value={event.value}
                        checked={formData.specialEventType === event.value}
                        onChange={(e) => handleInputChange('specialEventType', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.specialEventType === event.value
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {event.label}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {event.description}
                        </div>
                        <div className="text-lg font-bold text-purple-600 dark:text-purple-400 mt-2">
                          €{event.price}/guest
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.specialEventType && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-2">{errors.specialEventType}</p>
                )}
              </div>
            )}

            {/* Guest Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Guest Information
              </h3>
              
              {/* Guest Type Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Guest Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="guestType"
                      value="new"
                      checked={formData.guestType === 'new'}
                      onChange={(e) => handleInputChange('guestType', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">New Guest</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="guestType"
                      value="existing"
                      checked={formData.guestType === 'existing'}
                      onChange={(e) => handleInputChange('guestType', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Existing Guest</span>
                  </label>
                </div>
              </div>

              {formData.guestType === 'existing' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Guest *
                  </label>
                  <select
                    value={formData.existingGuestId}
                    onChange={(e) => handleInputChange('existingGuestId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a guest...</option>
                    {mockGuests.map((guest) => (
                      <option key={guest.id} value={guest.id}>
                        {guest.firstName} {guest.lastName} - {guest.email}
                      </option>
                    ))}
                  </select>
                  {errors.existingGuestId && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.existingGuestId}</p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                    {errors.email && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Reservation Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Reservation Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.date && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.date}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.time && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.time}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Party Size *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={formData.partySize}
                    onChange={(e) => handleInputChange('partySize', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.partySize && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.partySize}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Special Features */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Special Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language Preference
                  </label>
                  <select
                    value={formData.languagePreference}
                    onChange={(e) => handleInputChange('languagePreference', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="english">English</option>
                    <option value="dutch">Dutch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Table Assignment Override
                  </label>
                  <select
                    value={formData.tableAssignment}
                    onChange={(e) => handleInputChange('tableAssignment', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Auto-assign</option>
                    {availableTables.map((table) => (
                      <option key={table.id} value={table.number}>
                        Table {table.number} ({table.capacity} seats) - {table.location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.vipStatus}
                    onChange={(e) => handleInputChange('vipStatus', e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="text-gray-700 dark:text-gray-300">VIP Guest (Special treatment and reserved tables)</span>
                </label>
              </div>
            </div>

            {/* Dietary Restrictions */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Dietary Restrictions & Allergies
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {dietaryOptions.map((restriction) => (
                  <label key={restriction} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.dietaryRestrictions.includes(restriction)}
                      onChange={(e) => handleDietaryRestrictionChange(restriction, e.target.checked)}
                      className="mr-2 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{restriction}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Requests and Notes */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Special Requests & Notes
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Special Requests/Comments
                  </label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special requests or comments from the guest..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Internal Notes
                  </label>
                  <textarea
                    value={formData.internalNotes}
                    onChange={(e) => handleInputChange('internalNotes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Internal notes for staff (not visible to guest)..."
                  />
                </div>
              </div>
            </div>

            {/* Contact Preferences */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Contact Preferences
              </h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.sendConfirmation}
                    onChange={(e) => handleInputChange('sendConfirmation', e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Send confirmation email</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.sendReminder}
                    onChange={(e) => handleInputChange('sendReminder', e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Send reminder notification</span>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Reservation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManualReservationModal;

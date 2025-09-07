'use client';

import React, { useState } from 'react';
import { mockGuests, mockVisits, mockReservations } from '@/data/mockData';

interface GuestDetailProps {
  guestId: string;
  onClose: () => void;
}

const GuestDetail: React.FC<GuestDetailProps> = ({ guestId, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'visits' | 'reservations' | 'notes' | 'tags' | 'communication' | 'allergens'>('overview');
  const [newNote, setNewNote] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [guestTags, setGuestTags] = useState<string[]>(['wine lover', 'regular customer']);
  const [internalNotes, setInternalNotes] = useState<string[]>(['Prefers quiet tables', 'Anniversary coming up in March']);
  const [messages, setMessages] = useState([
    { id: '1', type: 'email', subject: 'Welcome back!', date: '2024-01-15', content: 'Thank you for your recent visit...' },
    { id: '2', type: 'sms', subject: 'Reservation reminder', date: '2024-01-20', content: 'Your reservation is confirmed for tomorrow at 7 PM' }
  ]);
  
  const guest = mockGuests.find(g => g.id === guestId);
  const guestVisits = mockVisits.filter(v => v.guestId === guestId);
  const guestReservations = mockReservations.filter(r => r.guestId === guestId);
  
  if (!guest) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center z-[9999] backdrop-blur-sm"
        onClick={onClose}
      >
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Guest Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The requested guest could not be found.
          </p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const totalSpent = guestVisits.reduce((sum, visit) => sum + visit.totalSpent, 0);
  const averageRating = guestVisits.length > 0
    ? guestVisits.reduce((sum, visit) => sum + (visit.rating || 0), 0) / guestVisits.length
    : 0;
  const lastVisit = guestVisits.length > 0 
    ? new Date(Math.max(...guestVisits.map(v => new Date(v.date).getTime())))
    : null;

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
    <div 
      className="fixed inset-0 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {guest.firstName[0]}{guest.lastName[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {guest.firstName} {guest.lastName}
                </h2>
                <div className="flex items-center space-x-4 mt-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    guest.vipStatus
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {guest.vipStatus ? 'VIP Guest' : 'Regular Guest'}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {guestVisits.length} visits
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-6 px-6 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'visits', label: 'Visit History' },
              { id: 'reservations', label: 'Reservations' },
              { id: 'tags', label: 'Tags & Segmentation' },
              { id: 'allergens', label: 'Allergen Management' },
              { id: 'notes', label: 'Internal Notes' },
              { id: 'communication', label: 'Messages' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* VIP Status & Quick Actions */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">👑</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {guest.vipStatus ? 'VIP Guest' : 'Regular Guest'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {guest.vipStatus ? 'Special treatment and reserved tables available' : 'Standard service level'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Send Message
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      New Reservation
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                      <p className="text-gray-900 dark:text-white">{guest.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Phone:</span>
                      <p className="text-gray-900 dark:text-white">{guest.phone}</p>
                    </div>
                    {guest.dateOfBirth && (
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Date of Birth:</span>
                        <p className="text-gray-900 dark:text-white">
                          {new Date(guest.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Member Since:</span>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(guest.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Guest Statistics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Total Visits:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{guestVisits.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Total Spent:</span>
                      <span className="font-medium text-gray-900 dark:text-white">€{totalSpent.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Average Rating:</span>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900 dark:text-white mr-2">
                          {averageRating > 0 ? averageRating.toFixed(1) : 'N/A'}
                        </span>
                        {averageRating > 0 && (
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(averageRating)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Last Visit:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {lastVisit ? lastVisit.toLocaleDateString() : 'Never'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Average Party Size:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {guestVisits.length > 0 ? (guestVisits.reduce((sum, visit) => sum + visit.partySize, 0) / guestVisits.length).toFixed(1) : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Tags */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Current Tags & Segmentation
                </h3>
                <div className="flex flex-wrap gap-2">
                  {guestTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dietary Restrictions & Allergies */}
              {guest.dietaryRestrictions && guest.dietaryRestrictions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Dietary Restrictions & Allergies
                  </h3>
                  <div className="space-y-2">
                    {guest.dietaryRestrictions.map((restriction) => (
                      <div key={restriction} className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <span className="text-red-600 dark:text-red-400">⚠️</span>
                        <span className="text-red-800 dark:text-red-200 font-medium">{restriction}</span>
                        <span className="text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 px-2 py-1 rounded">
                          AUTO-FLAGGED
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Internal Notes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Internal Notes
                </h3>
                <div className="space-y-3">
                  {internalNotes.slice(0, 2).map((note, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-gray-900 dark:text-white">{note}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Added on {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Sharing */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                  Multi-Location Access
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  This guest profile is shared across all restaurant locations in the chain for consistent service.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'visits' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Visit History
              </h3>
              {guestVisits.length > 0 ? (
                <div className="space-y-4">
                  {guestVisits.map((visit) => (
                    <div key={visit.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {new Date(visit.date).toLocaleDateString()}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Party of {visit.partySize}
                          </span>
                          {visit.tableNumber && (
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Table {visit.tableNumber}
                            </span>
                          )}
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          ${visit.totalSpent.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {visit.rating && (
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Rating:</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < visit.rating!
                                        ? 'text-yellow-400'
                                        : 'text-gray-300 dark:text-gray-600'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          )}
                          {visit.serverName && (
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Server: {visit.serverName}
                            </span>
                          )}
                        </div>
                      </div>
                      {visit.feedback && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                          <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                            "{visit.feedback}"
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No visit history available</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reservations' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Reservation History
              </h3>
              {guestReservations.length > 0 ? (
                <div className="space-y-4">
                  {guestReservations.map((reservation) => (
                    <div key={reservation.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {new Date(reservation.date).toLocaleDateString()}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(`2000-01-01T${reservation.time}`).toLocaleTimeString([], { 
                              hour: 'numeric', 
                              minute: '2-digit',
                              hour12: true 
                            })}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Party of {reservation.partySize}
                          </span>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(reservation.status)}`}>
                          {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {reservation.tableNumber && (
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Table {reservation.tableNumber}
                            </span>
                          )}
                          <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            Source: {reservation.source}
                          </span>
                        </div>
                      </div>
                      {reservation.specialRequests && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Special Requests:</span> {reservation.specialRequests}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No reservation history available</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'tags' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tags & Segmentation
              </h3>
              
              {/* Current Tags */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Current Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {guestTags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {tag}
                      <button
                        onClick={() => setGuestTags(guestTags.filter((_, i) => i !== index))}
                        className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Add New Tag */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Add New Tag
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="e.g., wine lover, vegan, VIP..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => {
                      if (newTag.trim()) {
                        setGuestTags([...guestTags, newTag.trim()]);
                        setNewTag('');
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              {/* Segmentation Info */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                  Segmentation Benefits
                </h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Targeted marketing campaigns</li>
                  <li>• Personalized service recommendations</li>
                  <li>• Automated VIP treatment</li>
                  <li>• Customized menu suggestions</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'allergens' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Allergen Management
              </h3>
              
              {/* Current Allergies */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Known Allergies & Dietary Restrictions
                </h4>
                <div className="space-y-3">
                  {guest.dietaryRestrictions?.map((restriction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="flex items-center space-x-2">
                        <span className="text-red-600 dark:text-red-400">⚠️</span>
                        <span className="text-red-800 dark:text-red-200 font-medium">{restriction}</span>
                      </div>
                      <span className="text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 px-2 py-1 rounded">
                        HIGH PRIORITY
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Allergen Warnings */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h4 className="text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">
                  Automatic Warnings
                </h4>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  This guest's allergies will be automatically flagged on all reservations and shared with kitchen staff.
                </p>
              </div>

              {/* Add New Allergy */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Add New Allergy/Dietary Restriction
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="e.g., shellfish, nuts, gluten..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Add Allergy
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Internal Notes
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Add New Note
                  </label>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note about this guest..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                  />
                  <button
                    onClick={() => {
                      if (newNote.trim()) {
                        setInternalNotes([...internalNotes, newNote.trim()]);
                        setNewNote('');
                      }
                    }}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Note
                  </button>
                </div>
                
                {/* Existing Notes */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Existing Notes
                  </h4>
                  <div className="space-y-3">
                    {internalNotes.map((note, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <p className="text-gray-900 dark:text-white">{note}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Added on {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Message Management
              </h3>
              
              {/* Send New Message */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
                  Send New Message
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                      <option value="push">Push Notification</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Message subject..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      rows={4}
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>

              {/* Message History */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Communication History
                </h4>
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            message.type === 'email' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            message.type === 'sms' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          }`}>
                            {message.type.toUpperCase()}
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">{message.subject}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{message.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{message.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Edit Guest
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              New Reservation
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestDetail;

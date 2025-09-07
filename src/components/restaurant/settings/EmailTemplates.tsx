'use client';

import React, { useState } from 'react';
import { mockEmailTemplates } from '@/data/mockData';
import { EmailTemplate } from '@/types/restaurant';

const EmailTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockEmailTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTemplate, setEditedTemplate] = useState<EmailTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleEdit = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setEditedTemplate({ ...template });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTemplate) {
      const updatedTemplates = templates.map(template =>
        template.id === editedTemplate.id
          ? { ...editedTemplate, updatedAt: new Date().toISOString() }
          : template
      );
      setTemplates(updatedTemplates);
      setSelectedTemplate(editedTemplate);
      setIsEditing(false);
      setEditedTemplate(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTemplate(null);
  };

  const handleReset = () => {
    if (selectedTemplate) {
      const originalTemplate = mockEmailTemplates.find(t => t.id === selectedTemplate.id);
      if (originalTemplate) {
        setEditedTemplate({ ...originalTemplate });
      }
    }
  };

  const handleToggleActive = (templateId: string) => {
    const updatedTemplates = templates.map(template =>
      template.id === templateId
        ? { ...template, isActive: !template.isActive, updatedAt: new Date().toISOString() }
        : template
    );
    setTemplates(updatedTemplates);
  };

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'restaurant_new_reservation':
        return '📧';
      case 'restaurant_cancelled_reservation':
        return '❌';
      case 'guest_new_reservation':
        return '✅';
      case 'guest_accepted_reservation':
        return '🎉';
      case 'guest_declined_reservation':
        return '😔';
      default:
        return '📄';
    }
  };

  const getTemplateDescription = (type: string) => {
    switch (type) {
      case 'restaurant_new_reservation':
        return 'Sent to restaurant staff when a new reservation is made';
      case 'restaurant_cancelled_reservation':
        return 'Sent to restaurant staff when a reservation is cancelled';
      case 'guest_new_reservation':
        return 'Sent to guests when they make a new reservation';
      case 'guest_accepted_reservation':
        return 'Sent to guests when their reservation is confirmed';
      case 'guest_declined_reservation':
        return 'Sent to guests when their reservation is declined';
      default:
        return '';
    }
  };

  const renderPreview = (template: EmailTemplate) => {
    // Sample data for preview
    const sampleData = {
      guestName: 'John Smith',
      guestEmail: 'john.smith@email.com',
      guestPhone: '+31 6 12345678',
      date: 'February 14, 2024',
      time: '19:30',
      partySize: '2',
      tableNumber: '12',
      specialRequests: 'Anniversary celebration, window table preferred',
      reservationType: 'Valentine\'s Dinner',
      source: 'Online',
      cancellationReason: 'Change of plans',
      cancelledBy: 'Guest',
      restaurantName: 'Restaurant Tavelle',
      restaurantAddress: '123 Main Street, Amsterdam, Netherlands',
      restaurantPhone: '+31 20 1234567',
      restaurantEmail: 'info@tavelle.com',
      declineReason: 'No availability at requested time',
      alternativeDate: 'February 15, 2024',
      alternativeTime: '20:00'
    };

    let previewSubject = template.subject;
    let previewBody = template.body;

    // Replace variables with sample data
    template.variables.forEach(variable => {
      const value = sampleData[variable as keyof typeof sampleData] || `{{${variable}}}`;
      previewSubject = previewSubject.replace(new RegExp(`{{${variable}}}`, 'g'), value);
      previewBody = previewBody.replace(new RegExp(`{{${variable}}}`, 'g'), value);
    });

    return { subject: previewSubject, body: previewBody };
  };

  const currentTemplate = editedTemplate || selectedTemplate;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Email Templates
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage email templates for reservation communications
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Email Templates</h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedTemplate?.id === template.id ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getTemplateIcon(template.type)}</span>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {template.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {getTemplateDescription(template.type)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleActive(template.id);
                        }}
                        className={`w-8 h-4 rounded-full transition-colors ${
                          template.isActive ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <div
                          className={`w-3 h-3 bg-white rounded-full transition-transform ${
                            template.isActive ? 'translate-x-4' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Template Editor */}
        <div className="lg:col-span-2">
          {currentTemplate ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTemplateIcon(currentTemplate.type)}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {currentTemplate.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {getTemplateDescription(currentTemplate.type)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!isEditing ? (
                      <button
                        onClick={() => handleEdit(currentTemplate)}
                        className="px-3 py-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 text-sm"
                      >
                        Edit
                      </button>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleReset}
                          className="px-3 py-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-sm"
                        >
                          Reset
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-3 py-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Subject
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedTemplate?.subject || ''}
                      onChange={(e) => setEditedTemplate(prev => prev ? { ...prev, subject: e.target.value } : null)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                      {currentTemplate.subject}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Body
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editedTemplate?.body || ''}
                      onChange={(e) => setEditedTemplate(prev => prev ? { ...prev, body: e.target.value } : null)}
                      rows={12}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white whitespace-pre-wrap">
                      {currentTemplate.body}
                    </div>
                  )}
                </div>

                {/* Variables */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Available Variables
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {currentTemplate.variables.map((variable) => (
                      <span
                        key={variable}
                        className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-sm"
                      >
                        {`{{${variable}}}`}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Use these variables in your subject and body. They will be replaced with actual data when emails are sent.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select an Email Template
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Choose a template from the list to view and edit its content.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && currentTemplate && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm" onClick={() => setShowPreview(false)}>
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Email Preview - {currentTemplate.name}
                </h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                {/* Email Header */}
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">From: Restaurant Tavelle &lt;info@tavelle.com&gt;</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">To: john.smith@email.com</p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Email Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Subject: {renderPreview(currentTemplate).subject}
                    </h3>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {renderPreview(currentTemplate).body}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Preview Note</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  This is a preview with sample data. In actual emails, the variables will be replaced with real reservation and guest information.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplates;

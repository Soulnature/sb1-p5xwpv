import React from 'react';
import { I485FormData } from '../../../types/i485Form';

interface ContactSectionProps {
  formData: I485FormData;
  onChange: (updates: Partial<I485FormData>) => void;
  labels: any;
}

export const ContactSection = ({ formData, onChange, labels }: ContactSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium">{labels.contact.title}</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.contact.currentAddress}
          </label>
          <input
            type="text"
            value={formData.currentAddress}
            onChange={(e) => onChange({ currentAddress: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.contact.mailingAddress}
          </label>
          <input
            type="text"
            value={formData.mailingAddress}
            onChange={(e) => onChange({ mailingAddress: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {labels.contact.phone}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {labels.contact.mobile}
            </label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => onChange({ mobile: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.contact.email}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { I485FormData } from '../../../types/i485Form';

interface ImmigrationSectionProps {
  formData: I485FormData;
  onChange: (updates: Partial<I485FormData>) => void;
  labels: any;
}

export const ImmigrationSection = ({ formData, onChange, labels }: ImmigrationSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium">{labels.immigration.title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.immigration.lastEntryDate}
          </label>
          <input
            type="date"
            value={formData.lastEntryDate}
            onChange={(e) => onChange({ lastEntryDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.immigration.i94Number}
          </label>
          <input
            type="text"
            value={formData.i94Number}
            onChange={(e) => onChange({ i94Number: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.immigration.lastEntryStatus}
          </label>
          <input
            type="text"
            value={formData.lastEntryStatus}
            onChange={(e) => onChange({ lastEntryStatus: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.immigration.currentStatus}
          </label>
          <input
            type="text"
            value={formData.currentStatus}
            onChange={(e) => onChange({ currentStatus: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.immigration.statusExpirationDate}
          </label>
          <input
            type="date"
            value={formData.statusExpirationDate}
            onChange={(e) => onChange({ statusExpirationDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.immigration.passportNumber}
          </label>
          <input
            type="text"
            value={formData.passportNumber}
            onChange={(e) => onChange({ passportNumber: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.immigration.passportCountry}
          </label>
          <input
            type="text"
            value={formData.passportCountry}
            onChange={(e) => onChange({ passportCountry: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.immigration.passportExpiration}
          </label>
          <input
            type="date"
            value={formData.passportExpiration}
            onChange={(e) => onChange({ passportExpiration: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};
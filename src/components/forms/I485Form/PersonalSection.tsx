import React from 'react';
import { I485FormData } from '../../../types/i485Form';

interface PersonalSectionProps {
  formData: I485FormData;
  onChange: (updates: Partial<I485FormData>) => void;
  labels: any;
}

export const PersonalSection = ({ formData, onChange, labels }: PersonalSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium">{labels.personal.title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.personal.fullName}
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.personal.otherNames}
          </label>
          <input
            type="text"
            value={formData.otherNames}
            onChange={(e) => onChange({ otherNames: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.personal.birthDate}
          </label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => onChange({ birthDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.personal.birthPlace}
          </label>
          <input
            type="text"
            value={formData.birthPlace}
            onChange={(e) => onChange({ birthPlace: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.personal.nationality}
          </label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => onChange({ nationality: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.personal.alienNumber}
          </label>
          <input
            type="text"
            value={formData.alienNumber}
            onChange={(e) => onChange({ alienNumber: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.personal.socialSecurityNumber}
          </label>
          <input
            type="text"
            value={formData.socialSecurityNumber}
            onChange={(e) => onChange({ socialSecurityNumber: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.personal.uscisAccountNumber}
          </label>
          <input
            type="text"
            value={formData.uscisAccountNumber}
            onChange={(e) => onChange({ uscisAccountNumber: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};
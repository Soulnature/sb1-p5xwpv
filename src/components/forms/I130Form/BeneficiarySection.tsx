import React from 'react';
import { FormData, WorkHistoryEntry } from '../../../types/forms';
import { WorkHistorySection } from './WorkHistorySection';

interface BeneficiarySectionProps {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
  labels: any;
}

export const BeneficiarySection = ({ formData, onChange, labels }: BeneficiarySectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium">{labels.beneficiary.title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.beneficiary.name}
          </label>
          <input
            type="text"
            value={formData.beneficiaryName}
            onChange={(e) => onChange({ beneficiaryName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.beneficiary.dob}
          </label>
          <input
            type="date"
            value={formData.beneficiaryDOB}
            onChange={(e) => onChange({ beneficiaryDOB: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.beneficiary.birthPlace}
          </label>
          <input
            type="text"
            value={formData.beneficiaryBirthPlace}
            onChange={(e) => onChange({ beneficiaryBirthPlace: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.beneficiary.country}
          </label>
          <input
            type="text"
            value={formData.beneficiaryCountry}
            onChange={(e) => onChange({ beneficiaryCountry: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.beneficiary.address}
          </label>
          <input
            type="text"
            value={formData.beneficiaryAddress}
            onChange={(e) => onChange({ beneficiaryAddress: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.beneficiary.phone}
          </label>
          <input
            type="tel"
            value={formData.beneficiaryPhone}
            onChange={(e) => onChange({ beneficiaryPhone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.beneficiary.email}
          </label>
          <input
            type="email"
            value={formData.beneficiaryEmail}
            onChange={(e) => onChange({ beneficiaryEmail: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.beneficiary.relationship}
          </label>
          <select
            value={formData.relationship}
            onChange={(e) => onChange({ relationship: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select relationship</option>
            <option value="spouse">Spouse</option>
            <option value="parent">Parent</option>
            <option value="child">Child</option>
            <option value="sibling">Sibling</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.beneficiary.maritalStatus}
          </label>
          <select
            value={formData.beneficiaryMaritalStatus}
            onChange={(e) => onChange({ beneficiaryMaritalStatus: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select status</option>
            <option value="single">{labels.maritalStatus.single}</option>
            <option value="married">{labels.maritalStatus.married}</option>
            <option value="divorced">{labels.maritalStatus.divorced}</option>
            <option value="widowed">{labels.maritalStatus.widowed}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.beneficiary.children.hasChildren}
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={formData.hasChildren}
                onChange={() => onChange({ hasChildren: true })}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={!formData.hasChildren}
                onChange={() => onChange({ hasChildren: false })}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        {formData.hasChildren && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {labels.beneficiary.children.numberOfChildren}
              </label>
              <input
                type="number"
                value={formData.numberOfChildren}
                onChange={(e) => onChange({ numberOfChildren: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {labels.beneficiary.children.details}
              </label>
              <textarea
                value={formData.childrenDetails}
                onChange={(e) => onChange({ childrenDetails: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        )}
      </div>

      <div>
        <h3 className="text-xl font-medium mb-4">Work History</h3>
        <WorkHistorySection
          workHistory={formData.beneficiaryWorkHistory}
          onChange={(history: WorkHistoryEntry[]) => onChange({ beneficiaryWorkHistory: history })}
          labels={labels}
        />
      </div>
    </div>
  );
};
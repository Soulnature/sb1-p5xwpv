import React from 'react';
import { FormData, ParentInfo } from '../../../types/forms';
import { ParentInfoSection } from './ParentInfoSection';
import { WorkHistorySection } from './WorkHistorySection';

interface PetitionerSectionProps {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
  labels: any;
}

export const PetitionerSection = ({ formData, onChange, labels }: PetitionerSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium">{labels.petitioner.title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.petitioner.name}
          </label>
          <input
            type="text"
            value={formData.petitionerName}
            onChange={(e) => onChange({ petitionerName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.petitioner.dob}
          </label>
          <input
            type="date"
            value={formData.petitionerDOB}
            onChange={(e) => onChange({ petitionerDOB: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.petitioner.birthPlace}
          </label>
          <input
            type="text"
            value={formData.petitionerBirthPlace}
            onChange={(e) => onChange({ petitionerBirthPlace: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.petitioner.ssn}
          </label>
          <input
            type="text"
            value={formData.petitionerSSN}
            onChange={(e) => onChange({ petitionerSSN: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.petitioner.address}
          </label>
          <input
            type="text"
            value={formData.petitionerAddress}
            onChange={(e) => onChange({ petitionerAddress: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.petitioner.phone}
          </label>
          <input
            type="tel"
            value={formData.petitionerPhone}
            onChange={(e) => onChange({ petitionerPhone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.petitioner.email}
          </label>
          <input
            type="email"
            value={formData.petitionerEmail}
            onChange={(e) => onChange({ petitionerEmail: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.petitioner.citizenshipStatus}
          </label>
          <select
            value={formData.petitionerCitizenshipStatus}
            onChange={(e) => onChange({ petitionerCitizenshipStatus: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select status</option>
            <option value="citizen">U.S. Citizen</option>
            <option value="permanent_resident">Permanent Resident</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {labels.petitioner.maritalStatus}
          </label>
          <select
            value={formData.petitionerMaritalStatus}
            onChange={(e) => onChange({ petitionerMaritalStatus: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select status</option>
            <option value="single">{labels.maritalStatus.single}</option>
            <option value="married">{labels.maritalStatus.married}</option>
            <option value="divorced">{labels.maritalStatus.divorced}</option>
            <option value="widowed">{labels.maritalStatus.widowed}</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-medium">Father's Information</h3>
        <ParentInfoSection
          parentInfo={formData.petitionerFather}
          onChange={(info: ParentInfo) => onChange({ petitionerFather: info })}
          parentType="father"
          labels={labels}
        />

        <h3 className="text-xl font-medium">Mother's Information</h3>
        <ParentInfoSection
          parentInfo={formData.petitionerMother}
          onChange={(info: ParentInfo) => onChange({ petitionerMother: info })}
          parentType="mother"
          labels={labels}
        />

        <h3 className="text-xl font-medium">Work History</h3>
        <WorkHistorySection
          workHistory={formData.petitionerWorkHistory}
          onChange={(history) => onChange({ petitionerWorkHistory: history })}
          labels={labels}
        />
      </div>
    </div>
  );
};
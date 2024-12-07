import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { ParentInfo } from '../../../types/forms';

interface ParentInfoSectionProps {
  parentInfo: ParentInfo;
  onChange: (info: ParentInfo) => void;
  parentType: 'father' | 'mother';
}

export const ParentInfoSection = ({ parentInfo, onChange, parentType }: ParentInfoSectionProps) => {
  const { language } = useLanguage();

  const labels = {
    en: {
      father: "Father's Information",
      mother: "Mother's Information",
      name: "Full Legal Name",
      birthDate: "Date of Birth",
      birthPlace: "Place of Birth",
      currentAddress: "Current Address"
    },
    zh: {
      father: "父亲信息",
      mother: "母亲信息",
      name: "法定全名",
      birthDate: "出生日期",
      birthPlace: "出生地点",
      currentAddress: "现居地址"
    }
  };

  const currentLabels = labels[language];

  const handleChange = (field: keyof ParentInfo, value: string) => {
    onChange({
      ...parentInfo,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">{currentLabels[parentType]}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLabels.name}
          </label>
          <input
            type="text"
            value={parentInfo.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLabels.birthDate}
          </label>
          <input
            type="date"
            value={parentInfo.birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLabels.birthPlace}
          </label>
          <input
            type="text"
            value={parentInfo.birthPlace}
            onChange={(e) => handleChange('birthPlace', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLabels.currentAddress}
          </label>
          <input
            type="text"
            value={parentInfo.currentAddress}
            onChange={(e) => handleChange('currentAddress', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};
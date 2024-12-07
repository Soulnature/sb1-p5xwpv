import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { I765FormData } from '../../types/forms';

const initialFormData: I765FormData = {
  fullName: '',
  otherNames: '',
  dateOfBirth: '',
  placeOfBirth: '',
  gender: '',
  maritalStatus: '',
  ssn: '',
  alienNumber: '',
  mailingAddress: '',
  physicalAddress: '',
  phone: '',
  email: '',
  eligibilityCategory: '',
  previousEAD: false,
  previousEADDetails: '',
  education: '',
  currentEmployer: '',
  criminalHistory: '',
  immigrationViolations: '',
  additionalInformation: ''
};

export const I765Form = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<I765FormData>(initialFormData);

  const labels = {
    en: {
      personal: {
        title: "Personal Information",
        fullName: "Full Legal Name",
        otherNames: "Other Names Used",
        dateOfBirth: "Date of Birth",
        placeOfBirth: "Place of Birth",
        gender: "Gender",
        maritalStatus: "Marital Status",
        ssn: "Social Security Number",
        alienNumber: "Alien Registration Number (A-Number)"
      },
      contact: {
        title: "Contact Information",
        mailingAddress: "Mailing Address",
        physicalAddress: "Physical Address",
        phone: "Phone Number",
        email: "Email Address"
      },
      eligibility: {
        title: "Eligibility Information",
        category: "Eligibility Category",
        previousEAD: "Previous EAD",
        previousEADDetails: "Previous EAD Details"
      },
      employment: {
        title: "Education and Employment",
        education: "Highest Education Level",
        currentEmployer: "Current Employer"
      },
      additional: {
        title: "Additional Information",
        criminalHistory: "Criminal History",
        immigrationViolations: "Immigration Violations",
        additionalInfo: "Additional Information"
      },
      submit: "Submit Form"
    },
    zh: {
      personal: {
        title: "个人信息",
        fullName: "法定全名",
        otherNames: "曾用名",
        dateOfBirth: "出生日期",
        placeOfBirth: "出生地点",
        gender: "性别",
        maritalStatus: "婚姻状况",
        ssn: "社会安全号码",
        alienNumber: "外国人登记号码（A号码）"
      },
      contact: {
        title: "联系方式",
        mailingAddress: "邮寄地址",
        physicalAddress: "实际居住地址",
        phone: "电话号码",
        email: "电子邮箱"
      },
      eligibility: {
        title: "资格信息",
        category: "资格类别",
        previousEAD: "之前的工卡",
        previousEADDetails: "之前工卡详情"
      },
      employment: {
        title: "教育和就业",
        education: "最高学历",
        currentEmployer: "当前雇主"
      },
      additional: {
        title: "附加信息",
        criminalHistory: "犯罪记录",
        immigrationViolations: "移民违规",
        additionalInfo: "其他信息"
      },
      submit: "提交表格"
    }
  };

  const currentLabels = labels[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const csvContent = Object.entries(formData)
      .map(([key, value]) => {
        const formattedValue = typeof value === 'object' ? JSON.stringify(value) : value;
        const escapedValue = formattedValue.toString().includes(',') 
          ? `"${formattedValue.replace(/"/g, '""')}"` 
          : formattedValue;
        return `${key},${escapedValue}`;
      })
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'I-765-form-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const subject = encodeURIComponent('I-765 Form Submission');
    const body = encodeURIComponent('Please find the I-765 form data in the attached CSV file.');
    const mailtoLink = `mailto:zxtessentialservices@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    setFormData(initialFormData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="space-y-12">
        {/* Personal Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.personal.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.fullName}
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.otherNames}
              </label>
              <input
                type="text"
                value={formData.otherNames}
                onChange={(e) => setFormData(prev => ({ ...prev, otherNames: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.dateOfBirth}
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.placeOfBirth}
              </label>
              <input
                type="text"
                value={formData.placeOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, placeOfBirth: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Eligibility Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.eligibility.title}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.eligibility.category}
              </label>
              <select
                value={formData.eligibilityCategory}
                onChange={(e) => setFormData(prev => ({ ...prev, eligibilityCategory: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="c08">C08 - Pending Adjustment</option>
                <option value="c09">C09 - Pending H-1B</option>
                <option value="c33">C33 - DACA</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.previousEAD}
                onChange={(e) => setFormData(prev => ({ ...prev, previousEAD: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">
                {currentLabels.eligibility.previousEAD}
              </label>
            </div>

            {formData.previousEAD && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLabels.eligibility.previousEADDetails}
                </label>
                <textarea
                  value={formData.previousEADDetails}
                  onChange={(e) => setFormData(prev => ({ ...prev, previousEADDetails: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            {currentLabels.submit}
          </button>
        </div>
      </div>
    </motion.form>
  );
};
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface N400FormData {
  // Personal Information
  fullName: string;
  otherNames: string;
  dateOfBirth: string;
  countryOfBirth: string;
  ssn: string;
  alienNumber: string;
  gender: string;
  
  // Contact Information
  currentAddress: string;
  mailingAddress: string;
  phone: string;
  email: string;
  
  // Eligibility Information
  residencyPeriod: string;
  maritalStatus: string;
  spouseInfo: string;
  employmentHistory: string;
  
  // Background Information
  criminalHistory: boolean;
  criminalHistoryDetails: string;
  taxHistory: boolean;
  taxHistoryDetails: string;
  travelHistory: string;
  
  // Additional Information
  disabilities: boolean;
  disabilitiesDetails: string;
  interpreter: boolean;
  interpreterDetails: string;
  additionalInformation: string;
}

const initialFormData: N400FormData = {
  fullName: '',
  otherNames: '',
  dateOfBirth: '',
  countryOfBirth: '',
  ssn: '',
  alienNumber: '',
  gender: '',
  currentAddress: '',
  mailingAddress: '',
  phone: '',
  email: '',
  residencyPeriod: '',
  maritalStatus: '',
  spouseInfo: '',
  employmentHistory: '',
  criminalHistory: false,
  criminalHistoryDetails: '',
  taxHistory: false,
  taxHistoryDetails: '',
  travelHistory: '',
  disabilities: false,
  disabilitiesDetails: '',
  interpreter: false,
  interpreterDetails: '',
  additionalInformation: ''
};

export const N400Form = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<N400FormData>(initialFormData);

  const labels = {
    en: {
      title: "Form N-400 Application for Naturalization",
      personal: {
        title: "Personal Information",
        fullName: "Full Legal Name",
        otherNames: "Other Names Used",
        dateOfBirth: "Date of Birth",
        countryOfBirth: "Country of Birth",
        ssn: "Social Security Number",
        alienNumber: "Alien Registration Number",
        gender: "Gender"
      },
      contact: {
        title: "Contact Information",
        currentAddress: "Current Address",
        mailingAddress: "Mailing Address",
        phone: "Phone Number",
        email: "Email Address"
      },
      eligibility: {
        title: "Eligibility Information",
        residencyPeriod: "Period of Permanent Residence",
        maritalStatus: "Marital Status",
        spouseInfo: "Spouse Information",
        employmentHistory: "Employment History (Last 5 Years)"
      },
      background: {
        title: "Background Information",
        criminalHistory: "Criminal History",
        taxHistory: "Tax Filing History",
        travelHistory: "Travel History (Last 5 Years)"
      },
      additional: {
        title: "Additional Information",
        disabilities: "Disabilities or Accommodations",
        interpreter: "Need for Interpreter",
        additionalInfo: "Additional Information"
      },
      submit: "Submit Application"
    },
    zh: {
      title: "N-400入籍申请表",
      personal: {
        title: "个人信息",
        fullName: "法定全名",
        otherNames: "曾用名",
        dateOfBirth: "出生日期",
        countryOfBirth: "出生国家",
        ssn: "社会安全号码",
        alienNumber: "外国人登记号码",
        gender: "性别"
      },
      contact: {
        title: "联系方式",
        currentAddress: "现居地址",
        mailingAddress: "邮寄地址",
        phone: "电话号码",
        email: "电子邮箱"
      },
      eligibility: {
        title: "资格信息",
        residencyPeriod: "永久居民身份期限",
        maritalStatus: "婚姻状况",
        spouseInfo: "配偶信息",
        employmentHistory: "工作经历（近5年）"
      },
      background: {
        title: "背景信息",
        criminalHistory: "犯罪记录",
        taxHistory: "纳税记录",
        travelHistory: "旅行记录（近5年）"
      },
      additional: {
        title: "附加信息",
        disabilities: "残障或特殊需求",
        interpreter: "翻译需求",
        additionalInfo: "其他信息"
      },
      submit: "提交申请"
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
    link.setAttribute('download', 'N-400-form-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const subject = encodeURIComponent('N-400 Form Submission');
    const body = encodeURIComponent('Please find the N-400 form data in the attached CSV file.');
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
      <h2 className="text-2xl font-medium mb-8">{currentLabels.title}</h2>

      <div className="space-y-12">
        {/* Personal Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-medium">{currentLabels.personal.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.fullName}
              </label>
              <input
                type="text"
                required
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
                required
                value={formData.dateOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.countryOfBirth}
              </label>
              <input
                type="text"
                required
                value={formData.countryOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, countryOfBirth: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-medium">{currentLabels.contact.title}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.contact.currentAddress}
              </label>
              <input
                type="text"
                required
                value={formData.currentAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, currentAddress: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.contact.mailingAddress}
              </label>
              <input
                type="text"
                value={formData.mailingAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, mailingAddress: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Background Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-medium">{currentLabels.background.title}</h3>
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.criminalHistory}
                  onChange={(e) => setFormData(prev => ({ ...prev, criminalHistory: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  {currentLabels.background.criminalHistory}
                </span>
              </label>
              {formData.criminalHistory && (
                <textarea
                  value={formData.criminalHistoryDetails}
                  onChange={(e) => setFormData(prev => ({ ...prev, criminalHistoryDetails: e.target.value }))}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {currentLabels.submit}
        </button>
      </div>
    </motion.form>
  );
};
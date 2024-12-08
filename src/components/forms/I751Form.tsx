import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { I751FormData } from '../../types/forms';

const initialFormData: I751FormData = {
  fullName: '',
  alienNumber: '',
  dateOfBirth: '',
  placeOfBirth: '',
  currentAddress: '',
  phone: '',
  email: '',
  spouseName: '',
  spouseDateOfBirth: '',
  marriageDate: '',
  marriagePlace: '',
  previousMarriages: false,
  previousMarriageDetails: '',
  jointBankAccounts: false,
  jointLeases: false,
  jointUtilities: false,
  jointInsurance: false,
  jointTaxReturns: false,
  otherEvidence: '',
  hasChildren: false,
  childrenDetails: '',
  criminalHistory: '',
  immigrationViolations: '',
  additionalInformation: ''
};

export const I751Form = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<I751FormData>(initialFormData);

  const labels = {
    en: {
      personal: {
        title: "Personal Information",
        fullName: "Full Legal Name",
        alienNumber: "Alien Registration Number (A-Number)",
        dateOfBirth: "Date of Birth",
        placeOfBirth: "Place of Birth",
        currentAddress: "Current Address",
        phone: "Phone Number",
        email: "Email Address"
      },
      marriage: {
        title: "Marriage Information",
        spouseName: "Spouse's Full Name",
        spouseDateOfBirth: "Spouse's Date of Birth",
        marriageDate: "Date of Marriage",
        marriagePlace: "Place of Marriage",
        previousMarriages: "Previous Marriages",
        previousMarriageDetails: "Previous Marriage Details"
      },
      evidence: {
        title: "Joint Filing Evidence",
        jointBankAccounts: "Joint Bank Accounts",
        jointLeases: "Joint Leases/Mortgages",
        jointUtilities: "Joint Utilities",
        jointInsurance: "Joint Insurance Policies",
        jointTaxReturns: "Joint Tax Returns",
        otherEvidence: "Other Evidence"
      },
      children: {
        title: "Children Information",
        hasChildren: "Do you have children?",
        childrenDetails: "Children's Details (Names and Ages)"
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
        alienNumber: "外国人登记号码（A号码）",
        dateOfBirth: "出生日期",
        placeOfBirth: "出生地点",
        currentAddress: "现居地址",
        phone: "电话号码",
        email: "电子邮箱"
      },
      marriage: {
        title: "婚姻信息",
        spouseName: "配偶全名",
        spouseDateOfBirth: "配偶出生日期",
        marriageDate: "结婚日期",
        marriagePlace: "结婚地点",
        previousMarriages: "以前的婚姻",
        previousMarriageDetails: "以前婚姻详情"
      },
      evidence: {
        title: "共同申请证明",
        jointBankAccounts: "共同银行账户",
        jointLeases: "共同租约/抵押",
        jointUtilities: "共同水电账单",
        jointInsurance: "共同保险单",
        jointTaxReturns: "共同报税",
        otherEvidence: "其他证明"
      },
      children: {
        title: "子女信息",
        hasChildren: "是否有子女？",
        childrenDetails: "子女详情（姓名和年龄）"
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
    link.setAttribute('download', 'I-751-form-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const subject = encodeURIComponent('I-751 Form Submission');
    const body = encodeURIComponent('Please find the I-751 form data in the attached CSV file.');
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
                {currentLabels.personal.alienNumber}
              </label>
              <input
                type="text"
                value={formData.alienNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, alienNumber: e.target.value }))}
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.currentAddress}
              </label>
              <input
                type="text"
                value={formData.currentAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, currentAddress: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.phone}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.email}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Marriage Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.marriage.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.marriage.spouseName}
              </label>
              <input
                type="text"
                value={formData.spouseName}
                onChange={(e) => setFormData(prev => ({ ...prev, spouseName: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.marriage.spouseDateOfBirth}
              </label>
              <input
                type="date"
                value={formData.spouseDateOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, spouseDateOfBirth: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.marriage.marriageDate}
              </label>
              <input
                type="date"
                value={formData.marriageDate}
                onChange={(e) => setFormData(prev => ({ ...prev, marriageDate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.marriage.marriagePlace}
              </label>
              <input
                type="text"
                value={formData.marriagePlace}
                onChange={(e) => setFormData(prev => ({ ...prev, marriagePlace: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.previousMarriages}
                onChange={(e) => setFormData(prev => ({ ...prev, previousMarriages: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {currentLabels.marriage.previousMarriages}
              </span>
            </label>
            {formData.previousMarriages && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLabels.marriage.previousMarriageDetails}
                </label>
                <textarea
                  value={formData.previousMarriageDetails}
                  onChange={(e) => setFormData(prev => ({ ...prev, previousMarriageDetails: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>

        {/* Evidence Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.evidence.title}</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.jointBankAccounts}
                onChange={(e) => setFormData(prev => ({ ...prev, jointBankAccounts: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">
                {currentLabels.evidence.jointBankAccounts}
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.jointLeases}
                onChange={(e) => setFormData(prev => ({ ...prev, jointLeases: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">
                {currentLabels.evidence.jointLeases}
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.jointUtilities}
                onChange={(e) => setFormData(prev => ({ ...prev, jointUtilities: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">
                {currentLabels.evidence.jointUtilities}
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.jointInsurance}
                onChange={(e) => setFormData(prev => ({ ...prev, jointInsurance: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">
                {currentLabels.evidence.jointInsurance}
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.jointTaxReturns}
                onChange={(e) => setFormData(prev => ({ ...prev, jointTaxReturns: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">
                {currentLabels.evidence.jointTaxReturns}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.evidence.otherEvidence}
              </label>
              <textarea
                value={formData.otherEvidence}
                onChange={(e) => setFormData(prev => ({ ...prev, otherEvidence: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Children Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.children.title}</h2>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.hasChildren}
                onChange={(e) => setFormData(prev => ({ ...prev, hasChildren: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {currentLabels.children.hasChildren}
              </span>
            </label>
            {formData.hasChildren && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLabels.children.childrenDetails}
                </label>
                <textarea
                  value={formData.childrenDetails}
                  onChange={(e) => setFormData(prev => ({ ...prev, childrenDetails: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.additional.title}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.additional.criminalHistory}
              </label>
              <textarea
                value={formData.criminalHistory}
                onChange={(e) => setFormData(prev => ({ ...prev, criminalHistory: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.additional.immigrationViolations}
              </label>
              <textarea
                value={formData.immigrationViolations}
                onChange={(e) => setFormData(prev => ({ ...prev, immigrationViolations: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.additional.additionalInfo}
              </label>
              <textarea
                value={formData.additionalInformation}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalInformation: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FOIAFormData } from '../../types/forms';

const initialFormData: FOIAFormData = {
  requesterName: '',
  dateOfBirth: '',
  placeOfBirth: '',
  alienNumber: '',
  mailingAddress: '',
  phone: '',
  email: '',
  recordType: '',
  timeframeCovered: '',
  specificInformation: '',
  purposeOfRequest: '',
  proofOfIdentity: '',
  consentToRelease: false,
  additionalComments: ''
};

export const FOIAForm = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<FOIAFormData>(initialFormData);

  const labels = {
    en: {
      title: "FOIA Request Form",
      requester: {
        title: "Requester Information",
        name: "Full Legal Name",
        dateOfBirth: "Date of Birth",
        placeOfBirth: "Place of Birth",
        alienNumber: "Alien Registration Number (A-Number)",
        mailingAddress: "Mailing Address",
        phone: "Phone Number",
        email: "Email Address"
      },
      request: {
        title: "Request Details",
        recordType: "Type of Records Requested",
        timeframe: "Timeframe Covered",
        specificInfo: "Specific Information Requested",
        purpose: "Purpose of Request"
      },
      verification: {
        title: "Verification",
        proofOfIdentity: "Proof of Identity",
        consent: "I consent to the release of these records",
        additionalComments: "Additional Comments"
      },
      submit: "Submit Request"
    },
    zh: {
      title: "FOIA申请表",
      requester: {
        title: "申请人信息",
        name: "法定全名",
        dateOfBirth: "出生日期",
        placeOfBirth: "出生地点",
        alienNumber: "外国人登记号码（A号码）",
        mailingAddress: "邮寄地址",
        phone: "电话号码",
        email: "电子邮箱"
      },
      request: {
        title: "申请详情",
        recordType: "申请记录类型",
        timeframe: "涵盖时间范围",
        specificInfo: "具体申请信息",
        purpose: "申请目的"
      },
      verification: {
        title: "验证",
        proofOfIdentity: "身份证明",
        consent: "我同意发布这些记录",
        additionalComments: "附加说明"
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
    link.setAttribute('download', 'FOIA-request-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const subject = encodeURIComponent('FOIA Request Submission');
    const body = encodeURIComponent('Please find the FOIA request data in the attached CSV file.');
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
        {/* Requester Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.requester.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.requester.name}
              </label>
              <input
                type="text"
                required
                value={formData.requesterName}
                onChange={(e) => setFormData(prev => ({ ...prev, requesterName: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.requester.dateOfBirth}
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
                {currentLabels.requester.placeOfBirth}
              </label>
              <input
                type="text"
                required
                value={formData.placeOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, placeOfBirth: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.requester.alienNumber}
              </label>
              <input
                type="text"
                required
                value={formData.alienNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, alienNumber: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.requester.mailingAddress}
              </label>
              <input
                type="text"
                required
                value={formData.mailingAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, mailingAddress: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.requester.phone}
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.requester.email}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.request.title}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.request.recordType}
              </label>
              <select
                required
                value={formData.recordType}
                onChange={(e) => setFormData(prev => ({ ...prev, recordType: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select record type</option>
                <option value="complete">Complete Immigration File</option>
                <option value="specific">Specific Documents</option>
                <option value="status">Status Updates</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.request.timeframe}
              </label>
              <input
                type="text"
                required
                value={formData.timeframeCovered}
                onChange={(e) => setFormData(prev => ({ ...prev, timeframeCovered: e.target.value }))}
                placeholder="e.g., 2010-2023"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.request.specificInfo}
              </label>
              <textarea
                required
                value={formData.specificInformation}
                onChange={(e) => setFormData(prev => ({ ...prev, specificInformation: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.request.purpose}
              </label>
              <textarea
                required
                value={formData.purposeOfRequest}
                onChange={(e) => setFormData(prev => ({ ...prev, purposeOfRequest: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.verification.title}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.verification.proofOfIdentity}
              </label>
              <textarea
                required
                value={formData.proofOfIdentity}
                onChange={(e) => setFormData(prev => ({ ...prev, proofOfIdentity: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                required
                checked={formData.consentToRelease}
                onChange={(e) => setFormData(prev => ({ ...prev, consentToRelease: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">
                {currentLabels.verification.consent}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.verification.additionalComments}
              </label>
              <textarea
                value={formData.additionalComments}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalComments: e.target.value }))}
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
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { I129FFormData } from '../../types/forms';

const initialFormData: I129FFormData = {
  petitionerName: '',
  dateOfBirth: '',
  placeOfBirth: '',
  citizenship: '',
  ssn: '',
  address: '',
  phone: '',
  email: '',
  maritalStatus: '',
  previousMarriages: false,
  previousMarriageDetails: '',
  beneficiaryName: '',
  beneficiaryDateOfBirth: '',
  beneficiaryPlaceOfBirth: '',
  beneficiaryCitizenship: '',
  beneficiaryAddress: '',
  beneficiaryPhone: '',
  beneficiaryEmail: '',
  beneficiaryMaritalStatus: '',
  beneficiaryPreviousMarriages: false,
  beneficiaryPreviousMarriageDetails: '',
  howMet: '',
  meetingDate: '',
  inPersonMeeting: false,
  meetingDetails: '',
  proposalDate: '',
  proposalDetails: '',
  criminalHistory: '',
  immigrationViolations: '',
  additionalInformation: ''
};

export const I129FForm = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<I129FFormData>(initialFormData);

  const labels = {
    en: {
      petitioner: {
        title: "Petitioner Information",
        name: "Full Legal Name",
        dateOfBirth: "Date of Birth",
        placeOfBirth: "Place of Birth",
        citizenship: "Citizenship",
        ssn: "Social Security Number",
        address: "Current Address",
        phone: "Phone Number",
        email: "Email Address",
        maritalStatus: "Marital Status",
        previousMarriages: "Previous Marriages",
        previousMarriageDetails: "Previous Marriage Details"
      },
      beneficiary: {
        title: "Beneficiary Information",
        name: "Full Legal Name",
        dateOfBirth: "Date of Birth",
        placeOfBirth: "Place of Birth",
        citizenship: "Citizenship",
        address: "Current Address",
        phone: "Phone Number",
        email: "Email Address",
        maritalStatus: "Marital Status",
        previousMarriages: "Previous Marriages",
        previousMarriageDetails: "Previous Marriage Details"
      },
      relationship: {
        title: "Relationship Information",
        howMet: "How Did You Meet",
        meetingDate: "Date of First Meeting",
        inPersonMeeting: "Met in Person",
        meetingDetails: "Meeting Details",
        proposalDate: "Date of Proposal",
        proposalDetails: "Proposal Details"
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
      petitioner: {
        title: "申请人信息",
        name: "法定全名",
        dateOfBirth: "出生日期",
        placeOfBirth: "出生地点",
        citizenship: "国籍",
        ssn: "社会安全号码",
        address: "现居地址",
        phone: "电话号码",
        email: "电子邮箱",
        maritalStatus: "婚姻状况",
        previousMarriages: "以前的婚姻",
        previousMarriageDetails: "以前婚姻详情"
      },
      beneficiary: {
        title: "受益人信息",
        name: "法定全名",
        dateOfBirth: "出生日期",
        placeOfBirth: "出生地点",
        citizenship: "国籍",
        address: "现居地址",
        phone: "电话号码",
        email: "电子邮箱",
        maritalStatus: "婚姻状况",
        previousMarriages: "以前的婚姻",
        previousMarriageDetails: "以前婚姻详情"
      },
      relationship: {
        title: "关系信息",
        howMet: "相识经过",
        meetingDate: "首次见面日期",
        inPersonMeeting: "是否见过面",
        meetingDetails: "见面详情",
        proposalDate: "求婚日期",
        proposalDetails: "求婚详情"
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
    link.setAttribute('download', 'I-129F-form-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const subject = encodeURIComponent('I-129F Form Submission');
    const body = encodeURIComponent('Please find the I-129F form data in the attached CSV file.');
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
        {/* Petitioner Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.petitioner.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.petitioner.name}
              </label>
              <input
                type="text"
                value={formData.petitionerName}
                onChange={(e) => setFormData(prev => ({ ...prev, petitionerName: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.petitioner.dateOfBirth}
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
                {currentLabels.petitioner.placeOfBirth}
              </label>
              <input
                type="text"
                value={formData.placeOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, placeOfBirth: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.petitioner.citizenship}
              </label>
              <input
                type="text"
                value={formData.citizenship}
                onChange={(e) => setFormData(prev => ({ ...prev, citizenship: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.petitioner.ssn}
              </label>
              <input
                type="text"
                value={formData.ssn}
                onChange={(e) => setFormData(prev => ({ ...prev, ssn: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.petitioner.address}
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.petitioner.phone}
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
                {currentLabels.petitioner.email}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.petitioner.maritalStatus}
              </label>
              <select
                value={formData.maritalStatus}
                onChange={(e) => setFormData(prev => ({ ...prev, maritalStatus: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
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
                {currentLabels.petitioner.previousMarriages}
              </span>
            </label>
            {formData.previousMarriages && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLabels.petitioner.previousMarriageDetails}
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

        {/* Beneficiary Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.beneficiary.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.beneficiary.name}
              </label>
              <input
                type="text"
                value={formData.beneficiaryName}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryName: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.beneficiary.dateOfBirth}
              </label>
              <input
                type="date"
                value={formData.beneficiaryDateOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryDateOfBirth: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.beneficiary.placeOfBirth}
              </label>
              <input
                type="text"
                value={formData.beneficiaryPlaceOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryPlaceOfBirth: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.beneficiary.citizenship}
              </label>
              <input
                type="text"
                value={formData.beneficiaryCitizenship}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryCitizenship: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.beneficiary.address}
              </label>
              <input
                type="text"
                value={formData.beneficiaryAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryAddress: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.beneficiary.phone}
              </label>
              <input
                type="tel"
                value={formData.beneficiaryPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryPhone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.beneficiary.email}
              </label>
              <input
                type="email"
                value={formData.beneficiaryEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryEmail: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.beneficiary.maritalStatus}
              </label>
              <select
                value={formData.beneficiaryMaritalStatus}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryMaritalStatus: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.beneficiaryPreviousMarriages}
                onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryPreviousMarriages: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {currentLabels.beneficiary.previousMarriages}
              </span>
            </label>
            {formData.beneficiaryPreviousMarriages && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLabels.beneficiary.previousMarriageDetails}
                </label>
                <textarea
                  value={formData.beneficiaryPreviousMarriageDetails}
                  onChange={(e) => setFormData(prev => ({ ...prev, beneficiaryPreviousMarriageDetails: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>

        {/* Relationship Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.relationship.title}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.relationship.howMet}
              </label>
              <textarea
                value={formData.howMet}
                onChange={(e) => setFormData(prev => ({ ...prev, howMet: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLabels.relationship.meetingDate}
                </label>
                <input
                  type="date"
                  value={formData.meetingDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, meetingDate: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.inPersonMeeting}
                  onChange={(e) => setFormData(prev => ({ ...prev, inPersonMeeting: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">
                  {currentLabels.relationship.inPersonMeeting}
                </label>
              </div>
            </div>

            {formData.inPersonMeeting && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLabels.relationship.meetingDetails}
                </label>
                <textarea
                  value={formData.meetingDetails}
                  onChange={(e) => setFormData(prev => ({ ...prev, meetingDetails: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.relationship.proposalDate}
              </label>
              <input
                type="date"
                value={formData.proposalDate}
                onChange={(e) => setFormData(prev => ({ ...prev, proposalDate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.relationship.proposalDetails}
              </label>
              <textarea
                value={formData.proposalDetails}
                onChange={(e) => setFormData(prev => ({ ...prev, proposalDetails: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
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
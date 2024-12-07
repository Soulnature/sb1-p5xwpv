import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { I539FormData } from '../../types/i539Form';

const initialFormData: I539FormData = {
  fullName: '',
  otherNames: '',
  dateOfBirth: '',
  countryOfBirth: '',
  countryOfCitizenship: '',
  alienNumber: '',
  i94Number: '',
  passportNumber: '',
  passportExpiryDate: '',
  currentAddress: '',
  mailingAddress: '',
  phone: '',
  email: '',
  currentStatus: '',
  dateOfLastEntry: '',
  placeOfLastEntry: '',
  statusExpirationDate: '',
  requestedStatus: '',
  extensionReason: '',
  requestedDuration: '',
  currentEmployer: '',
  employerAddress: '',
  jobTitle: '',
  criminalHistory: false,
  criminalHistoryDetails: '',
  immigrationViolations: false,
  violationDetails: '',
  additionalInformation: '',
  hasDependents: false,
  dependentDetails: ''
};

export const I539Form = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<I539FormData>(initialFormData);

  const labels = {
    en: {
      title: "Extension/Change of Status Request",
      description: "Complete the information below for your extension or change of status request",
      personal: {
        title: "Personal Information",
        fullName: "Full Legal Name",
        otherNames: "Other Names Used",
        dateOfBirth: "Date of Birth",
        countryOfBirth: "Country of Birth",
        countryOfCitizenship: "Country of Citizenship",
        alienNumber: "Alien Registration Number (A-Number)",
        i94Number: "I-94 Number",
        passportNumber: "Passport Number",
        passportExpiryDate: "Passport Expiration Date"
      },
      contact: {
        title: "Contact Information",
        currentAddress: "Current Address",
        mailingAddress: "Mailing Address",
        phone: "Phone Number",
        email: "Email Address"
      },
      status: {
        title: "Current Status Information",
        currentStatus: "Current Status",
        dateOfLastEntry: "Date of Last Entry",
        placeOfLastEntry: "Place of Last Entry",
        statusExpirationDate: "Status Expiration Date"
      },
      extension: {
        title: "Extension/Change Details",
        requestedStatus: "Requested Status",
        extensionReason: "Reason for Extension",
        requestedDuration: "Requested Duration of Stay"
      },
      employment: {
        title: "Employment Information",
        currentEmployer: "Current Employer",
        employerAddress: "Employer Address",
        jobTitle: "Job Title"
      },
      additional: {
        title: "Additional Information",
        criminalHistory: "Criminal History",
        criminalHistoryDetails: "Criminal History Details",
        immigrationViolations: "Immigration Violations",
        violationDetails: "Violation Details",
        additionalInfo: "Additional Information"
      },
      dependents: {
        title: "Dependents",
        hasDependents: "Do you have dependents?",
        dependentDetails: "Dependent Details"
      },
      submit: "Submit Form"
    },
    zh: {
      title: "延期/变更申请",
      description: "请填写以下信息，用于您的延期或变更申请",
      personal: {
        title: "个人信息",
        fullName: "法定全名",
        otherNames: "曾用名",
        dateOfBirth: "出生日期",
        countryOfBirth: "出生国家",
        countryOfCitizenship: "国籍",
        alienNumber: "外国人登记号码（A号码）",
        i94Number: "I-94号码",
        passportNumber: "护照号码",
        passportExpiryDate: "护照到期日期"
      },
      contact: {
        title: "联系方式",
        currentAddress: "现居地址",
        mailingAddress: "邮寄地址",
        phone: "电话号码",
        email: "电子邮箱"
      },
      status: {
        title: "当前身份信息",
        currentStatus: "当前身份",
        dateOfLastEntry: "最后入境日期",
        placeOfLastEntry: "最后入境地点",
        statusExpirationDate: "身份到期日期"
      },
      extension: {
        title: "延期/变更详情",
        requestedStatus: "申请身份",
        extensionReason: "延期原因",
        requestedDuration: "申请停留时间"
      },
      employment: {
        title: "就业信息",
        currentEmployer: "当前雇主",
        employerAddress: "雇主地址",
        jobTitle: "职位"
      },
      additional: {
        title: "附加信息",
        criminalHistory: "犯罪记录",
        criminalHistoryDetails: "犯罪记录详情",
        immigrationViolations: "移民违规",
        violationDetails: "违规详情",
        additionalInfo: "其他信息"
      },
      dependents: {
        title: "家属",
        hasDependents: "是否有家属？",
        dependentDetails: "家属详情"
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
    link.setAttribute('download', 'I-539-form-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const subject = encodeURIComponent('I-539 Form Submission');
    const body = encodeURIComponent('Please find the I-539 form data in the attached CSV file.');
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
          </div>
        </div>

        {/* Extension Details */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.extension.title}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.extension.requestedStatus}
              </label>
              <select
                value={formData.requestedStatus}
                onChange={(e) => setFormData(prev => ({ ...prev, requestedStatus: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select status</option>
                <option value="B1">B-1 Business</option>
                <option value="B2">B-2 Tourist</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.extension.extensionReason}
              </label>
              <textarea
                value={formData.extensionReason}
                onChange={(e) => setFormData(prev => ({ ...prev, extensionReason: e.target.value }))}
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
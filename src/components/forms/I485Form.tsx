import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { PersonalSection } from './I485Form/PersonalSection';
import { ContactSection } from './I485Form/ContactSection';
import { ImmigrationSection } from './I485Form/ImmigrationSection';
import { I485FormData } from '../../types/i485Form';

const initialFormData: I485FormData = {
  fullName: '',
  otherNames: '',
  birthDate: '',
  birthPlace: '',
  nationality: '',
  alienNumber: '',
  socialSecurityNumber: '',
  uscisAccountNumber: '',
  currentAddress: '',
  mailingAddress: '',
  phone: '',
  mobile: '',
  email: '',
  lastEntryDate: '',
  i94Number: '',
  lastEntryStatus: '',
  currentStatus: '',
  statusExpirationDate: '',
  passportNumber: '',
  passportCountry: '',
  passportExpiration: '',
  applicationCategory: '',
  priorityDate: '',
  principalApplicant: '',
  addressHistory: [],
  travelHistory: [],
  employmentHistory: [],
  maritalStatus: '',
  spouseName: '',
  spouseBirthDate: '',
  spouseMarriageDate: '',
  spouseMarriagePlace: '',
  hasChildren: false,
  childrenDetails: '',
  criminalHistory: '',
  immigrationViolations: '',
  publicAssistance: '',
  additionalInformation: ''
};

export const I485Form = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<I485FormData>(initialFormData);

  const labels = {
    en: {
      personal: {
        title: "Personal Information",
        fullName: "Full Legal Name",
        otherNames: "Other Names Used",
        birthDate: "Date of Birth",
        birthPlace: "Place of Birth",
        nationality: "Nationality",
        alienNumber: "Alien Registration Number (A-Number)",
        socialSecurityNumber: "Social Security Number",
        uscisAccountNumber: "USCIS Online Account Number"
      },
      contact: {
        title: "Contact Information",
        currentAddress: "Current Physical Address",
        mailingAddress: "Mailing Address",
        phone: "Daytime Phone",
        mobile: "Mobile Phone",
        email: "Email Address"
      },
      immigration: {
        title: "Immigration Information",
        lastEntryDate: "Date of Last Entry",
        i94Number: "I-94 Number",
        lastEntryStatus: "Status at Last Entry",
        currentStatus: "Current Status",
        statusExpirationDate: "Status Expiration Date",
        passportNumber: "Passport Number",
        passportCountry: "Passport Country",
        passportExpiration: "Passport Expiration Date",
        applicationCategory: "Application Category",
        priorityDate: "Priority Date",
        principalApplicant: "Principal Applicant"
      },
      history: {
        title: "History Information",
        addressHistory: "Address History",
        travelHistory: "Travel History",
        employmentHistory: "Employment History"
      },
      family: {
        title: "Family Information",
        maritalStatus: "Marital Status",
        spouseName: "Spouse's Name",
        spouseBirthDate: "Spouse's Birth Date",
        spouseMarriageDate: "Marriage Date",
        spouseMarriagePlace: "Marriage Place",
        hasChildren: "Do you have children?",
        childrenDetails: "Children's Details"
      },
      additional: {
        title: "Additional Information",
        criminalHistory: "Criminal History",
        immigrationViolations: "Immigration Violations",
        publicAssistance: "Public Assistance",
        additionalInfo: "Additional Information"
      },
      submit: "Submit Form"
    },
    zh: {
      personal: {
        title: "个人信息",
        fullName: "法定全名",
        otherNames: "曾用名",
        birthDate: "出生日期",
        birthPlace: "出生地点",
        nationality: "国籍",
        alienNumber: "外国人登记号码（A号码）",
        socialSecurityNumber: "社会安全号码",
        uscisAccountNumber: "USCIS在线账号"
      },
      contact: {
        title: "联系方式",
        currentAddress: "现居地址",
        mailingAddress: "邮寄地址",
        phone: "日间电话",
        mobile: "手机号码",
        email: "电子邮箱"
      },
      immigration: {
        title: "移民信息",
        lastEntryDate: "最后入境日期",
        i94Number: "I-94号码",
        lastEntryStatus: "最后入境身份",
        currentStatus: "当前身份",
        statusExpirationDate: "身份到期日期",
        passportNumber: "护照号码",
        passportCountry: "护照签发国",
        passportExpiration: "护照到期日期",
        applicationCategory: "申请类别",
        priorityDate: "优先日期",
        principalApplicant: "主申请人"
      },
      history: {
        title: "历史信息",
        addressHistory: "地址历史",
        travelHistory: "旅行历史",
        employmentHistory: "工作历史"
      },
      family: {
        title: "家庭信息",
        maritalStatus: "婚姻状况",
        spouseName: "配偶姓名",
        spouseBirthDate: "配偶出生日期",
        spouseMarriageDate: "结婚日期",
        spouseMarriagePlace: "结婚地点",
        hasChildren: "是否有子女？",
        childrenDetails: "子女详情"
      },
      additional: {
        title: "附加信息",
        criminalHistory: "犯罪记录",
        immigrationViolations: "移民违规",
        publicAssistance: "公共福利",
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
    link.setAttribute('download', 'I-485-form-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const subject = encodeURIComponent('I-485 Form Submission');
    const body = encodeURIComponent('Please find the I-485 form data in the attached CSV file.');
    const mailtoLink = `mailto:zxtessentialservices@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    setFormData(initialFormData);
  };

  const handleFormChange = (updates: Partial<I485FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
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
                onChange={(e) => handleFormChange({ fullName: e.target.value })}
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
                onChange={(e) => handleFormChange({ otherNames: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.birthDate}
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleFormChange({ birthDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.birthPlace}
              </label>
              <input
                type="text"
                value={formData.birthPlace}
                onChange={(e) => handleFormChange({ birthPlace: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.nationality}
              </label>
              <input
                type="text"
                value={formData.nationality}
                onChange={(e) => handleFormChange({ nationality: e.target.value })}
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
                onChange={(e) => handleFormChange({ alienNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.socialSecurityNumber}
              </label>
              <input
                type="text"
                value={formData.socialSecurityNumber}
                onChange={(e) => handleFormChange({ socialSecurityNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.uscisAccountNumber}
              </label>
              <input
                type="text"
                value={formData.uscisAccountNumber}
                onChange={(e) => handleFormChange({ uscisAccountNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.contact.title}</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.contact.currentAddress}
              </label>
              <input
                type="text"
                value={formData.currentAddress}
                onChange={(e) => handleFormChange({ currentAddress: e.target.value })}
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
                onChange={(e) => handleFormChange({ mailingAddress: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLabels.contact.phone}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleFormChange({ phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLabels.contact.mobile}
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleFormChange({ mobile: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.contact.email}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleFormChange({ email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Immigration Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.immigration.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.immigration.lastEntryDate}
              </label>
              <input
                type="date"
                value={formData.lastEntryDate}
                onChange={(e) => handleFormChange({ lastEntryDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.immigration.i94Number}
              </label>
              <input
                type="text"
                value={formData.i94Number}
                onChange={(e) => handleFormChange({ i94Number: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.immigration.lastEntryStatus}
              </label>
              <input
                type="text"
                value={formData.lastEntryStatus}
                onChange={(e) => handleFormChange({ lastEntryStatus: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.immigration.currentStatus}
              </label>
              <input
                type="text"
                value={formData.currentStatus}
                onChange={(e) => handleFormChange({ currentStatus: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.immigration.statusExpirationDate}
              </label>
              <input
                type="date"
                value={formData.statusExpirationDate}
                onChange={(e) => handleFormChange({ statusExpirationDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.immigration.passportNumber}
              </label>
              <input
                type="text"
                value={formData.passportNumber}
                onChange={(e) => handleFormChange({ passportNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.immigration.passportCountry}
              </label>
              <input
                type="text"
                value={formData.passportCountry}
                onChange={(e) => handleFormChange({ passportCountry: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.immigration.passportExpiration}
              </label>
              <input
                type="date"
                value={formData.passportExpiration}
                onChange={(e) => handleFormChange({ passportExpiration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.immigration.applicationCategory}
              </label>
              <input
                type="text"
                value={formData.applicationCategory}
                onChange={(e) => handleFormChange({ applicationCategory: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.immigration.priorityDate}
              </label>
              <input
                type="date"
                value={formData.priorityDate}
                onChange={(e) => handleFormChange({ priorityDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.immigration.principalApplicant}
              </label>
              <input
                type="text"
                value={formData.principalApplicant}
                onChange={(e) => handleFormChange({ principalApplicant: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Family Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.family.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.family.maritalStatus}
              </label>
              <select
                value={formData.maritalStatus}
                onChange={(e) => handleFormChange({ maritalStatus: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.family.spouseName}
              </label>
              <input
                type="text"
                value={formData.spouseName}
                onChange={(e) => handleFormChange({ spouseName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.family.spouseBirthDate}
              </label>
              <input
                type="date"
                value={formData.spouseBirthDate}
                onChange={(e) => handleFormChange({ spouseBirthDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.family.spouseMarriageDate}
              </label>
              <input
                type="date"
                value={formData.spouseMarriageDate}
                onChange={(e) => handleFormChange({ spouseMarriageDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.family.spouseMarriagePlace}
              </label>
              <input
                type="text"
                value={formData.spouseMarriagePlace}
                onChange={(e) => handleFormChange({ spouseMarriagePlace: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.hasChildren}
                onChange={(e) => handleFormChange({ hasChildren: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {currentLabels.family.hasChildren}
              </span>
            </label>
            {formData.hasChildren && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLabels.family.childrenDetails}
                </label>
                <textarea
                  value={formData.childrenDetails}
                  onChange={(e) => handleFormChange({ childrenDetails: e.target.value })}
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
                onChange={(e) => handleFormChange({ criminalHistory: e.target.value })}
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
                onChange={(e) => handleFormChange({ immigrationViolations: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.additional.publicAssistance}
              </label>
              <textarea
                value={formData.publicAssistance}
                onChange={(e) => handleFormChange({ publicAssistance: e.target.value })}
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
                onChange={(e) => handleFormChange({ additionalInformation: e.target.value })}
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
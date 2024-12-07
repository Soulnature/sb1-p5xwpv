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
        passportExpiration: "Passport Expiration Date"
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
        passportExpiration: "护照到期日期"
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
        <PersonalSection
          formData={formData}
          onChange={handleFormChange}
          labels={currentLabels}
        />

        <hr className="border-gray-200" />

        <ContactSection
          formData={formData}
          onChange={handleFormChange}
          labels={currentLabels}
        />

        <hr className="border-gray-200" />

        <ImmigrationSection
          formData={formData}
          onChange={handleFormChange}
          labels={currentLabels}
        />
      </div>

      <div className="mt-8">
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
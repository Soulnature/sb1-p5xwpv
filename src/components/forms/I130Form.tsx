import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { PetitionerSection } from './I130Form/PetitionerSection';
import { BeneficiarySection } from './I130Form/BeneficiarySection';
import type { FormData, WorkHistoryEntry, ParentInfo } from '../../types/forms';

const initialWorkHistory: WorkHistoryEntry[] = [{
  employer: '',
  position: '',
  startDate: '',
  endDate: '',
  address: '',
  duties: '',
  isCurrent: false
}];

const initialParentInfo: ParentInfo = {
  name: '',
  birthDate: '',
  birthPlace: '',
  currentAddress: ''
};

const initialFormData: FormData = {
  petitionerName: '',
  petitionerDOB: '',
  petitionerSSN: '',
  petitionerAddress: '',
  petitionerPhone: '',
  petitionerEmail: '',
  petitionerCitizenshipStatus: '',
  petitionerWorkHistory: initialWorkHistory,
  petitionerMaritalStatus: '',
  petitionerBirthPlace: '',
  petitionerFather: initialParentInfo,
  petitionerMother: initialParentInfo,
  beneficiaryName: '',
  beneficiaryDOB: '',
  beneficiaryCountry: '',
  beneficiaryAddress: '',
  beneficiaryPhone: '',
  beneficiaryEmail: '',
  relationship: '',
  beneficiaryWorkHistory: initialWorkHistory,
  beneficiaryMaritalStatus: '',
  beneficiaryBirthPlace: '',
  hasChildren: false,
  numberOfChildren: '',
  childrenDetails: '',
  previousPetitions: '',
  comments: ''
};

export const I130Form = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const labels = {
    en: {
      petitioner: {
        title: "Petitioner Information",
        name: "Full Legal Name",
        dob: "Date of Birth",
        birthPlace: "Place of Birth",
        ssn: "Social Security Number",
        address: "Current U.S. Address",
        phone: "Phone Number",
        email: "Email Address",
        citizenshipStatus: "U.S. Citizenship Status",
        maritalStatus: "Marital Status"
      },
      beneficiary: {
        title: "Beneficiary Information",
        name: "Full Legal Name",
        dob: "Date of Birth",
        birthPlace: "Place of Birth",
        country: "Country of Birth",
        address: "Current Address",
        phone: "Phone Number",
        email: "Email Address",
        relationship: "Relationship to Petitioner",
        maritalStatus: "Marital Status",
        children: {
          hasChildren: "Do you have children?",
          numberOfChildren: "Number of Children",
          details: "Children's Details (Names and Ages)"
        }
      },
      additional: {
        title: "Additional Information",
        previousPetitions: "Have you filed other petitions?",
        comments: "Additional Comments"
      },
      maritalStatus: {
        single: "Single",
        married: "Married",
        divorced: "Divorced",
        widowed: "Widowed"
      },
      submit: "Submit Form"
    },
    zh: {
      petitioner: {
        title: "申请人信息",
        name: "法定全名",
        dob: "出生日期",
        birthPlace: "出生地点",
        ssn: "社会安全号码",
        address: "现居地址",
        phone: "电话号码",
        email: "电子邮箱",
        citizenshipStatus: "美国公民身份状态",
        maritalStatus: "婚姻状况"
      },
      beneficiary: {
        title: "受益人信息",
        name: "法定全名",
        dob: "出生日期",
        birthPlace: "出生地点",
        country: "出生国家",
        address: "现居地址",
        phone: "电话号码",
        email: "电子邮箱",
        relationship: "与申请人关系",
        maritalStatus: "婚姻状况",
        children: {
          hasChildren: "是否有子女？",
          numberOfChildren: "子女数量",
          details: "子女详情（姓名和年龄）"
        }
      },
      additional: {
        title: "附加信息",
        previousPetitions: "是否提交过其他申请？",
        comments: "其他备注"
      },
      maritalStatus: {
        single: "未婚",
        married: "已婚",
        divorced: "离异",
        widowed: "丧偶"
      },
      submit: "提交表格"
    }
  };

  const currentLabels = labels[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create CSV content with proper escaping
    const csvContent = Object.entries(formData)
      .map(([key, value]) => {
        const formattedValue = typeof value === 'object' ? JSON.stringify(value) : value;
        // Escape quotes and wrap in quotes if contains comma
        const escapedValue = formattedValue.toString().includes(',') 
          ? `"${formattedValue.replace(/"/g, '""')}"` 
          : formattedValue;
        return `${key},${escapedValue}`;
      })
      .join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'I-130-form-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Create mailto link with properly encoded subject and body
    const subject = encodeURIComponent('I-130 Form Submission');
    const body = encodeURIComponent('Please find the I-130 form data in the attached CSV file.');
    const mailtoLink = `mailto:zxtessentialservices@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    setFormData(initialFormData);
  };

  const handleFormChange = (updates: Partial<FormData>) => {
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
        <PetitionerSection
          formData={formData}
          onChange={handleFormChange}
          labels={currentLabels}
        />

        <hr className="border-gray-200" />

        <BeneficiarySection
          formData={formData}
          onChange={handleFormChange}
          labels={currentLabels}
        />

        <hr className="border-gray-200" />

        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.additional.title}</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.additional.previousPetitions}
              </label>
              <textarea
                value={formData.previousPetitions}
                onChange={(e) => handleFormChange({ previousPetitions: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.additional.comments}
              </label>
              <textarea
                value={formData.comments}
                onChange={(e) => handleFormChange({ comments: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
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
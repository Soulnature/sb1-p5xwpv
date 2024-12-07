import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { I131FormData, TripPlan } from '../../types/i131Form';

const initialTripPlan: TripPlan = {
  country: '',
  purpose: '',
  departureDate: '',
  returnDate: ''
};

const initialFormData: I131FormData = {
  fullName: '',
  alienNumber: '',
  dateOfBirth: '',
  countryOfBirth: '',
  citizenship: '',
  gender: '',
  ssn: '',
  currentAddress: '',
  mailingAddress: '',
  phone: '',
  email: '',
  immigrationStatus: '',
  dateOfPermanentResidence: '',
  classOfAdmission: '',
  documentType: 'reentry_permit',
  previousPermitNumber: '',
  previousPermitDate: '',
  plannedTrips: [initialTripPlan],
  totalTimeAbroad: '',
  purposeOfTrip: '',
  emergencyContactName: '',
  emergencyContactRelation: '',
  emergencyContactPhone: '',
  emergencyContactEmail: '',
  previousApplications: '',
  criminalHistory: '',
  additionalInformation: ''
};

export const I131Form = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<I131FormData>(initialFormData);

  const labels = {
    en: {
      personal: {
        title: "Personal Information",
        fullName: "Full Legal Name",
        alienNumber: "Alien Registration Number (A-Number)",
        dateOfBirth: "Date of Birth",
        countryOfBirth: "Country of Birth",
        citizenship: "Country of Citizenship",
        gender: "Gender",
        ssn: "Social Security Number"
      },
      contact: {
        title: "Contact Information",
        currentAddress: "Current Physical Address",
        mailingAddress: "Mailing Address",
        phone: "Phone Number",
        email: "Email Address"
      },
      immigration: {
        title: "Immigration Status",
        status: "Current Immigration Status",
        dateOfPermanentResidence: "Date of Permanent Residence",
        classOfAdmission: "Class of Admission"
      },
      travel: {
        title: "Travel Information",
        documentType: "Type of Document Requested",
        previousPermit: "Previous Re-entry Permit",
        permitNumber: "Previous Permit Number",
        permitDate: "Previous Permit Date",
        addTrip: "Add Another Trip",
        country: "Country",
        purpose: "Purpose",
        departure: "Departure Date",
        return: "Return Date",
        totalTime: "Total Time Abroad",
        tripPurpose: "Overall Purpose of Trip"
      },
      emergency: {
        title: "Emergency Contact",
        name: "Contact Name",
        relation: "Relationship",
        phone: "Phone Number",
        email: "Email Address"
      },
      additional: {
        title: "Additional Information",
        previousApplications: "Previous Applications",
        criminalHistory: "Criminal History",
        otherInfo: "Additional Information"
      },
      submit: "Submit Form"
    },
    zh: {
      personal: {
        title: "个人信息",
        fullName: "法定全名",
        alienNumber: "外国人登记号码（A号码）",
        dateOfBirth: "出生日期",
        countryOfBirth: "出生国家",
        citizenship: "国籍",
        gender: "性别",
        ssn: "社会安全号码"
      },
      contact: {
        title: "联系方式",
        currentAddress: "现居地址",
        mailingAddress: "邮寄地址",
        phone: "电话号码",
        email: "电子邮箱"
      },
      immigration: {
        title: "移民身份",
        status: "当前移民身份",
        dateOfPermanentResidence: "获得永久居民日期",
        classOfAdmission: "入境类别"
      },
      travel: {
        title: "旅行信息",
        documentType: "申请文件类型",
        previousPermit: "之前的回美证",
        permitNumber: "之前的证件号码",
        permitDate: "之前的证件日期",
        addTrip: "添加另一次旅行",
        country: "国家",
        purpose: "目的",
        departure: "出发日期",
        return: "返回日期",
        totalTime: "海外停留总时间",
        tripPurpose: "旅行总体目的"
      },
      emergency: {
        title: "紧急联系人",
        name: "联系人姓名",
        relation: "关系",
        phone: "电话号码",
        email: "电子邮箱"
      },
      additional: {
        title: "附加信息",
        previousApplications: "之前的申请",
        criminalHistory: "犯罪记录",
        otherInfo: "其他信息"
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
    link.setAttribute('download', 'I-131-form-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const subject = encodeURIComponent('I-131 Form Submission');
    const body = encodeURIComponent('Please find the I-131 form data in the attached CSV file.');
    const mailtoLink = `mailto:zxtessentialservices@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    setFormData(initialFormData);
  };

  const handleAddTrip = () => {
    setFormData(prev => ({
      ...prev,
      plannedTrips: [...prev.plannedTrips, initialTripPlan]
    }));
  };

  const handleTripChange = (index: number, field: keyof TripPlan, value: string) => {
    setFormData(prev => ({
      ...prev,
      plannedTrips: prev.plannedTrips.map((trip, i) =>
        i === index ? { ...trip, [field]: value } : trip
      )
    }));
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
            {/* Add other personal information fields */}
          </div>
        </div>

        {/* Travel Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.travel.title}</h2>
          
          {formData.plannedTrips.map((trip, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLabels.travel.country}
                </label>
                <input
                  type="text"
                  value={trip.country}
                  onChange={(e) => handleTripChange(index, 'country', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {/* Add other trip fields */}
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddTrip}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            {currentLabels.travel.addTrip}
          </button>
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
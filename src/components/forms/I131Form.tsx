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
      document: {
        title: "Travel Document Information",
        type: "Type of Document Requested",
        previousPermitNumber: "Previous Permit Number",
        previousPermitDate: "Previous Permit Date"
      },
      travel: {
        title: "Travel Plans",
        addTrip: "Add Another Trip",
        country: "Country",
        purpose: "Purpose",
        departureDate: "Departure Date",
        returnDate: "Return Date",
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
      document: {
        title: "旅行证件信息",
        type: "申请证件类型",
        previousPermitNumber: "之前的证件号码",
        previousPermitDate: "之前的证件日期"
      },
      travel: {
        title: "旅行计划",
        addTrip: "添加另一次旅行",
        country: "国家",
        purpose: "目的",
        departureDate: "出发日期",
        returnDate: "返回日期",
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
        additionalInfo: "其他信息"
      },
      submit: "提交表格"
    }
  };

  const currentLabels = labels[language];

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

  const handleRemoveTrip = (index: number) => {
    setFormData(prev => ({
      ...prev,
      plannedTrips: prev.plannedTrips.filter((_, i) => i !== index)
    }));
  };

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
                {currentLabels.personal.countryOfBirth}
              </label>
              <input
                type="text"
                value={formData.countryOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, countryOfBirth: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.citizenship}
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
                {currentLabels.personal.gender}
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.personal.ssn}
              </label>
              <input
                type="text"
                value={formData.ssn}
                onChange={(e) => setFormData(prev => ({ ...prev, ssn: e.target.value }))}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLabels.contact.phone}
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
                  {currentLabels.contact.email}
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
        </div>

        {/* Immigration Status */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.immigration.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.immigration.status}
              </label>
              <input
                type="text"
                value={formData.immigrationStatus}
                onChange={(e) => setFormData(prev => ({ ...prev, immigrationStatus: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.immigration.dateOfPermanentResidence}
              </label>
              <input
                type="date"
                value={formData.dateOfPermanentResidence}
                onChange={(e) => setFormData(prev => ({ ...prev, dateOfPermanentResidence: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.immigration.classOfAdmission}
              </label>
              <input
                type="text"
                value={formData.classOfAdmission}
                onChange={(e) => setFormData(prev => ({ ...prev, classOfAdmission: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Travel Document Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.document.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.document.type}
              </label>
              <select
                value={formData.documentType}
                onChange={(e) => setFormData(prev => ({ ...prev, documentType: e.target.value as 'reentry_permit' | 'refugee_travel_document' | 'advance_parole' }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="reentry_permit">Re-entry Permit</option>
                <option value="refugee_travel_document">Refugee Travel Document</option>
                <option value="advance_parole">Advance Parole</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.document.previousPermitNumber}
              </label>
              <input
                type="text"
                value={formData.previousPermitNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, previousPermitNumber: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.document.previousPermitDate}
              </label>
              <input
                type="date"
                value={formData.previousPermitDate}
                onChange={(e) => setFormData(prev => ({ ...prev, previousPermitDate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Travel Plans */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.travel.title}</h2>
          <div className="space-y-6">
            {formData.plannedTrips.map((trip, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {currentLabels.travel.purpose}
                    </label>
                    <input
                      type="text"
                      value={trip.purpose}
                      onChange={(e) => handleTripChange(index, 'purpose', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {currentLabels.travel.departureDate}
                    </label>
                    <input
                      type="date"
                      value={trip.departureDate}
                      onChange={(e) => handleTripChange(index, 'departureDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {currentLabels.travel.returnDate}
                    </label>
                    <input
                      type="date"
                      value={trip.returnDate}
                      onChange={(e) => handleTripChange(index, 'returnDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                {formData.plannedTrips.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTrip(index)}
                    className="mt-4 text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove Trip
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTrip}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              {currentLabels.travel.addTrip}
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLabels.travel.totalTime}
                </label>
                <input
                  type="text"
                  value={formData.totalTimeAbroad}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalTimeAbroad: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLabels.travel.tripPurpose}
                </label>
                <textarea
                  value={formData.purposeOfTrip}
                  onChange={(e) => setFormData(prev => ({ ...prev, purposeOfTrip: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium">{currentLabels.emergency.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.emergency.name}
              </label>
              <input
                type="text"
                value={formData.emergencyContactName}
                onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactName: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.emergency.relation}
              </label>
              <input
                type="text"
                value={formData.emergencyContactRelation}
                onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactRelation: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.emergency.phone}
              </label>
              <input
                type="tel"
                value={formData.emergencyContactPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactPhone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.emergency.email}
              </label>
              <input
                type="email"
                value={formData.emergencyContactEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactEmail: e.target.value }))}
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
                {currentLabels.additional.previousApplications}
              </label>
              <textarea
                value={formData.previousApplications}
                onChange={(e) => setFormData(prev => ({ ...prev, previousApplications: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

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
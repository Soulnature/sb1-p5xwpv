import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface InterpretationFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  sourceLanguage: string;
  targetLanguage: string;
  date: string;
  duration: string;
  location: string;
  numberOfPeople: number;
  specialRequirements: string;
}

const initialFormData: InterpretationFormData = {
  name: '',
  email: '',
  phone: '',
  serviceType: '',
  sourceLanguage: '',
  targetLanguage: '',
  date: '',
  duration: '',
  location: '',
  numberOfPeople: 1,
  specialRequirements: ''
};

export const InterpretationForm = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<InterpretationFormData>(initialFormData);

  const labels = {
    en: {
      title: "Interpretation Service Request",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      serviceType: "Service Type",
      sourceLanguage: "Source Language",
      targetLanguage: "Target Language",
      date: "Service Date",
      duration: "Duration",
      location: "Location",
      numberOfPeople: "Number of People",
      specialRequirements: "Special Requirements",
      submit: "Submit Request"
    },
    zh: {
      title: "口译服务申请",
      name: "姓名",
      email: "电子邮箱",
      phone: "电话号码",
      serviceType: "服务类型",
      sourceLanguage: "源语言",
      targetLanguage: "目标语言",
      date: "服务日期",
      duration: "时长",
      location: "地点",
      numberOfPeople: "人数",
      specialRequirements: "特殊要求",
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
    link.setAttribute('download', 'interpretation-request.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const subject = encodeURIComponent('Interpretation Service Request');
    const body = encodeURIComponent('Please find the interpretation request details in the attached CSV file.');
    const mailtoLink = `mailto:zxtessentialservices@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    setFormData(initialFormData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm mb-16"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-medium mb-8">{currentLabels.title}</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLabels.name}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLabels.email}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLabels.serviceType}
          </label>
          <select
            required
            value={formData.serviceType}
            onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select service type</option>
            <option value="business">Business Interpretation</option>
            <option value="legal">Legal Interpretation</option>
            <option value="tourism">Tourism Interpretation</option>
            <option value="education">Education Interpretation</option>
            <option value="daily">Daily Life Interpretation</option>
            <option value="workplace">Workplace Interpretation</option>
            <option value="cultural">Cultural Events Interpretation</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLabels.sourceLanguage}
            </label>
            <select
              required
              value={formData.sourceLanguage}
              onChange={(e) => setFormData(prev => ({ ...prev, sourceLanguage: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select language</option>
              <option value="zh">Chinese</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLabels.targetLanguage}
            </label>
            <select
              required
              value={formData.targetLanguage}
              onChange={(e) => setFormData(prev => ({ ...prev, targetLanguage: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select language</option>
              <option value="zh">Chinese</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLabels.date}
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLabels.duration}
            </label>
            <input
              type="text"
              required
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              placeholder="e.g., 2 hours, half day, full day"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLabels.location}
          </label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLabels.numberOfPeople}
          </label>
          <input
            type="number"
            min="1"
            required
            value={formData.numberOfPeople}
            onChange={(e) => setFormData(prev => ({ ...prev, numberOfPeople: parseInt(e.target.value) }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLabels.specialRequirements}
          </label>
          <textarea
            value={formData.specialRequirements}
            onChange={(e) => setFormData(prev => ({ ...prev, specialRequirements: e.target.value }))}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

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
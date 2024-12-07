import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface ServiceFormProps {
  serviceName: string;
}

export const ServiceForm = ({ serviceName }: ServiceFormProps) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const labels = {
    en: {
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone Number',
      message: 'Message',
      submit: 'Submit Request',
      success: 'Form submitted successfully!'
    },
    zh: {
      name: '姓名',
      email: '邮箱',
      phone: '电话',
      message: '留言',
      submit: '提交申请',
      success: '表单提交成功！'
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const csvContent = `Name,Email,Phone,Message\n${formData.name},${formData.email},${formData.phone},"${formData.message}"`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${serviceName}-request.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Create mailto link with CSV as attachment
    const mailtoLink = `mailto:zxtessentialservices@gmail.com?subject=${serviceName} Service Request&body=Please find the service request details in the attached CSV file.`;
    window.location.href = mailtoLink;
    
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const currentLabels = labels[language];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLabels.name}
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLabels.phone}
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLabels.message}
          </label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {currentLabels.submit}
        </button>
      </div>
    </motion.form>
  );
};
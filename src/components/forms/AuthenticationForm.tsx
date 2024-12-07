import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface AuthenticationFormData {
  name: string;
  email: string;
  phone: string;
  documentType: string;
  documentCountry: string;
  destinationCountry: string;
  urgency: string;
  quantity: number;
  additionalServices: {
    translation: boolean;
    notarization: boolean;
    certification: boolean;
  };
  additionalRequirements: string;
}

const initialFormData: AuthenticationFormData = {
  name: '',
  email: '',
  phone: '',
  documentType: '',
  documentCountry: '',
  destinationCountry: '',
  urgency: 'normal',
  quantity: 1,
  additionalServices: {
    translation: false,
    notarization: false,
    certification: false
  },
  additionalRequirements: ''
};

export const AuthenticationForm = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<AuthenticationFormData>(initialFormData);

  const labels = {
    en: {
      title: "Authentication Request Form",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      documentType: "Document Type",
      documentCountry: "Document Issuing Country",
      destinationCountry: "Destination Country",
      urgency: "Urgency Level",
      urgencyOptions: {
        normal: "Normal (7-10 business days)",
        urgent: "Urgent (3-5 business days)",
        express: "Express (1-2 business days)"
      },
      quantity: "Number of Documents",
      additionalServices: {
        title: "Additional Services",
        translation: "Document Translation",
        notarization: "Notarization",
        certification: "Additional Certification"
      },
      additionalRequirements: "Additional Requirements",
      submit: "Submit Request"
    },
    zh: {
      title: "认证申请表",
      name: "姓名",
      email: "电子邮箱",
      phone: "电话号码",
      documentType: "文件类型",
      documentCountry: "文件签发国",
      destinationCountry: "目标使用国",
      urgency: "紧急程度",
      urgencyOptions: {
        normal: "普通（7-10个工作日）",
        urgent: "加急（3-5个工作日）",
        express: "特急（1-2个工作日）"
      },
      quantity: "文件数量",
      additionalServices: {
        title: "附加服务",
        translation: "文件翻译",
        notarization: "公证服务",
        certification: "额外认证"
      },
      additionalRequirements: "其他要求",
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
    link.setAttribute('download', 'authentication-request.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const subject = encodeURIComponent('Authentication Service Request');
    const body = encodeURIComponent('Please find the authentication request details in the attached CSV file.');
    const mailtoLink = `mailto:zxtessentialservices@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    setFormData(initialFormData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm"
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
            {currentLabels.documentType}
          </label>
          <input
            type="text"
            required
            value={formData.documentType}
            onChange={(e) => setFormData(prev => ({ ...prev, documentType: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLabels.documentCountry}
            </label>
            <input
              type="text"
              required
              value={formData.documentCountry}
              onChange={(e) => setFormData(prev => ({ ...prev, documentCountry: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLabels.destinationCountry}
            </label>
            <input
              type="text"
              required
              value={formData.destinationCountry}
              onChange={(e) => setFormData(prev => ({ ...prev, destinationCountry: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLabels.urgency}
          </label>
          <select
            required
            value={formData.urgency}
            onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="normal">{currentLabels.urgencyOptions.normal}</option>
            <option value="urgent">{currentLabels.urgencyOptions.urgent}</option>
            <option value="express">{currentLabels.urgencyOptions.express}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLabels.quantity}
          </label>
          <input
            type="number"
            min="1"
            required
            value={formData.quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            {currentLabels.additionalServices.title}
          </h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.additionalServices.translation}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  additionalServices: {
                    ...prev.additionalServices,
                    translation: e.target.checked
                  }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                {currentLabels.additionalServices.translation}
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.additionalServices.notarization}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  additionalServices: {
                    ...prev.additionalServices,
                    notarization: e.target.checked
                  }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                {currentLabels.additionalServices.notarization}
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.additionalServices.certification}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  additionalServices: {
                    ...prev.additionalServices,
                    certification: e.target.checked
                  }
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                {currentLabels.additionalServices.certification}
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {currentLabels.additionalRequirements}
          </label>
          <textarea
            value={formData.additionalRequirements}
            onChange={(e) => setFormData(prev => ({ ...prev, additionalRequirements: e.target.value }))}
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
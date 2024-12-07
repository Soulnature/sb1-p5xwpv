import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface TranslationFormData {
  name: string;
  email: string;
  phone: string;
  documentType: string;
  sourceLanguage: string;
  targetLanguage: string;
  urgency: string;
  notarizationNeeded: boolean;
  additionalRequirements: string;
}

const initialFormData: TranslationFormData = {
  name: '',
  email: '',
  phone: '',
  documentType: '',
  sourceLanguage: '',
  targetLanguage: '',
  urgency: 'normal',
  notarizationNeeded: false,
  additionalRequirements: ''
};

export const TranslationForm = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<TranslationFormData>(initialFormData);

  const labels = {
    en: {
      title: "Translation Request Form",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      documentType: "Document Type",
      sourceLanguage: "Source Language",
      targetLanguage: "Target Language",
      urgency: "Urgency Level",
      urgencyOptions: {
        normal: "Normal (3-5 business days)",
        urgent: "Urgent (1-2 business days)",
        express: "Express (24 hours)"
      },
      notarization: "Notarization Required",
      additionalRequirements: "Additional Requirements",
      submit: "Submit Request"
    },
    zh: {
      title: "翻译申请表",
      name: "姓名",
      email: "电子邮箱",
      phone: "电话号码",
      documentType: "文件类型",
      sourceLanguage: "源语言",
      targetLanguage: "目标语言",
      urgency: "紧急程度",
      urgencyOptions: {
        normal: "普通（3-5个工作日）",
        urgent: "加急（1-2个工作日）",
        express: "特急（24小时内）"
      },
      notarization: "需要公证",
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
    link.setAttribute('download', 'translation-request.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    const subject = encodeURIComponent('Translation Service Request');
    const body = encodeURIComponent('Please find the translation request details in the attached CSV file.');
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

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.notarizationNeeded}
            onChange={(e) => setFormData(prev => ({ ...prev, notarizationNeeded: e.target.checked }))}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700">
            {currentLabels.notarization}
          </label>
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
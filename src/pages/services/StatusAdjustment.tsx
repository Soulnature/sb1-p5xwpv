import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { I485Form } from '../../components/forms/I485Form';

const content = {
  en: {
    title: "Status Adjustment - Form I-485",
    description: "Complete the information below for your application to register permanent residence or adjust status. This form collects the necessary information for Form I-485.",
    sections: [
      "Application to Register Permanent Residence",
      "Adjustment of Status",
      "Comprehensive background information",
      "Professional assistance with document preparation"
    ]
  },
  zh: {
    title: "身份调整 - I-485表格",
    description: "请填写以下信息，用于您的永久居民身份登记或身份调整申请。该表格收集I-485身份调整申请表所需的信息。",
    sections: [
      "永久居民身份登记申请",
      "身份调整申请",
      "全面的背景信息收集",
      "专业文件准备协助"
    ]
  }
};

export const StatusAdjustment = () => {
  const { language } = useLanguage();
  const currentContent = content[language];

  return (
    <div className="pt-24 px-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl font-light mb-6">{currentContent.title}</h1>
          <p className="text-xl text-gray-600 mb-8">
            {currentContent.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <ul className="space-y-4">
            {currentContent.sections.map((section, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-blue-600 rounded-full mr-3"></span>
                <span className="text-gray-700">{section}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <I485Form />
      </div>
    </div>
  );
};
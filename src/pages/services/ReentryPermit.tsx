import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { I131Form } from '../../components/forms/I131Form';

const content = {
  en: {
    title: "Re-entry Permit - Form I-131",
    description: "Complete the information below for your re-entry permit application. This form collects the necessary information for Form I-131, Application for Travel Document.",
    sections: [
      "Re-entry Permit for Permanent Residents",
      "Travel Document Application",
      "Comprehensive travel planning",
      "Professional assistance with document preparation"
    ]
  },
  zh: {
    title: "回美证 - I-131表格",
    description: "请填写以下信息，用于您的回美证申请。该表格收集I-131旅行证件申请表所需的信息。",
    sections: [
      "永久居民回美证申请",
      "旅行证件申请",
      "全面的旅行计划",
      "专业文件准备协助"
    ]
  }
};

export const ReentryPermit = () => {
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

        <I131Form />
      </div>
    </div>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FOIAForm } from '../../components/forms/FOIAForm';

const content = {
  en: {
    title: "Immigration File Review - FOIA Request",
    description: "Complete the information below to request your immigration file through the Freedom of Information Act (FOIA). This form helps collect the necessary information for your FOIA request.",
    sections: [
      "Request your complete immigration file",
      "Track previous applications and petitions",
      "Review immigration history",
      "Professional assistance with document preparation"
    ]
  },
  zh: {
    title: "移民档案调查 - FOIA申请",
    description: "请填写以下信息，通过信息自由法（FOIA）申请您的移民档案。该表格帮助收集FOIA申请所需的信息。",
    sections: [
      "申请完整的移民档案",
      "追踪之前的申请和请愿",
      "审查移民历史",
      "专业文件准备协助"
    ]
  }
};

export const FileReview = () => {
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

        <FOIAForm />
      </div>
    </div>
  );
};
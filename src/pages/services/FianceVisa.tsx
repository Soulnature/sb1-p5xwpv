import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { I129FForm } from '../../components/forms/I129FForm';

const content = {
  en: {
    title: "Fiancé(e) Visa - Form I-129F",
    description: "Complete the information below for your fiancé(e) visa petition. This form collects the necessary information for Form I-129F, Petition for Alien Fiancé(e).",
    sections: [
      "Petition for K-1 Fiancé(e) Visa",
      "Relationship evidence documentation",
      "Meeting requirement verification",
      "Professional assistance with document preparation"
    ]
  },
  zh: {
    title: "未婚夫/妻签证 - I-129F表格",
    description: "请填写以下信息，用于您的未婚夫/妻签证申请。该表格收集I-129F未婚夫/妻签证申请表所需的信息。",
    sections: [
      "K-1未婚夫/妻签证申请",
      "关系证明文件",
      "见面要求验证",
      "专业文件准备协助"
    ]
  }
};

export const FianceVisa = () => {
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

        <I129FForm />
      </div>
    </div>
  );
};
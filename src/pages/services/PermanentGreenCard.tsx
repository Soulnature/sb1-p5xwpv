import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { I751Form } from '../../components/forms/I751Form';

const content = {
  en: {
    title: "Permanent Green Card - Form I-751",
    description: "Complete the information below to petition to remove conditions on residence. This form collects the necessary information for Form I-751.",
    sections: [
      "Remove conditions on permanent resident status",
      "Joint filing with spouse",
      "Evidence of bona fide marriage",
      "Professional assistance with document preparation"
    ]
  },
  zh: {
    title: "临时绿卡转正 - I-751表格",
    description: "请填写以下信息，用于申请解除居留条件。该表格收集I-751条件解除申请表所需的信息。",
    sections: [
      "解除永久居民身份条件限制",
      "与配偶共同申请",
      "真实婚姻证明",
      "专业文件准备协助"
    ]
  }
};

export const PermanentGreenCard = () => {
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

        <I751Form />
      </div>
    </div>
  );
};
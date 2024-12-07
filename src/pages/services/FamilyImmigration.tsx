import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { I130Form } from '../../components/forms/I130Form';

const content = {
  en: {
    title: "Family Immigration - Form I-130",
    description: "Complete the information below for your family-based immigration petition. This form collects the necessary information for Form I-130, Petition for Alien Relative.",
    sections: [
      "U.S. citizen or permanent resident petitioning for eligible family members",
      "Spouse, children, parents, and siblings of U.S. citizens",
      "Spouse and unmarried children of permanent residents",
      "Professional assistance with document preparation and submission"
    ]
  },
  zh: {
    title: "亲属移民 - I-130表格",
    description: "请填写以下信息，用于您的亲属移民申请。该表格收集I-130亲属移民申请表所需的信息。",
    sections: [
      "美国公民或永久居民为符合条件的家庭成员申请",
      "美国公民的配偶、子女、父母和兄弟姐妹",
      "永久居民的配偶和未婚子女",
      "专业协助文件准备和提交"
    ]
  }
};

export const FamilyImmigration = () => {
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

        <I130Form />
      </div>
    </div>
  );
};
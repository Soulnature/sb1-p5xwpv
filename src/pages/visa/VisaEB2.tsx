import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export const VisaEB2 = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "EB-2 Visa",
      description: "The EB-2 visa is designed for professionals holding advanced degrees or those with exceptional ability in their field, including those who qualify for a National Interest Waiver.",
      requirements: {
        title: "Requirements",
        items: [
          "Hold an advanced degree in the relevant field",
          "Bachelor's degree plus at least 5 years of progressive experience",
          "Exceptional ability in science, arts, or business"
        ]
      },
      process: {
        title: "Application Process",
        items: [
          "Qualification Assessment: Evaluate educational background and work experience",
          "Documentation: Gather educational certificates and work experience proof",
          "Labor Certification: Required unless qualifying for NIW",
          "Application Submission: Submit complete application to USCIS"
        ]
      }
    },
    zh: {
      title: "EB-2签证",
      description: "EB-2签证适用于具有高等学位或特殊能力的专业人士，以及符合国家利益豁免条件的申请人。",
      requirements: {
        title: "申请条件",
        items: [
          "持有相关领域的硕士或更高学位",
          "具有学士学位和至少5年的相关工作经验",
          "在科学、艺术或商业领域具有特殊能力"
        ]
      },
      process: {
        title: "申请流程",
        items: [
          "资格评估：评估教育背景和工作经验",
          "准备材料：收集学历证明、工作证明等文件",
          "劳工证申请：除非符合NIW条件，否则需要完成劳工证流程",
          "提交申请：向移民局提交完整的申请材料"
        ]
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-light mb-6">{currentContent.title}</h1>
        <div className="prose max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            {currentContent.description}
          </p>
          
          <h2 className="text-2xl font-medium mt-12 mb-4">{currentContent.requirements.title}</h2>
          <ul className="list-disc pl-6 space-y-2">
            {currentContent.requirements.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          
          <h2 className="text-2xl font-medium mt-12 mb-4">{currentContent.process.title}</h2>
          <ol className="list-decimal pl-6 space-y-4">
            {currentContent.process.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </motion.div>
    </div>
  );
};
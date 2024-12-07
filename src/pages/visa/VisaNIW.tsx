import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export const VisaNIW = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "National Interest Waiver (NIW)",
      description: "The National Interest Waiver (NIW) allows certain individuals to apply for permanent residency without a labor certification by proving their work is in the national interest of the United States.",
      advantages: {
        title: "Advantages",
        items: [
          "No labor certification required",
          "No employer sponsorship needed",
          "Relatively faster processing time",
          "Can be self-employed or start a business"
        ]
      },
      criteria: {
        title: "Evaluation Criteria",
        items: [
          "The proposed endeavor has substantial merit",
          "The applicant is well positioned to advance the field",
          "Waiving the labor certification requirement benefits the national interest"
        ]
      }
    },
    zh: {
      title: "NIW国家利益豁免",
      description: "国家利益豁免（NIW）允许特定申请人在不需要劳工证的情况下申请永久居留权，适用于能够证明其工作对美国国家利益具有重要意义的专业人士。",
      advantages: {
        title: "申请优势",
        items: [
          "无需劳工证",
          "无需雇主担保",
          "处理时间相对较快",
          "可自雇或创业"
        ]
      },
      criteria: {
        title: "评估标准",
        items: [
          "申请人的工作具有实质性价值",
          "申请人有能力推进该领域的发展",
          "豁免劳工证要求符合国家利益"
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
          
          <h2 className="text-2xl font-medium mt-12 mb-4">{currentContent.advantages.title}</h2>
          <ul className="list-disc pl-6 space-y-2">
            {currentContent.advantages.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          
          <h2 className="text-2xl font-medium mt-12 mb-4">{currentContent.criteria.title}</h2>
          <ol className="list-decimal pl-6 space-y-4">
            {currentContent.criteria.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </motion.div>
    </div>
  );
};
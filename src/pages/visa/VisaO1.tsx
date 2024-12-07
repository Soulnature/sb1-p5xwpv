import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export const VisaO1 = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "O-1 Visa",
      description: "The O-1 visa is a non-immigrant visa designed for individuals with extraordinary ability in sciences, arts, education, business, or athletics.",
      requirements: {
        title: "Requirements",
        items: [
          "National or international awards in the field",
          "Participation as a judge of others' work",
          "Featured in major media",
          "Original contributions to the field",
          "High remuneration or commercial success"
        ]
      },
      features: {
        title: "Visa Features",
        items: [
          "Initial validity up to 3 years",
          "Unlimited extensions possible",
          "Spouse and children eligible for O-3 visas",
          "Can pursue green card simultaneously"
        ]
      }
    },
    zh: {
      title: "O-1签证",
      description: "O-1签证是为在科学、艺术、教育、商业或体育领域具有特殊才能的个人设计的非移民签证。",
      requirements: {
        title: "申请条件",
        items: [
          "在相关领域获得国家级或国际级奖项",
          "担任重要评审工作",
          "在主流媒体上有报道",
          "对所属领域有原创性贡献",
          "获得高额报酬或商业成功"
        ]
      },
      features: {
        title: "签证特点",
        items: [
          "初始有效期最长可达3年",
          "可以无限次延期",
          "配偶和子女可申请O-3签证随行",
          "可以同时申请绿卡"
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
          
          <h2 className="text-2xl font-medium mt-12 mb-4">{currentContent.features.title}</h2>
          <ul className="list-disc pl-6 space-y-2">
            {currentContent.features.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};
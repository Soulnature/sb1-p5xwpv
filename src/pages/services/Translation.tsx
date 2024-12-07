import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { TranslationForm } from '../../components/forms/TranslationForm';

const content = {
  en: {
    title: "Document Translation Services",
    description: "Professional translation services for all your official documents with notarization",
    categories: [
      {
        title: "Personal Identity Documents",
        items: [
          "ID Cards",
          "Household Registration",
          "Birth Certificates",
          "Marriage/Divorce Certificates",
          "Passports and Visas",
          "Residence Permits"
        ]
      },
      {
        title: "Educational & Professional Qualifications",
        items: [
          "Graduation Certificates",
          "Degree Certificates",
          "Academic Transcripts",
          "Professional Qualifications",
          "Overseas Study Return Certificates"
        ]
      },
      {
        title: "Property Documents",
        items: [
          "Property Ownership Certificates",
          "Land Use Rights Certificates",
          "Bank Statements",
          "Investment Certificates",
          "Asset Evaluation Reports"
        ]
      },
      {
        title: "Business Documents",
        items: [
          "Business Licenses",
          "Company Articles",
          "Shareholder Resolutions",
          "Commercial Contracts",
          "Foreign Investment Certificates"
        ]
      },
      {
        title: "Legal Documents",
        items: [
          "Power of Attorney",
          "Wills",
          "Inheritance Declarations",
          "Divorce Agreements",
          "Court Judgments/Orders"
        ]
      },
      {
        title: "Other Documents",
        items: [
          "Employment Certificates",
          "Income Certificates",
          "Medical Certificates",
          "International Driver's License",
          "Overseas Study/Work Documents"
        ]
      }
    ]
  },
  zh: {
    title: "公证翻译服务",
    description: "为您的所有官方文件提供专业的翻译和公证服务",
    categories: [
      {
        title: "个人身份类",
        items: [
          "身份证",
          "户口本",
          "出生证明",
          "结婚证/离婚证",
          "护照及签证",
          "居住证明"
        ]
      },
      {
        title: "学历与资质类",
        items: [
          "毕业证书",
          "学位证书",
          "成绩单",
          "职业资格证书",
          "留学回国人员证明"
        ]
      },
      {
        title: "财产类",
        items: [
          "房产证",
          "土地使用权证",
          "银行存款证明",
          "股票、基金等投资证明",
          "资产评估报告"
        ]
      },
      {
        title: "商业文件类",
        items: [
          "公司营业执照",
          "企业章程",
          "股东决议",
          "商业合同",
          "境外投资证明"
        ]
      },
      {
        title: "法律文件类",
        items: [
          "委托书",
          "遗嘱",
          "继承权声明",
          "离婚协议书",
          "法院判决书/裁定书"
        ]
      },
      {
        title: "其他类",
        items: [
          "工作证明",
          "收入证明",
          "医疗证明",
          "国际驾照翻译",
          "海外留学或工作相关证明材料"
        ]
      }
    ]
  }
};

export const Translation = () => {
  const { language } = useLanguage();
  const currentContent = content[language];

  return (
    <div className="pt-24 px-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl font-light mb-6">{currentContent.title}</h1>
          <p className="text-xl text-gray-600">
            {currentContent.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {currentContent.categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-xl font-medium mb-4">{category.title}</h2>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-blue-600 rounded-full mr-3"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <TranslationForm />
      </div>
    </div>
  );
};
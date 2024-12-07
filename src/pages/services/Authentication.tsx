import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { AuthenticationForm } from '../../components/forms/AuthenticationForm';

const content = {
  en: {
    title: "Hague Authentication (Apostille) Services",
    description: "The Hague Apostille is an international certification that simplifies the process of using official documents between member countries. Our professional service helps you authenticate your documents efficiently.",
    introduction: "The Hague Convention Abolishing the Requirement of Legalisation for Foreign Public Documents, commonly known as the Apostille Convention, facilitates the use of public documents internationally.",
    categories: [
      {
        title: "Administrative Documents",
        items: [
          "Birth Certificates",
          "Marriage Certificates",
          "Divorce Certificates",
          "Death Certificates",
          "Criminal Record Checks",
          "Residence Certificates"
        ]
      },
      {
        title: "Judicial Documents",
        items: [
          "Court Judgments",
          "Notarial Acts",
          "Attorney Documents",
          "Legal Declarations",
          "Court Orders"
        ]
      },
      {
        title: "Commercial Documents",
        items: [
          "Company Registration Certificates",
          "Business Licenses",
          "Commercial Contracts",
          "Trademark and Patent Documents",
          "Financial Statements"
        ]
      },
      {
        title: "Educational Documents",
        items: [
          "Graduation Certificates",
          "Degree Certificates",
          "Academic Transcripts",
          "School Records",
          "Educational Verifications"
        ]
      }
    ],
    process: {
      title: "Authentication Process",
      steps: [
        "Document Review and Preparation",
        "Local Notarization",
        "Apostille Certificate Issuance",
        "Document Return and Delivery"
      ]
    }
  },
  zh: {
    title: "海牙认证服务",
    description: "海牙认证是一种国际认证形式，旨在简化公文书在各缔约国之间的使用程序。我们的专业服务帮助您高效完成文件认证。",
    introduction: "《关于取消外国公文书认证要求的公约》，通常称为海牙认证公约，旨在简化国际间公文书的使用流程。",
    categories: [
      {
        title: "行政文件",
        items: [
          "出生证明",
          "结婚证",
          "离婚证",
          "死亡证明",
          "无犯罪记录证明",
          "居住证明"
        ]
      },
      {
        title: "司法文件",
        items: [
          "法院判决书",
          "公证书",
          "律师出具的文件",
          "法律声明",
          "法院裁定书"
        ]
      },
      {
        title: "商业文件",
        items: [
          "公司注册证书",
          "营业执照",
          "商业合同",
          "商标和专利文件",
          "财务报表"
        ]
      },
      {
        title: "教育文件",
        items: [
          "毕业证书",
          "学位证书",
          "成绩单",
          "学校证明",
          "教育认证"
        ]
      }
    ],
    process: {
      title: "认证流程",
      steps: [
        "文件审核和准备",
        "地方公证",
        "海牙认证书签发",
        "文件返还和递送"
      ]
    }
  }
};

export const Authentication = () => {
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
          <p className="text-xl text-gray-600 mb-8">
            {currentContent.description}
          </p>
          <p className="text-gray-600">
            {currentContent.introduction}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-2xl font-medium mb-6 text-center">
            {currentContent.process.title}
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ol className="space-y-4">
              {currentContent.process.steps.map((step, index) => (
                <li key={index} className="flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-4">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>

        <AuthenticationForm />
      </div>
    </div>
  );
};
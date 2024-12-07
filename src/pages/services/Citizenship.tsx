import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { N400Form } from '../../components/forms/N400Form';

const content = {
  en: {
    title: "U.S. Citizenship Application",
    description: "Professional assistance with naturalization process and citizenship application",
    introduction: {
      title: "Introduction",
      content: "Becoming a U.S. citizen is a significant milestone that offers numerous benefits, including the right to vote, travel with a U.S. passport, and petition for family members. Our professional team guides you through every step of the naturalization process."
    },
    process: {
      title: "Application Process and Requirements",
      steps: [
        {
          title: "Eligibility Confirmation",
          items: [
            "Must be at least 18 years old",
            "Hold permanent resident status for 5 years (3 years if married to U.S. citizen)",
            "Physical presence requirement: 30 months in the U.S. during the past 5 years",
            "Continuous residence in filing state/district for at least 3 months",
            "Good moral character",
            "Basic English proficiency",
            "Pass U.S. civics test"
          ]
        },
        {
          title: "Required Documents",
          items: [
            "Form N-400 (Naturalization Application)",
            "Green card copy (front and back)",
            "Passport-style photos",
            "Proof of residence",
            "Marriage/divorce certificates (if applicable)",
            "Application fee ($640) and biometrics fee ($85)"
          ]
        },
        {
          title: "Application Steps",
          items: [
            "Submit application online or by mail",
            "Receive confirmation notice",
            "Attend biometrics appointment",
            "Complete citizenship interview",
            "Pass English and civics tests",
            "Attend naturalization ceremony",
            "Receive Certificate of Naturalization"
          ]
        }
      ]
    }
  },
  zh: {
    title: "美国公民申请",
    description: "为入籍过程提供专业协助和公民申请服务",
    introduction: {
      title: "简介",
      content: "成为美国公民是一个重要的里程碑，它带来诸多权益，包括投票权、使用美国护照旅行、为家庭成员申请移民等。我们的专业团队将指导您完成入籍过程的每一步。"
    },
    process: {
      title: "申请流程和要求",
      steps: [
        {
          title: "确认资格",
          items: [
            "年满18岁",
            "持有绿卡满5年（与美国公民结婚者为3年）",
            "过去5年内在美国实际居住满30个月",
            "在申请州/地区连续居住至少3个月",
            "良好的道德品行",
            "基本的英语能力",
            "通过美国公民知识测试"
          ]
        },
        {
          title: "所需材料",
          items: [
            "N-400表格（入籍申请表）",
            "绿卡复印件（正反面）",
            "护照照片",
            "居住证明",
            "婚姻/离婚证明（如适用）",
            "申请费（640美元）和生物识别费（85美元）"
          ]
        },
        {
          title: "申请步骤",
          items: [
            "在线或邮寄提交申请",
            "接收确认通知",
            "参加生物识别预约",
            "完成公民面试",
            "通过英语和公民知识测试",
            "参加入籍宣誓仪式",
            "获取入籍证书"
          ]
        }
      ]
    }
  }
};

export const Citizenship = () => {
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
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-medium mb-4">
              {currentContent.introduction.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {currentContent.introduction.content}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-medium mb-8">
              {currentContent.process.title}
            </h2>
            <div className="space-y-12">
              {currentContent.process.steps.map((step, index) => (
                <div key={step.title}>
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium mr-4">
                      {index + 1}
                    </span>
                    {step.title}
                  </h3>
                  <ul className="space-y-3 pl-12">
                    {step.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-blue-600 rounded-full mr-3"></span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <N400Form />
      </div>
    </div>
  );
};
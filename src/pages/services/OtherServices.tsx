import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ServiceForm } from '../../components/ServiceForm';

const content = {
  en: {
    title: "Other Services",
    description: "We provide a range of additional professional services to meet your various needs",
    services: [
      {
        title: "Uncontested Divorce",
        description: "Professional assistance with uncontested divorce proceedings, including document preparation and filing",
        details: [
          "Document preparation and review",
          "Filing assistance",
          "Process guidance",
          "Translation services if needed"
        ],
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "Business Registration",
        description: "Comprehensive support for business entity registration and formation in the United States",
        details: [
          "Entity type selection consultation",
          "Registration document preparation",
          "EIN application",
          "State and federal filing assistance"
        ],
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "Chinese Visa",
        description: "Professional assistance with Chinese visa applications for business and personal travel",
        details: [
          "Visa application preparation",
          "Document translation",
          "Application submission",
          "Status tracking"
        ],
        image: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&q=80&w=2000"
      }
    ]
  },
  zh: {
    title: "其他服务",
    description: "我们提供多种专业服务，满足您的各类需求",
    services: [
      {
        title: "无争议离婚",
        description: "为无争议离婚程序提供专业协助，包括文件准备和提交",
        details: [
          "文件准备和审查",
          "提交协助",
          "流程指导",
          "需要时提供翻译服务"
        ],
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "公司注册",
        description: "为在美国注册和成立企业实体提供全面支持",
        details: [
          "实体类型选择咨询",
          "注册文件准备",
          "税号申请",
          "州级和联邦级申请协助"
        ],
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "中国签证",
        description: "为商务和个人旅行提供专业的中国签证申请协助",
        details: [
          "签证申请准备",
          "文件翻译",
          "申请提交",
          "状态跟踪"
        ],
        image: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&q=80&w=2000"
      }
    ]
  }
};

export const OtherServices = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {currentContent.services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-medium mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-blue-600 rounded-full mr-3"></span>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <ServiceForm serviceName="other" />
      </div>
    </div>
  );
};
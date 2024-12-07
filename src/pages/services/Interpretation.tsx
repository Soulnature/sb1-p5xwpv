import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { InterpretationForm } from '../../components/forms/InterpretationForm';

const content = {
  en: {
    title: "Interpretation Services",
    description: "Professional interpretation services for various occasions, providing real-time language support for individuals and groups.",
    categories: [
      {
        title: "Business Activities",
        items: [
          "Business Negotiations: Facilitate communication during contract discussions and project collaborations",
          "Exhibition Accompaniment: Support exhibitors and clients at international trade shows",
          "Business Visits: Assist executive teams during company and factory visits"
        ],
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "Legal Matters",
        items: [
          "Legal Consultations: Assist clients in communicating with lawyers and legal experts",
          "Document Signing: Support during legal document signing and contract confirmation"
        ],
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "Tourism Services",
        items: [
          "Guide Services: Help tourists communicate with locals and understand cultural sites",
          "Shopping Assistance: Support international shopping communication"
        ],
        image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "Education & Study Abroad",
        items: [
          "School Visits: Help parents and students understand overseas schools",
          "Admission Interviews: Provide translation support for international school applications",
          "Academic Events: Support international academic exchanges and lectures"
        ],
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "Daily Life Matters",
        items: [
          "Document Processing: Assist with visa and ID document procedures",
          "Property Matters: Help clients communicate with real estate agents",
          "Daily Affairs: Support bank account opening, apartment rental, etc."
        ],
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "Workplace Settings",
        items: [
          "Foreign Company Employment: Assist with interviews and onboarding procedures",
          "International Conferences: Provide on-site translation support"
        ],
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "Cultural Activities",
        items: [
          "Arts Exchange: Provide language support for cultural performances and art exhibitions",
          "Media Interviews: Support international news interviews and documentary filming"
        ],
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2000"
      }
    ]
  },
  zh: {
    title: "陪同翻译服务",
    description: "为个人和团体提供各种场合的专业口译服务，提供实时语言支持。",
    categories: [
      {
        title: "商务活动",
        items: [
          "商务谈判：帮助双方进行商业合同洽谈、项目合作沟通等",
          "展会陪同：在国际展览或博览会上，帮助参展方与客户进行交流",
          "商务考察：协助企业高管或团队访问合作公司、工厂等"
        ],
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "法律事务",
        items: [
          "法律咨询：协助当事人与律师或法律专家沟通",
          "文件签署：陪同当事人办理法律文件签署、合同确认等"
        ],
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "旅游服务",
        items: [
          "导览服务：在观光旅游中，帮助游客与当地人交流或了解景点文化",
          "购物陪同：协助客户在国际购物中进行交流"
        ],
        image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "教育及留学",
        items: [
          "学校参观：协助家长和学生了解海外学校情况",
          "入学面试：为申请国际学校或大学的学生提供翻译支持",
          "学术活动：帮助国际学术交流会或讲座中的语言沟通"
        ],
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "生活事务",
        items: [
          "办理证件：协助个人办理签证、身份证明等手续",
          "房产购置：帮助客户与房地产中介沟通",
          "日常生活：陪同客户办理银行开户、租房等事务"
        ],
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "工作场合",
        items: [
          "外企入职：协助新员工完成面试或入职手续",
          "跨国会议：提供会议现场翻译支持"
        ],
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=2000"
      },
      {
        title: "文化活动",
        items: [
          "艺术交流：在文化演出、艺术展览等活动中进行语言转换",
          "媒体采访：为国际新闻采访或记录片拍摄提供翻译服务"
        ],
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=2000"
      }
    ]
  }
};

export const Interpretation = () => {
  const { language } = useLanguage();
  const currentContent = content[language];

  return (
    <div className="pt-24 px-6 min-h-screen bg-gray-50">
      <div 
        className="relative h-96 -mt-24 mb-16 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=2000")'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-light mb-6"
            >
              {currentContent.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-100"
            >
              {currentContent.description}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
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
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-medium mb-4">{category.title}</h2>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-blue-600 rounded-full mr-3"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <InterpretationForm />
      </div>
    </div>
  );
};
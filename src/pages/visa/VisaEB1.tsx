import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export const VisaEB1 = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "EB-1 Visa",
      description: "The EB-1 visa is the highest priority category of U.S. immigration visas, designed for individuals with extraordinary ability in sciences, arts, education, business, or athletics.",
      requirements: {
        title: "Requirements",
        items: [
          "Receipt of major international awards",
          "Membership in professional associations requiring outstanding achievements",
          "Published articles in professional journals or media",
          "Participation as a judge of others' work",
          "Significant contributions to the field",
          "Evidence of high salary or remuneration"
        ]
      },
      process: {
        title: "Application Process",
        items: [
          "Eligibility Assessment: Our professional team will evaluate if your background meets EB-1 requirements",
          "Documentation: Collect and organize all necessary supporting documents",
          "Submission: Submit complete application to USCIS",
          "Tracking: Monitor application progress and respond to any requests"
        ]
      }
    },
    zh: {
      title: "EB-1签证",
      description: "EB-1签证是美国移民签证中优先等级最高的类别，适用于在科学、艺术、教育、商业或体育领域有杰出成就的人才。",
      requirements: {
        title: "申请条件",
        items: [
          "在所属领域获得国际认可的重要奖项",
          "成为专业协会会员，需要对该领域有杰出成就",
          "在专业期刊或其他媒体上发表过与专业相关的文章",
          "担任过评审工作",
          "对所属领域有重要贡献",
          "获得高薪或其他报酬证明"
        ]
      },
      process: {
        title: "申请流程",
        items: [
          "评估资格：我们的专业团队将评估您的背景是否符合EB-1要求",
          "准备材料：收集并整理所有必要的支持文件和证明材料",
          "提交申请：向美国移民局提交完整的申请材料",
          "跟踪进度：持续监控申请进度，及时响应补充要求"
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
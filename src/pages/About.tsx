import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "About Us",
      description: "Professional immigration law team with rich case experience, providing you with the highest quality service",
      sections: [
        {
          title: "Professional Team",
          description: "Our team consists of experienced immigration lawyers who have extensive experience in handling various immigration cases.",
          image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000"
        },
        {
          title: "Our Commitment",
          description: "We are committed to providing professional, efficient, and transparent services to ensure your immigration journey proceeds smoothly.",
          image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000"
        }
      ]
    },
    zh: {
      title: "关于我们",
      description: "专业的移民律师团队，丰富的案例经验，为您提供最优质的服务",
      sections: [
        {
          title: "专业团队",
          description: "我们的团队由经验丰富的移民律师组成，他们在处理各类移民案件方面都有着丰富的经验。",
          image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000"
        },
        {
          title: "服务承诺",
          description: "我们承诺为每位客户提供专业、高效、透明的服务，确保您的移民之路顺利进行。",
          image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000"
        }
      ]
    }
  };

  const currentContent = content[language];

  return (
    <section className="pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-light mb-8">{currentContent.title}</h1>
          <p className="text-xl text-gray-600 mb-12">
            {currentContent.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {currentContent.sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <img
                src={section.image}
                alt={section.title}
                className="w-full aspect-[4/3] object-cover mb-6"
              />
              <h2 className="text-2xl mb-4">{section.title}</h2>
              <p className="text-gray-600">
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
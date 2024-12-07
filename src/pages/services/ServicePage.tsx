import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { I539Form } from '../../components/forms/I539Form';

interface ServicePageProps {
  service: {
    en: {
      title: string;
      description: string;
      details: string[];
    };
    zh: {
      title: string;
      description: string;
      details: string[];
    };
  };
}

export const ServicePage = ({ service }: ServicePageProps) => {
  const { language } = useLanguage();
  const content = service[language];

  return (
    <div className="pt-24 px-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl font-light mb-6">{content.title}</h1>
          <p className="text-xl text-gray-600 mb-8">
            {content.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <ul className="space-y-4">
            {content.details.map((detail, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-blue-600 rounded-full mr-3"></span>
                <span className="text-gray-700">{detail}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <I539Form />
      </div>
    </div>
  );
};
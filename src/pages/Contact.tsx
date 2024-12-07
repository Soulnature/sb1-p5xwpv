import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { contactData } from '../data/contact';

export const Contact = () => {
  const { language } = useLanguage();
  const content = contactData[language];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Phone':
        return <Phone size={24} className="text-gray-600" />;
      case 'Mail':
        return <Mail size={24} className="text-gray-600" />;
      case 'MapPin':
        return <MapPin size={24} className="text-gray-600" />;
      default:
        return null;
    }
  };

  const handleContactClick = (type: string, value: string) => {
    switch (type) {
      case 'Phone':
        window.location.href = `tel:${value.replace(/[^0-9]/g, '')}`;
        break;
      case 'Mail':
        window.location.href = `mailto:${value}`;
        break;
      case 'MapPin':
        // Encode the address for Google Maps URL
        const encodedAddress = encodeURIComponent(value);
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <section className="pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-light mb-8">{content.title}</h1>
          <p className="text-xl text-gray-600 mb-12">
            {content.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {content.contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleContactClick(item.icon, item.content)}
            >
              <div className="flex justify-center mb-4">
                {getIcon(item.icon)}
              </div>
              <h3 className="text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600 hover:text-blue-600 transition-colors">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              placeholder={content.form.name}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder={content.form.email}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            placeholder={content.form.message}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {content.form.submit}
          </button>
        </motion.form>
      </div>
    </section>
  );
};
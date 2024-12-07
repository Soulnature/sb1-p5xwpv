import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const menuItems = {
  en: [
    {
      title: 'Services',
      items: [
        { name: 'Immigration Services', href: '/services/immigration' },
        { name: 'Non-Immigrant Visa', href: '/services/visa' },
        { name: 'Document Translation', href: '/services/translation' },
        { name: 'Hague Authentication', href: '/services/authentication' },
        { name: 'Interpretation Services', href: '/services/interpretation' },
        { name: 'U.S. Citizenship', href: '/services/citizenship' },
        { name: 'Uncontested Divorce', href: '/services/divorce' },
        { name: 'Business Registration', href: '/services/business' },
        { name: 'Chinese Visa', href: '/services/chinese-visa' },
        { name: 'Legal Consultation', href: '/services/legal' }
      ]
    },
    {
      title: 'About Us',
      items: [
        { name: 'Company Profile', href: '/about' },
        { name: 'Our Team', href: '/team' },
        { name: 'Success Cases', href: '/cases' }
      ]
    },
    {
      title: 'Contact',
      items: [
        { name: 'Schedule Consultation', href: '/contact' },
        { name: 'Office Locations', href: '/locations' }
      ]
    }
  ],
  zh: [
    {
      title: '业务范围',
      items: [
        { name: '移民申请', href: '/services/immigration' },
        { name: '非移民签证申请', href: '/services/visa' },
        { name: '公证翻译', href: '/services/translation' },
        { name: '海牙认证', href: '/services/authentication' },
        { name: '陪同翻译', href: '/services/interpretation' },
        { name: '美国公民申请', href: '/services/citizenship' },
        { name: '无争议离婚', href: '/services/divorce' },
        { name: '公司注册', href: '/services/business' },
        { name: '中国签证', href: '/services/chinese-visa' },
        { name: '法律咨询', href: '/services/legal' }
      ]
    },
    {
      title: '关于我们',
      items: [
        { name: '公司简介', href: '/about' },
        { name: '团队介绍', href: '/team' },
        { name: '成功案例', href: '/cases' }
      ]
    },
    {
      title: '联系方式',
      items: [
        { name: '预约咨询', href: '/contact' },
        { name: '办公地点', href: '/locations' }
      ]
    }
  ]
};

export const NavMenu = ({ onClose }: { onClose: () => void }) => {
  const { language } = useLanguage();
  const currentMenuItems = menuItems[language];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-40"
    >
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {currentMenuItems.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-medium mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ x: 10 }}
                    className="group"
                  >
                    <a
                      href={item.href}
                      className="flex items-center justify-between text-gray-600 hover:text-black"
                      onClick={onClose}
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
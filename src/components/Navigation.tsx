import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { navigationData } from '../data/navigation';

const Logo = () => (
  <div className="flex items-center">
    <img 
      src="/logo.jpg" 
      alt="ZXT Essential Services" 
      className="h-12 md:h-16 w-auto object-contain"
      style={{ maxWidth: '240px' }}
    />
  </div>
);

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isImmigrationOpen, setIsImmigrationOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const timeoutRef = useRef<number | null>(null);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setIsImmigrationOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsImmigrationOpen(false);
    }, 150);
  };

  const currentMenu = navigationData[language];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20 md:h-24">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <Logo />
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Immigration Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center space-x-1 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <span>{currentMenu.immigration.name}</span>
                <ChevronDown size={16} className={`transform transition-transform ${
                  isImmigrationOpen ? 'rotate-180' : ''
                }`} />
              </button>
              
              {isImmigrationOpen && (
                <div
                  className="absolute left-0 mt-1 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                >
                  <div className="py-1">
                    {currentMenu.immigration.subItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm ${
                            isActive
                              ? 'text-blue-600 bg-blue-50'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`
                        }
                        onClick={() => setIsImmigrationOpen(false)}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Other Menu Items */}
            {currentMenu.otherItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `py-2 text-sm ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'}`
                }
              >
                {item.name}
              </NavLink>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
            >
              <Globe size={16} />
              <span>{language === 'en' ? '中文' : 'EN'}</span>
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Globe size={20} />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 md:top-24 bg-white z-40 overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            {/* Immigration Services Mobile Dropdown */}
            <div>
              <button
                className="w-full flex items-center justify-between px-3 py-2 text-base text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsImmigrationOpen(!isImmigrationOpen)}
              >
                <span>{currentMenu.immigration.name}</span>
                <ChevronDown size={16} className={`transform transition-transform ${
                  isImmigrationOpen ? 'rotate-180' : ''
                }`} />
              </button>
              {isImmigrationOpen && (
                <div className="pl-4 mt-2">
                  {currentMenu.immigration.subItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-3 py-2 text-sm ${
                          isActive
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:bg-gray-50'
                        } rounded-md`
                      }
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsImmigrationOpen(false);
                      }}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Other Mobile Menu Items */}
            {currentMenu.otherItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 text-base ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  } rounded-md`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
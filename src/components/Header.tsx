import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavMenu } from './NavMenu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-sm"
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.a 
          href="/"
          className="text-xl font-medium"
          whileHover={{ scale: 1.05 }}
        >
          Studio
        </motion.a>
        <button 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      
      <AnimatePresence>
        {isMenuOpen && <NavMenu onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </motion.header>
  );
};
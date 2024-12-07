import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const Contact = () => {
  return (
    <section className="py-20 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-light mb-8">Let's work together</h2>
          <a 
            href="mailto:hello@studio.com" 
            className="inline-flex items-center text-xl hover:opacity-80 transition-opacity"
          >
            hello@studio.com
            <ArrowUpRight className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
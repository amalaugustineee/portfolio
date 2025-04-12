import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-40 gradient-border-mask p-3 group"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="relative w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
            animate={{ 
              background: [
                'linear-gradient(to right, #6366F1, #EC4899)', 
                'linear-gradient(to bottom, #6366F1, #EC4899)', 
                'linear-gradient(to left, #6366F1, #EC4899)', 
                'linear-gradient(to top, #6366F1, #EC4899)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <FiArrowUp className="w-5 h-5 text-white z-10 group-hover:transform group-hover:-translate-y-1 transition-transform duration-300" />
            
            <motion.div 
              className="absolute inset-0 z-0"
              animate={{ 
                background: [
                  'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 
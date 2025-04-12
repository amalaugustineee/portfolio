import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render on client-side
  if (!mounted || typeof window === 'undefined') return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gradient-start to-gradient-end z-50 origin-left"
        style={{ scaleX }}
      />
      <motion.div 
        className="fixed bottom-4 right-4 bg-surface-light dark:bg-surface-dark rounded-full text-xs px-2 py-1 shadow-lg z-50 font-medium"
        style={{ opacity: scrollYProgress }}
      >
        <motion.span>{Math.round(scrollYProgress.get() * 100)}%</motion.span>
      </motion.div>
    </>
  );
};

export default ScrollProgressBar; 
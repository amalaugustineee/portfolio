import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi';
import Link from 'next/link';

const IndexPage: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Layout>
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-6xl mx-auto">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-10 w-64 h-64 bg-gradient-start/10 dark:bg-gradient-start/5 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-gradient-end/10 dark:bg-gradient-end/5 rounded-full blur-3xl animate-float" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-20">
              {/* Text content */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
                    <span className="gradient-text">AMAL</span> AUGUSTINE M
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="text-lg md:text-xl opacity-80 mb-8 max-w-2xl">
                    Engineering intern skilled in full stack web development, C programming, and Python. 
                    Proven experience in event coordination and teamwork. Strong problem-solving abilities 
                    with effective task management and communication skills.
                  </p>
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Link 
                    href="/projects" 
                    legacyBehavior
                  >
                    <a>
                      <motion.button 
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Projects
                      </motion.button>
                    </a>
                  </Link>
                  <Link 
                    href="/contact" 
                    legacyBehavior
                  >
                    <a>
                      <motion.button 
                        className="px-6 py-3 rounded-lg bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border border-surface-light dark:border-surface-dark hover:border-gradient-start dark:hover:border-gradient-start font-medium transition-all duration-300 hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Contact Me
                      </motion.button>
                    </a>
                  </Link>
                </motion.div>

                <motion.div
                  className="flex items-center gap-6 mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <a href="https://github.com/amalaugustinem" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <motion.div 
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="w-10 h-10 rounded-full glass-card flex items-center justify-center"
                    >
                      <FiGithub className="text-xl" />
                    </motion.div>
                  </a>
                  <a href="https://linkedin.com/in/amal-augustine-m-4a311b258" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <motion.div 
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="w-10 h-10 rounded-full glass-card flex items-center justify-center"
                    >
                      <FiLinkedin className="text-xl" />
                    </motion.div>
                  </a>
                </motion.div>
              </div>

              {/* 3D Hero image with floating animations */}
              <motion.div 
                className="relative w-72 h-72 md:w-96 md:h-96"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-full h-full relative">
                  {/* Main circle with gradient */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end opacity-80 dark:opacity-90"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  {/* Glass effect overlay */}
                  <motion.div 
                    className="absolute inset-4 rounded-full backdrop-blur-sm bg-white/10 dark:bg-black/10"
                    animate={{ 
                      rotate: [0, 360],
                    }}
                    transition={{ 
                      duration: 40,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {/* Small decorative circles */}
                    <motion.div 
                      className="absolute top-5 left-5 w-10 h-10 rounded-full bg-surface-light dark:bg-surface-dark"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div 
                      className="absolute top-1/2 right-5 w-16 h-16 rounded-full bg-surface-light dark:bg-surface-dark"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    />
                    <motion.div 
                      className="absolute bottom-5 left-1/4 w-12 h-12 rounded-full bg-surface-light dark:bg-surface-dark"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                    />
                  </motion.div>
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="w-24 h-24 rounded-xl bg-gradient-to-br from-gradient-start to-gradient-end flex items-center justify-center font-bold text-3xl text-white"
                      animate={{ 
                        rotate: [0, 90, 180, 270, 360],
                        borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 50% 50%", "30% 70% 70% 30% / 70% 30% 70% 30%"]
                      }}
                      transition={{ 
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      A
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FiArrowDown className="text-2xl opacity-60" />
        </motion.div>
      </section>
    </Layout>
  );
};

export default IndexPage; 
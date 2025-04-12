import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Navigation from './Navigation';
import ScrollToTop from './ScrollToTop';
import DynamicBackground from './DynamicBackground';
import CustomCursor from './CustomCursor';
import Footer from './Footer';
import ScrollProgressBar from './ScrollProgressBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background-dark text-text-dark">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Amal Augustine | Engineering Intern</title>
        <meta name="description" content="Portfolio of Amal Augustine, Engineering Intern skilled in web development, C programming, and Python." />
      </Head>
      <div className="dark">
        <div className="min-h-screen bg-background-dark text-text-dark relative overflow-hidden">
          <ScrollProgressBar />
          <CustomCursor />
          <DynamicBackground />
          
          {/* Background geometric shapes */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Gradient orbs */}
            <motion.div 
              className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-start/10 blur-3xl"
              animate={{ 
                y: [0, 30, 0],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div 
              className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-end/10 blur-3xl"
              animate={{ 
                y: [0, -40, 0],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ 
                duration: 18, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-[0.05]" />
            
            {/* Noise texture */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
            
            {/* Floating elements */}
            <div className="absolute inset-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-${8 + i * 2} h-${8 + i * 2} rounded-full bg-gradient-start/10`}
                  style={{
                    left: `${15 + i * 20}%`,
                    top: `${10 + i * 15}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 15, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <Navigation />
            
            <main className="relative pt-16 min-h-screen">
              {children}
            </main>
            <Footer />
            <ScrollToTop />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Layout; 
import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const DynamicBackground = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse motion into smooth movement
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Parallax transformations for elements
  const gradientX = useTransform(smoothMouseX, [-500, 500], [-50, 50]);
  const gradientY = useTransform(smoothMouseY, [-500, 500], [-50, 50]);
  const particlesX = useTransform(smoothMouseX, [-500, 500], [-30, 30]);
  const particlesY = useTransform(smoothMouseY, [-500, 500], [-30, 30]);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Get container dimensions and position
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to container center
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Set motion values
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
      
      // Update state for other components
      setMousePosition({
        x: (e.clientX - centerX) / width,
        y: (e.clientY - centerY) / height
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden animated-grid">
      {/* Main gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gradient-start to-gradient-end opacity-10 dark:opacity-15"
        style={{
          x: gradientX,
          y: gradientY,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      {/* SVG Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5 dark:opacity-10"
        style={{ x: particlesX, y: particlesY }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            </pattern>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--gradient-start)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--gradient-end)" stopOpacity="0.5" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </motion.div>
      
      {/* Animated particles */}
      <motion.div 
        className="absolute inset-0"
        style={{ x: particlesX, y: particlesY }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-start/10 dark:bg-gradient-start/20 backdrop-blur-md"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(10px)',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5, 1],
              opacity: [0.3, 0.6, 0.3],
              backdropFilter: ['blur(5px)', 'blur(10px)', 'blur(5px)'],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Interactive gradient overlay that follows mouse */}
      <motion.div
        className="absolute w-full h-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, 
            rgba(99, 102, 241, 0.1) 0%, 
            rgba(236, 72, 153, 0.05) 30%, 
            transparent 70%)`,
          opacity: 0.8,
        }}
      />

      {/* Animated gradient circles */}
      <motion.div
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 opacity-10 dark:opacity-20 blur-3xl"
        style={{ x: gradientX, y: gradientY }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-gradient-to-r from-pink-500 to-gradient-end opacity-10 dark:opacity-20 blur-3xl"
        style={{ x: gradientX, y: gradientY }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      {/* Additional floating elements */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-blue-300 to-purple-400 opacity-5 dark:opacity-10 blur-2xl"
        style={{ x: particlesX, y: particlesY }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise-pattern opacity-10 dark:opacity-20 mix-blend-overlay" />
      
      {/* Grain effect */}
      <div className="absolute inset-0 noise" />
    </div>
  );
};

export default DynamicBackground; 
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [currentTarget, setCurrentTarget] = useState<HTMLElement | null>(null);
  
  // For trail effect
  const trailsCount = 5;
  const trailPositions = useRef<Array<{x: number, y: number}>>([]);
  const [trails, setTrails] = useState<Array<{x: number, y: number}>>([]);
  
  useEffect(() => {
    setMounted(true);
    
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };
    
    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    const onMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      
      // Handle magnetism effect
      if (currentTarget) {
        const rect = currentTarget.getBoundingClientRect();
        const targetCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
        
        // Calculate distance from cursor to target center
        const distance = Math.sqrt(
          Math.pow(newPosition.x - targetCenter.x, 2) + 
          Math.pow(newPosition.y - targetCenter.y, 2)
        );
        
        // If close enough, apply magnetism
        if (distance < 100) {
          const strength = 0.3; // Adjust strength of magnetic pull
          newPosition.x = newPosition.x + (targetCenter.x - newPosition.x) * strength;
          newPosition.y = newPosition.y + (targetCenter.y - newPosition.y) * strength;
        }
      }
      
      setPosition(newPosition);
      
      // Update trail positions
      trailPositions.current = [newPosition, ...trailPositions.current.slice(0, trailsCount - 1)];
      
      // Delay setting trail positions for visual effect
      setTimeout(() => {
        setTrails([...trailPositions.current]);
      }, 50);
    };
    
    const onMouseEnter = () => {
      setHidden(false);
    };
    
    const onMouseLeave = () => {
      setHidden(true);
    };
    
    const onMouseDown = () => {
      setClicked(true);
    };
    
    const onMouseUp = () => {
      setClicked(false);
    };
    
    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setLinkHovered(true);
          setCurrentTarget(el as HTMLElement);
        });
        el.addEventListener('mouseleave', () => {
          setLinkHovered(false);
          setCurrentTarget(null);
        });
      });
    };
    
    addEventListeners();
    handleLinkHoverEvents();
    
    // Initialize trails array
    trailPositions.current = Array(trailsCount).fill({ x: 0, y: 0 });
    setTrails(Array(trailsCount).fill({ x: 0, y: 0 }));
    
    return () => removeEventListeners();
  }, [mounted, currentTarget]);

  if (!mounted || typeof window === 'undefined') return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="custom-cursor hidden md:block"
        animate={{
          x: position.x,
          y: position.y,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          opacity: hidden ? 0 : 1,
          backgroundColor: linkHovered ? 'var(--cursor-color-hover)' : 'var(--cursor-color)'
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
      
      {/* Trail effect */}
      {trails.map((trail, index) => (
        <motion.div
          key={index}
          className="trail-cursor hidden md:block"
          style={{
            left: 0,
            top: 0,
            opacity: 0.2 - (index * 0.03),
            scale: 1 - (index * 0.1)
          }}
          animate={{
            x: trail.x,
            y: trail.y,
            scale: clicked ? 0.4 - (index * 0.05) : 0.5 - (index * 0.08),
            opacity: hidden ? 0 : 0.3 - (index * 0.05)
          }}
          transition={{
            type: 'spring',
            stiffness: 400 - (index * 50),
            damping: 25,
            mass: 0.8 + (index * 0.1)
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor; 
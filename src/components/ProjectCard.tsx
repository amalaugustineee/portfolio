import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  category: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  image,
  liveUrl,
  githubUrl,
  category,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform mouse motion into rotation
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  // Add spring physics for smoother animation
  const springX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  // For moving highlight effect
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  
  // For image parallax effect
  const imageX = useTransform(x, [-100, 100], [5, -5]);
  const imageY = useTransform(y, [-100, 100], [5, -5]);
  const imageRotate = useTransform(
    [rotateX, rotateY], 
    (latest: number[]) => {
      if (latest.length >= 2) {
        return latest[0] * 0.1 + latest[1] * 0.1;
      }
      return 0;
    }
  );

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouchDevice) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center as percentage of width/height
    const percentX = (event.clientX - centerX) / (rect.width / 2);
    const percentY = (event.clientY - centerY) / (rect.height / 2);
    
    // Set both tilt and glow position
    x.set(percentX * 20);
    y.set(percentY * 20);
    glowX.set(event.clientX - rect.left);
    glowY.set(event.clientY - rect.top);
  };

  // Reset position on mouse leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };
  
  // Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Check if touch device to prevent sticky hover states
    if ('ontouchstart' in window) {
      setIsTouchDevice(true);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="perspective-card h-full flex flex-col overflow-hidden group rounded-xl"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isTouchDevice ? 0 : springX,
        rotateY: isTouchDevice ? 0 : springY,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Moving highlight effect */}
      {isHovered && !isTouchDevice && (
        <motion.div 
          className="absolute inset-0 pointer-events-none z-10 opacity-70"
          style={{
            background: `radial-gradient(circle at ${glowX.get()}px ${glowY.get()}px, rgba(var(--gradient-start-rgb), 0.15) 0%, transparent 50%)`,
            borderRadius: 'inherit',
            mixBlendMode: 'plus-lighter'
          }}
        />
      )}
      
      {/* Project Image */}
      <div className="relative h-60 overflow-hidden rounded-t-xl">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-gradient-start/20 to-gradient-end/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <motion.div 
          className="absolute inset-0 bg-black/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform"
          loading="lazy"
          style={{ 
            transformStyle: "preserve-3d", 
            z: 20, 
            x: isTouchDevice ? 0 : imageX,
            y: isTouchDevice ? 0 : imageY,
            rotate: isTouchDevice ? 0 : imageRotate,
            scale: isHovered ? 1.1 : 1,
            transition: "transform 700ms cubic-bezier(0.33, 1, 0.68, 1)"
          }}
        />
        <div className="absolute top-4 left-4 z-20">
          <motion.span 
            className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-gradient-start to-gradient-end text-white rounded-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 10 
            }}
            transition={{ duration: 0.3 }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.span>
        </div>
        
        {/* View project overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-black/50 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
        >
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 flex items-center space-x-2 bg-white text-black font-medium rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span>View Project</span>
              <FiArrowRight />
            </motion.a>
          )}
        </motion.div>
      </div>
      
      {/* Project Content */}
      <div className="p-6 flex flex-col flex-grow relative glass-card rounded-b-xl">
        <motion.div style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-xl font-bold mb-2 font-display bg-clip-text text-transparent bg-gradient-to-r from-text-light to-text-light dark:from-text-dark dark:to-text-dark group-hover:from-gradient-start group-hover:to-gradient-end transition-all duration-300">{title}</h3>
          <p className="text-sm mb-4 opacity-80 flex-grow">{description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <motion.span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-surface-light dark:bg-surface-dark rounded-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.03 * index,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
          
          {/* Links */}
          <div className="flex space-x-4">
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-text-light dark:text-text-dark hover:text-gradient-start dark:hover:text-gradient-start transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View source code on GitHub"
              >
                <FiGithub className="text-xl" />
                <span className="text-sm font-medium">Code</span>
              </motion.a>
            )}
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-text-light dark:text-text-dark hover:text-gradient-start dark:hover:text-gradient-start transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View live project"
              >
                <FiExternalLink className="text-xl" />
                <span className="text-sm font-medium">Live</span>
              </motion.a>
            )}
          </div>
        </motion.div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full bg-gradient-start/5 dark:bg-gradient-start/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
          style={{ transform: "translateZ(5px)" }}
          animate={{ 
            rotate: isHovered ? 360 : 0 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-gradient-end/5 dark:bg-gradient-end/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" 
          style={{ transform: "translateZ(15px)" }}
          animate={{ 
            rotate: isHovered ? 360 : 0 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", direction: "reverse" }}
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard; 
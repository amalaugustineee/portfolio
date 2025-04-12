import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management',
    image: '/projects/ecommerce.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#',
  },
  {
    title: 'AI-Powered Dashboard',
    description: 'Data visualization dashboard with machine learning insights',
    image: '/projects/dashboard.jpg',
    tags: ['Python', 'TensorFlow', 'React', 'D3.js'],
    link: '#',
  },
  {
    title: 'Mobile Fitness App',
    description: 'Cross-platform fitness tracking application with social features',
    image: '/projects/fitness.jpg',
    tags: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
    link: '#',
  },
  {
    title: 'Design System',
    description: 'Comprehensive design system with reusable components',
    image: '/projects/design-system.jpg',
    tags: ['Figma', 'Storybook', 'React', 'Styled Components'],
    link: '#',
  },
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-4 bg-background-light dark:bg-background-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-display font-bold text-center text-text-light dark:text-text-dark">
            Featured Projects
          </h2>
          <p className="text-center mt-4 text-text-light dark:text-text-dark">
            A selection of my recent work and experiments
          </p>
        </motion.div>

        <div 
          ref={containerRef}
          className="relative h-[600px] overflow-hidden"
        >
          <motion.div 
            style={{ x, opacity }}
            className="absolute top-0 left-0 flex space-x-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="w-[400px] flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-white/20 text-white rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 rounded-full bg-primary-light dark:bg-primary-dark text-white font-medium hover:scale-105 transition-transform">
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaReact, FaNodeJs, FaPython, FaFigma, FaGitAlt } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiMongodb } from 'react-icons/si';

interface Skill {
  icon: JSX.Element;
  name: string;
  category: 'Development' | 'Design' | 'Tools';
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const skills: Skill[] = [
  { icon: <FaReact className="w-8 h-8" />, name: 'React', category: 'Development' },
  { icon: <SiTypescript className="w-8 h-8" />, name: 'TypeScript', category: 'Development' },
  { icon: <SiNextdotjs className="w-8 h-8" />, name: 'Next.js', category: 'Development' },
  { icon: <FaNodeJs className="w-8 h-8" />, name: 'Node.js', category: 'Development' },
  { icon: <SiMongodb className="w-8 h-8" />, name: 'MongoDB', category: 'Development' },
  { icon: <FaPython className="w-8 h-8" />, name: 'Python', category: 'Development' },
  { icon: <SiTailwindcss className="w-8 h-8" />, name: 'Tailwind CSS', category: 'Design' },
  { icon: <FaFigma className="w-8 h-8" />, name: 'Figma', category: 'Design' },
  { icon: <FaGitAlt className="w-8 h-8" />, name: 'Git', category: 'Tools' },
];

const timeline: TimelineEvent[] = [
  {
    year: '2020',
    title: 'Started Web Development',
    description: 'Began learning HTML, CSS, and JavaScript',
  },
  {
    year: '2021',
    title: 'Full Stack Development',
    description: 'Expanded into backend development with Node.js and databases',
  },
  {
    year: '2022',
    title: 'UI/UX Design',
    description: 'Started incorporating design principles and user experience',
  },
  {
    year: '2023',
    title: 'Modern Tech Stack',
    description: 'Working with React, TypeScript, and modern frameworks',
  },
];

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 px-4 bg-surface-light dark:bg-surface-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <div>
            <motion.h2 
              className="text-4xl font-display font-bold mb-8 text-text-light dark:text-text-dark"
              variants={itemVariants}
            >
              About Me
            </motion.h2>
            
            <motion.p 
              className="text-lg mb-8 text-text-light dark:text-text-dark"
              variants={itemVariants}
            >
              I'm a passionate developer who loves building beautiful and functional digital experiences.
              With a strong foundation in both frontend and backend development, I strive to create
              solutions that are not only technically sound but also provide exceptional user experiences.
            </motion.p>

            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-display font-bold mb-6 text-text-light dark:text-text-dark">
                Skills
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-2 p-3 rounded-lg bg-background-light dark:bg-background-dark"
                    whileHover={{ scale: 1.05 }}
                    variants={itemVariants}
                  >
                    {skill.icon}
                    <span className="text-text-light dark:text-text-dark">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div>
            <motion.h3 
              className="text-2xl font-display font-bold mb-8 text-text-light dark:text-text-dark"
              variants={itemVariants}
            >
              My Journey
            </motion.h3>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative pl-8 border-l-2 border-primary-light dark:border-primary-dark"
                  variants={itemVariants}
                >
                  <div className="absolute -left-2.5 w-4 h-4 rounded-full bg-primary-light dark:bg-primary-dark" />
                  <div className="mb-2 text-primary-light dark:text-primary-dark font-bold">
                    {item.year}
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-text-light dark:text-text-dark">
                    {item.title}
                  </h4>
                  <p className="text-text-light dark:text-text-dark">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 
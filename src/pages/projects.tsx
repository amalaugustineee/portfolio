import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import { FiFilter } from 'react-icons/fi';
import ProjectCard from '../components/ProjectCard';
import Head from 'next/head';

// Project data
const projects = [
  {
    title: 'AI-Enhanced Task Management Application',
    description: 'A Todo app using React, TypeScript, Firebase, and Google\'s Gemini AI with multiple view options including Grid, List, Calendar, and Eisenhower Matrix. Features productivity analytics dashboard, Focus Mode with Pomodoro technique, achievements system, and AI-powered task suggestions.',
    tags: ['React', 'TypeScript', 'Firebase', 'Gemini AI', 'Framer Motion', 'Tailwind CSS'],
    image: '/placeholder-project.jpg',
    liveUrl: undefined,
    githubUrl: 'https://github.com/amalaugustineee/todo-app',
    category: 'web',
    featured: true
  },
  {
    title: 'Charity Chain',
    description: 'A blockchain platform for transparent charity donations using Python, Flask, and SQLite with custom blockchain solution for secure transaction records, user authentication, role-based access, charity registration system, blockchain explorer, dashboards, and admin interface.',
    tags: ['Python', 'Flask', 'SQLite', 'Blockchain', 'Bootstrap', 'jQuery'],
    image: '/placeholder-project.jpg',
    liveUrl: undefined,
    githubUrl: 'https://github.com/amalaugustineee/mini-project-main',
    category: 'web',
    featured: true
  }
];

const ProjectsPage: NextPage = () => {
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filter));
    }
  }, [filter]);

  // Get featured projects
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <Layout>
      <Head>
        <title>Projects | Amal Augustine</title>
        <meta name="description" content="Explore my portfolio of web development and programming projects including AI-enhanced applications and blockchain solutions." />
      </Head>
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-lg mb-12">
            A showcase of my technical work including web applications, blockchain solutions, and programming projects that demonstrate my skills in full-stack development.
          </p>
          
          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={`${project.title}-${index}`} className="glass-card p-6 hover-lift">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="mb-4 opacity-90">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 text-xs bg-surface-dark rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-surface-dark hover:bg-primary-dark/20 transition-colors text-sm"
                    >
                      GitHub Repository
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-gradient-start to-gradient-end text-white text-sm"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage; 
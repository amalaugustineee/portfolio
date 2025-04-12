import React from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import { FiBriefcase, FiCode, FiGlobe, FiBook, FiAward, FiFolder } from 'react-icons/fi';
import Head from 'next/head';

// Skills data
const skills = [
  { name: 'C Programming', level: 90 },
  { name: 'Full Stack Web Development', level: 85 },
  { name: 'Java OOP', level: 75 },
  { name: 'Python', level: 80 },
  { name: 'TypeScript', level: 80 },
  { name: 'React.js', level: 85 },
  { name: 'Node.js', level: 75 },
  { name: 'MySQL/MongoDB', level: 70 },
  { name: 'Firebase', level: 65 },
];

// Timeline data
const timeline = [
  {
    year: '02/2024',
    title: 'Hackathon Coordinator',
    company: 'Disha, College of Engineering Trivandrum',
    location: 'Trivandrum, India',
    description: 'Organized a hackathon with over 100 student participants. Coordinated with 5 departments to ensure smooth event execution. Created marketing strategy that increased registrations by 40%. Led a team of 8 volunteers, assigning tasks and monitoring progress. Managed judging process and feedback sessions between participants.'
  },
];

// Projects data
const projects = [
  {
    name: 'AI-Enhanced Task Management Application',
    link: 'https://github.com/amalaugustineee/todo-app',
    description: 'Developed a Todo app using React, TypeScript, Firebase, and Google\'s Gemini AI. Created multiple view options including Grid, List, Calendar, and Eisenhower Matrix. Built productivity analytics dashboard to track task completion patterns. Designed Focus Mode with Pomodoro technique to enhance work efficiency. Implemented achievements system to increase user engagement. Added AI-powered task suggestions to help users generate ideas. Created responsive design with dark/light mode using Tailwind CSS and Framer Motion. Used Firebase for authentication and real-time data synchronization.'
  },
  {
    name: 'Charity Chain',
    link: 'https://github.com/amalaugustineee/mini-project-main',
    description: 'Built a blockchain platform for transparent charity donations using Python, Flask, and SQLite. Implemented custom blockchain solution for secure transaction records. Created user authentication and role-based access for donors, charities, and admins. Developed charity registration system with verification process. Built blockchain explorer for real-time transaction verification. Designed dashboards for charities to manage donations and show spending transparency. Created admin interface for platform management and charity approval. Used Bootstrap 5 and jQuery for responsive, user-friendly interface.'
  },
];

// Education data
const education = [
  {
    year: '08/2022 - 08/2026',
    degree: 'Bachelor of Technology',
    institution: 'College of Engineering, Thiruvananthapuram',
    location: 'Thiruvananthapuram, India',
    details: 'Strong academic performance in computer science and software engineering. Active participant in departmental technical events and workshops. Member of college coding club, regularly joining programming contests and hackathons.'
  }
];

// Courses/Training data
const courses = [
  {
    name: 'The Complete 2024 Web Development Bootcamp',
    provider: 'Udemy',
    description: 'Learned full stack development including HTML, CSS, JavaScript, Node.js, and databases. Completed 5 projects showing progressive skill development. Earned certification with 95% completion score.'
  }
];

// Languages data
const languages = [
  { name: 'English', proficiency: 'Professional' },
  { name: 'Malayalam', proficiency: 'Native' },
  { name: 'Hindi', proficiency: 'Fluent' },
  { name: 'Tamil', proficiency: 'Conversational' }
];

// Skillset categories
const skillCategories = [
  {
    category: "Programming Languages",
    skills: ["C", "Java", "Python", "JavaScript", "TypeScript"]
  },
  {
    category: "Web Development",
    skills: ["HTML5", "CSS3", "React.js", "Node.js", "Express.js", "Flask", "Bootstrap", "Tailwind CSS"]
  },
  {
    category: "Database Management",
    skills: ["MySQL", "MongoDB", "Firebase Firestore", "SQLite"]
  },
  {
    category: "Tools & Technologies",
    skills: ["Git", "GitHub", "VS Code", "Postman", "npm", "Vite"]
  },
  {
    category: "Blockchain",
    skills: ["Custom implementation", "Transaction verification"]
  },
  {
    category: "Cloud Services",
    skills: ["Firebase Authentication", "Firestore"]
  },
  {
    category: "UI/UX",
    skills: ["Responsive Design", "Framer Motion"]
  },
  {
    category: "AI Integration",
    skills: ["Google Gemini API"]
  },
  {
    category: "Concepts",
    skills: ["OOP", "RESTful APIs", "Redux", "Blockchain Principles"]
  },
  {
    category: "Soft Skills",
    skills: ["Leadership", "Event Management", "Problem-solving", "Communication"]
  }
];

// Social links
const socialLinks = [
  { platform: "LinkedIn", url: "https://linkedin.com/in/amal-augustine-m-4a311b258" },
  { platform: "GitHub", url: "https://github.com/amalaugustineee" },
  { platform: "Portfolio", url: "https://amalportfolio.vercel.app" }
];

const AboutPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>About Me | Amal Augustine</title>
        <meta name="description" content="Learn more about Amal Augustine's skills, experience, and background in engineering and web development." />
      </Head>
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">
            About <span className="gradient-text">Me</span>
          </h1>
          
          <div className="mb-16">
            <div className="glass-card p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold">AMAL AUGUSTINE M</h2>
                  <p className="text-xl text-primary-dark">Engineering Intern</p>
                  <p className="mt-2">Trivandrum, India</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="flex items-center mb-2"><span className="mr-2">📱</span> 9976925006</p>
                  <p className="flex items-center mb-2"><span className="mr-2">📧</span> amalaugustinem1@gmail.com</p>
                  <p className="flex items-center"><span className="mr-2">🌐</span> <a href="https://amalportfolio.vercel.app" className="hover:text-primary-dark underline-animation">Portfolio</a></p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  SUMMARY
                </h3>
                <p className="leading-relaxed">
                  Engineering intern skilled in full stack web development, C programming, and Python. Proven experience in event coordination and teamwork. Strong problem-solving abilities with effective task management and communication skills. Eager to contribute to innovative projects while continuously expanding technical knowledge.
                </p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 flex items-center">
              <FiBriefcase className="mr-3 text-primary-dark" />
              Experience
            </h2>
            
            <div className="relative border-l-2 border-gradient-start pl-8 ml-4">
              {timeline.map((item, index) => (
                <div key={index} className="mb-12 relative">
                  <div className="absolute -left-[42px] top-0 w-8 h-8 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-background-dark" />
                  </div>
                  <div className="glass-card p-6">
                    <span className="inline-block px-3 py-1 text-sm rounded-full glass-card mb-3">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-primary-dark mb-3">{item.company} | {item.location}</p>
                    <ul className="list-disc ml-5 space-y-1">
                      {item.description.split('. ').filter(s => s.length > 0).map((point, i) => (
                        <li key={i}>{point}.</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 flex items-center">
              <FiFolder className="mr-3 text-primary-dark" />
              Projects
            </h2>
            
            <div className="space-y-8">
              {projects.map((project, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-3">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary-dark hover:underline md:ml-4"
                    >
                      GitHub Repository
                    </a>
                  </div>
                  <ul className="list-disc ml-5 space-y-1">
                    {project.description.split('. ').filter(s => s.length > 0).map((point, i) => (
                      <li key={i}>{point}.</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 flex items-center">
              <FiBook className="mr-3 text-primary-dark" />
              Education
            </h2>
            
            <div className="relative border-l-2 border-gradient-start pl-8 ml-4">
              {education.map((item, index) => (
                <div key={index} className="mb-12 relative">
                  <div className="absolute -left-[42px] top-0 w-8 h-8 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-background-dark" />
                  </div>
                  <div className="glass-card p-6">
                    <span className="inline-block px-3 py-1 text-sm rounded-full glass-card mb-3">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold mb-1">{item.degree}</h3>
                    <p className="text-primary-dark mb-3">{item.institution} | {item.location}</p>
                    <ul className="list-disc ml-5 space-y-1">
                      {item.details.split('. ').filter(s => s.length > 0).map((point, i) => (
                        <li key={i}>{point}.</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 flex items-center">
              <FiCode className="mr-3 text-primary-dark" />
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((category, index) => (
                <div key={index} className="glass-card p-6 hover-lift">
                  <h3 className="text-xl font-bold mb-3">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 text-sm bg-surface-dark rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courses & Training */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 flex items-center">
              <FiAward className="mr-3 text-primary-dark" />
              Training / Courses
            </h2>
            
            <div className="relative border-l-2 border-gradient-start pl-8 ml-4">
              {courses.map((item, index) => (
                <div key={index} className="mb-12 relative">
                  <div className="absolute -left-[42px] top-0 w-8 h-8 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-background-dark" />
                  </div>
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                    <p className="text-primary-dark mb-3">{item.provider}</p>
                    <ul className="list-disc ml-5 space-y-1">
                      {item.description.split('. ').filter(s => s.length > 0).map((point, i) => (
                        <li key={i}>{point}.</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 flex items-center">
              <FiGlobe className="mr-3 text-primary-dark" />
              Languages
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {languages.map((language, index) => (
                <div key={index} className="glass-card p-6 hover-lift">
                  <h3 className="text-xl font-bold mb-1">{language.name}</h3>
                  <p className="text-primary-dark">{language.proficiency}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Find Me Online */}
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 flex items-center">
              <FiGlobe className="mr-3 text-primary-dark" />
              Find Me Online
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-card p-6 hover-lift text-center transition-all duration-300 hover:text-primary-dark"
                >
                  <h3 className="text-xl font-bold">{link.platform}</h3>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage; 
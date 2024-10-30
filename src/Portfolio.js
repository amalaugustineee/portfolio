// src/Portfolio.js
import React, { useState, useEffect, useCallback } from 'react';
import { Code, Book, Users, GraduationCap, Laptop, Database, Server, Globe, Terminal } from 'lucide-react';

const Portfolio = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollPosition, setScrollPosition] = useState(0);
    const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  
    const handleMouseMove = useCallback((e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 255,
        y: (e.clientY / window.innerHeight) * 255
      });
    }, []);
  
    const handleScroll = useCallback(() => {
      const position = window.scrollY;
      setScrollPosition(position);
    }, []);
  
    const handleTouch = useCallback((e) => {
      const touch = e.touches[0];
      setTouchPosition({
        x: (touch.clientX / window.innerWidth) * 255,
        y: (touch.clientY / window.innerHeight) * 255
      });
    }, []);
  
    useEffect(() => {
      setIsVisible(true);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('touchmove', handleTouch);
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('touchmove', handleTouch);
      };
    }, [handleMouseMove, handleScroll, handleTouch]);
  
    const getBgColor = () => {
      const scrollFactor = (scrollPosition / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const r = (mousePosition.x + touchPosition.x) / 2;
      const g = (mousePosition.y + touchPosition.y) / 2;
      const b = 150 + scrollFactor;
      
      return `rgb(${Math.min(30 + r/8, 50)}, ${Math.min(30 + g/8, 50)}, ${Math.min(b, 150)})`;
    };
  
    const getDynamicGradient = () => {
      const baseColor = getBgColor();
      const scrollOffset = (scrollPosition / 1000) * 360;
      return `
        linear-gradient(
          ${scrollOffset}deg,
          ${baseColor} 0%,
          rgba(17, 24, 39, 1) 100%
        )
      `;
    };
  
    const ParticleEffect = () => {
      const particles = Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            width: '2px',
            height: '2px',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `translate(${mousePosition.x / 20}px, ${mousePosition.y / 20}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      ));
  
      return <div className="fixed inset-0 pointer-events-none">{particles}</div>;
    };
  
    const skillsData = [
      {
        icon: <Code className="w-8 h-8" />,
        title: "Programming Languages",
        mainSkills: ["C", "Python", "Java"],
        details: [
          "C: Data Structures, Algorithm Implementation, System Programming",
          "Python: Web Development, Data Analysis, Automation Scripts",
          "Java: Object-Oriented Programming, Application Development"
        ]
      },
      {
        icon: <Globe className="w-8 h-8" />,
        title: "Web Development",
        mainSkills: ["Full Stack Development", "Frontend", "Backend"],
        details: [
          "Frontend: HTML5, CSS3, JavaScript, Responsive Design",
          "Backend: Node.js, Express, RESTful APIs",
          "Database: SQL, Basic Database Design"
        ]
      },
      {
        icon: <Terminal className="w-8 h-8" />,
        title: "Development Tools",
        mainSkills: ["Git", "VS Code", "Command Line"],
        details: [
          "Version Control: Git, GitHub",
          "IDEs: Visual Studio Code, Eclipse",
          "Command Line Tools & Shell Scripting"
        ]
      },
      {
        icon: <Database className="w-8 h-8" />,
        title: "Database & Tools",
        mainSkills: ["SQL", "Database Design", "Query Optimization"],
        details: [
          "SQL: Basic to Intermediate Queries",
          "Database Management Systems",
          "Data Modeling & Normalization"
        ]
      },
      {
        icon: <Server className="w-8 h-8" />,
        title: "Software Development",
        mainSkills: ["Problem Solving", "Software Design", "Testing"],
        details: [
          "Algorithm Design & Analysis",
          "Software Development Life Cycle",
          "Basic Testing & Debugging"
        ]
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "Soft Skills",
        mainSkills: ["Communication", "Team Work", "Fast Learning"],
        details: [
          "Effective Technical Communication",
          "Collaborative Team Projects",
          "Quick Adaptation to New Technologies"
        ]
      }
    ];
  
    return (
      <div 
        className="min-h-screen text-white relative overflow-hidden"
        style={{
          background: getDynamicGradient(),
          transition: 'background 0.5s ease',
        }}
      >
        <ParticleEffect />
        
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-overlay opacity-10"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`,
                top: `${50 + Math.sin(scrollPosition / 1000 + i) * 10}%`,
                left: `${50 + Math.cos(scrollPosition / 1000 + i) * 10}%`,
                transform: `translate(-50%, -50%) translate(${mousePosition.x / (i + 5)}px, ${mousePosition.y / (i + 5)}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            />
          ))}
        </div>
  
        <header className={`h-screen flex items-center justify-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center relative z-10">
            <h1 className="text-6xl font-bold mb-4 animate-bounce">
              Amal Augustine M
            </h1>
            <p className="text-xl text-blue-400 animate-pulse">
              Software Engineering Enthusiast
            </p>
          </div>
        </header>
  
        <section className="py-20 px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
            <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <p className="text-lg leading-relaxed">
                Highly motivated engineering intern with a strong background in C, Python, Java, web development, and SQL. 
                Currently pursuing Computer Science and Engineering at College of Engineering, Thiruvananthapuram.
              </p>
            </div>
          </div>
        </section>
  
        <section className="py-20 px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillsData.map((skill, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-lg text-left transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-bold">{skill.title}</h3>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-blue-400 mb-2">Core Competencies:</h4>
                    <ul className="list-disc list-inside">
                      {skill.mainSkills.map((item, i) => (
                        <li key={i} className="mb-1">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-blue-400 mb-2">Specific Skills:</h4>
                    <ul className="list-disc list-inside text-sm">
                      {skill.details.map((detail, i) => (
                        <li key={i} className="mb-1 text-gray-300">{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        <section className="py-20 px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Experience</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Hackathon Coordinator",
                  place: "Disha, College of Engineering, Trivandrum",
                  date: "February 2024",
                  points: [
                    "Coordinated successful Hackathon with 100+ participants",
                    "Managed event logistics and promotions",
                    "Secured sponsorships and partnerships"
                  ]
                },
                {
                  title: "Hospitality Volunteer",
                  place: "Dhristi, College of Engineering, Trivandrum",
                  date: "April 2024",
                  points: [
                    "Event planning and coordination",
                    "Guest relations management",
                    "Problem-solving and customer service"
                  ]
                }
              ].map((exp, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
                >
                  <h3 className="text-2xl font-bold mb-2 text-blue-400">{exp.title}</h3>
                  <p className="text-gray-300 mb-4">{exp.place} | {exp.date}</p>
                  <ul className="list-disc list-inside space-y-2">
                    {exp.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        <section className="py-20 px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
            <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-lg inline-block transform hover:scale-105 transition-transform duration-300">
              <p className="mb-4">amalaugustinem1@gmail.com</p>
              <p>+91 9976925006</p>
              <p>Trivandrum, India</p>
            </div>
          </div>
        </section>
      </div>
    );
 
};

export default Portfolio;
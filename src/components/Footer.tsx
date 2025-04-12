import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-20 py-10 border-t border-surface-dark/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and info */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <Link href="/" legacyBehavior>
                <a className="text-2xl font-display font-bold gradient-text">
                  Amal Augustine
                </a>
              </Link>
            </motion.div>
            <p className="text-sm opacity-80 max-w-md">
              Engineering intern skilled in full stack web development, C programming, and Python, with a proven track record in event coordination and teamwork.
            </p>
            <div className="flex space-x-4 pt-2">
              <motion.a 
                href="https://github.com/amalaugustinem" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-lg hover:text-primary-dark transition-colors"
                aria-label="GitHub"
              >
                <FiGithub />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/amal-augustine-m-4a311b258" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-lg hover:text-primary-dark transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </motion.a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" legacyBehavior>
                  <a className="hover:text-primary-dark transition-colors underline-animation">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about" legacyBehavior>
                  <a className="hover:text-primary-dark transition-colors underline-animation">
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/projects" legacyBehavior>
                  <a className="hover:text-primary-dark transition-colors underline-animation">
                    Projects
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact" legacyBehavior>
                  <a className="hover:text-primary-dark transition-colors underline-animation">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
            <div className="space-y-2">
              <p className="flex items-center space-x-2">
                <span>Email:</span>
                <a href="mailto:amalaugustinem1@gmail.com" className="hover:text-primary-dark transition-colors underline-animation">
                  amalaugustinem1@gmail.com
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <span>Phone:</span>
                <a href="tel:+919976925006" className="hover:text-primary-dark transition-colors underline-animation">
                  +91 9976925006
                </a>
              </p>
              <p>
                <span>Location:</span>
                <span className="ml-2">Trivandrum, India</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-surface-dark/10 mt-10 pt-6 text-center text-sm opacity-70">
          <p className="flex items-center justify-center">
            © {currentYear} Amal Augustine. All rights reserved. Made with 
            <FiHeart className="mx-1 text-secondary-dark" /> 
            using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
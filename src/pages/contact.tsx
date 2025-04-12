import React from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub } from 'react-icons/fi';
import ContactForm from '../components/ContactForm';
import Head from 'next/head';
import { motion } from 'framer-motion';

const ContactPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Contact | Amal Augustine</title>
        <meta name="description" content="Get in touch with Amal Augustine for collaborations, project inquiries, or job opportunities." />
      </Head>
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg mb-12 max-w-2xl">
            I'm currently open to new opportunities and collaborations. Feel free to reach out through the form below or via direct contact.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="col-span-1 md:col-span-2">
              <ContactForm />
            </div>
            
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-xl hover-lift">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <FiMail className="text-gradient-start text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a href="mailto:amalaugustinem1@gmail.com" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors">
                      amalaugustinem1@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover-lift">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <FiPhone className="text-gradient-start text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <a href="tel:+919976925006" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors">
                      +91 9976925006
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover-lift">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <FiMapPin className="text-gradient-start text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Location</h3>
                    <p>Trivandrum, India</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-xl hover-lift">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <FiLinkedin className="text-gradient-start text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">LinkedIn</h3>
                    <a 
                      href="https://linkedin.com/in/amal-augustine-m-4a311b258" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                    >
                      linkedin.com/in/amal-augustine-m-4a311b258
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl hover-lift">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <FiGithub className="text-gradient-start text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">GitHub</h3>
                    <a 
                      href="https://github.com/amalaugustinem" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                    >
                      github.com/amalaugustinem
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage; 
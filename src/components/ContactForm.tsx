import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FiSend, FiCheck, FiAlertTriangle, FiX, FiMail, FiUser, FiMessageSquare, FiInfo } from 'react-icons/fi';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FieldState = {
  value: string;
  focused: boolean;
  error: string | null;
  touched: boolean;
};

interface ContactFormProps {
  onSubmit?: (data: FormData) => Promise<boolean>;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState<{
    name: FieldState;
    email: FieldState;
    subject: FieldState;
    message: FieldState;
  }>({
    name: { value: '', focused: false, error: null, touched: false },
    email: { value: '', focused: false, error: null, touched: false },
    subject: { value: '', focused: false, error: null, touched: false },
    message: { value: '', focused: false, error: null, touched: false },
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formCompletionPercent, setFormCompletionPercent] = useState(0);
  
  const controls = useAnimation();
  
  // Calculate form completion percentage
  useEffect(() => {
    const totalFields = Object.keys(fields).length;
    let filledFields = 0;
    
    Object.values(fields).forEach(field => {
      if (field.value.trim() !== '' && !field.error) {
        filledFields += 1;
      }
    });
    
    const percentage = Math.floor((filledFields / totalFields) * 100);
    setFormCompletionPercent(percentage);
  }, [fields]);
  
  // Validate individual field
  const validateField = (name: keyof FormData, value: string): string | null => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name is required' : null;
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
          ? 'Please enter a valid email address' 
          : null;
      case 'subject':
        return value.trim().length < 3 ? 'Subject is required' : null;
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : null;
      default:
        return null;
    }
  };

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormData, value);
    
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof FormData],
        value,
        error,
        touched: true,
      },
    }));
    
    // Apply a shake animation if there's an error
    if (error && fields[name as keyof FormData].touched) {
      controls.start({
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.4 }
      });
    }
  };

  // Handle focus event
  const handleFocus = (name: keyof FormData) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        focused: true,
      },
    }));
  };

  // Handle blur event
  const handleBlur = (name: keyof FormData) => {
    const field = fields[name];
    const error = validateField(name, field.value);
    
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        focused: false,
        error,
        touched: true,
      },
    }));
    
    // Apply a shake animation if there's an error
    if (error) {
      controls.start({
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.4 }
      });
    }
  };

  // Check if all fields are valid
  const isFormValid = () => {
    return Object.keys(fields).every((fieldName) => {
      const field = fields[fieldName as keyof FormData];
      return field.value.trim().length > 0 && !field.error;
    });
  };

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const updatedFields = { ...fields };
    let hasErrors = false;
    
    (Object.keys(fields) as Array<keyof FormData>).forEach((fieldName) => {
      const error = validateField(fieldName, fields[fieldName].value);
      updatedFields[fieldName] = {
        ...updatedFields[fieldName],
        error,
        touched: true,
      };
      
      if (error) {
        hasErrors = true;
      }
    });
    
    setFields(updatedFields);
    
    if (hasErrors) {
      // Apply a shake animation to the form
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 }
      });
      return;
    }
    
    // Form data
    const formData: FormData = {
      name: fields.name.value,
      email: fields.email.value,
      subject: fields.subject.value,
      message: fields.message.value,
    };
    
    setIsSubmitting(true);
    
    try {
      let success = true;
      
      if (onSubmit) {
        success = await onSubmit(formData);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      setSubmitStatus(success ? 'success' : 'error');
      
      if (success) {
        // Reset form on success
        setFields({
          name: { value: '', focused: false, error: null, touched: false },
          email: { value: '', focused: false, error: null, touched: false },
          subject: { value: '', focused: false, error: null, touched: false },
          message: { value: '', focused: false, error: null, touched: false },
        });
        
        // Trigger confetti animation
        if (formRef.current) {
          createConfetti(formRef.current);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset submit status after 5 seconds
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  };

  // Get field styling based on state
  const getFieldClasses = (field: FieldState) => {
    let baseClasses = "w-full p-3 rounded-lg glass-card border transition-all duration-300 focus:outline-none";
    
    if (field.focused) {
      baseClasses += " border-gradient-start shadow-md shadow-gradient-start/20";
    } else if (field.error && field.touched) {
      baseClasses += " border-red-500 shadow-md shadow-red-500/20";
    } else if (!field.error && field.touched && field.value) {
      baseClasses += " border-green-500 shadow-md shadow-green-500/20";
    } else {
      baseClasses += " border-surface-light dark:border-surface-dark";
    }
    
    return baseClasses;
  };

  // Render validation icon based on field state
  const renderInputIcon = (field: FieldState, icon: React.ReactNode) => {
    // Show the default field icon when empty or focused
    if (!field.touched || field.focused || !field.value) {
      return (
        <motion.div
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          initial={{ opacity: 0.5 }}
          animate={{ 
            opacity: field.focused ? 1 : 0.5,
            x: field.focused ? -3 : 0,
            scale: field.focused ? 1.2 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
      );
    }
    
    // Show error icon
    if (field.error) {
      return (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
        >
          <FiAlertTriangle className="w-5 h-5" />
        </motion.div>
      );
    }
    
    // Show success icon
    if (field.value) {
      return (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
        >
          <FiCheck className="w-5 h-5" />
        </motion.div>
      );
    }
    
    return null;
  };
  
  // Create confetti effect for successful form submissions
  const createConfetti = (container: HTMLElement) => {
    const colors = ['#6366F1', '#EC4899', '#8B5CF6', '#10B981', '#3B82F6'];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      const size = Math.floor(Math.random() * 8 + 4);
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.opacity = '0';
      particle.style.pointerEvents = 'none';
      
      // Random starting position at the bottom center
      const rect = container.getBoundingClientRect();
      const startX = rect.width / 2;
      const startY = rect.height;
      
      // Random end position
      const endX = startX + (Math.random() - 0.5) * rect.width * 1.5;
      const endY = startY - rect.height * (0.5 + Math.random() * 0.5);
      
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      
      container.appendChild(particle);
      
      // Animate
      const duration = 1000 + Math.random() * 2000;
      const delay = Math.random() * 500;
      
      setTimeout(() => {
        particle.style.transition = `all ${duration}ms ease-out`;
        particle.style.transform = `translate(${endX - startX}px, ${endY - startY}px) rotate(${Math.random() * 360}deg)`;
        particle.style.opacity = `${0.7 + Math.random() * 0.3}`;
        
        setTimeout(() => {
          particle.style.opacity = '0';
          setTimeout(() => {
            if (container.contains(particle)) {
              container.removeChild(particle);
            }
          }, 1000);
        }, duration - 100);
      }, delay);
    }
  };

  return (
    <motion.div
      className="glass-card p-6 rounded-xl relative overflow-hidden"
      animate={controls}
    >
      <h3 className="text-xl font-bold mb-6 font-display gradient-text">Send a Message</h3>
      
      {/* Form completion progress */}
      <motion.div 
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-gradient-start to-gradient-end"
        initial={{ width: '0%' }}
        animate={{ width: `${formCompletionPercent}%` }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      />
      
      <form ref={formRef} onSubmit={handleSubmit} className="relative">
        <div className="space-y-4">
          {/* Name Field */}
          <div className="relative">
            <motion.label 
              htmlFor="name"
              className="block mb-1 text-sm font-medium"
              animate={{ 
                x: fields.name.focused ? 5 : 0,
                color: fields.name.focused ? 'var(--color-gradient-start)' : 'currentColor'
              }}
            >
              Your Name
            </motion.label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={fields.name.value}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={() => handleBlur('name')}
                className={`pl-10 ${getFieldClasses(fields.name)}`}
                placeholder="John Doe"
                disabled={isSubmitting}
              />
              {renderInputIcon(fields.name, <FiUser className="w-5 h-5" />)}
            </div>
            <AnimatePresence>
              {fields.name.error && fields.name.touched && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="flex items-center text-red-500 text-sm mt-1 space-x-1"
                >
                  <FiAlertTriangle className="w-3 h-3 flex-shrink-0" />
                  <span>{fields.name.error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Email Field */}
          <div className="relative">
            <motion.label 
              htmlFor="email"
              className="block mb-1 text-sm font-medium"
              animate={{ 
                x: fields.email.focused ? 5 : 0,
                color: fields.email.focused ? 'var(--color-gradient-start)' : 'currentColor'
              }}
            >
              Your Email
            </motion.label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={fields.email.value}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                className={`pl-10 ${getFieldClasses(fields.email)}`}
                placeholder="john@example.com"
                disabled={isSubmitting}
              />
              {renderInputIcon(fields.email, <FiMail className="w-5 h-5" />)}
            </div>
            <AnimatePresence>
              {fields.email.error && fields.email.touched && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="flex items-center text-red-500 text-sm mt-1 space-x-1"
                >
                  <FiAlertTriangle className="w-3 h-3 flex-shrink-0" />
                  <span>{fields.email.error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Subject Field */}
          <div className="relative">
            <motion.label 
              htmlFor="subject"
              className="block mb-1 text-sm font-medium"
              animate={{ 
                x: fields.subject.focused ? 5 : 0,
                color: fields.subject.focused ? 'var(--color-gradient-start)' : 'currentColor'
              }}
            >
              Subject
            </motion.label>
            <div className="relative">
              <input
                type="text"
                id="subject"
                name="subject"
                value={fields.subject.value}
                onChange={handleChange}
                onFocus={() => handleFocus('subject')}
                onBlur={() => handleBlur('subject')}
                className={`pl-10 ${getFieldClasses(fields.subject)}`}
                placeholder="What would you like to discuss?"
                disabled={isSubmitting}
              />
              {renderInputIcon(fields.subject, <FiInfo className="w-5 h-5" />)}
            </div>
            <AnimatePresence>
              {fields.subject.error && fields.subject.touched && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="flex items-center text-red-500 text-sm mt-1 space-x-1"
                >
                  <FiAlertTriangle className="w-3 h-3 flex-shrink-0" />
                  <span>{fields.subject.error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Message Field */}
          <div className="relative">
            <motion.label 
              htmlFor="message"
              className="block mb-1 text-sm font-medium"
              animate={{ 
                x: fields.message.focused ? 5 : 0,
                color: fields.message.focused ? 'var(--color-gradient-start)' : 'currentColor'
              }}
            >
              Your Message
            </motion.label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={fields.message.value}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={() => handleBlur('message')}
                className={`pl-10 ${getFieldClasses(fields.message)} h-32 resize-none`}
                placeholder="Tell me about your project..."
                disabled={isSubmitting}
              />
              {renderInputIcon(fields.message, <FiMessageSquare className="w-5 h-5" />)}
            </div>
            <AnimatePresence>
              {fields.message.error && fields.message.touched && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="flex items-center text-red-500 text-sm mt-1 space-x-1"
                >
                  <FiAlertTriangle className="w-3 h-3 flex-shrink-0" />
                  <span>{fields.message.error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <motion.button
              type="submit"
              disabled={isSubmitting || !isFormValid()}
              className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-300 relative overflow-hidden ${
                isFormValid() 
                  ? 'bg-gradient-to-r from-gradient-start to-gradient-end hover:shadow-lg hover:shadow-gradient-start/20' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              whileHover={isFormValid() ? { scale: 1.02 } : {}}
              whileTap={isFormValid() ? { scale: 0.98 } : {}}
              animate={
                isFormValid() 
                  ? { 
                      transition: { duration: 0.3 },
                      boxShadow: ['0 0 0 rgba(99, 102, 241, 0)', '0 0 15px rgba(99, 102, 241, 0.5)', '0 0 10px rgba(99, 102, 241, 0.3)']
                    }
                  : {}
              }
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%' }}
                animate={{ 
                  x: isSubmitting ? '0%' : '-100%'
                }}
                transition={{ duration: 0.5 }}
                style={{ opacity: 0.3 }}
              />
              
              {/* Glowing effect for valid form */}
              {isFormValid() && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gradient-start to-gradient-end opacity-0"
                  animate={{ 
                    opacity: [0, 0.5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
              
              <motion.div className="flex items-center justify-center relative z-10">
                {isSubmitting ? (
                  <motion.div 
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    <span className="mr-2">Send Message</span>
                    <motion.div
                      animate={isFormValid() ? { x: [0, 5, 0] } : {}}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    >
                      <FiSend />
                    </motion.div>
                  </>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </form>

      {/* Success/Error Message */}
      <AnimatePresence mode="wait">
        {submitStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-6 p-4 rounded-lg ${
              submitStatus === 'success' ? 'bg-green-500/10' : 'bg-red-500/10'
            }`}
          >
            <div className="flex items-start">
              <motion.div 
                className={`rounded-full p-2 mr-3 ${
                  submitStatus === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {submitStatus === 'success' ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: 3 }}
                  >
                    <FiCheck className="w-5 h-5 text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.5, repeat: 3 }}
                  >
                    <FiAlertTriangle className="w-5 h-5 text-red-500" />
                  </motion.div>
                )}
              </motion.div>
              <div className="flex-1">
                <motion.h4 
                  className={`font-bold ${
                    submitStatus === 'success' ? 'text-green-500' : 'text-red-500'
                  }`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {submitStatus === 'success' ? 'Message Sent!' : 'Error Sending Message'}
                </motion.h4>
                <motion.p 
                  className="text-sm opacity-80"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {submitStatus === 'success' 
                    ? 'Thank you for your message. I will get back to you as soon as possible.'
                    : 'There was an error sending your message. Please try again later.'}
                </motion.p>
              </div>
              <motion.button
                onClick={() => setSubmitStatus('idle')}
                className="text-text-light dark:text-text-dark opacity-60 hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative elements */}
      <div className="absolute -z-10 top-0 right-0 w-32 h-32 bg-gradient-start/5 dark:bg-gradient-start/10 rounded-full blur-2xl" />
      <div className="absolute -z-10 bottom-0 left-0 w-40 h-40 bg-gradient-end/5 dark:bg-gradient-end/10 rounded-full blur-3xl" />
    </motion.div>
  );
};

export default ContactForm;
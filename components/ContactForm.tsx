"use client";

import { useState, FormEvent } from "react";
import { useInView } from "@/hooks/useInView";
import StarField from "@/components/StarField";

/**
 * ContactForm Component
 * Contact form with validation (UI only, no backend integration)
 */

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const { ref: headerRef, isInView: headerInView } = useInView<HTMLDivElement>();
  const { ref: formRef, isInView: formInView } = useInView<HTMLFormElement>();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) {
      return "Name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone.trim()) {
      return "Phone is required";
    }
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid phone number";
    }
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (!message.trim()) {
      return "Message is required";
    }
    if (message.trim().length < 10) {
      return "Message must be at least 10 characters";
    }
    return undefined;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    newErrors.name = validateName(formData.name);
    newErrors.phone = validatePhone(formData.phone);
    newErrors.email = validateEmail(formData.email);
    newErrors.message = validateMessage(formData.message);

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).every((error) => !error)) {
      // Form is valid - in a real app, this would submit to a backend
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", phone: "", email: "", message: "" });
      }, 3000);
    }
  };

  return (
    <section id="contact" className="relative w-full bg-black py-20 lg:py-32 overflow-hidden">
      <StarField />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div 
            ref={headerRef}
            className={`text-center mb-12 scroll-reveal ${headerInView ? 'visible' : ''}`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">
              Contact Us
            </h2>
            <p className="text-xl text-white/80 font-semibold">
              Get in touch for emergency service or to schedule maintenance
            </p>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`bg-dark-gray p-8 border border-white/10 scroll-reveal ${formInView ? 'visible' : ''}`}
          >
            {/* Success Message */}
            {isSubmitted && (
              <div className="mb-6 p-4 bg-warning-yellow/20 border border-warning-yellow text-warning-yellow">
                Thank you! Your message has been received. We'll contact you soon.
              </div>
            )}

            {/* Name Field */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-white font-semibold uppercase tracking-wide mb-2"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-black border ${
                  errors.name ? "border-red-500" : "border-white/20"
                } text-white focus:outline-none focus:border-warning-yellow transition-colors duration-500 ease-in-out`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-white font-semibold uppercase tracking-wide mb-2"
              >
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-black border ${
                  errors.phone ? "border-red-500" : "border-white/20"
                } text-white focus:outline-none focus:border-warning-yellow transition-colors duration-500 ease-in-out`}
                placeholder="+1 (585) 315-7599"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-white font-semibold uppercase tracking-wide mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-black border ${
                  errors.email ? "border-red-500" : "border-white/20"
                } text-white focus:outline-none focus:border-warning-yellow transition-colors duration-500 ease-in-out`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Message Field */}
            <div className="mb-8">
              <label
                htmlFor="message"
                className="block text-white font-semibold uppercase tracking-wide mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 bg-black border ${
                  errors.message ? "border-red-500" : "border-white/20"
                } text-white focus:outline-none focus:border-warning-yellow transition-colors duration-500 ease-in-out resize-none`}
                placeholder="Describe your service needs..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-warning-yellow text-black px-8 py-4 text-lg font-black uppercase tracking-wider hover:bg-red-500 transition-colors duration-500 ease-in-out"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

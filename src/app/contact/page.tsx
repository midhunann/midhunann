'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, CheckCircle } from 'lucide-react';
import { 
  Section,
  BackgroundBeams,
  HoverBorderGradient,
  CardContainer,
  CardBody,
  CardItem,
  TextGenerateEffect,
} from '@/components/ui';
import { personalInfo } from '@/data';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    // In production, integrate with Formspree, EmailJS, or your backend
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
    email: Mail,
  };

  return (
    <div className="relative">
      {/* Background */}
      <BackgroundBeams className="opacity-40" />

      <Section
        title="Let's Connect"
        subtitle="Have a project in mind or just want to chat? I'd love to hear from you!"
        centered
        className="pt-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-pearl mb-4">
                Get in Touch
              </h2>
              <TextGenerateEffect
                words="I'm currently open to internship opportunities, freelance projects, and interesting collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!"
                className="text-pearl/60"
              />
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <CardContainer>
                <CardBody>
                  <CardItem translateZ="50" className="w-full">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="glass-card p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform"
                    >
                      <div className="w-12 h-12 rounded-xl bg-ocean/20 flex items-center justify-center">
                        <Mail size={24} className="text-ocean" />
                      </div>
                      <div>
                        <p className="text-sm text-pearl/50">Email</p>
                        <p className="text-pearl font-medium">{personalInfo.email}</p>
                      </div>
                    </a>
                  </CardItem>
                </CardBody>
              </CardContainer>

              <CardContainer>
                <CardBody>
                  <CardItem translateZ="50" className="w-full">
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="glass-card p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform"
                    >
                      <div className="w-12 h-12 rounded-xl bg-ocean/20 flex items-center justify-center">
                        <Phone size={24} className="text-ocean" />
                      </div>
                      <div>
                        <p className="text-sm text-pearl/50">Phone</p>
                        <p className="text-pearl font-medium">{personalInfo.phone}</p>
                      </div>
                    </a>
                  </CardItem>
                </CardBody>
              </CardContainer>

              <CardContainer>
                <CardBody>
                  <CardItem translateZ="50" className="w-full">
                    <div className="glass-card p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-ocean/20 flex items-center justify-center">
                        <MapPin size={24} className="text-ocean" />
                      </div>
                      <div>
                        <p className="text-sm text-pearl/50">Location</p>
                        <p className="text-pearl font-medium">
                          {personalInfo.location.city}, {personalInfo.location.country}
                        </p>
                      </div>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-pearl mb-4">
                Connect on Social
              </h3>
              <div className="flex gap-4">
                {personalInfo.socials.map((social) => {
                  const Icon = socialIcons[social.platform as keyof typeof socialIcons];
                  return Icon ? (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl glass flex items-center justify-center text-pearl/60 hover:text-ocean hover:bg-ocean/10 transition-all"
                      aria-label={social.label}
                    >
                      <Icon size={22} />
                    </a>
                  ) : null;
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle size={64} className="mx-auto text-green-400 mb-4" />
                  <h3 className="text-2xl font-bold text-pearl mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-pearl/60">
                    Thanks for reaching out. I&apos;ll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-pearl/70 mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-midnight/30 border border-ocean/20 text-pearl placeholder:text-pearl/30 focus:border-ocean focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-pearl/70 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-midnight/30 border border-ocean/20 text-pearl placeholder:text-pearl/30 focus:border-ocean focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-pearl/70 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-midnight/30 border border-ocean/20 text-pearl placeholder:text-pearl/30 focus:border-ocean focus:outline-none transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-pearl/70 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-midnight/30 border border-ocean/20 text-pearl placeholder:text-pearl/30 focus:border-ocean focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your project or just say hi!"
                    />
                  </div>

                  <HoverBorderGradient
                    as="button"
                    type="submit"
                    disabled={isSubmitting}
                    containerClassName="w-full"
                    className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 justify-center">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-pearl/30 border-t-pearl rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 justify-center">
                        <Send size={18} />
                        Send Message
                      </span>
                    )}
                  </HoverBorderGradient>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}

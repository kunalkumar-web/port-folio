import React, { useState } from 'react';
import { 
  Send, Mail, Phone, MapPin, Github, Linkedin, 
  Check, Copy, MessageSquare, Clock, CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';
import { playHoverSound, playClickSound, playSuccessSound } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    projectType: 'ai-automation',
    budget: '$5k-$15k',
    message: '',
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleCopy = (text: string, label: string) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject';
    if (!formData.message.trim()) errs.message = 'Please enter a message';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    playClickSound();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playSuccessSound();

      // Red, White, Gray confetti
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#dc2626', '#ffffff', '#71717a'],
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 border-b border-zinc-800/80 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-red-400 text-xs font-mono tracking-wider uppercase">
            <MessageSquare className="w-3.5 h-3.5 text-red-500" />
            <span>COMMUNICATION &bull; INQUIRIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Initiate a Conversation
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-normal">
            Whether you require autonomous AI pipelines, resilient full-stack web platforms, or distributed backends, let's explore collaborating together.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Direct Communication</h3>
                <p className="text-xs text-zinc-400 font-mono">Response within 24 business hours</p>
              </div>

              {/* Contact Channels */}
              <div className="space-y-3 font-mono text-xs">
                
                {/* Email Item */}
                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-zinc-800 text-red-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] text-zinc-400">Email Address</div>
                      <div className="text-white font-medium truncate">{PERSONAL_INFO.email}</div>
                    </div>
                  </div>
                  <button
                    id="copy-email-btn"
                    onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                    className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors shrink-0"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-red-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-zinc-800 text-red-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] text-zinc-400">Direct Phone</div>
                      <div className="text-white font-medium truncate">{PERSONAL_INFO.phone}</div>
                    </div>
                  </div>
                  <button
                    id="copy-phone-btn"
                    onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                    className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors shrink-0"
                    title="Copy Phone"
                  >
                    {copiedField === 'phone' ? <Check className="w-4 h-4 text-red-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-800 text-red-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400">Primary Location</div>
                    <div className="text-white font-medium">{PERSONAL_INFO.location}</div>
                  </div>
                </div>

              </div>

              {/* Social Channels (Kept nicely here in Contact area) */}
              <div className="pt-2 border-t border-zinc-800 flex gap-3">
                <a
                  id="contact-github-link"
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClickSound()}
                  onMouseEnter={() => playHoverSound(500, 0.02)}
                  className="flex-1 p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center gap-2 text-xs font-mono transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  id="contact-linkedin-link"
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClickSound()}
                  onMouseEnter={() => playHoverSound(500, 0.02)}
                  className="flex-1 p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center gap-2 text-xs font-mono transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Availability Box */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center gap-3.5 shadow-lg">
              <div className="p-2.5 rounded-xl bg-zinc-900 text-red-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="text-white font-semibold">Available for Engagements</div>
                <div className="text-zinc-400">Open to high-impact software engineering roles and production AI projects.</div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl relative">
              
              {submitted ? (
                /* Submission Confirmation */
                <div className="py-12 text-center space-y-5">
                  <div className="w-14 h-14 rounded-full bg-red-950/60 border border-red-500/60 text-red-400 flex items-center justify-center mx-auto shadow-lg shadow-black">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Message Dispatched</h3>
                    <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed font-normal">
                      Thank you, <strong className="text-white">{formData.name}</strong>. Your message regarding <span className="text-red-400 font-mono">"{formData.subject}"</span> has been logged. Kunal will respond promptly.
                    </p>
                  </div>

                  <div className="pt-3 flex justify-center gap-3">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`}
                      className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold font-mono shadow-lg transition-all"
                    >
                      Open in Email Client
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          subject: '',
                          projectType: 'ai-automation',
                          budget: '$5k-$15k',
                          message: '',
                        });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono transition-all"
                    >
                      Compose Another
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Inputs */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-300 flex items-center justify-between">
                        <span>Your Full Name *</span>
                        {errors.name && <span className="text-red-400 text-[10px]">{errors.name}</span>}
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        placeholder="e.g. Sarah Connor"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-zinc-900 border text-white text-sm placeholder-zinc-500 focus:outline-none transition-all ${
                          errors.name ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-zinc-800 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        }`}
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-300 flex items-center justify-between">
                        <span>Your Email Address *</span>
                        {errors.email && <span className="text-red-400 text-[10px]">{errors.email}</span>}
                      </label>
                      <input
                        id="contact-email-input"
                        type="email"
                        placeholder="e.g. sarah@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-zinc-900 border text-white text-sm placeholder-zinc-500 focus:outline-none transition-all ${
                          errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-zinc-800 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        }`}
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Project Domain Select */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-300">Project Focus / Engagement</label>
                      <select
                        id="contact-project-type-select"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:border-red-500 focus:outline-none transition-all"
                      >
                        <option value="ai-automation">AI &amp; LLM Automation Pipelines</option>
                        <option value="fullstack-saas">Full-Stack Platform Architecture</option>
                        <option value="3d-frontend">Modern Interactive Web Experiences</option>
                        <option value="fintech-offline">Offline-First &amp; Distributed Systems</option>
                        <option value="fulltime-role">Full-Time Software Engineering Role</option>
                      </select>
                    </div>

                    {/* Subject Field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-300 flex items-center justify-between">
                        <span>Subject Line *</span>
                        {errors.subject && <span className="text-red-400 text-[10px]">{errors.subject}</span>}
                      </label>
                      <input
                        id="contact-subject-input"
                        type="text"
                        placeholder="e.g. Building an automated LLM extraction system"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-zinc-900 border text-white text-sm placeholder-zinc-500 focus:outline-none transition-all ${
                          errors.subject ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-zinc-800 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        }`}
                      />
                    </div>

                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 flex items-center justify-between">
                      <span>Message Details *</span>
                      {errors.message && <span className="text-red-400 text-[10px]">{errors.message}</span>}
                    </label>
                    <textarea
                      id="contact-message-textarea"
                      rows={4}
                      placeholder="Describe your technical requirements, goals, or role overview..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-900 border text-white text-sm placeholder-zinc-500 focus:outline-none transition-all resize-none ${
                        errors.message ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-zinc-800 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => playHoverSound(700, 0.03)}
                    className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 font-mono"
                  >
                    {isSubmitting ? (
                      <span>Sending Dispatch...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Direct Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

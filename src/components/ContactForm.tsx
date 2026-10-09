import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin, MessageSquare, Clock } from 'lucide-react';
import { ContactFormData } from '../types';
import { GYM_CONFIG } from '../services/gymData';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    interestedIn: 'Strength & Hypertrophy Training',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const phoneRegex = /^[+]?[\d\s-]{8,15}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      setErrorMsg('Please provide a valid contact number.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    if (!formData.message.trim()) {
      setErrorMsg('Please write a short message or enquiry details.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Save locally to localStorage demo array
      const existing = JSON.parse(localStorage.getItem('fitness_fuel_contact_messages') || '[]');
      existing.push({
        ...formData,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('fitness_fuel_contact_messages', JSON.stringify(existing));

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Left Column: Gym Contact Details & Interactive WhatsApp & Maps */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#E50914] font-bold">
            Connect With The Gym
          </span>
          <h3 className="font-heading text-3xl sm:text-4xl text-white mt-1">
            WE ARE HERE TO HELP YOU LEVEL UP
          </h3>
          <p className="text-sm text-[#A3A3A3] mt-2 leading-relaxed">
            Have questions about equipment, trainer availability, membership pricing, or personal trial passes? Drop us a line or chat directly on WhatsApp.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="space-y-3">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#E50914]/20 text-[#E50914] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Gym Location</p>
              <p className="text-xs text-[#888888] leading-relaxed mt-0.5">
                {GYM_CONFIG.address}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#E50914]/20 text-[#E50914] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Direct Phone</p>
              <a href={`tel:${GYM_CONFIG.phone}`} className="text-xs text-[#E50914] hover:underline">
                {GYM_CONFIG.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#E50914]/20 text-[#E50914] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Official Email</p>
              <a href={`mailto:${GYM_CONFIG.email}`} className="text-xs text-[#A3A3A3] hover:text-white">
                {GYM_CONFIG.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#E50914]/20 text-[#E50914] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Hours of Operation</p>
              <p className="text-xs text-[#888888]">
                Mon-Sat: {GYM_CONFIG.openingHours.weekdays} | Sun: {GYM_CONFIG.openingHours.sunday}
              </p>
            </div>
          </div>
        </div>

        {/* Instant WhatsApp Action for Gym */}
        <div className="pt-2">
          <a
            href={`https://wa.me/${GYM_CONFIG.social.whatsappNumber}?text=Hi%20Fitness%20Fuel,%20I%20would%20like%20to%20enquire%20about%20gym%20membership%20and%20facilities.`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 px-6 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30 text-emerald-300 font-semibold text-sm flex items-center justify-center gap-3 transition-colors shadow-lg shadow-emerald-950/20"
          >
            <MessageSquare className="w-5 h-5 text-[#25D366]" />
            <span>Chat on WhatsApp Directly</span>
          </a>
        </div>

        {/* Map Embed Placeholder */}
        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#161616] h-48 flex items-center justify-center text-center p-4">
          <div className="absolute inset-0 bg-cover bg-center opacity-30 filter grayscale" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80')" }} />
          <div className="relative z-10 space-y-1">
            <MapPin className="w-8 h-8 text-[#E50914] mx-auto animate-bounce" />
            <p className="text-white font-medium text-sm">Interactive Map Embed Placeholder</p>
            <p className="text-xs text-[#888888]">
              Ready for Google Maps API key / embed coordinates provided by gym owner
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Contact Form */}
      <div className="lg:col-span-7 bg-[#101010] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        <h4 className="font-heading text-2xl text-white tracking-wide mb-1">
          Send An Enquiry Message
        </h4>
        <p className="text-xs text-[#888888] mb-6">
          Fill out the form below. We usually reply within 24 hours.
        </p>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h5 className="font-heading text-2xl text-white tracking-wide">
              Message Recorded!
            </h5>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-[#B8B8B8] space-y-2 text-left">
              <p className="text-white font-medium">
                Thank you for reaching out, {formData.name}.
              </p>
              <p>
                In this live demo, your enquiry has been captured locally. Once connected to the gym owner's email/WhatsApp webhook in production, messages are routed directly to the front-desk console.
              </p>
            </div>
            <button
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  name: '',
                  phone: '',
                  email: '',
                  interestedIn: 'Strength & Hypertrophy Training',
                  message: '',
                });
              }}
              className="px-6 py-2.5 bg-[#E50914] text-white font-semibold text-xs rounded-lg hover:bg-[#ff1a26] transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aryan Mehra"
                  className="w-full bg-[#181818] border border-white/10 focus:border-[#E50914] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#181818] border border-white/10 focus:border-[#E50914] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="aryan@example.com"
                  className="w-full bg-[#181818] border border-white/10 focus:border-[#E50914] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-1.5">
                  Primary Interest
                </label>
                <select
                  name="interestedIn"
                  value={formData.interestedIn}
                  onChange={handleChange}
                  className="w-full bg-[#181818] border border-white/10 focus:border-[#E50914] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                >
                  <option value="Strength & Hypertrophy Training">Strength &amp; Hypertrophy Training</option>
                  <option value="General Gym Access & Cardio">General Gym Access &amp; Cardio</option>
                  <option value="Personal Coaching 1-on-1">Personal Coaching 1-on-1</option>
                  <option value="Weight Loss & Transformation">Weight Loss &amp; Transformation</option>
                  <option value="Complimentary Trial Session">Complimentary Trial Session</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-1.5">
                Your Message *
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what you want to achieve, questions regarding facilities, or preferred timing..."
                className="w-full bg-[#181818] border border-white/10 focus:border-[#E50914] rounded-lg p-3 text-white text-sm focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#E50914] hover:bg-[#ff1a26] text-white font-semibold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SEND MESSAGE NOW</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

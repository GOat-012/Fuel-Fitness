import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Send, Dumbbell, Calendar, Clock, Target } from 'lucide-react';
import { EnquiryFormData } from '../types';
import { MEMBERSHIP_PLANS } from '../services/gymData';

interface MembershipEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
  billingPeriod?: 'monthly' | 'yearly';
}

export const MembershipEnquiryModal: React.FC<MembershipEnquiryModalProps> = ({
  isOpen,
  onClose,
  initialPlan = 'pro',
  billingPeriod = 'monthly',
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    phone: '',
    email: '',
    selectedPlan: initialPlan,
    startDate: new Date().toISOString().split('T')[0],
    fitnessGoal: 'Muscle Building & Hypertrophy',
    preferredTime: 'Morning (6:00 AM – 9:00 AM)',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialPlan) {
      setFormData((prev) => ({ ...prev, selectedPlan: initialPlan }));
    }
  }, [initialPlan]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const phoneRegex = /^[+]?[\d\s-]{8,15}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      setErrorMessage('Please provide a valid phone number (8-15 digits).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setLoading(true);

    // Simulate submission
    setTimeout(() => {
      // Save locally to localStorage demo array
      const existing = JSON.parse(localStorage.getItem('fitness_fuel_enquiries') || '[]');
      existing.push({
        ...formData,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('fitness_fuel_enquiries', JSON.stringify(existing));

      setLoading(false);
      setSuccess(true);
    }, 700);
  };

  const selectedPlanData = MEMBERSHIP_PLANS.find(
    (p) => p.id === formData.selectedPlan.toLowerCase()
  ) || MEMBERSHIP_PLANS[1];

  const currentPrice =
    billingPeriod === 'yearly'
      ? `₹${selectedPlanData.yearlyPrice.toLocaleString('en-IN')}/year`
      : `₹${selectedPlanData.monthlyPrice.toLocaleString('en-IN')}/month`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Membership Enquiry Modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
    >
      <div className="bg-[#121212] border border-white/10 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#161616]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E50914]/20 border border-[#E50914]/30 flex items-center justify-center text-[#E50914]">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl text-white tracking-wide">
                Start Your Fitness Journey
              </h3>
              <p className="text-xs text-[#888888]">
                Enquire for {selectedPlanData.name} Tier &bull; {currentPrice}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#888888] hover:text-white transition-colors"
            aria-label="Close Enquiry Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-heading text-2xl text-white tracking-wide">
              Thank you for choosing Fitness Fuel!
            </h4>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left space-y-2 text-xs text-[#B8B8B8]">
              <p className="text-white font-medium text-sm">
                Your membership enquiry has been recorded in this demo.
              </p>
              <p>
                <strong>Selected Tier:</strong> {selectedPlanData.name} ({currentPrice})
              </p>
              <p>
                <strong>Applicant:</strong> {formData.fullName} ({formData.phone})
              </p>
              <p className="text-emerald-400 pt-1">
                Notice: In the live gym deployment, this instantly triggers an automated WhatsApp message &amp; email notification to the gym manager.
              </p>
            </div>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-[#E50914] text-white font-semibold text-xs rounded-lg hover:bg-[#ff1a26] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Selected Plan Highlight */}
            <div className="p-3 rounded-xl bg-[#1A1A1A] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A3A3A3]">
                  Selected Plan
                </span>
                <div className="font-heading text-lg text-white font-bold tracking-wide">
                  {selectedPlanData.name} TIER
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#E50914] font-semibold">{currentPrice}</span>
                <div className="text-[10px] text-[#888888]">
                  Billing: {billingPeriod}
                </div>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#E50914] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
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
                  className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#E50914] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

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
                  placeholder="rahul@example.com"
                  className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#E50914] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-1.5">
                  Change Tier
                </label>
                <select
                  name="selectedPlan"
                  value={formData.selectedPlan}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#E50914] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                >
                  <option value="basic">BASIC (₹999/mo)</option>
                  <option value="pro">PRO (₹1,499/mo) &ndash; Recommended</option>
                  <option value="elite">ELITE (₹2,499/mo) &ndash; VIP</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Preferred Start Date</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#E50914] rounded-lg px-3.5 py-2 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Training Hours</span>
                </label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#E50914] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                >
                  <option value="Morning (6:00 AM – 9:00 AM)">Morning (6:00 AM – 9:00 AM)</option>
                  <option value="Midday (11:00 AM – 3:00 PM)">Midday (11:00 AM – 3:00 PM)</option>
                  <option value="Evening (5:00 PM – 9:00 PM)">Evening Peak (5:00 PM – 9:00 PM)</option>
                  <option value="Night (9:00 PM – 11:00 PM)">Late Night (9:00 PM – 11:00 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Primary Fitness Objective</span>
              </label>
              <select
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#E50914] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
              >
                <option value="Muscle Building & Hypertrophy">Muscle Building & Hypertrophy</option>
                <option value="Fat Loss & Body Recomposition">Fat Loss & Body Recomposition</option>
                <option value="Powerlifting & Pure Strength">Powerlifting & Pure Strength</option>
                <option value="Cardiovascular Endurance & Stamina">Cardiovascular Endurance & Stamina</option>
                <option value="Athletic Conditioning & Agility">Athletic Conditioning & Agility</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-1.5">
                Additional Questions or Requirements
              </label>
              <textarea
                name="message"
                rows={2}
                value={formData.message}
                onChange={handleChange}
                placeholder="Ask about trainer availability, locker facilities, parking, or diet guidance..."
                className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#E50914] rounded-lg p-3 text-white text-sm focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#888888] hover:text-white font-medium text-xs tracking-wider transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#ff1a26] text-white font-semibold text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(229,9,20,0.4)] disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <span>Recording...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Enquiry</span>
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

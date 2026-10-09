import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  Zap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Flame,
  ChevronRight,
  Calendar,
  CreditCard,
  Crown,
} from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { MembershipEnquiryModal } from '../components/MembershipEnquiryModal';
import { SeoHelmet } from '../components/SeoHelmet';
import { MEMBERSHIP_PLANS } from '../services/gymData';

export const SubscriptionsPage: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<string>('pro');
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);

  const handleOpenPlanModal = (planId: string) => {
    setSelectedPlanForModal(planId);
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-24 pb-20">
      <SeoHelmet
        title="Fitness Fuel Membership Plans & Gym Pricing"
        description="Explore Fitness Fuel membership plans, compare gym packages, and enquire about a fitness membership that suits your goals and budget."
        canonicalPath="/subscriptions"
      />

      {/* ======================================================== */}
      {/* 1. MEMBERSHIP HERO */}
      {/* ======================================================== */}
      <section className="relative py-16 sm:py-24 overflow-hidden border-b border-white/10">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=2000&q=80"
            alt="Fitness Fuel Training Facility Racks"
            className="w-full h-full object-cover object-center filter brightness-[0.20] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-[#080808]/70 to-[#080808]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E50914]/15 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav className="inline-flex items-center gap-2 text-xs text-[#888888] mb-6 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#E50914] font-medium">Membership Plans</span>
          </nav>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95] uppercase">
            CHOOSE YOUR <span className="text-[#E50914]">PLAN.</span> <br />
            UNLOCK YOUR <span className="text-white">POTENTIAL.</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-[#B8B8B8] max-w-2xl mx-auto leading-relaxed">
            Find the membership that matches your goals, your schedule, and your commitment to becoming stronger.
          </p>

          {/* ======================================================== */}
          {/* 2. BILLING PERIOD TOGGLE SWITCH */}
          {/* ======================================================== */}
          <div className="mt-12 inline-flex items-center p-1.5 rounded-xl bg-[#141414] border border-white/10 shadow-2xl">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                billingPeriod === 'monthly'
                  ? 'bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.5)]'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                billingPeriod === 'yearly'
                  ? 'bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.5)]'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                SAVE ~17%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. MEMBERSHIP CARDS (3D TILT & INTERACTION) */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {MEMBERSHIP_PLANS.map((plan) => {
              const isPro = plan.isPopular;
              const price = billingPeriod === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
              const periodSuffix = billingPeriod === 'yearly' ? '/year' : '/month';

              return (
                <TiltCard
                  key={plan.id}
                  highlightBorder={isPro}
                  className={`h-full ${isPro ? 'lg:-translate-y-4' : ''}`}
                >
                  <div className="p-8 sm:p-9 h-full flex flex-col justify-between relative overflow-hidden">
                    {/* Most Popular Badge */}
                    {isPro && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-[#E50914] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-lg flex items-center gap-1.5">
                          <Crown className="w-3.5 h-3.5" />
                          <span>{plan.badge || 'MOST POPULAR'}</span>
                        </div>
                      </div>
                    )}

                    {plan.id === 'elite' && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-white/10 text-[#E50914] border-b border-l border-[#E50914]/30 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{plan.badge}</span>
                        </div>
                      </div>
                    )}

                    {/* Card Top: Plan Name & Pricing */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-heading text-2xl text-white font-bold tracking-wider">
                          {plan.name}
                        </span>
                      </div>

                      <p className="text-xs text-[#888888] min-h-[36px] leading-relaxed mb-6">
                        {plan.description}
                      </p>

                      {/* Dynamic Price Display */}
                      <div className="py-6 border-y border-white/10 my-4">
                        <div className="flex items-baseline gap-1">
                          <span className="font-heading text-5xl sm:text-6xl font-bold text-white tracking-tight">
                            ₹{price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs uppercase tracking-wider text-[#888888]">
                            {periodSuffix}
                          </span>
                        </div>

                        {billingPeriod === 'yearly' && (
                          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                            <Check className="w-3 h-3" />
                            <span>Includes annual discount &bull; Billed annually</span>
                          </div>
                        )}
                      </div>

                      {/* Features List */}
                      <div className="space-y-3.5 mt-6">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#888888] block">
                          Included Privileges:
                        </span>
                        {plan.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#CCCCCC]">
                            <div className="w-4 h-4 rounded-full bg-[#E50914]/20 text-[#E50914] flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button: Reusable Modal Trigger */}
                    <div className="mt-8 pt-6 border-t border-white/5">
                      <button
                        onClick={() => handleOpenPlanModal(plan.id)}
                        className={`w-full py-4 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                          isPro
                            ? 'bg-[#E50914] hover:bg-[#ff1a26] text-white shadow-[0_0_25px_rgba(229,9,20,0.4)]'
                            : 'bg-white/10 hover:bg-white/20 text-white hover:text-white'
                        }`}
                      >
                        <span>Choose {plan.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>

          <div className="mt-12 text-center text-xs text-[#777777] max-w-xl mx-auto">
            * All prices displayed are illustrative sample values for owner presentation. No lock-in contracts; all plans include standard facility amenities.
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 relative bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#E50914] font-bold">
              Got Questions?
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl text-white font-bold tracking-tight mt-2 leading-[0.95]">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="mt-3 text-sm text-[#888888]">
              Everything you need to know about joining Fitness Fuel and our membership terms.
            </p>
          </div>

          <FAQAccordion />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. FINAL CALL TO ACTION */}
      {/* ======================================================== */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-t from-[#050505] to-[#0e0e0e] border-t border-white/10 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#E50914]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-heading text-4xl sm:text-6xl text-white font-bold tracking-tight uppercase">
            YOUR NEXT LEVEL <span className="text-[#E50914]">STARTS HERE.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#B8B8B8]">
            Take the first step toward a stronger, healthier you. Join the Fitness Fuel community today.
          </p>

          <div className="pt-4">
            <button
              onClick={() => handleOpenPlanModal('pro')}
              className="px-10 py-4 rounded-xl bg-[#E50914] hover:bg-[#ff1a26] text-white font-semibold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(229,9,20,0.5)] hover:shadow-[0_0_40px_rgba(229,9,20,0.8)] transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <span>ENQUIRE NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Membership Enquiry Modal */}
      <MembershipEnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        initialPlan={selectedPlanForModal}
        billingPeriod={billingPeriod}
      />
    </div>
  );
};

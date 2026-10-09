import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, ExternalLink, MessageSquare } from 'lucide-react';
import { GYM_CONFIG } from '../services/gymData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-[#B8B8B8] border-t border-white/10 relative overflow-hidden">
      {/* Decorative Top Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#E50914] to-[#990000] flex items-center justify-center text-white shadow-[0_0_12px_rgba(229,9,20,0.5)]">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-2xl tracking-wider text-white font-bold">
                FITNESS<span className="text-[#E50914] ml-1">FUEL</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#999999]">
              Forging strength, discipline, and athletic progress. Equipped with Olympic barbells, calibrated plates, and dedicated personal coaches.
            </p>
            {/* Gym Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={GYM_CONFIG.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-[#E50914] hover:border-[#E50914]/50 transition-colors"
                aria-label="Fitness Fuel Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={GYM_CONFIG.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-[#E50914] hover:border-[#E50914]/50 transition-colors"
                aria-label="Fitness Fuel Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={GYM_CONFIG.social.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-[#E50914] hover:border-[#E50914]/50 transition-colors"
                aria-label="Fitness Fuel YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg tracking-wider text-white uppercase border-l-2 border-[#E50914] pl-3">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#E50914] transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-[#E50914] transition-colors">
                  About the Facility
                </a>
              </li>
              <li>
                <a href="/#gallery" className="hover:text-[#E50914] transition-colors">
                  Gym Photo Gallery
                </a>
              </li>
              <li>
                <a href="/#reviews" className="hover:text-[#E50914] transition-colors">
                  Member Experiences &amp; Ratings
                </a>
              </li>
              <li>
                <Link to="/subscriptions" className="hover:text-[#E50914] transition-colors font-medium text-white">
                  Membership Plans &amp; Pricing
                </Link>
              </li>
              <li>
                <a href="/#contact" className="hover:text-[#E50914] transition-colors">
                  Gym Contact &amp; Location
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Gym Operating Hours */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg tracking-wider text-white uppercase border-l-2 border-[#E50914] pl-3">
              Operating Hours
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Monday &ndash; Friday</p>
                  <p className="text-xs text-[#888888]">{GYM_CONFIG.openingHours.weekdays}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Saturday</p>
                  <p className="text-xs text-[#888888]">{GYM_CONFIG.openingHours.saturday}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Sunday</p>
                  <p className="text-xs text-[#888888]">{GYM_CONFIG.openingHours.sunday}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Gym Business Contact (Editable by Gym Owner) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg tracking-wider text-white uppercase border-l-2 border-[#E50914] pl-3">
                Gym Contact Info
              </h3>
              <span className="text-[10px] text-[#888888] bg-white/5 px-2 py-0.5 rounded border border-white/10">
                Editable
              </span>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E50914] shrink-0 mt-1" />
                <span className="text-xs leading-relaxed text-[#A3A3A3]">{GYM_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E50914] shrink-0" />
                <span className="text-xs text-white">{GYM_CONFIG.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E50914] shrink-0" />
                <span className="text-xs text-white">{GYM_CONFIG.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#888888]">
          <div>
            &copy; {new Date().getFullYear()} Fitness Fuel Club. All rights reserved. Professional Gym Website Showcase.
          </div>

          {/* DEVELOPER BRANDING & CONTACT SECTION */}
          <div className="bg-[#101010] border border-white/10 rounded-xl px-4 py-3 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 shadow-inner">
            <div className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
              <span className="font-medium text-xs">
                Website Designed &amp; Developed by <strong className="text-[#E50914] font-semibold">{GYM_CONFIG.developer.name}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <a
                href={GYM_CONFIG.developer.phoneLink}
                className="text-[#B8B8B8] hover:text-white flex items-center gap-1 transition-colors hover:underline"
                title="Call Developer Gautam"
              >
                <Phone className="w-3 h-3 text-[#E50914]" />
                <span>{GYM_CONFIG.developer.phone}</span>
              </a>
              <span className="text-white/20">&bull;</span>
              <a
                href={GYM_CONFIG.developer.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="text-[#B8B8B8] hover:text-emerald-400 flex items-center gap-1 transition-colors hover:underline"
                title="WhatsApp Developer Gautam"
              >
                <MessageSquare className="w-3 h-3 text-emerald-500" />
                <span>WhatsApp</span>
              </a>
              <span className="text-white/20">&bull;</span>
              <a
                href={GYM_CONFIG.developer.emailLink}
                className="text-[#B8B8B8] hover:text-white flex items-center gap-1 transition-colors hover:underline"
                title="Email Developer Gautam"
              >
                <Mail className="w-3 h-3 text-[#E50914]" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Developer Pitch Note */}
        <div className="text-center mt-4 text-[11px] text-[#666666]">
          Need a high-performance, custom website for your gym or business? Get in touch with Gautam via WhatsApp or phone.
        </div>
      </div>
    </footer>
  );
};

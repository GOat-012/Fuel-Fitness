import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Dumbbell, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isSubscriptionsPage = location.pathname === '/subscriptions';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080808]/95 backdrop-blur-md py-3 border-b border-white/10 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914] rounded-lg"
            aria-label="Fitness Fuel Home"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E50914] to-[#990000] flex items-center justify-center text-white shadow-[0_0_15px_rgba(229,9,20,0.5)] group-hover:scale-105 transition-transform">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl sm:text-3xl tracking-wider leading-none text-white font-bold group-hover:text-red-50 transition-colors">
                FITNESS<span className="text-[#E50914] ml-1">FUEL</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A3A3A3] font-medium">
                Strength &bull; Conditioning
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            <Link
              to="/"
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-[#E50914] ${
                location.pathname === '/' && !location.hash ? 'text-white' : 'text-[#B8B8B8]'
              }`}
            >
              Home
            </Link>
            <button
              onClick={() => handleNavClick('about')}
              className="text-sm font-semibold tracking-wide text-[#B8B8B8] hover:text-[#E50914] transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="text-sm font-semibold tracking-wide text-[#B8B8B8] hover:text-[#E50914] transition-colors cursor-pointer"
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="text-sm font-semibold tracking-wide text-[#B8B8B8] hover:text-[#E50914] transition-colors cursor-pointer"
            >
              Reviews
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-sm font-semibold tracking-wide text-[#B8B8B8] hover:text-[#E50914] transition-colors cursor-pointer"
            >
              Contact
            </button>
            <Link
              to="/subscriptions"
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-[#E50914] ${
                isSubscriptionsPage ? 'text-[#E50914]' : 'text-[#B8B8B8]'
              }`}
            >
              Membership
            </Link>
          </nav>

          {/* Right Action: Red View Plans Button */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/subscriptions"
              className="relative group overflow-hidden px-5 py-2.5 rounded-lg bg-[#E50914] text-white font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_25px_rgba(229,9,20,0.7)] transition-all duration-300 hover:bg-[#ff1a26] flex items-center gap-2"
            >
              <span>View Plans</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/subscriptions"
              className="sm:hidden px-3 py-1.5 rounded-md bg-[#E50914] text-white text-xs font-bold"
            >
              Plans
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:text-[#E50914] hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0d0d] border-b border-white/10 px-6 py-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-white hover:text-[#E50914] transition-colors py-2 border-b border-white/5"
            >
              Home
            </Link>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left text-base font-semibold text-[#B8B8B8] hover:text-[#E50914] transition-colors py-2 border-b border-white/5"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="text-left text-base font-semibold text-[#B8B8B8] hover:text-[#E50914] transition-colors py-2 border-b border-white/5"
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="text-left text-base font-semibold text-[#B8B8B8] hover:text-[#E50914] transition-colors py-2 border-b border-white/5"
            >
              Reviews
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left text-base font-semibold text-[#B8B8B8] hover:text-[#E50914] transition-colors py-2 border-b border-white/5"
            >
              Contact
            </button>
            <Link
              to="/subscriptions"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#E50914] transition-colors py-2 border-b border-white/5"
            >
              Membership Plans
            </Link>
            <div className="pt-2">
              <Link
                to="/subscriptions"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-lg bg-[#E50914] text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg"
              >
                <span>EXPLORE MEMBERSHIP PLANS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

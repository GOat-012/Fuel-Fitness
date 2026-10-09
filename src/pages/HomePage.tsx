import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Dumbbell,
  ArrowRight,
  Flame,
  Activity,
  Award,
  Compass,
  Users,
  Star,
  ChevronDown,
  Camera,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { ThreeDHeroCanvas } from '../components/ThreeDHeroCanvas';
import { TiltCard } from '../components/TiltCard';
import { CartoonAvatar } from '../components/CartoonAvatar';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { GalleryManagerModal } from '../components/GalleryManagerModal';
import { WriteReviewModal } from '../components/WriteReviewModal';
import { ContactForm } from '../components/ContactForm';
import { SeoHelmet } from '../components/SeoHelmet';
import {
  GYM_CONFIG,
  INITIAL_GALLERY_ITEMS,
  INITIAL_REVIEWS,
  GYM_STATS,
  ABOUT_FEATURES,
} from '../services/gymData';
import {
  getCustomGalleryItems,
  saveCustomGalleryItem,
  deleteCustomGalleryItem,
  getCustomReviews,
  saveCustomReview,
  deleteCustomReview,
} from '../services/db';
import { GalleryItem, ReviewItem } from '../types';

export const HomePage: React.FC = () => {
  // Gallery state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isGalleryManagerOpen, setIsGalleryManagerOpen] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [showModeratorMode, setShowModeratorMode] = useState(false);

  // Load custom gallery items and reviews from IndexedDB on mount
  useEffect(() => {
    async function loadData() {
      try {
        const customItems = await getCustomGalleryItems();
        if (customItems.length > 0) {
          // Merge custom items with initial
          setGalleryItems([...customItems, ...INITIAL_GALLERY_ITEMS]);
        }

        const customRevs = await getCustomReviews();
        if (customRevs.length > 0) {
          setReviews([...customRevs, ...INITIAL_REVIEWS]);
        }
      } catch (err) {
        console.error('Failed loading local database items', err);
      }
    }
    loadData();
  }, []);

  // Filtered gallery items
  const filteredGallery = useMemo(() => {
    if (selectedGalleryCategory === 'all') return galleryItems;
    return galleryItems.filter((item) => item.category === selectedGalleryCategory);
  }, [galleryItems, selectedGalleryCategory]);

  // Gallery handlers
  const handleAddGalleryItems = async (newItems: GalleryItem[]) => {
    for (const item of newItems) {
      await saveCustomGalleryItem(item);
    }
    setGalleryItems((prev) => [...newItems, ...prev]);
  };

  const handleDeleteGalleryItem = async (id: string) => {
    await deleteCustomGalleryItem(id);
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateGalleryTitle = (id: string, newTitle: string) => {
    setGalleryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: newTitle } : item))
    );
  };

  // Reviews handlers
  const handleAddReview = async (newReview: ReviewItem) => {
    await saveCustomReview(newReview);
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleDeleteReview = async (id: string) => {
    await deleteCustomReview(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // Calculated rating metrics
  const { averageRating, totalCount, ratingDistribution } = useMemo(() => {
    if (reviews.length === 0) {
      return { averageRating: 5.0, totalCount: 0, ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    }
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = Number((sum / reviews.length).toFixed(1));
    const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      dist[r.rating] = (dist[r.rating] || 0) + 1;
    });
    return { averageRating: avg, totalCount: reviews.length, ratingDistribution: dist };
  }, [reviews]);

  const getFeatureIcon = (name: string) => {
    switch (name) {
      case 'Dumbbell':
        return <Dumbbell className="w-6 h-6 text-[#E50914]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#E50914]" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-[#E50914]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#E50914]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#E50914]" />;
      case 'Users':
      default:
        return <Users className="w-6 h-6 text-[#E50914]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SeoHelmet
        title="Fitness Fuel | Gym, Strength Training & Fitness"
        description="Explore Fitness Fuel, a fitness destination for strength training, weight management, workout guidance, and a motivating gym environment. View our gallery and member reviews."
        canonicalPath="/"
      />

      {/* ======================================================== */}
      {/* 1. CINEMATIC 3D HERO SECTION */}
      {/* ======================================================== */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
        {/* Layer 1: Background Realistic Gym Image with Deep Atmospheric Grading */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85"
            alt="Fitness Fuel Training Floor Background"
            className="w-full h-full object-cover object-center filter brightness-[0.22] contrast-125 scale-105 transform motion-safe:animate-pulse duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-[#080808]/50 to-[#080808]/90" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#E50914]/15 rounded-full blur-[140px] pointer-events-none" />
        </div>

        {/* Layer 2: Interactive Three.js 3D Canvas Visual with Parallax Motion */}
        <ThreeDHeroCanvas />

        {/* Layer 3: Hero Foreground Content & Athletic Typography */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
          {/* Subtle Top Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#B8B8B8]">
              ELITE ATHLETIC FACILITY &bull; NOW ACCEPTING MEMBERS
            </span>
          </div>

          {/* Primary Main Headline */}
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-[0.92] uppercase drop-shadow-2xl">
            FUEL YOUR <span className="text-[#E50914] drop-shadow-[0_0_35px_rgba(229,9,20,0.6)]">BODY.</span>
            <br />
            FORGE YOUR <span className="text-white">LEGACY.</span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-base sm:text-xl text-[#B8B8B8] max-w-2xl mx-auto font-normal leading-relaxed">
            {GYM_CONFIG.heroSubheadline}
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="#about"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm tracking-wider uppercase border border-white/15 transition-all duration-300 hover:border-white/30 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>EXPLORE THE GYM</span>
              <ChevronDown className="w-4 h-4" />
            </a>

            <Link
              to="/subscriptions"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#E50914] hover:bg-[#ff1a26] text-white font-semibold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(229,9,20,0.45)] hover:shadow-[0_0_40px_rgba(229,9,20,0.7)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>VIEW MEMBERSHIP PLANS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Floating Pillars Badge */}
          <div className="mt-14 pt-8 border-t border-white/10 max-w-2xl mx-auto flex items-center justify-around text-xs sm:text-sm uppercase tracking-widest text-[#888888]">
            <div className="flex items-center gap-2">
              <span className="text-[#E50914] font-bold">01</span>
              <span className="text-white font-medium">STRENGTH</span>
            </div>
            <span className="text-white/20">&bull;</span>
            <div className="flex items-center gap-2">
              <span className="text-[#E50914] font-bold">02</span>
              <span className="text-white font-medium">DISCIPLINE</span>
            </div>
            <span className="text-white/20">&bull;</span>
            <div className="flex items-center gap-2">
              <span className="text-[#E50914] font-bold">03</span>
              <span className="text-white font-medium">RESULTS</span>
            </div>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <a
          href="#about"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-[#888888] hover:text-[#E50914] transition-colors group cursor-pointer"
          aria-label="Scroll to About section"
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold mb-1">SCROLL</span>
          <div className="w-5 h-9 rounded-full border-2 border-white/20 group-hover:border-[#E50914] flex items-start justify-center p-1">
            <div className="w-1.5 h-2.5 rounded-full bg-[#E50914] animate-bounce" />
          </div>
        </a>
      </section>

      {/* ======================================================== */}
      {/* 2. ABOUT FITNESS FUEL */}
      {/* ======================================================== */}
      <section id="about" className="py-24 sm:py-32 relative border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="text-xs uppercase tracking-widest text-[#E50914] font-bold">
              The Philosophy
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight mt-2 leading-[0.95]">
              MORE THAN A GYM. <br />
              <span className="text-[#E50914]">A STRONGER WAY OF LIFE.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#B8B8B8] leading-relaxed">
              Fitness Fuel is built around strength, consistency, and personal progress. Whether your goal is to build muscle, improve endurance, or develop a healthier lifestyle, our training environment is designed to help you move forward with confidence.
            </p>
          </div>

          {/* 6 Feature Cards with 3D Tilt */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ABOUT_FEATURES.map((feat) => (
              <TiltCard key={feat.id} className="h-full">
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        {getFeatureIcon(feat.icon)}
                      </div>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#888888]">
                        {feat.kicker}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl text-white tracking-wide mb-3">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-[#A3A3A3] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-[#E50914] group-hover:translate-x-1 transition-transform">
                    <span>Performance Standard</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. GYM HIGHLIGHTS AND ANIMATED STATISTICS */}
      {/* ======================================================== */}
      <section className="py-20 bg-gradient-to-b from-[#0e0e0e] to-[#080808] border-y border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#E50914]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#E50914]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {GYM_STATS.map((stat, idx) => (
              <div key={idx} className="pt-6 lg:pt-0 lg:px-8 text-center first:pt-0">
                <div className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight flex items-baseline justify-center">
                  <span>{stat.value}</span>
                  <span className="text-[#E50914] ml-0.5">{stat.suffix}</span>
                </div>
                <div className="text-sm font-semibold tracking-wider text-[#B8B8B8] uppercase mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[#666666] mt-1">
                  Verified Facility Metric
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 text-[11px] text-[#666666]">
            * Note for Gym Owner: Highlight metrics are fully customizable for your exact facility.
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. GYM GALLERY — OWNER PHOTO MANAGEMENT */}
      {/* ======================================================== */}
      <section id="gallery" className="py-24 sm:py-32 relative bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#E50914] font-bold">
                Visual Experience
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight mt-2 leading-[0.95]">
                THE TRAINING GROUND
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#B8B8B8] max-w-xl">
                Experience our Olympic-standard strength floor, free weights, high-grade cardio suite, and athletic training zone.
              </p>
            </div>

            {/* Owner Management Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsGalleryManagerOpen(true)}
                className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#E50914]/40 text-white text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-all shadow-md group"
                title="Open Gym Owner Photo Upload & Management"
              >
                <Camera className="w-4 h-4 text-[#E50914] group-hover:scale-110 transition-transform" />
                <span>Manage Gallery (Owner)</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-semibold scrollbar-none">
            {['all', 'strength', 'cardio', 'training', 'interior', 'equipment'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCategory(cat)}
                className={`px-4 py-2 rounded-lg transition-colors uppercase tracking-wider shrink-0 cursor-pointer ${
                  selectedGalleryCategory === cat
                    ? 'bg-[#E50914] text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]'
                    : 'bg-white/5 text-[#888888] hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-[#121212] border border-white/10 hover:border-[#E50914]/50 cursor-pointer transition-all duration-300 hover:shadow-[0_10px_30px_rgba(229,9,20,0.25)]"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <span className="text-[10px] uppercase tracking-widest text-[#E50914] font-semibold">
                    {item.category}
                  </span>
                  <h4 className="text-white font-medium text-sm sm:text-base leading-snug line-clamp-2 mt-0.5">
                    {item.title}
                  </h4>
                </div>

                {item.isCustom && (
                  <span className="absolute top-3 right-3 bg-[#E50914] text-white text-[9px] uppercase font-bold px-2 py-0.5 rounded shadow">
                    Owner Upload
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. CUSTOMER REVIEWS & CARTOON AVATARS */}
      {/* ======================================================== */}
      <section id="reviews" className="py-24 sm:py-32 relative bg-[#0c0c0c] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Metrics */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#E50914] font-bold">
                Member Testimonials
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight mt-2 leading-[0.95]">
                REAL EXPERIENCES. <br />
                <span className="text-[#E50914]">REAL PROGRESS.</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#B8B8B8] max-w-xl">
                Every fitness journey is different. Discover what members have to say about their training experience.
              </p>
            </div>

            {/* Rating Summary Box */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
              <div className="text-center sm:text-left sm:border-r border-white/10 sm:pr-6">
                <div className="font-heading text-5xl font-bold text-white tracking-tight leading-none">
                  {averageRating}
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1 text-[#E50914] my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(averageRating)
                          ? 'fill-[#E50914] text-[#E50914]'
                          : 'text-[#444444]'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-xs text-[#888888]">
                  Based on {totalCount} verified reviews
                </div>
              </div>

              {/* Action: Write a Review */}
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsWriteReviewOpen(true)}
                  className="px-6 py-3 rounded-xl bg-[#E50914] hover:bg-[#ff1a26] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write a Review</span>
                </button>
                <button
                  onClick={() => setShowModeratorMode(!showModeratorMode)}
                  className="text-[11px] text-[#777777] hover:text-[#B8B8B8] text-center"
                >
                  {showModeratorMode ? 'Hide Demo Moderation' : 'Demo Moderation'}
                </button>
              </div>
            </div>
          </div>

          {/* Review Cards Grid with Cartoon Avatars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#141414] border border-white/10 hover:border-[#E50914]/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_rgba(229,9,20,0.15)] relative group"
              >
                <div>
                  {/* Top: Cartoon Avatar + Name + Rating */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <CartoonAvatar avatarId={rev.avatarId} size="md" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-white font-semibold text-base leading-tight truncate">
                        {rev.name}
                      </h4>
                      <p className="text-xs text-[#888888] truncate mt-0.5">
                        {rev.role || 'Fitness Fuel Member'}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-[#E50914]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'fill-[#E50914] text-[#E50914]'
                                : 'text-[#444444]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-[#CCCCCC] leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Bottom Date & Badges */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#777777]">
                  <span>{rev.date}</span>
                  {showModeratorMode && (
                    <button
                      onClick={() => handleDeleteReview(rev.id)}
                      className="text-red-400 hover:text-red-300 p-1 flex items-center gap-1"
                      title="Delete Review (Demo Moderation)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. CONTACT & LOCATION SECTION */}
      {/* ======================================================== */}
      <section id="contact" className="py-24 sm:py-32 relative bg-[#080808] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* Lightbox Modal */}
      <GalleryLightbox
        items={filteredGallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

      {/* Owner Gallery Manager Modal */}
      <GalleryManagerModal
        isOpen={isGalleryManagerOpen}
        onClose={() => setIsGalleryManagerOpen(false)}
        items={galleryItems}
        onAddItems={handleAddGalleryItems}
        onDeleteItem={handleDeleteGalleryItem}
        onUpdateItemTitle={handleUpdateGalleryTitle}
      />

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmitReview={handleAddReview}
      />
    </div>
  );
};

import { GalleryItem, GymConfig, MembershipPlan, ReviewItem } from '../types';

export const GYM_CONFIG: GymConfig = {
  name: 'Fitness Fuel',
  tagline: 'Fuel Your Body. Forge Your Legacy.',
  heroHeadline: 'FUEL YOUR BODY. FORGE YOUR LEGACY.',
  heroSubheadline:
    'Discover a stronger version of yourself at Fitness Fuel. Train with purpose, build strength, and turn your fitness goals into lasting results.',
  // Gym-specific contact info is fully editable and marked as customizable for the gym owner
  address: 'Plot 42, Sector 18, Commercial Hub, Main Boulevard, New Delhi, India',
  phone: '+91 98765 43210 (Demo Contact)',
  email: 'info@fitnessfuelgym.com',
  openingHours: {
    weekdays: '5:30 AM – 10:30 PM',
    saturday: '6:00 AM – 10:00 PM',
    sunday: '7:00 AM – 2:00 PM',
  },
  social: {
    instagram: 'https://instagram.com/fitnessfuelgym',
    facebook: 'https://facebook.com/fitnessfuelgym',
    youtube: 'https://youtube.com/@fitnessfuelgym',
    whatsappNumber: '919876543210',
  },
  // Developer branding as instructed
  developer: {
    name: 'Gautam',
    phone: '9667308920',
    email: 'raghavgautam980@gmail.com',
    whatsappLink: 'https://wa.me/919667308920',
    phoneLink: 'tel:9667308920',
    emailLink: 'mailto:raghavgautam980@gmail.com',
  },
};

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    title: 'Olympic Free Weights & Dumbbell Zone',
    category: 'strength',
  },
  {
    id: 'gal-2',
    url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
    title: 'Heavy Duty Power Racks & Plate Loaded Section',
    category: 'strength',
  },
  {
    id: 'gal-3',
    url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
    title: 'Cardiovascular Endurance Arena & High-Tech Treadmills',
    category: 'cardio',
  },
  {
    id: 'gal-4',
    url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    title: 'Personal Coaching & Functional Calisthenics Grid',
    category: 'training',
  },
  {
    id: 'gal-5',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    title: 'Atmospheric Strength Floor with Custom Red Ambient Lighting',
    category: 'interior',
  },
  {
    id: 'gal-6',
    url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    title: 'High Performance Cable Crossover & Biomechanics Machines',
    category: 'equipment',
  },
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Vikramaditya Roy',
    role: 'Strength & Hypertrophy Member',
    rating: 5,
    date: 'March 18, 2026',
    comment:
      'The atmosphere at Fitness Fuel is unmatched. The red-and-black aesthetic keeps your adrenaline high from the moment you step in. Barbells, rogue racks, and weight plates are always well maintained. Best gym in town by a mile!',
    avatarId: 'barbell-king',
  },
  {
    id: 'rev-2',
    name: 'Ananya Sharma',
    role: 'Functional & HIIT Enthusiast',
    rating: 5,
    date: 'March 02, 2026',
    comment:
      'I was hesitant about lifting weights as a beginner, but the training guidance here changed everything. Dropped 8 kgs in 4 months while building genuine strength and stamina. Staff is genuinely encouraging.',
    avatarId: 'runner-girl',
  },
  {
    id: 'rev-3',
    name: 'Kabir Malhotra',
    role: 'Elite Powerlifting Member',
    rating: 5,
    date: 'February 24, 2026',
    comment:
      'Serious equipment for serious lifters. Deadlift platforms, calibrated plates, and coaches who actually understand biomechanics. Joining the Elite membership was the best fitness decision I made this year.',
    avatarId: 'iron-beast',
  },
  {
    id: 'rev-4',
    name: 'Pooja Verma',
    role: 'Morning Warrior',
    rating: 5,
    date: 'February 12, 2026',
    comment:
      'Clean locker rooms, energetic playlist, and top tier cardio machines. I train at 6:00 AM daily and it sets up my entire day with unstoppable energy. Highly recommend the Pro tier!',
    avatarId: 'ninja-punch',
  },
  {
    id: 'rev-5',
    name: 'Rohan Mehra',
    role: 'Body Transformation Client',
    rating: 4,
    date: 'January 28, 2026',
    comment:
      'Great vibe, very spacious even during evening peak hours. The customized workout guidance helped fix my squat form within two weeks. Proud to be part of the Fitness Fuel tribe.',
    avatarId: 'beast-boxer',
  },
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'basic',
    name: 'BASIC',
    monthlyPrice: 999,
    yearlyPrice: 9999,
    description: 'Essential fitness foundation for consistent training and self-guided workout routines.',
    features: [
      'General Gym Access',
      'Cardio Equipment Arena',
      'Strength Training Area',
      'Standard Locker & Shower Facilities',
      'Basic Mobile App Schedule Access',
    ],
  },
  {
    id: 'pro',
    name: 'PRO',
    badge: 'MOST POPULAR',
    isPopular: true,
    monthlyPrice: 1499,
    yearlyPrice: 14999,
    description: 'Our most comprehensive plan for lifters wanting structured guidance, progression and community.',
    features: [
      'Full 24/7 Gym & Floor Access',
      'Strength, Power & Cardio Zones',
      'Personalized Workout Guidance',
      'Monthly Body Composition Assessment',
      'Priority Member Support',
      'Access to Weekend Bootcamps',
    ],
  },
  {
    id: 'elite',
    name: 'ELITE',
    badge: 'VIP ATHLETE',
    monthlyPrice: 2499,
    yearlyPrice: 24999,
    description: 'The ultimate VIP fitness experience with 1-on-1 coaching, nutrition roadmap, and recovery perks.',
    features: [
      'Full Gym Access + VIP Lounge',
      'Personal Training Sessions Included',
      'Customized Progressive Workout Plan',
      'Bi-Weekly InBody Assessments',
      'Priority Peak-Hour Rack Booking',
      'Nutrition & Recovery Roadmap',
      'Complimentary Fuel Towel & Shaker',
    ],
  },
];

export const FAQ_ITEMS = [
  {
    question: 'What membership plans are available?',
    answer:
      'We offer three core membership tiers: Basic (essential floor and cardio access), Pro (our most popular tier with workout guidance and full access), and Elite (VIP tier with personal training sessions and customized progression plans). You can choose between monthly and yearly billing options.',
  },
  {
    question: 'Can I change or upgrade my membership later?',
    answer:
      'Yes, absolutely! You can upgrade your plan at any point during your active cycle. Upgrades take effect immediately with prorated billing adjustments applied to your account.',
  },
  {
    question: 'What are the gym opening hours?',
    answer:
      'Fitness Fuel operates Monday through Friday from 5:30 AM to 10:30 PM, Saturdays from 6:00 AM to 10:00 PM, and Sundays from 7:00 AM to 2:00 PM. Elite members also enjoy flexible extended access hours.',
  },
  {
    question: 'Is personal training available?',
    answer:
      'Yes. Our certified strength and conditioning trainers are available for one-on-one and small group personal training. Personal coaching sessions are included in the Elite plan and can also be booked as add-ons on the Basic or Pro plans.',
  },
  {
    question: 'Can I request a trial session before committing?',
    answer:
      'Yes! We welcome new guests to experience Fitness Fuel first-hand. Submit an enquiry through our website or contact us via WhatsApp to book a complimentary 1-day guest pass and facility walkthrough.',
  },
  {
    question: 'What is the cancellation or refund policy?',
    answer:
      'Monthly subscriptions can be paused or cancelled with a 7-day advance notice prior to your next renewal date. Annual memberships can be frozen for up to 60 days in case of travel, medical circumstances, or work commitments.',
  },
];

export const GYM_STATS = [
  { label: 'Active Members', value: 500, suffix: '+', highlight: '500+ Members' },
  { label: 'Certified Trainers', value: 10, suffix: '+', highlight: '10+ Trainers' },
  { label: 'Training Programs', value: 50, suffix: '+', highlight: '50+ Programs' },
  { label: 'Years of Experience', value: 5, suffix: '+', highlight: '5+ Years' },
];

export const ABOUT_FEATURES = [
  {
    id: 'feat-1',
    title: 'Modern Gym Equipment',
    description: 'Biomechanical selectorized stations, ergonomic plate-loaded machines, and competition-grade bars.',
    icon: 'Dumbbell',
    kicker: 'Precision Biomechanics',
  },
  {
    id: 'feat-2',
    title: 'Strength Training',
    description: 'Dedicated deadlift platforms, power cages, bumper plates, and heavy dumbbell sets up to 60kg.',
    icon: 'Flame',
    kicker: 'Maximum Hypertrophy',
  },
  {
    id: 'feat-3',
    title: 'Weight Management',
    description: 'Evidence-based conditioning circuits, metabolic acceleration zones, and body composition tracking.',
    icon: 'Activity',
    kicker: 'Targeted Transformation',
  },
  {
    id: 'feat-4',
    title: 'Personal Training',
    description: 'Certified coaches providing movement assessment, progressive overload plans, and accountability.',
    icon: 'Award',
    kicker: 'Certified Mentorship',
  },
  {
    id: 'feat-5',
    title: 'Fitness Guidance',
    description: 'Comprehensive warm-up protocols, posture correction, and recovery principles tailored to your routine.',
    icon: 'Compass',
    kicker: 'Strategic Programming',
  },
  {
    id: 'feat-6',
    title: 'Supportive Training Environment',
    description: 'High-energy motivating black-and-red atmosphere where lifters of all experience levels push each other forward.',
    icon: 'Users',
    kicker: 'Tribe Culture',
  },
];

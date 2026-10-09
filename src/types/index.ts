export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'strength' | 'cardio' | 'interior' | 'training' | 'equipment';
  isCustom?: boolean;
  dateAdded?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatarId: string;
  isCustom?: boolean;
  role?: string;
}

export interface MembershipPlan {
  id: 'basic' | 'pro' | 'elite';
  name: string;
  badge?: string;
  isPopular?: boolean;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  colorAccent?: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  interestedIn: string;
  message: string;
}

export interface EnquiryFormData {
  fullName: string;
  phone: string;
  email: string;
  selectedPlan: 'basic' | 'pro' | 'elite' | string;
  startDate: string;
  fitnessGoal: string;
  preferredTime: string;
  message: string;
}

export interface GymConfig {
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  address: string;
  phone: string;
  email: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    whatsappNumber: string;
  };
  developer: {
    name: string;
    phone: string;
    email: string;
    whatsappLink: string;
    phoneLink: string;
    emailLink: string;
  };
}

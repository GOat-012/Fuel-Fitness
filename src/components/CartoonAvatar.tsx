import React from 'react';

export interface AvatarOption {
  id: string;
  name: string;
  role: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'barbell-king', name: 'Barbell Champion', role: 'Heavy Lifter' },
  { id: 'runner-girl', name: 'Sprint Athlete', role: 'Cardio Specialist' },
  { id: 'iron-beast', name: 'Iron Beast', role: 'Powerlifter' },
  { id: 'ninja-punch', name: 'Striker', role: 'HIIT & Combat' },
  { id: 'beast-boxer', name: 'Titan', role: 'Strength Athlete' },
  { id: 'cardio-queen', name: 'Endurance Pro', role: 'Functional Training' },
  { id: 'crossfit-champ', name: 'Vanguard', role: 'CrossFit Athlete' },
  { id: 'coach-pro', name: 'Commander', role: 'Master Coach' },
];

interface CartoonAvatarProps {
  avatarId?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
}

export const CartoonAvatar: React.FC<CartoonAvatarProps> = ({
  avatarId = 'barbell-king',
  size = 'md',
  className = '',
  showBorder = true,
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  // Consistent stylized vector cartoon gym characters
  const renderAvatarGraphic = () => {
    switch (avatarId) {
      case 'barbell-king':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#171717" />
            <circle cx="50" cy="50" r="46" stroke="#E50914" strokeWidth="2" strokeDasharray="4 2" />
            {/* Athletic cartoon face */}
            <path d="M30 68 C30 52 70 52 70 68 Z" fill="#262626" />
            <circle cx="50" cy="46" r="22" fill="#F8D3B0" />
            {/* Red athletic headband */}
            <path d="M28 38 C35 32 65 32 72 38 L72 44 C65 38 35 38 28 44 Z" fill="#E50914" />
            <rect x="44" y="34" width="12" height="6" rx="2" fill="#FFFFFF" />
            {/* Hair */}
            <path d="M28 38 C32 24 68 24 72 38 C68 30 32 30 28 38 Z" fill="#1C1917" />
            {/* Expressive cartoon eyes */}
            <circle cx="43" cy="48" r="3" fill="#171717" />
            <circle cx="57" cy="48" r="3" fill="#171717" />
            <circle cx="44.5" cy="46.5" r="1" fill="#FFFFFF" />
            <circle cx="58.5" cy="46.5" r="1" fill="#FFFFFF" />
            {/* Confident athletic smirk */}
            <path d="M45 56 Q50 60 55 56" stroke="#171717" strokeWidth="2.5" strokeLinecap="round" />
            {/* Barbells collar */}
            <circle cx="50" cy="80" r="5" fill="#E50914" />
          </svg>
        );

      case 'runner-girl':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#171717" />
            <circle cx="50" cy="50" r="46" stroke="#E50914" strokeWidth="2" strokeDasharray="4 2" />
            {/* Ponytail */}
            <path d="M66 32 C78 24 82 44 76 56 C70 52 68 40 66 32 Z" fill="#3F2E23" />
            <path d="M30 70 C30 54 70 54 70 70 Z" fill="#2B2B2B" />
            {/* Face */}
            <circle cx="50" cy="48" r="21" fill="#FFDFC4" />
            {/* High pony front hair */}
            <path d="M32 40 C38 28 62 28 68 40 C62 34 38 34 32 40 Z" fill="#3F2E23" />
            {/* Red athletic visor / sweatband */}
            <path d="M30 42 C40 37 60 37 70 42 L68 46 C60 41 40 41 32 46 Z" fill="#E50914" />
            {/* Friendly big cartoon eyes */}
            <ellipse cx="43" cy="50" rx="3" ry="3.5" fill="#171717" />
            <ellipse cx="57" cy="50" rx="3" ry="3.5" fill="#171717" />
            <circle cx="44" cy="48.5" r="1" fill="#FFFFFF" />
            <circle cx="58" cy="48.5" r="1" fill="#FFFFFF" />
            {/* Gentle smile */}
            <path d="M44 58 Q50 62 56 58" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
            {/* Red sportswear collar */}
            <path d="M40 70 L50 64 L60 70" stroke="#E50914" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        );

      case 'iron-beast':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#171717" />
            <circle cx="50" cy="50" r="46" stroke="#E50914" strokeWidth="2" strokeDasharray="4 2" />
            {/* Shoulders */}
            <path d="M26 72 C26 56 74 56 74 72 Z" fill="#202020" />
            {/* Head */}
            <circle cx="50" cy="46" r="22" fill="#E8B991" />
            {/* Backward red cap */}
            <path d="M28 40 C34 26 66 26 72 40 Z" fill="#E50914" />
            <rect x="36" y="38" width="28" height="5" rx="2" fill="#B91C1C" />
            {/* Cool powerlifting beard */}
            <path d="M36 50 C36 65 64 65 64 50 C62 56 38 56 36 50 Z" fill="#2B2B2B" />
            {/* Eyes behind focused brows */}
            <path d="M38 44 L46 47" stroke="#2B2B2B" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M62 44 L54 47" stroke="#2B2B2B" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="43" cy="49" r="2.5" fill="#171717" />
            <circle cx="57" cy="49" r="2.5" fill="#171717" />
            <circle cx="44" cy="48" r="0.8" fill="#FFFFFF" />
            <circle cx="58" cy="48" r="0.8" fill="#FFFFFF" />
            {/* Determined mouth */}
            <path d="M46 56 L54 56" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'ninja-punch':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#171717" />
            <circle cx="50" cy="50" r="46" stroke="#E50914" strokeWidth="2" strokeDasharray="4 2" />
            {/* Sleeveless athletic jersey */}
            <path d="M28 72 C28 56 72 56 72 72 Z" fill="#E50914" />
            <circle cx="50" cy="47" r="21" fill="#F4C7A3" />
            {/* Combat bandana */}
            <path d="M29 40 C35 34 65 34 71 40 L71 46 C65 40 35 40 29 46 Z" fill="#171717" />
            <circle cx="50" cy="42" r="3" fill="#E50914" />
            {/* Spiky hair top */}
            <path d="M30 38 L36 28 L44 33 L50 25 L56 33 L64 28 L70 38 Z" fill="#171717" />
            {/* Fierce eyes */}
            <circle cx="43" cy="50" r="3" fill="#171717" />
            <circle cx="57" cy="50" r="3" fill="#171717" />
            <circle cx="44.5" cy="48.5" r="1" fill="#FFFFFF" />
            <circle cx="58.5" cy="48.5" r="1" fill="#FFFFFF" />
            {/* Cheek strip (fitness tape) */}
            <rect x="36" y="54" width="7" height="2" transform="rotate(-15 36 54)" fill="#E50914" />
            {/* Gritted grin */}
            <path d="M46 58 H54" stroke="#171717" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'beast-boxer':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#171717" />
            <circle cx="50" cy="50" r="46" stroke="#E50914" strokeWidth="2" strokeDasharray="4 2" />
            {/* Hoodie silhouette */}
            <path d="M26 72 C26 50 74 50 74 72 Z" fill="#262626" />
            <path d="M32 44 C32 26 68 26 68 44 C68 56 32 56 32 44 Z" fill="#1C1917" />
            {/* Inner Face in hood */}
            <circle cx="50" cy="46" r="17" fill="#F2C299" />
            {/* Shadow under hood */}
            <path d="M35 38 C42 34 58 34 65 38 Z" fill="#171717" />
            {/* Focused glow eyes */}
            <circle cx="44" cy="47" r="2.5" fill="#E50914" />
            <circle cx="56" cy="47" r="2.5" fill="#E50914" />
            {/* Mouth */}
            <path d="M46 53 H54" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
            {/* Drawstrings */}
            <line x1="44" y1="62" x2="44" y2="72" stroke="#E50914" strokeWidth="2" />
            <line x1="56" y1="62" x2="56" y2="72" stroke="#E50914" strokeWidth="2" />
          </svg>
        );

      case 'cardio-queen':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#171717" />
            <circle cx="50" cy="50" r="46" stroke="#E50914" strokeWidth="2" strokeDasharray="4 2" />
            <path d="M30 72 C30 56 70 56 70 72 Z" fill="#262626" />
            <circle cx="50" cy="46" r="21" fill="#F8D3B0" />
            {/* Stylish bob hair */}
            <path d="M30 46 C28 32 72 32 70 46 C68 36 32 36 30 46 Z" fill="#4B382A" />
            {/* Athletic red visor */}
            <path d="M28 42 C38 34 62 34 72 42 L66 46 C58 40 42 40 34 46 Z" fill="#E50914" />
            {/* Friendly animated eyes */}
            <circle cx="43" cy="49" r="3" fill="#171717" />
            <circle cx="57" cy="49" r="3" fill="#171717" />
            <circle cx="44.5" cy="47.5" r="1.2" fill="#FFFFFF" />
            <circle cx="58.5" cy="47.5" r="1.2" fill="#FFFFFF" />
            {/* Radiant smile */}
            <path d="M44 57 Q50 63 56 57" stroke="#E50914" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'crossfit-champ':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#171717" />
            <circle cx="50" cy="50" r="46" stroke="#E50914" strokeWidth="2" strokeDasharray="4 2" />
            {/* Broad shoulders */}
            <path d="M26 72 C26 54 74 54 74 72 Z" fill="#1F1F1F" />
            <circle cx="50" cy="46" r="22" fill="#DFC1A5" />
            {/* Modern fade haircut */}
            <path d="M30 38 C34 22 66 22 70 38 C66 32 34 32 30 38 Z" fill="#202020" />
            {/* Sharp chin and jawline */}
            <circle cx="43" cy="48" r="3" fill="#171717" />
            <circle cx="57" cy="48" r="3" fill="#171717" />
            <circle cx="44.5" cy="46.5" r="1" fill="#FFFFFF" />
            <circle cx="58.5" cy="46.5" r="1" fill="#FFFFFF" />
            <path d="M44 57 Q50 60 56 57" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
            {/* Crossfit barbell icon on shirt */}
            <rect x="42" y="66" width="16" height="3" fill="#E50914" rx="1" />
            <circle cx="42" cy="67.5" r="3" fill="#FFFFFF" />
            <circle cx="58" cy="67.5" r="3" fill="#FFFFFF" />
          </svg>
        );

      default:
      case 'coach-pro':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#171717" />
            <circle cx="50" cy="50" r="46" stroke="#E50914" strokeWidth="2" strokeDasharray="4 2" />
            {/* Coach jacket with red zip */}
            <path d="M28 72 C28 54 72 54 72 72 Z" fill="#242424" />
            <line x1="50" y1="58" x2="50" y2="72" stroke="#E50914" strokeWidth="3" />
            {/* Coach face */}
            <circle cx="50" cy="46" r="22" fill="#F0CBA8" />
            {/* Short cropped hair */}
            <path d="M32 38 C36 26 64 26 68 38 Z" fill="#3D3A37" />
            {/* Coach headset / whistle */}
            <path d="M46 64 C48 68 52 68 54 64" stroke="#E50914" strokeWidth="2" fill="none" />
            {/* Confident experienced eyes */}
            <circle cx="43" cy="47" r="3" fill="#171717" />
            <circle cx="57" cy="47" r="3" fill="#171717" />
            <circle cx="44.5" cy="45.5" r="1" fill="#FFFFFF" />
            <circle cx="58.5" cy="45.5" r="1" fill="#FFFFFF" />
            <path d="M45 56 Q50 59 55 56" stroke="#171717" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden ${sizeMap[size]} ${
        showBorder ? 'ring-2 ring-[#E50914]/40 shadow-[0_0_15px_rgba(229,9,20,0.2)]' : ''
      } ${className}`}
      title={AVATAR_OPTIONS.find((a) => a.id === avatarId)?.name || 'Fitness Fuel Member'}
    >
      {renderAvatarGraphic()}
    </div>
  );
};

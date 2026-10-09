import React, { useState } from 'react';
import { X, Star, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { ReviewItem } from '../types';
import { CartoonAvatar, AVATAR_OPTIONS } from './CartoonAvatar';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: ReviewItem) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Active Member');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedAvatarId, setSelectedAvatarId] = useState('barbell-king');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    if (!comment.trim() || comment.trim().length < 15) {
      setErrorMsg('Please write at least 15 characters describing your training experience.');
      return;
    }

    if (comment.trim().length > 500) {
      setErrorMsg('Review comments must not exceed 500 characters.');
      return;
    }

    setIsSubmitting(true);

    // Simulate pleasant network delay
    setTimeout(() => {
      const newReview: ReviewItem = {
        id: `rev-${Date.now()}`,
        name: name.trim(),
        role: role.trim() || 'Gym Member',
        rating,
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        comment: comment.trim(),
        avatarId: selectedAvatarId,
        isCustom: true,
      };

      onSubmitReview(newReview);
      setIsSubmitting(false);
      setSubmittedSuccess(true);

      setTimeout(() => {
        setSubmittedSuccess(false);
        setName('');
        setComment('');
        setRating(5);
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Write a Member Review"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
    >
      <div className="bg-[#121212] border border-white/10 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#161616]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E50914]/20 border border-[#E50914]/30 flex items-center justify-center text-[#E50914]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-xl text-white tracking-wide">
                Share Your Training Experience
              </h3>
              <p className="text-xs text-[#888888]">
                Your honest feedback inspires our fitness community
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#888888] hover:text-white transition-colors"
            aria-label="Close Review Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-heading text-2xl text-white tracking-wide">
              Review Submitted!
            </h4>
            <p className="text-sm text-[#B8B8B8]">
              Thank you for sharing your experience at Fitness Fuel. Your review is now live!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-sm">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Avatar Choice */}
            <div>
              <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-2">
                Choose Your Cartoon Avatar Character
              </label>
              <div className="grid grid-cols-4 gap-2 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                {AVATAR_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedAvatarId(opt.id)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${
                      selectedAvatarId === opt.id
                        ? 'border-[#E50914] bg-[#E50914]/15 shadow-[0_0_12px_rgba(229,9,20,0.3)]'
                        : 'border-transparent hover:border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <CartoonAvatar avatarId={opt.id} size="sm" showBorder={selectedAvatarId === opt.id} />
                    <span className="text-[10px] text-[#A3A3A3] text-center line-clamp-1">
                      {opt.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Focus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sameer Khanna"
                  className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#E50914] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-1.5">
                  Training Discipline
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Powerlifting / HIIT"
                  className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#E50914] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Star Rating Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider mb-2">
                Your Overall Rating *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                    aria-label={`${star} star rating`}
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-[#E50914] text-[#E50914] drop-shadow-[0_0_8px_rgba(229,9,20,0.6)]'
                          : 'text-[#444444]'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-[#A3A3A3] ml-2">
                  {rating === 5 ? '5.0 - Exceptional' : `${rating}.0 Stars`}
                </span>
              </div>
            </div>

            {/* Comment */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-[#B8B8B8] uppercase tracking-wider">
                  Review Details *
                </label>
                <span className="text-[11px] text-[#666666]">
                  {comment.length} / 500
                </span>
              </div>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={500}
                placeholder="Share your thoughts on the equipment, coaching, cleanliness, atmosphere, and your results..."
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
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#ff1a26] text-white font-semibold text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(229,9,20,0.4)] disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Post Review'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

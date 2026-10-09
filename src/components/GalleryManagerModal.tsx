import React, { useState, useRef } from 'react';
import { X, Upload, Trash2, Edit2, Check, AlertCircle, Info, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  onAddItems: (newItems: GalleryItem[]) => void;
  onDeleteItem: (id: string) => void;
  onUpdateItemTitle: (id: string, newTitle: string) => void;
}

interface PendingUpload {
  id: string;
  url: string;
  title: string;
  category: 'strength' | 'cardio' | 'interior' | 'training' | 'equipment';
}

export const GalleryManagerModal: React.FC<GalleryManagerModalProps> = ({
  isOpen,
  onClose,
  items,
  onAddItems,
  onDeleteItem,
  onUpdateItemTitle,
}) => {
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitleValue, setEditTitleValue] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const newPending: PendingUpload[] = [];

    Array.from(files).forEach((file) => {
      if (!acceptedTypes.includes(file.type)) {
        setUploadError('Only JPG, JPEG, PNG, and WebP files are supported.');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setUploadError('One or more files exceed the 10MB size limit.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const item: PendingUpload = {
            id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            url: event.target.result as string,
            title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            category: 'strength',
          };
          setPendingUploads((prev) => [...prev, item]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSavePending = () => {
    if (pendingUploads.length === 0) return;

    const itemsToAdd: GalleryItem[] = pendingUploads.map((p) => ({
      ...p,
      isCustom: true,
      dateAdded: new Date().toISOString(),
    }));

    onAddItems(itemsToAdd);
    setPendingUploads([]);
    setSuccessMsg(`Successfully added ${itemsToAdd.length} photo(s) to the gym gallery!`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleRemovePending = (id: string) => {
    setPendingUploads((prev) => prev.filter((p) => p.id !== id));
  };

  const handleStartEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setEditTitleValue(item.title);
  };

  const handleSaveEdit = (id: string) => {
    if (editTitleValue.trim()) {
      onUpdateItemTitle(id, editTitleValue.trim());
    }
    setEditingId(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Manage Gallery Photos"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
    >
      <div className="bg-[#121212] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#161616]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E50914]/20 border border-[#E50914]/30 flex items-center justify-center text-[#E50914]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl text-white tracking-wide">
                Gym Owner Photo Management
              </h3>
              <p className="text-xs text-[#888888]">
                Upload high-res gym floor photos, update captions, or reorganize
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#888888] hover:text-white transition-colors"
            aria-label="Close Gallery Manager"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Demo storage information banner */}
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-200 leading-relaxed">
              <strong className="font-semibold text-blue-100">Owner Demo Mode:</strong> Photos uploaded here are stored in your device's high-capacity browser database (IndexedDB) for demonstration purposes. In production, this connects securely to AWS S3 or Cloudinary storage with gym owner authentication.
            </div>
          </div>

          {/* Feedback messages */}
          {uploadError && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Upload Drop Zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/20 hover:border-[#E50914] rounded-xl p-8 text-center cursor-pointer transition-colors bg-white/[0.02] hover:bg-[#E50914]/5 group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-[#E50914]/10 text-[#E50914] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-white font-medium mb-1">Click to browse or drop gym photos here</p>
            <p className="text-xs text-[#888888]">
              Supports JPG, JPEG, PNG, WebP up to 10MB each &bull; Multiple file selection supported
            </p>
          </div>

          {/* Pending Uploads Preview */}
          {pendingUploads.length > 0 && (
            <div className="space-y-3 bg-[#181818] p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between">
                <span className="font-heading text-base text-white uppercase tracking-wide">
                  New Photos Ready to Add ({pendingUploads.length})
                </span>
                <button
                  onClick={handleSavePending}
                  className="px-4 py-2 bg-[#E50914] hover:bg-[#ff1a26] text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(229,9,20,0.4)]"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save to Gallery</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {pendingUploads.map((pending) => (
                  <div
                    key={pending.id}
                    className="relative group rounded-lg overflow-hidden border border-white/10 bg-[#0d0d0d] p-2 flex flex-col gap-2"
                  >
                    <img
                      src={pending.url}
                      alt={pending.title}
                      className="w-full h-28 object-cover rounded"
                    />
                    <input
                      type="text"
                      value={pending.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPendingUploads((prev) =>
                          prev.map((p) => (p.id === pending.id ? { ...p, title: val } : p))
                        );
                      }}
                      className="w-full text-xs bg-white/5 border border-white/10 rounded px-2 py-1 text-white focus:outline-none focus:border-[#E50914]"
                      placeholder="Photo title / caption"
                    />
                    <div className="flex items-center justify-between text-[11px]">
                      <select
                        value={pending.category}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          setPendingUploads((prev) =>
                            prev.map((p) => (p.id === pending.id ? { ...p, category: val } : p))
                          );
                        }}
                        className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[#B8B8B8] text-xs focus:outline-none"
                      >
                        <option value="strength">Strength</option>
                        <option value="cardio">Cardio</option>
                        <option value="training">Training</option>
                        <option value="interior">Interior</option>
                        <option value="equipment">Equipment</option>
                      </select>
                      <button
                        onClick={() => handleRemovePending(pending.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Discard"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Live Gallery List */}
          <div className="space-y-3">
            <h4 className="font-heading text-base text-white tracking-wide uppercase">
              Current Gallery Photos ({items.length})
            </h4>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 p-3 bg-white/[0.03] border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded-lg border border-white/10 shrink-0"
                    />
                    <div className="min-w-0">
                      {editingId === item.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editTitleValue}
                            onChange={(e) => setEditTitleValue(e.target.value)}
                            className="bg-black/80 border border-[#E50914] text-white text-xs px-2 py-1 rounded focus:outline-none"
                          />
                          <button
                            onClick={() => handleSaveEdit(item.id)}
                            className="p-1 rounded bg-[#E50914] text-white"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <p className="text-white font-medium text-xs sm:text-sm truncate">
                          {item.title}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-[11px] text-[#888888] mt-0.5">
                        <span className="capitalize">{item.category}</span>
                        {item.isCustom && (
                          <span className="text-[#E50914] bg-[#E50914]/10 px-1.5 py-0.2 rounded text-[10px]">
                            Custom Upload
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleStartEdit(item)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#888888] hover:text-white transition-colors"
                      title="Edit Caption"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-2 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-red-300 transition-colors"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#161616] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider transition-colors"
          >
            Close Manager
          </button>
        </div>
      </div>
    </div>
  );
};

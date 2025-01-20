import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import type { PostFormData } from '../../../types';
import { PlatformSelector } from './PlatformSelector';
import { MediaUploader } from './MediaUploader';
import { TagInput } from './TagInput';

interface PostFormProps {
  onSubmit: (data: PostFormData) => void;
  initialData?: PostFormData;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function PostForm({ onSubmit, initialData, onCancel, isSubmitting }: PostFormProps) {
  const [formData, setFormData] = useState<PostFormData>(initialData || {
    content: '',
    platform: 'twitter',
    scheduledDate: new Date(),
    tags: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        content: '',
        platform: 'twitter',
        scheduledDate: new Date(),
        tags: [],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <PlatformSelector
        selected={formData.platform}
        onChange={(platform) => setFormData({ ...formData, platform })}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="What's on your mind?"
          required
        />
      </div>

      <MediaUploader
        mediaUrl={formData.mediaUrl}
        onMediaChange={(url) => setFormData({ ...formData, mediaUrl: url })}
      />

      <TagInput
        tags={formData.tags || []}
        onChange={(tags) => setFormData({ ...formData, tags })}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Schedule Date
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="datetime-local"
            value={formData.scheduledDate.toISOString().slice(0, 16)}
            onChange={(e) => setFormData({ ...formData, scheduledDate: new Date(e.target.value) })}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Scheduling...' : initialData ? 'Update Post' : 'Schedule Post'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
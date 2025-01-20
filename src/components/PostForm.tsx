import React, { useState } from 'react';
import { Calendar, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import type { PostFormData } from '../types';

interface PostFormProps {
  onSubmit: (data: PostFormData) => void;
}

export function PostForm({ onSubmit }: PostFormProps) {
  const [formData, setFormData] = useState<PostFormData>({
    content: '',
    platform: 'twitter',
    scheduledDate: new Date(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ content: '', platform: 'twitter', scheduledDate: new Date() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Platform
        </label>
        <div className="flex space-x-4">
          {[
            { icon: <Twitter size={20} />, value: 'twitter', label: 'Twitter' },
            { icon: <Facebook size={20} />, value: 'facebook', label: 'Facebook' },
            { icon: <Instagram size={20} />, value: 'instagram', label: 'Instagram' },
            { icon: <Linkedin size={20} />, value: 'linkedin', label: 'LinkedIn' },
          ].map((platform) => (
            <button
              key={platform.value}
              type="button"
              onClick={() => setFormData({ ...formData, platform: platform.value as PostFormData['platform'] })}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                formData.platform === platform.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {platform.icon}
              <span>{platform.label}</span>
            </button>
          ))}
        </div>
      </div>

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
        />
      </div>

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
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Schedule Post
      </button>
    </form>
  );
}
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import type { SocialPlatform } from '../../../types';

interface PlatformSelectorProps {
  selected: SocialPlatform;
  onChange: (platform: SocialPlatform) => void;
}

export function PlatformSelector({ selected, onChange }: PlatformSelectorProps) {
  const platforms = [
    { icon: <Twitter size={20} />, value: 'twitter', label: 'Twitter' },
    { icon: <Facebook size={20} />, value: 'facebook', label: 'Facebook' },
    { icon: <Instagram size={20} />, value: 'instagram', label: 'Instagram' },
    { icon: <Linkedin size={20} />, value: 'linkedin', label: 'LinkedIn' },
  ] as const;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Platform
      </label>
      <div className="flex space-x-4">
        {platforms.map((platform) => (
          <button
            key={platform.value}
            type="button"
            onClick={() => onChange(platform.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              selected === platform.value
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
  );
}
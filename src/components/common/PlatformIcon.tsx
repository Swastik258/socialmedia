import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import type { SocialPlatform } from '../../types';

interface PlatformIconProps {
  platform: SocialPlatform;
  size?: number;
}

export function PlatformIcon({ platform, size = 20 }: PlatformIconProps) {
  switch (platform) {
    case 'twitter':
      return <Twitter size={size} />;
    case 'facebook':
      return <Facebook size={size} />;
    case 'instagram':
      return <Instagram size={size} />;
    case 'linkedin':
      return <Linkedin size={size} />;
  }
}
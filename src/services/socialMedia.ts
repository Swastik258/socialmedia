import type { SocialPlatform } from '../types';
import { v4 as uuidv4 } from 'uuid';

// OAuth configuration for each platform
const OAUTH_CONFIG = {
  twitter: {
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    clientId: import.meta.env.VITE_TWITTER_CLIENT_ID,
    scope: 'tweet.read tweet.write users.read offline.access',
    redirectUri: `${window.location.origin}/auth/callback/twitter`
  },
  facebook: {
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    clientId: import.meta.env.VITE_FACEBOOK_CLIENT_ID,
    scope: 'pages_show_list,pages_read_engagement,pages_manage_posts',
    redirectUri: `${window.location.origin}/auth/callback/facebook`
  },
  instagram: {
    authUrl: 'https://api.instagram.com/oauth/authorize',
    clientId: import.meta.env.VITE_INSTAGRAM_CLIENT_ID,
    scope: 'basic_display_api user_profile_edit user_media',
    responseType: 'code',
    redirectUri: `${window.location.origin}/auth/callback/instagram`
  },
  linkedin: {
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
    scope: 'r_liteprofile w_member_social',
    redirectUri: `${window.location.origin}/auth/callback/linkedin`
  }
};

export const socialMediaService = {
  async connectPlatform(platform: SocialPlatform) {
    const config = OAUTH_CONFIG[platform];
    if (!config) throw new Error(`Unsupported platform: ${platform}`);

    const state = uuidv4();
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope,
      state,
      response_type: config.responseType || 'code',
    });

    window.location.href = `${config.authUrl}?${params.toString()}`;
  },

  async disconnectPlatform(platform: SocialPlatform) {
    const response = await fetch(`/api/disconnect/${platform}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to disconnect platform');
    }
  },

  async schedulePost(
    platform: SocialPlatform,
    content: string,
    scheduledDate: Date,
    mediaUrl?: string
  ) {
    const response = await fetch(`/api/post-schedule/${platform}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        scheduledDate: scheduledDate.toISOString(),
        mediaUrl,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to schedule post');
    }

    return response.json();
  },

  async uploadMedia(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload-media', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload media');
    }

    const { url } = await response.json();
    return url;
  },

  getPlatformStatus(platform: SocialPlatform) {
    // This would normally fetch real data from your backend
    return {
      platformData: {
        username: 'demo_user',
        followers: 1234,
      },
    };
  },
};
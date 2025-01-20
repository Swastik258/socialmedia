export interface Post {
  id: string;
  content: string;
  platform: SocialPlatform;
  scheduledDate: Date;
  status: PostStatus;
  mediaUrl?: string;
  tags?: string[];
  location?: string;
  analytics?: PostAnalytics;
}

export type SocialPlatform = 'twitter' | 'facebook' | 'instagram' | 'linkedin';
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface PostFormData {
  content: string;
  platform: SocialPlatform;
  scheduledDate: Date;
  mediaUrl?: string;
  tags?: string[];
  location?: string;
}

export interface PostAnalytics {
  likes: number;
  shares: number;
  comments: number;
  reach: number;
}

export interface FilterOptions {
  platform?: SocialPlatform;
  status?: PostStatus;
  startDate?: Date;
  endDate?: Date;
}

export interface ContentSuggestion {
  type: string;
  content: string;
  engagement: string;
}
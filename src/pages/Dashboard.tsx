import React, { useState } from 'react';
import { QuickActions } from '../components/dashboard/QuickActions';
import { ContentSuggestions } from '../components/dashboard/ContentSuggestions';
import { TeamActivity } from '../components/dashboard/TeamActivity';
import { PostTemplates } from '../components/dashboard/PostTemplates';
import { UpcomingPosts } from '../components/dashboard/UpcomingPosts';
import { PlatformConnect } from '../components/social/PlatformConnect';
import { PostForm } from '../components/scheduler/PostForm';
import { AlertCircle } from 'lucide-react';
import type { SocialPlatform, PostFormData } from '../types';
import { socialMediaService } from '../services/socialMedia';

export function Dashboard() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<SocialPlatform[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const handleConnect = (platform: SocialPlatform) => {
    try {
      setConnectedPlatforms(prev => [...prev, platform]);
      setError(null);
    } catch (err) {
      setError('Failed to connect platform. Please try again.');
    }
  };

  const handleDisconnect = (platform: SocialPlatform) => {
    setConnectedPlatforms(prev => prev.filter(p => p !== platform));
  };

  const handleSubmit = async (data: PostFormData) => {
    if (!connectedPlatforms.includes(data.platform)) {
      setError(`Please connect to ${data.platform} before posting.`);
      return;
    }

    setIsPosting(true);
    setError(null);

    try {
      await socialMediaService.schedulePost(
        data.platform,
        data.content,
        data.scheduledDate,
        data.mediaUrl
      );
      // Success! You can add a success message here if desired
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule post');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <QuickActions />
            
            {/* Social Media Connection */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6">Connect Your Platforms</h2>
              <PlatformConnect 
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
                connectedPlatforms={connectedPlatforms}
              />
            </div>

            {/* Post Creation */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6">Create New Post</h2>
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                  <AlertCircle className="mr-2" size={20} />
                  {error}
                </div>
              )}
              <PostForm 
                onSubmit={handleSubmit}
                isSubmitting={isPosting}
              />
            </div>

            <ContentSuggestions />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <UpcomingPosts />
            <TeamActivity />
            <PostTemplates />
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Clock, ArrowUpRight } from 'lucide-react';
import { PlatformIcon } from '../common/PlatformIcon';
import type { SocialPlatform } from '../../types';

export function UpcomingPosts() {
  const posts = [
    {
      platform: 'twitter' as SocialPlatform,
      content: 'Exciting announcement coming soon! Stay tuned...',
      time: '2:00 PM Today',
    },
    {
      platform: 'linkedin' as SocialPlatform,
      content: 'New blog post: 10 Tips for Social Media Success',
      time: '4:30 PM Today',
    },
    {
      platform: 'instagram' as SocialPlatform,
      content: 'Behind the scenes look at our team...',
      time: '10:00 AM Tomorrow',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Clock className="text-blue-500" size={24} />
          <h2 className="text-lg font-semibold">Upcoming Posts</h2>
        </div>
        <button className="text-blue-500 hover:text-blue-600">
          <ArrowUpRight size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-2 mb-2">
              <PlatformIcon platform={post.platform} size={16} />
              <span className="text-sm font-medium">{post.time}</span>
            </div>
            <p className="text-sm text-gray-700">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
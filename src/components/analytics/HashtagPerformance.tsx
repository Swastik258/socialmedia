import React from 'react';
import { Hash, TrendingUp } from 'lucide-react';

interface HashtagStats {
  hashtag: string;
  usageCount: number;
  avgEngagement: number;
  trend: 'up' | 'down' | 'stable';
}

interface HashtagPerformanceProps {
  hashtags: HashtagStats[];
}

export function HashtagPerformance({ hashtags }: HashtagPerformanceProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Hash className="text-blue-500" size={24} />
          <h2 className="text-xl font-semibold">Top Performing Hashtags</h2>
        </div>
        <button className="text-blue-500 hover:text-blue-600">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {hashtags.map((tag) => (
          <div
            key={tag.hashtag}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 font-medium">#{tag.hashtag}</span>
                <span className="text-sm text-gray-500">
                  {tag.usageCount} posts
                </span>
              </div>
              <div className="flex items-center mt-1">
                <TrendingUp 
                  size={16} 
                  className={
                    tag.trend === 'up' 
                      ? 'text-green-500' 
                      : tag.trend === 'down' 
                      ? 'text-red-500' 
                      : 'text-gray-500'
                  } 
                />
                <span className="text-sm text-gray-600 ml-1">
                  {tag.avgEngagement}% engagement
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-blue-500 hover:bg-blue-50 rounded-full">
                Analyze
              </button>
              <button className="px-3 py-1 text-sm text-blue-500 hover:bg-blue-50 rounded-full">
                Use
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
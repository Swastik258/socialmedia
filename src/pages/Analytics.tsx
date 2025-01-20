import React from 'react';
import { BarChart3, TrendingUp, Users, Share2 } from 'lucide-react';

export function Analytics() {
  const stats = [
    { label: 'Total Reach', value: '125.8K', icon: Users, change: '+12.3%' },
    { label: 'Engagement Rate', value: '4.2%', icon: TrendingUp, change: '+0.8%' },
    { label: 'Total Shares', value: '3.4K', icon: Share2, change: '+5.7%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="text-blue-500" size={24} />
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Platform Performance</h2>
            <div className="space-y-4">
              {[
                { platform: 'Twitter', engagement: 78 },
                { platform: 'Facebook', engagement: 65 },
                { platform: 'Instagram', engagement: 89 },
                { platform: 'LinkedIn', engagement: 45 },
              ].map((item) => (
                <div key={item.platform}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.platform}</span>
                    <span className="font-medium">{item.engagement}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 rounded-full h-2"
                      style={{ width: `${item.engagement}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Best Performing Posts</h2>
            <div className="space-y-4">
              {[
                { content: 'Exciting news! Our latest feature...', engagement: '12.3K' },
                { content: 'Check out our new product launch...', engagement: '8.7K' },
                { content: 'Behind the scenes at our office...', engagement: '6.5K' },
              ].map((post, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 truncate flex-1 mr-4">{post.content}</p>
                  <span className="text-sm font-medium text-blue-500">{post.engagement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
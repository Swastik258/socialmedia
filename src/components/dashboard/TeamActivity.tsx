import React from 'react';
import { Users, CheckCircle2 } from 'lucide-react';

export function TeamActivity() {
  const activities = [
    {
      user: 'Sarah Miller',
      action: 'scheduled a post',
      time: '5m ago',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    },
    {
      user: 'John Davis',
      action: 'edited template',
      time: '15m ago',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    },
    {
      user: 'Emma Wilson',
      action: 'published content',
      time: '1h ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="text-blue-500" size={24} />
        <h2 className="text-lg font-semibold">Team Activity</h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-3">
            <img
              src={activity.avatar}
              alt={activity.user}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{' '}
                {activity.action}
              </p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
            <CheckCircle2 size={16} className="text-green-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
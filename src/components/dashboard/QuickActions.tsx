import React from 'react';
import { PlusCircle, Calendar, Image, FileText, Wand2 } from 'lucide-react';

export function QuickActions() {
  const actions = [
    { icon: PlusCircle, label: 'New Post', color: 'bg-blue-500' },
    { icon: Calendar, label: 'Schedule', color: 'bg-green-500' },
    { icon: Image, label: 'Media Library', color: 'bg-purple-500' },
    { icon: FileText, label: 'Templates', color: 'bg-orange-500' },
    { icon: Wand2, label: 'AI Assistant', color: 'bg-pink-500' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`${action.color} p-3 rounded-full text-white mb-2`}>
              <action.icon size={20} />
            </div>
            <span className="text-sm font-medium text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
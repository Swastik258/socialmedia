import React from 'react';
import { FileText, Star } from 'lucide-react';

export function PostTemplates() {
  const templates = [
    {
      name: 'Product Launch',
      description: 'Announce new features or products',
      uses: 128,
    },
    {
      name: 'Weekly Update',
      description: 'Share company news and updates',
      uses: 89,
    },
    {
      name: 'Customer Story',
      description: 'Highlight customer success stories',
      uses: 64,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-6">
        <FileText className="text-blue-500" size={24} />
        <h2 className="text-lg font-semibold">Post Templates</h2>
      </div>

      <div className="space-y-4">
        {templates.map((template, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-gray-100 hover:border-blue-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium">{template.name}</h3>
              <div className="flex items-center text-gray-500 text-sm">
                <Star size={14} className="mr-1" />
                {template.uses}
              </div>
            </div>
            <p className="text-sm text-gray-500">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
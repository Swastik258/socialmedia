import React from 'react';
import { Sparkles, ThumbsUp, ArrowRight } from 'lucide-react';
import { type ContentSuggestion } from '../../types';

export function ContentSuggestions() {
  const suggestions: ContentSuggestion[] = [
    {
      type: 'Trending Topic',
      content: 'Share your thoughts on the latest AI developments in social media management',
      engagement: '85%',
    },
    {
      type: 'Best Time',
      content: 'Schedule your next post for Wednesday at 2 PM for maximum engagement',
      engagement: '78%',
    },
    {
      type: 'Content Idea',
      content: 'Create a behind-the-scenes video of your team workflow',
      engagement: '92%',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-yellow-500" size={24} />
          <h2 className="text-lg font-semibold">AI-Powered Suggestions</h2>
        </div>
        <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-gray-100 hover:border-blue-100 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">{suggestion.type}</span>
              <div className="flex items-center text-green-500">
                <ThumbsUp size={14} className="mr-1" />
                <span className="text-sm">{suggestion.engagement}</span>
              </div>
            </div>
            <p className="text-gray-700 mb-3">{suggestion.content}</p>
            <button className="text-blue-500 text-sm font-medium flex items-center hover:text-blue-600">
              Use Suggestion <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
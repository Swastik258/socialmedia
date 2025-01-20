import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

export function Calendar() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const scheduledPosts = [
    { date: 15, time: '10:00 AM', platform: 'Twitter', content: 'Product launch announcement' },
    { date: 18, time: '2:00 PM', platform: 'Instagram', content: 'Behind the scenes photos' },
    { date: 22, time: '11:30 AM', platform: 'LinkedIn', content: 'Company milestone update' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Calendar</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Schedule New Post
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
              </h2>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <CalendarIcon size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-4">
              {days.map(day => (
                <div key={day} className="text-center font-medium text-gray-500">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDay.getDay() }).map((_, index) => (
                <div key={`empty-${index}`} className="h-24 border rounded-lg" />
              ))}
              {Array.from({ length: lastDay.getDate() }).map((_, index) => {
                const date = index + 1;
                const hasPost = scheduledPosts.some(post => post.date === date);
                
                return (
                  <div
                    key={date}
                    className={`h-24 border rounded-lg p-2 ${
                      hasPost ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="font-medium text-gray-700">{date}</div>
                    {scheduledPosts
                      .filter(post => post.date === date)
                      .map((post, postIndex) => (
                        <div
                          key={postIndex}
                          className="mt-1 p-1 bg-white rounded border border-blue-200 text-xs"
                        >
                          <div className="flex items-center text-gray-500">
                            <Clock size={12} className="mr-1" />
                            {post.time}
                          </div>
                          <div className="truncate text-gray-700">{post.content}</div>
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
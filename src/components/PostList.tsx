import React from 'react';
import { Calendar, MoreVertical } from 'lucide-react';
import type { Post } from '../types';

interface PostListProps {
  posts: Post[];
  onDeletePost: (id: string) => void;
}

export function PostList({ posts, onDeletePost }: PostListProps) {
  const getStatusColor = (status: Post['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(post.status)}`}>
                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
              </span>
              <span className="text-sm text-gray-500">{post.platform}</span>
            </div>
            <div className="relative">
              <button
                onClick={() => onDeletePost(post.id)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <MoreVertical size={20} className="text-gray-500" />
              </button>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{post.content}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2" />
            {new Date(post.scheduledDate).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
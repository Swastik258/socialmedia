import React from 'react';
import { Calendar, MapPin, Hash, Image, MoreVertical } from 'lucide-react';
import type { Post } from '../../../types';
import { formatDate } from '../../../utils/dateUtils';
import { PlatformIcon } from '../../common/PlatformIcon';
import { StatusBadge } from '../../common/StatusBadge';

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
  onEdit: (post: Post) => void;
}

export function PostCard({ post, onDelete, onEdit }: PostCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <StatusBadge status={post.status} />
          <div className="flex items-center space-x-1">
            <PlatformIcon platform={post.platform} size={16} />
            <span className="text-sm text-gray-500">{post.platform}</span>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => onEdit(post)}
            className="p-2 hover:bg-gray-100 rounded-full mr-2"
          >
            <span className="text-sm text-blue-500">Edit</span>
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <MoreVertical size={20} className="text-gray-500" />
          </button>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{post.content}</p>

      {post.mediaUrl && (
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Image size={16} className="mr-2" />
            Media attached
          </div>
          <img 
            src={post.mediaUrl} 
            alt="Post media" 
            className="rounded-lg w-full h-48 object-cover"
          />
        </div>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="flex items-center mb-4">
          <Hash size={16} className="text-gray-400 mr-2" />
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar size={16} className="mr-2" />
          {formatDate(post.scheduledDate)}
        </div>
        {post.location && (
          <div className="flex items-center">
            <MapPin size={16} className="mr-2" />
            {post.location}
          </div>
        )}
      </div>

      {post.analytics && post.status === 'published' && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{post.analytics.likes}</div>
              <div className="text-xs text-gray-500">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{post.analytics.shares}</div>
              <div className="text-xs text-gray-500">Shares</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{post.analytics.comments}</div>
              <div className="text-xs text-gray-500">Comments</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{post.analytics.reach}</div>
              <div className="text-xs text-gray-500">Reach</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
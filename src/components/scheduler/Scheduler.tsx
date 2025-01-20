import React, { useState } from 'react';
import { CalendarClock } from 'lucide-react';
import { PostForm } from './PostForm';
import { PostCard } from './post/PostCard';
import { useSocialMedia } from '../../hooks/useSocialMedia';
import type { Post, PostFormData } from '../../types';

export function Scheduler() {
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const { schedulePost, isPosting, error } = useSocialMedia();

  const handleSubmit = async (data: PostFormData) => {
    const result = await schedulePost(data);
    if (result) {
      setCurrentPost({
        id: result.postId,
        ...data,
        status: 'scheduled',
        analytics: {
          likes: 0,
          shares: 0,
          comments: 0,
          reach: 0,
        }
      });
    }
  };

  const handleDeletePost = () => {
    setCurrentPost(null);
  };

  const handleEditPost = (post: Post) => {
    // Re-open the form with current post data
    handleSubmit(post);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center space-x-4 mb-8">
        <CalendarClock size={32} className="text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-900">Social Media Scheduler</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Create Post
          </h2>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
          <PostForm 
            onSubmit={handleSubmit}
            isSubmitting={isPosting}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Post</h2>
          {currentPost ? (
            <PostCard
              post={currentPost}
              onDelete={handleDeletePost}
              onEdit={handleEditPost}
            />
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-500">No post scheduled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
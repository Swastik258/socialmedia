import { useState, useCallback } from 'react';
import { socialMediaService } from '../services/socialMedia';
import type { PostFormData } from '../types';

export function useSocialMedia() {
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schedulePost = useCallback(async (data: PostFormData) => {
    setIsPosting(true);
    setError(null);

    try {
      const result = await socialMediaService.schedulePost(
        data.platform,
        data.content,
        data.scheduledDate,
        data.mediaUrl
      );

      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule post');
      return null;
    } finally {
      setIsPosting(false);
    }
  }, []);

  return {
    schedulePost,
    isPosting,
    error,
  };
}
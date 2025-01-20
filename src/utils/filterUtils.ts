import type { Post, FilterOptions } from '../types';
import { isWithinDateRange } from './dateUtils';

export function filterPosts(posts: Post[], filters: FilterOptions): Post[] {
  return posts.filter(post => {
    if (filters.platform && post.platform !== filters.platform) return false;
    if (filters.status && post.status !== filters.status) return false;
    if (!isWithinDateRange(post.scheduledDate, filters.startDate, filters.endDate)) return false;
    return true;
  });
}
export function formatDate(date: Date): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function isWithinDateRange(date: Date, startDate?: Date, endDate?: Date): boolean {
  if (!startDate && !endDate) return true;
  
  const postDate = new Date(date).getTime();
  
  if (startDate && postDate < startDate.getTime()) return false;
  if (endDate && postDate > endDate.getTime()) return false;
  
  return true;
}
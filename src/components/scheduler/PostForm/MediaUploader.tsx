import React, { useCallback } from 'react';
import { Image, X, Upload } from 'lucide-react';
import { socialMediaService } from '../../../services/socialMedia';

interface MediaUploaderProps {
  mediaUrl?: string;
  onMediaChange: (url: string | undefined) => void;
}

export function MediaUploader({ mediaUrl, onMediaChange }: MediaUploaderProps) {
  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const url = await socialMediaService.uploadMedia(file);
      onMediaChange(url);
    } catch (error) {
      console.error('Failed to upload media:', error);
      // You might want to show an error message to the user here
    }
  }, [onMediaChange]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Media
      </label>
      {mediaUrl ? (
        <div className="relative">
          <img
            src={mediaUrl}
            alt="Upload preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => onMediaChange(undefined)}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="block cursor-pointer">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-1 text-sm text-gray-500">Click to upload media</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}
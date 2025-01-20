import React, { useState } from 'react';
import { PlatformConnect } from './PlatformConnect';
import { AlertCircle } from 'lucide-react';
import type { SocialPlatform } from '../../types';

export function SocialMediaIntegration() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<SocialPlatform[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = (platform: SocialPlatform) => {
    try {
      // In a real app, this would trigger OAuth flow
      setConnectedPlatforms(prev => [...prev, platform]);
      setError(null);
    } catch (err) {
      setError('Failed to connect platform. Please try again.');
    }
  };

  const handleDisconnect = (platform: SocialPlatform) => {
    setConnectedPlatforms(prev => prev.filter(p => p !== platform));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Connect Your Social Media Accounts</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
          <AlertCircle className="mr-2" size={20} />
          {error}
        </div>
      )}

      <PlatformConnect 
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        connectedPlatforms={connectedPlatforms}
      />

      {connectedPlatforms.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Connected Accounts</h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {connectedPlatforms.map((platform) => (
              <div 
                key={platform}
                className="flex items-center justify-between p-4 border-b last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 capitalize">{platform[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium capitalize">{platform}</p>
                    <p className="text-sm text-gray-500">Connected</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDisconnect(platform)}
                  className="text-red-500 hover:text-red-600 text-sm font-medium"
                >
                  Disconnect
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
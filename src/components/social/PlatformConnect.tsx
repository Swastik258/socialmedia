import React, { useState } from 'react';
import { Twitter, Facebook, Instagram, Linkedin, Check, Loader2 } from 'lucide-react';
import { socialMediaService } from '../../services/socialMedia';
import type { SocialPlatform } from '../../types';

interface PlatformConnectProps {
  onConnect: (platform: SocialPlatform) => void;
  onDisconnect: (platform: SocialPlatform) => void;
  connectedPlatforms: SocialPlatform[];
}

export function PlatformConnect({ onConnect, onDisconnect, connectedPlatforms }: PlatformConnectProps) {
  const [connecting, setConnecting] = useState<SocialPlatform | null>(null);
  const [error, setError] = useState<string | null>(null);

  const platforms = [
    { 
      id: 'twitter' as SocialPlatform,
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-blue-400 hover:bg-blue-500'
    },
    { 
      id: 'facebook' as SocialPlatform,
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    { 
      id: 'instagram' as SocialPlatform,
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    { 
      id: 'linkedin' as SocialPlatform,
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800'
    }
  ];

  const handleConnect = async (platform: SocialPlatform) => {
    try {
      setConnecting(platform);
      setError(null);
      
      await socialMediaService.connectPlatform(platform);
      onConnect(platform);
    } catch (err) {
      setError('Failed to connect platform. Please try again.');
    } finally {
      setConnecting(null);
    }
  };

  const handleDisconnect = async (platform: SocialPlatform) => {
    try {
      setConnecting(platform);
      await socialMediaService.disconnectPlatform(platform);
      onDisconnect(platform);
    } catch (err) {
      setError('Failed to disconnect. Please try again.');
    } finally {
      setConnecting(null);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform) => {
          const isConnected = connectedPlatforms.includes(platform.id);
          const isLoading = connecting === platform.id;
          
          return (
            <button
              key={platform.id}
              onClick={() => isConnected ? handleDisconnect(platform.id) : handleConnect(platform.id)}
              disabled={isLoading}
              className={`flex items-center justify-between p-4 rounded-lg text-white transition-all ${
                platform.color
              } ${isConnected ? 'opacity-90' : ''} ${isLoading ? 'cursor-wait' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <platform.icon size={24} />
                <span className="font-medium">{platform.name}</span>
              </div>
              
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : isConnected ? (
                <div className="flex items-center space-x-1">
                  <Check size={20} />
                  <span>Connected</span>
                </div>
              ) : (
                <span>Connect</span>
              )}
            </button>
          );
        })}
      </div>

      {connectedPlatforms.length > 0 && (
        <div className="mt-6 space-y-4">
          {connectedPlatforms.map(platform => {
            const status = socialMediaService.getPlatformStatus(platform);
            return (
              <div key={platform} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium capitalize">{platform}</h3>
                    <p className="text-sm text-gray-500">
                      Connected as @{status?.platformData?.username}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {status?.platformData?.followers.toLocaleString()} followers
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
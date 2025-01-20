import React from 'react';
import { Bell, Lock, Palette, Users } from 'lucide-react';
import { SocialMediaIntegration } from '../components/social/SocialMediaIntegration';

export function Settings() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="space-y-8">
          {/* Social Media Integration Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <SocialMediaIntegration />
            </div>
          </div>

          {/* Other Settings Sections */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="text-blue-500" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
              </div>
              {/* Notification settings content */}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="text-blue-500" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">Security</h2>
              </div>
              {/* Security settings content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
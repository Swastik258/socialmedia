import React from 'react';
import { ArrowRight, Calendar, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
               SOCIAL MEDIA
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Schedule, manage, and analyze your social media posts across all platforms from one dashboard.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Started <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"
                alt="Dashboard Preview"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="w-8 h-8 text-blue-500" />,
                title: 'Smart Scheduling',
                description: 'Schedule posts at optimal times to maximize engagement',
              },
              {
                icon: <Globe className="w-8 h-8 text-blue-500" />,
                title: 'Multi-Platform Support',
                description: 'Manage all your social media accounts in one place',
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-500" />,
                title: 'Analytics & Insights',
                description: 'Track performance and optimize your social strategy',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-200">
                <div className="inline-block p-3 bg-blue-50 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

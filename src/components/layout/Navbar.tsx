import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarClock, BarChart2, Calendar, Settings } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/analytics', label: 'Analytics', icon: BarChart2 },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className={`${isHome ? 'absolute top-0 left-0 right-0 text-white' : 'bg-white border-b'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <CalendarClock size={28} />
            <span className="text-xl font-bold">SocialScheduler</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium hover:text-blue-500 transition-colors ${
                  location.pathname === item.path ? 'text-blue-500' : ''
                }`}
              >
                <span className="flex items-center space-x-1">
                  {item.icon && <item.icon size={16} />}
                  <span>{item.label}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
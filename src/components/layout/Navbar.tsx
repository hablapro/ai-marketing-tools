import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, LogIn } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks';

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/img/renzo-logo.png"
                alt="Renzo Proano"
                className="w-[250px] rounded-full object-cover"
              />
              <span className="ml-3 text-3xl font-semibold text-gray-900">AI Tools</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <Link
                to="/admin"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 py-2"
              >
                Admin Dashboard
              </Link>
            )}
            {!user && (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
            <a
              href="https://linkedin.com/in/renzoproano"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
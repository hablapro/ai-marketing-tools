import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks';

export function Navbar() {
  const { user, userRole, displayName, signOut } = useAuth();
  const navigate = useNavigate();

  const isAdmin = userRole === 'admin';

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <a
            href="https://renzoproano.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:opacity-90 transition-opacity"
          >
            <img
              src="/img/rp_logo_black.png"
              alt="Renzo Proano"
              className="object-contain"
              style={{ height: '67.2px' }}
            />
          </a>

          {/* Right Navigation */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* AI Tools Link */}
            <a
              href="https://ai-tools-platform.netlify.app/"
              className="hidden sm:inline text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              AI Tools
            </a>

            {/* My Results Link - only show when logged in */}
            {user && (
              <Link
                to="/my-results"
                className="hidden sm:inline text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                My Results
              </Link>
            )}

            {/* Admin Dashboard - only show when logged in and admin */}
            {user && isAdmin && (
              <Link
                to="/admin"
                className="hidden sm:text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                Admin
              </Link>
            )}

            {/* User greeting - only show when logged in */}
            {user && displayName && (
              <span className="hidden sm:inline text-xs text-gray-600 font-medium">
                {displayName}
              </span>
            )}

            {/* FREE WORKSHOPS Button */}
            <a
              href="https://renzoproano.com/workshops"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex px-4 py-2 bg-[#0F1B3C] text-white rounded-full hover:bg-[#1a2847] transition-colors text-sm font-bold"
            >
              FREE WORKSHOPS
            </a>

            {/* GET IN TOUCH Button */}
            <a
              href="https://renzoproano.com/get-in-touch/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition-colors text-sm font-bold"
            >
              GET IN TOUCH
              <ArrowUpRight className="h-4 w-4" />
            </a>

            {/* LinkedIn Icon */}
            <a
              href="https://linkedin.com/in/renzoproano"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>

            {/* Logout Button - only show when logged in */}
            {user && (
              <button
                onClick={handleLogout}
                className="inline-flex sm:hidden px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            )}

            {/* Login/Signup - only show when logged out */}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
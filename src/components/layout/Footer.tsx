import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Renzo Proano</h3>
            <p className="text-gray-400">
              Expert digital marketing services, specializing in crafting impactful social media marketing strategies that drive growth and engagement.
            </p>
          </div>

          {/* Column 2 - Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact</h3>
            <div className="space-y-2">
              <a href="mailto:hello@renzoproano.com" className="block text-gray-400 hover:text-white transition-colors duration-200">
                hello@renzoproano.com
              </a>
              <a href="https://instagram.com/renzo.proano" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors duration-200">
                @renzo.proano
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            Copyright © 2024 Renzo Proano – All rights reserved. Developed by Berelvant.
          </p>
        </div>
      </div>
    </footer>
  );
}
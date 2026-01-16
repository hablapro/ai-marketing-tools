import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollClick: () => void;
  onPrimaryActionClick: () => void;
  tool: {
    title: string;
    description: string;
    primaryCTA: string;
  };
}

export function HeroSection({ onScrollClick, onPrimaryActionClick, tool }: HeroSectionProps) {
  // Generate encoded share URLs for social media
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(`${tool.title} - ${tool.description}`);

  // Handle social media sharing
  const handleShare = (platform: string) => {
    let shareLink = '';
    
    // Configure share links for different platforms
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      default:
        return;
    }

    // Open share dialog in a popup window
    window.open(shareLink, '_blank', 'width=600,height=400,centerscreen=yes');
  };

  return (
    // Main hero container with dark background and grid pattern
    <div className="relative min-h-[600px] flex items-center justify-center bg-[#0A0B1E] py-24">
      {/* Decorative grid background with low opacity */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      
      {/* Content container with maximum width and centered alignment */}
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Accent text above main heading */}
        <p className="text-red-400 font-medium tracking-wider uppercase text-sm mb-8">
          JOIN THE TRANSFORMATION
        </p>

        {/* Main heading with responsive font sizes */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tight">
          {tool.title}
        </h1>

        {/* Description text container with maximum width */}
        <div className="max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Call-to-action buttons container */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA button */}
          <button
            onClick={onPrimaryActionClick}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-[#0A0B1E] bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            {tool.primaryCTA}
          </button>
          
          {/* Secondary "How it works" button with animation */}
          <button
            onClick={onScrollClick}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-transparent border-2 border-white/20 rounded-full hover:bg-white/10 transition-colors duration-200 group gap-2"
          >
            HOW IT WORKS
            <ChevronDown className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Social sharing section */}
        <div className="mt-16">
          <p className="text-gray-400 text-sm mb-3">Share it:</p>
          <div className="flex items-center justify-center gap-4">
            {/* Facebook share button */}
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Share on Facebook"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
              </svg>
            </button>
            {/* Twitter share button */}
            <button
              onClick={() => handleShare('twitter')}
              className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Share on Twitter"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.58v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
              </svg>
            </button>
            {/* LinkedIn share button */}
            <button
              onClick={() => handleShare('linkedin')}
              className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Share on LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
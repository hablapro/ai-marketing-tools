import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesGrid } from '../components/landing/FeaturesGrid';
import { HowItWorks } from '../components/landing/HowItWorks';
import { ToolsShowcase } from '../components/landing/ToolsShowcase';
import { CTASection } from '../components/landing/CTASection';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F1B3C] text-white overflow-x-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1B3C] via-[#1a2847] to-[#0F1B3C]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6B5BFF]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-[#6B5BFF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#6B5BFF]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <HeroSection />
      <FeaturesGrid />
      <HowItWorks />
      <ToolsShowcase />
      <CTASection />
    </div>
  );
}

export default LandingPage;

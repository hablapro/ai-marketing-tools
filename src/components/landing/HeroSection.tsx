import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';

export function HeroSection() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCTA = () => {
    if (user) {
      navigate('/tools');
    } else {
      navigate('/signup');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32 overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-40 h-40 border border-[#6B5BFF]/30 rounded-3xl"
        />
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 right-20 w-64 h-64 border border-[#6B5BFF]/20 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, linear: true }}
          className="absolute top-1/2 right-1/4 w-32 h-32 border border-[#6B5BFF]/15 rounded-3xl"
          style={{ transform: 'translate(50%, -50%)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#6B5BFF]/40 bg-[#6B5BFF]/10 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-[#6B5BFF]" />
          <span className="text-sm font-medium text-[#6B5BFF]">
            Free AI Tools by Renzo Proano
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          style={{
            background: 'linear-gradient(135deg, #6B5BFF 0%, #8B7BFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          AI Tools for<br />
          <span className="text-white">Smarter Marketing</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Free tools built for ambitious brands. Generate compelling copy, strategic insights, and creative content powered by AI. Created by Renzo Proano, a performance marketing strategist obsessed with data, creativity, and growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button
            onClick={handleCTA}
            className="group relative px-8 py-4 bg-[#6B5BFF] text-white font-bold rounded-xl overflow-hidden shadow-2xl hover:shadow-[#6B5BFF]/50 transition-all duration-300 flex items-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start For Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => document.getElementById('tools-showcase')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-gray-600 text-white font-bold rounded-xl hover:border-[#6B5BFF] hover:bg-[#6B5BFF]/10 transition-all duration-300"
          >
            Explore Tools
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-slate-800"
        >
          {[
            { number: '8', label: 'AI Tools' },
            { number: 'Free', label: 'Always' },
            { number: '0', label: 'Credit Card Required' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#6B5BFF]">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-gray-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

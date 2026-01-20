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
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12 overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-40 h-40 border border-cyan-500/20 rounded-3xl"
        />
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 right-20 w-64 h-64 border border-magenta-500/20 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, linear: true }}
          className="absolute top-1/2 right-1/4 w-32 h-32 border border-orange-500/10 rounded-3xl"
          style={{ transform: 'translate(50%, -50%)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
            AI-Powered Marketing Tools
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #ec4899 50%, #f97316 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Transform Your Marketing
          <br />
          <span className="text-white">with AI</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Generate compelling copy, craft winning strategies, and elevate your brand—all powered by cutting-edge AI. Free to start.
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
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white font-bold rounded-xl overflow-hidden shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start For Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => document.getElementById('tools-showcase')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-slate-600 text-white font-bold rounded-xl hover:border-cyan-500 hover:bg-cyan-500/5 transition-all duration-300"
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
            { number: '1000+', label: 'Users' },
            { number: '100%', label: 'Free to Try' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-slate-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

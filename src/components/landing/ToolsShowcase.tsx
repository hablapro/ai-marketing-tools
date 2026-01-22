import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';

const tools = [
  { name: 'Business Idea Evaluator', icon: '💡', url: '/tools/business-idea', color: 'from-cyan-500 to-blue-500' },
  { name: 'Business Plan', icon: '📋', url: '/tools/business-plan', color: 'from-magenta-500 to-purple-500' },
  { name: 'Pitch Genie', icon: '🎤', url: '/tools/pitch-genie', color: 'from-orange-500 to-red-500' },
  { name: 'Hero Genie', icon: '⚡', url: '/tools/hero-genie', color: 'from-yellow-500 to-orange-500' },
  { name: 'SEO Audit', icon: '🔍', url: '/tools/seo-audit', color: 'from-green-500 to-emerald-500' },
  { name: 'Facebook Ad Copy', icon: '📱', url: '/tools/facebook-ad-copy', color: 'from-blue-500 to-cyan-500' },
  { name: 'Reel Genie', icon: '🎬', url: '/tools/reel-optimizer', color: 'from-pink-500 to-magenta-500' },
  { name: 'Email Wizard', icon: '✉️', url: '/tools/email-wizard', color: 'from-indigo-500 to-purple-500', soon: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ToolsShowcase() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  console.log('ToolsShowcase rendered:', { user, loading, userEmail: user?.email });

  const handleToolClick = (toolUrl: string, soon?: boolean) => {
    console.log('Tool clicked:', toolUrl, 'User:', user?.email);
    if (soon) return;
    navigate(toolUrl);
  };

  return (
    <section id="tools-showcase" className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            All <span className="text-[#6B5BFF]">8 Tools</span>
          </h2>
          <p className="text-lg text-gray-400">Everything you need for better marketing results</p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={!tool.soon ? { y: -8 } : {}}
              onClick={() => handleToolClick(tool.url, tool.soon)}
              style={{ cursor: tool.soon ? 'not-allowed' : 'pointer' }}
              className={`group relative p-6 rounded-2xl border border-gray-700 bg-gradient-to-br from-[#1a2847]/40 to-[#0F1B3C]/20 backdrop-blur-md transition-all duration-300 ${
                !tool.soon ? 'hover:border-[#6B5BFF]/50' : 'opacity-60'
              }`}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-lg pointer-events-none ${!tool.soon ? 'bg-gradient-to-br from-[#6B5BFF] to-[#8B7BFF]' : ''}`} style={{ zIndex: -1 }} />

              {/* Icon */}
              <div className="text-5xl mb-4">{tool.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-3 text-white transition-all duration-300">
                {tool.name}
              </h3>

              {/* Description / Soon Badge */}
              <div className="flex items-center justify-between">
                {tool.soon ? (
                  <span className="text-sm font-medium text-amber-400">Coming Soon</span>
                ) : (
                  <>
                    <span className="text-sm text-gray-400">Try Now</span>
                    <ArrowRight className="w-5 h-5 text-[#6B5BFF] group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>

              {/* Lock icon for coming soon */}
              {tool.soon && (
                <div className="absolute top-4 right-4">
                  <Lock className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <button
            onClick={() => {
              if (user) {
                navigate('/tools');
              } else {
                navigate('/signup');
              }
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#6B5BFF] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#6B5BFF]/50 transition-all duration-300"
          >
            Explore All Tools
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

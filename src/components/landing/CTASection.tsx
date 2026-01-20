import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';

const benefits = [
  'Start completely free',
  'No credit card required',
  'Instant results',
  'Professional quality',
];

export function CTASection() {
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
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Background gradient elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-magenta-500/10 to-orange-500/10 rounded-3xl blur-2xl"
          />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-10 text-center"
        >
          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="block mb-2">Ready to Transform</span>
            <span className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-orange-400 bg-clip-text text-transparent">
              Your Marketing Strategy?
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of marketers using AI-powered tools to create compelling campaigns, strategies, and content. Start free today.
          </p>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 mb-12 flex-wrap"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-magenta-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={handleCTA}
              className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white font-bold text-lg rounded-xl overflow-hidden shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {user ? 'Go to Tools' : 'Start For Free'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => document.getElementById('tools-showcase')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 border-2 border-slate-600 text-white font-bold text-lg rounded-xl hover:border-cyan-500 hover:bg-cyan-500/5 transition-all duration-300"
            >
              Learn More
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-slate-800"
          >
            <p className="text-sm text-slate-500 mb-4">Trusted by marketers worldwide</p>
            <div className="flex justify-center gap-8 items-center">
              {['Fast', 'Secure', 'Free'].map((badge, index) => (
                <div key={index} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-xs font-medium text-slate-400">{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

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
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Background gradient elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-[#6B5BFF]/15 via-[#6B5BFF]/10 to-[#6B5BFF]/5 rounded-3xl blur-2xl"
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
            <span className="block mb-2">Ready to Elevate</span>
            <span className="text-[#6B5BFF]">
              Your Marketing?
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get instant access to AI tools built by a performance marketer. No credit card, no complexity. Just better results.
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
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6B5BFF] to-[#8B7BFF] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300">{benefit}</span>
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
              className="group relative px-10 py-5 bg-[#6B5BFF] text-white font-bold text-lg rounded-xl overflow-hidden shadow-2xl hover:shadow-[#6B5BFF]/50 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {user ? 'Go to Tools' : 'Start For Free'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => document.getElementById('tools-showcase')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 border-2 border-gray-600 text-white font-bold text-lg rounded-xl hover:border-[#6B5BFF] hover:bg-[#6B5BFF]/10 transition-all duration-300"
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
            className="mt-16 pt-8 border-t border-gray-700"
          >
            <p className="text-sm text-gray-500 mb-4">Built with intention for ambitious brands</p>
            <div className="flex justify-center gap-8 items-center flex-wrap">
              {['Built by a Strategist', 'Always Free', 'Zero Complexity'].map((badge, index) => (
                <div key={index} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a2847]/50 border border-gray-700">
                  <div className="w-2 h-2 rounded-full bg-[#6B5BFF]" />
                  <span className="text-xs font-medium text-gray-400">{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

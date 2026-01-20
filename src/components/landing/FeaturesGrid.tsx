import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Brain, Gauge, Shield } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Built for Performance',
    description: 'Tools designed by a performance marketer obsessed with results. Every tool solves a real marketing problem.',
    gradient: 'from-[#6B5BFF] to-[#8B7BFF]',
  },
  {
    icon: Brain,
    title: 'AI-Powered Intelligence',
    description: 'Leveraging advanced AI to generate strategic insights, compelling copy, and data-driven recommendations.',
    gradient: 'from-[#6B5BFF] to-[#8B7BFF]',
  },
  {
    icon: Gauge,
    title: 'Simple & Effective',
    description: 'No complexity. Fill in your details, get professional-grade marketing results in seconds.',
    gradient: 'from-[#6B5BFF] to-[#8B7BFF]',
  },
  {
    icon: Shield,
    title: 'Completely Free',
    description: 'No hidden costs, no credit card required. Built to help ambitious brands scale smarter.',
    gradient: 'from-[#6B5BFF] to-[#8B7BFF]',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function FeaturesGrid() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
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
            Why These <span className="text-[#6B5BFF]">Tools Matter</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Designed by a strategist who's managed $300M+ in ad spend
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="group">
                <div className="relative h-full p-8 rounded-2xl border border-gray-700 bg-[#1a2847]/40 backdrop-blur-md hover:border-[#6B5BFF]/50 transition-all duration-300 overflow-hidden">
                  {/* Gradient border effect on hover */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl`}
                    style={{
                      background: `linear-gradient(135deg, ${feature.gradient})`,
                      padding: '1px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-full h-full text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

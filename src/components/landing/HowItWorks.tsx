import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Choose Your Tool',
    description: 'Select from 8 powerful AI tools designed for different marketing needs. From business ideas to social media content.',
    icon: '🎯',
  },
  {
    number: 2,
    title: 'Fill in Your Details',
    description: 'Provide your business information or content ideas. Our AI understands context and requirements.',
    icon: '✍️',
  },
  {
    number: 3,
    title: 'Get AI Results',
    description: 'Receive professionally crafted content, strategies, and insights in seconds. Ready to use immediately.',
    icon: '✨',
  },
];

export function HowItWorks() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            How It <span className="text-[#6B5BFF]">Works</span>
          </h2>
          <p className="text-lg text-gray-400">Three simple steps to better marketing</p>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#6B5BFF]/0 via-[#6B5BFF]/50 to-[#6B5BFF]/0" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Card */}
                <div className="text-center md:text-left">
                  {/* Number Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="inline-block mb-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#6B5BFF]/30 to-[#8B7BFF]/20 border-2 border-[#6B5BFF]/50 flex items-center justify-center font-black text-2xl text-[#6B5BFF]"
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <div className="text-5xl mb-4">{step.icon}</div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-16 top-16 text-[#6B5BFF]/30">
                    <ArrowRight className="w-12 h-12" strokeWidth={1.5} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="text-gray-400 mb-6">
            Ready to elevate your marketing? Pick any of our 8 tools and start right now.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#6B5BFF]/40 bg-[#6B5BFF]/10">
            <span className="w-2 h-2 rounded-full bg-[#6B5BFF] animate-pulse" />
            <span className="text-sm font-medium text-[#6B5BFF]">100% Free • No Credit Card</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            How It <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg text-slate-400">Three simple steps to transform your marketing</p>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-magenta-500/0" />

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
                    className="inline-block mb-6 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 border-2 border-cyan-500/30 flex items-center justify-center font-black text-2xl text-cyan-400"
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <div className="text-5xl mb-4">{step.icon}</div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-16 top-16 text-cyan-500/30">
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
          className="mt-20 text-center"
        >
          <p className="text-slate-400 mb-6">
            Ready to supercharge your marketing? Start with any of our 8 powerful tools.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-medium text-cyan-300">100% Free • No Credit Card Required</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

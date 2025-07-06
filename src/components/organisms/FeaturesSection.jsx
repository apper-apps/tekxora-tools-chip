import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const features = [
    {
      icon: 'Gamepad2',
      title: 'Game Prompt Generator',
      description: 'Create detailed game development prompts using our OMFF analysis framework. Get comprehensive blueprints for your game ideas.',
      gradient: 'from-primary to-purple-600'
    },
    {
      icon: 'Globe',
      title: 'Website Builder Prompts',
      description: 'Generate technical specifications and development roadmaps for websites. Choose your tech stack and get detailed requirements.',
      gradient: 'from-secondary to-pink-600'
    },
    {
      icon: 'Zap',
      title: 'Credit-Based System',
      description: 'Flexible pricing with three tiers. Use credits only when you generate content. No waste, maximum value for your investment.',
      gradient: 'from-accent to-purple-500'
    },
    {
      icon: 'Brain',
      title: 'Multiple AI Models',
      description: 'Access to Gemini, OpenAI, and Deepseek models. Choose the best AI for your specific needs and requirements.',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      icon: 'Sparkles',
      title: 'Smart Suggestions',
      description: 'Get AI-powered suggestions to enhance your prompts. Iteratively improve your project specifications.',
      gradient: 'from-green-500 to-emerald-400'
    },
    {
      icon: 'Shield',
      title: 'Admin Control',
      description: 'Complete administrative control over AI models, costs, and system settings. Manage your platform effortlessly.',
      gradient: 'from-orange-500 to-red-400'
    }
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(139,92,246,0.1),transparent)]"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to transform your creative ideas into detailed development specifications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card hover glow animated className="h-full">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4`}>
                  <ApperIcon name={feature.icon} size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Animated Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
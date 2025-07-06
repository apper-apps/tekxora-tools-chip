import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'month',
      credits: 300,
      description: 'Perfect for trying out our AI tools',
      features: [
        '300 credits per month',
        'Access to all tools',
        'Basic AI models',
        'Community support',
        'Standard generation speed'
      ],
      popular: false,
      gradient: 'from-gray-600 to-gray-700'
    },
    {
      name: 'Standard',
      price: '$19',
      period: 'month',
      credits: 500,
      description: 'Great for regular creators and developers',
      features: [
        '500 credits per month',
        'Access to all tools',
        'Premium AI models',
        'Priority support',
        'Faster generation speed',
        'Export to multiple formats'
      ],
      popular: true,
      gradient: 'from-primary to-purple-600'
    },
    {
      name: 'Premium',
      price: '$49',
      period: 'month',
      credits: 1000,
      description: 'For power users and teams',
      features: [
        '1000 credits per month',
        'Access to all tools',
        'All AI models including latest',
        'Priority support',
        'Fastest generation speed',
        'Advanced customization',
        'API access',
        'Team collaboration'
      ],
      popular: false,
      gradient: 'from-secondary to-pink-600'
    }
  ];

  return (
    <section ref={ref} id="pricing" className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_300px,rgba(236,72,153,0.1),transparent)]"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose the plan that fits your needs. Start free and upgrade as you grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-sm font-medium text-white">
                    Most Popular
                  </div>
                </div>
              )}
              
              <Card 
                hover 
                glow={plan.popular} 
                animated={plan.popular}
                className={`h-full ${plan.popular ? 'scale-105' : ''}`}
              >
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <ApperIcon name="Zap" size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  </div>
                  <div className="text-primary font-semibold mt-2">
                    {plan.credits} credits/month
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <ApperIcon name="Check" size={16} className="text-success mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Link to="/signup">
                    <Button 
                      variant={plan.popular ? "primary" : "secondary"}
                      size="lg"
                      className="w-full"
                    >
                      {plan.name === 'Free' ? 'Get Started' : 'Choose Plan'}
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Shield" size={20} />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="RefreshCw" size={20} />
              <span className="text-sm">Cancel Anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Headphones" size={20} />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
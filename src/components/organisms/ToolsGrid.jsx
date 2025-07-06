import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const ToolsGrid = ({ tools = [], showAll = false }) => {
  const defaultTools = [
    {
      Id: 1,
      name: 'HTML Game Prompt Generator',
      slug: 'game-prompt-generator',
      description: 'Generate comprehensive game development prompts using our OMFF analysis framework. Perfect for creating detailed game specifications.',
      icon: 'Gamepad2',
      gradient: 'from-primary to-purple-600',
      credits: '40-60 credits',
      features: ['OMFF Analysis', 'Suggestion System', 'Export Options']
    },
    {
      Id: 2,
      name: 'AI Website Prompt Generator',
      slug: 'website-prompt-generator',
      description: 'Create detailed website development prompts with technical specifications. Choose your tech stack and get comprehensive requirements.',
      icon: 'Globe',
      gradient: 'from-secondary to-pink-600',
      credits: '40-60 credits',
      features: ['Tech Stack Selection', 'Feature Planning', 'Page Structure']
    }
  ];

  const displayTools = tools.length > 0 ? tools : defaultTools;
  const visibleTools = showAll ? displayTools : displayTools.slice(0, 2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {visibleTools.map((tool, index) => (
        <motion.div
          key={tool.Id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card hover glow animated className="h-full flex flex-col">
            <div className={`w-12 h-12 bg-gradient-to-r ${tool.gradient} rounded-lg flex items-center justify-center mb-4`}>
              <ApperIcon name={tool.icon} size={24} className="text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3">
              {tool.name}
            </h3>
            
            <p className="text-gray-300 mb-4 flex-grow">
              {tool.description}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Cost per use:</span>
                <span className="text-primary font-semibold">{tool.credits}</span>
              </div>
              
              {tool.features && (
                <div className="space-y-2">
                  {tool.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-300">
                      <ApperIcon name="Check" size={14} className="text-success mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <Link to={`/tools/${tool.slug}`}>
                <Button variant="primary" className="w-full" icon="ArrowRight">
                  Use Tool
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ToolsGrid;
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Logo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 32, text: 'text-xl' },
    lg: { icon: 40, text: 'text-2xl' },
    xl: { icon: 48, text: 'text-3xl' }
  };

  return (
    <motion.div 
      className={`flex items-center space-x-3 ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
          <ApperIcon name="Zap" size={sizes[size].icon} className="text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
      </div>
      <span className={`font-display font-bold gradient-text ${sizes[size].text}`}>
        Tekxora
      </span>
    </motion.div>
  );
};

export default Logo;
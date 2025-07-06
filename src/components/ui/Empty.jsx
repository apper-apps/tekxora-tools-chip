import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  icon = 'Search', 
  title = 'No data found', 
  description = 'There are no items to display at the moment.',
  action,
  className = '' 
}) => {
  return (
    <motion.div 
      className={`flex flex-col items-center justify-center py-12 px-6 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 floating-element">
          <ApperIcon name={icon} size={48} className="text-primary" />
        </div>
        
        <h3 className="text-2xl font-display font-semibold gradient-text mb-3">
          {title}
        </h3>
        
        <p className="text-gray-400 mb-8 leading-relaxed">
          {description}
        </p>
        
        {action && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {action}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;
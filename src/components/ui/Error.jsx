import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message, onRetry, className = '' }) => {
  return (
    <motion.div 
      className={`flex flex-col items-center justify-center py-12 px-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-card p-8 text-center max-w-md">
        <div className="w-16 h-16 bg-gradient-to-r from-error to-warning rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertTriangle" size={32} className="text-white" />
        </div>
        
        <h3 className="text-xl font-display font-semibold text-white mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-300 mb-6">
          {message || "We encountered an unexpected error. Please try again."}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="neon-button inline-flex items-center space-x-2"
          >
            <ApperIcon name="RefreshCw" size={20} />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;
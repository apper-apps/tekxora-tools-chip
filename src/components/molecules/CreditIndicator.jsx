import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const CreditIndicator = ({ credits, maxCredits, className = '' }) => {
  const percentage = (credits / maxCredits) * 100;
  
  const getColor = () => {
    if (percentage > 60) return 'from-success to-green-400';
    if (percentage > 30) return 'from-warning to-yellow-400';
    return 'from-error to-red-400';
  };

  return (
    <div className={`glass-card p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Zap" size={20} className="text-primary" />
          <span className="text-sm font-medium text-gray-300">Credits</span>
        </div>
        <span className="text-lg font-bold text-white">
          {credits}/{maxCredits}
        </span>
      </div>
      
      <div className="credit-progress">
        <motion.div
          className={`credit-progress-fill bg-gradient-to-r ${getColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      <p className="text-xs text-gray-400 mt-2">
        {percentage.toFixed(1)}% remaining
      </p>
    </div>
  );
};

export default CreditIndicator;
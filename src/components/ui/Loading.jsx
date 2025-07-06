import { motion } from 'framer-motion';

const Loading = ({ type = 'default', className = '' }) => {
  if (type === 'skeleton') {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-card p-6 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-700 rounded-lg shimmer"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded shimmer"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4 shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <motion.div 
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-16 h-16 border-4 border-gray-700 border-t-primary rounded-full"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-secondary rounded-full animate-spin"></div>
      </motion.div>
    </div>
  );
};

export default Loading;
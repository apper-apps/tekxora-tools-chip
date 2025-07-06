import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = "relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";
  
  const variants = {
    primary: "neon-button text-white",
    secondary: "glass-button text-white hover:bg-white/10",
    ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/5",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:shadow-lg hover:shadow-error/25"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };
  
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className={`flex items-center space-x-2 ${loading ? 'opacity-0' : ''}`}>
        {icon && iconPosition === 'left' && (
          <ApperIcon name={icon} size={iconSizes[size]} />
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <ApperIcon name={icon} size={iconSizes[size]} />
        )}
      </div>
    </motion.button>
  );
};

export default Button;
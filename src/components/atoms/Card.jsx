import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  glow = false,
  animated = false,
  ...props 
}) => {
  const baseClasses = "glass-card p-6";
  const hoverClasses = hover ? "hover:bg-white/10 cursor-pointer" : "";
  const glowClasses = glow ? "glow-effect" : "";
  const animatedClasses = animated ? "animated-border" : "";

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${glowClasses} ${animatedClasses} ${className}`}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
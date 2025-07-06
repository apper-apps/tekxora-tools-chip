import { motion } from 'framer-motion';
import HeroSection from '@/components/organisms/HeroSection';
import FeaturesSection from '@/components/organisms/FeaturesSection';
import PricingSection from '@/components/organisms/PricingSection';
import ToolsGrid from '@/components/organisms/ToolsGrid';

const Homepage = () => {
  return (
    <div className="pt-16">
      <HeroSection />
      
      {/* Tools Preview Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              AI-Powered <span className="gradient-text">Tools</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your creative ideas into detailed development specifications with our intelligent AI tools.
            </p>
          </motion.div>
          
          <ToolsGrid />
        </div>
      </section>
      
      <FeaturesSection />
      <PricingSection />
    </div>
  );
};

export default Homepage;
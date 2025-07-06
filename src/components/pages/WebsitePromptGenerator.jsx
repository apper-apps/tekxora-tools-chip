import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { websitePromptService } from '@/services/api/websitePromptService';
import { usageService } from '@/services/api/usageService';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Loading from '@/components/ui/Loading';
import ApperIcon from '@/components/ApperIcon';

const WebsitePromptGenerator = () => {
  const { user, updateUserCredits } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    websiteName: '',
    websiteIdea: '',
    techStack: '',
    customTech: '',
    pages: [],
    features: [],
    additionalRequirements: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [usageCount, setUsageCount] = useState(0);

  const techStacks = [
    'WordPress Theme',
    'Core PHP',
    'Laravel',
    'Next.js',
    'React',
    'Vue.js',
    'Node.js',
    'Django',
    'Other'
  ];

  const commonPages = [
    'Home',
    'About',
    'Services',
    'Contact',
    'Blog',
    'Portfolio',
    'Products',
    'FAQ',
    'Terms',
    'Privacy'
  ];

  const commonFeatures = [
    'Contact Form',
    'Newsletter Signup',
    'Social Media Integration',
    'SEO Optimization',
    'Responsive Design',
    'User Authentication',
    'Payment Gateway',
    'Search Functionality',
    'Content Management',
    'Analytics Integration'
  ];

  useEffect(() => {
    if (!user) {
      const count = localStorage.getItem('websitePromptUsage') || 0;
      setUsageCount(parseInt(count));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleArrayToggle = (array, item) => {
    setFormData({
      ...formData,
      [array]: formData[array].includes(item)
        ? formData[array].filter(i => i !== item)
        : [...formData[array], item]
    });
  };

  const handleNextStep = () => {
    if (step === 1 && (!formData.websiteName.trim() || !formData.websiteIdea.trim())) {
      toast.error('Please fill in all fields');
      return;
    }
    if (step === 2 && !formData.techStack) {
      toast.error('Please select a technology stack');
      return;
    }
    if (step === 3 && formData.pages.length === 0) {
      toast.error('Please select at least one page');
      return;
    }
    if (step === 4 && formData.features.length === 0) {
      toast.error('Please select at least one feature');
      return;
    }
    
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleGenerate = async () => {
    if (!user && usageCount >= 5) {
      toast.error('Please sign up to continue using this tool');
      return;
    }

    if (user && user.credits < 40) {
      toast.error('Insufficient credits');
      return;
    }

    setLoading(true);

    try {
      const response = await websitePromptService.generatePrompt(formData, user?.id);

      setResult(response.prompt);
      
      if (user) {
        updateUserCredits(response.creditsUsed);
        await usageService.recordUsage(user.id, 2, response.creditsUsed);
      } else {
        const newUsageCount = usageCount + 1;
        setUsageCount(newUsageCount);
        localStorage.setItem('websitePromptUsage', newUsageCount.toString());
      }

      toast.success('Website prompt generated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to generate prompt');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(result);
    toast.success('Prompt copied to clipboard!');
  };

  const handleRestart = () => {
    setStep(1);
    setFormData({
      websiteName: '',
      websiteIdea: '',
      techStack: '',
      customTech: '',
      pages: [],
      features: [],
      additionalRequirements: ''
    });
    setResult(null);
  };

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-secondary to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Globe" size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            AI Website Prompt Generator
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Create detailed website development prompts with technical specifications
          </p>
        </motion.div>

        {/* Usage Warning for Non-logged Users */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                Free Trial: {5 - usageCount} uses remaining
              </h3>
              <p className="text-gray-400">
                Sign up for unlimited access to all tools
              </p>
            </Card>
          </motion.div>
        )}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">
              Step {step} of 5
            </span>
            <span className="text-sm font-medium text-gray-300">
              {Math.round((step / 5) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-secondary to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {result ? (
          /* Result Display */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Generated Website Prompt</h2>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyPrompt}
                    icon="Copy"
                  >
                    Copy
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleRestart}
                    icon="RotateCcw"
                  >
                    New Prompt
                  </Button>
                </div>
              </div>
              
              <div className="bg-surface/30 rounded-lg p-4">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                  {result}
                </pre>
              </div>
            </Card>
          </motion.div>
        ) : (
          /* Multi-step Form */
          <div className="max-w-2xl mx-auto">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key="step1"
              >
                <Card>
                  <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
                  
                  <div className="space-y-6">
                    <Input
                      label="Website Name"
                      name="websiteName"
                      value={formData.websiteName}
                      onChange={handleChange}
                      placeholder="Enter your website name"
                      icon="Type"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Website Idea
                      </label>
                      <textarea
                        name="websiteIdea"
                        value={formData.websiteIdea}
                        onChange={handleChange}
                        placeholder="Describe your website idea and purpose..."
                        className="w-full px-4 py-3 bg-surface/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20 resize-none"
                        rows="6"
                      />
                    </div>

                    <Button onClick={handleNextStep} className="w-full">
                      Next Step
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key="step2"
              >
                <Card>
                  <h2 className="text-xl font-bold text-white mb-6">Technology Stack</h2>
                  
                  <div className="space-y-4">
                    {techStacks.map((tech) => (
                      <label key={tech} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="techStack"
                          value={tech}
                          checked={formData.techStack === tech}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary bg-surface border-gray-600 focus:ring-primary"
                        />
                        <span className="text-gray-300">{tech}</span>
                      </label>
                    ))}
                  </div>

                  {formData.techStack === 'Other' && (
                    <div className="mt-4">
                      <Input
                        label="Custom Technology"
                        name="customTech"
                        value={formData.customTech}
                        onChange={handleChange}
                        placeholder="Specify your technology stack"
                      />
                    </div>
                  )}

                  <div className="flex space-x-4 mt-6">
                    <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                      Previous
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1">
                      Next Step
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key="step3"
              >
                <Card>
                  <h2 className="text-xl font-bold text-white mb-6">Pages to Include</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {commonPages.map((page) => (
                      <label key={page} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.pages.includes(page)}
                          onChange={() => handleArrayToggle('pages', page)}
                          className="w-4 h-4 text-primary bg-surface border-gray-600 rounded focus:ring-primary"
                        />
                        <span className="text-gray-300">{page}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex space-x-4 mt-6">
                    <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                      Previous
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1">
                      Next Step
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key="step4"
              >
                <Card>
                  <h2 className="text-xl font-bold text-white mb-6">Features to Include</h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {commonFeatures.map((feature) => (
                      <label key={feature} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.features.includes(feature)}
                          onChange={() => handleArrayToggle('features', feature)}
                          className="w-4 h-4 text-primary bg-surface border-gray-600 rounded focus:ring-primary"
                        />
                        <span className="text-gray-300">{feature}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex space-x-4 mt-6">
                    <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                      Previous
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1">
                      Next Step
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key="step5"
              >
                <Card>
                  <h2 className="text-xl font-bold text-white mb-6">Additional Requirements</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Additional Requirements (Optional)
                      </label>
                      <textarea
                        name="additionalRequirements"
                        value={formData.additionalRequirements}
                        onChange={handleChange}
                        placeholder="Any specific requirements, design preferences, or technical specifications..."
                        className="w-full px-4 py-3 bg-surface/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20 resize-none"
                        rows="6"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                        Previous
                      </Button>
                      <Button onClick={handleGenerate} loading={loading} className="flex-1">
                        Generate Prompt
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsitePromptGenerator;
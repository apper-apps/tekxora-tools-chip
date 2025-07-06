import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { gamePromptService } from '@/services/api/gamePromptService';
import { usageService } from '@/services/api/usageService';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Loading from '@/components/ui/Loading';
import ApperIcon from '@/components/ApperIcon';

const GamePromptGenerator = () => {
  const { user, updateUserCredits } = useAuth();
  const [formData, setFormData] = useState({
    gameName: '',
    gameIdea: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    if (!user) {
      // Load usage count for guest users
      const count = localStorage.getItem('gamePromptUsage') || 0;
      setUsageCount(parseInt(count));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSuggestionToggle = (suggestion) => {
    setSelectedSuggestions(prev => 
      prev.includes(suggestion)
        ? prev.filter(s => s !== suggestion)
        : [...prev, suggestion]
    );
  };

  const handleGenerate = async () => {
    if (!formData.gameName.trim() || !formData.gameIdea.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // Check usage limits for non-logged users
    if (!user && usageCount >= 5) {
      toast.error('Please sign up to continue using this tool');
      return;
    }

    // Check credits for logged users
    if (user && user.credits < 40) {
      toast.error('Insufficient credits');
      return;
    }

    setLoading(true);

    try {
      const response = await gamePromptService.generatePrompt(
        formData.gameName,
        formData.gameIdea,
        user?.id
      );

      setResult(response.prompt);
      setSuggestions(response.suggestions);
      
      // Update usage
      if (user) {
        updateUserCredits(response.creditsUsed);
        await usageService.recordUsage(user.id, 1, response.creditsUsed);
      } else {
        const newUsageCount = usageCount + 1;
        setUsageCount(newUsageCount);
        localStorage.setItem('gamePromptUsage', newUsageCount.toString());
      }

      toast.success('Prompt generated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to generate prompt');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePrompt = async () => {
    if (selectedSuggestions.length === 0) {
      toast.error('Please select at least one suggestion');
      return;
    }

    setLoading(true);

    try {
      const response = await gamePromptService.updatePrompt(
        result,
        selectedSuggestions,
        user?.id
      );

      setResult(response.prompt);
      setSelectedSuggestions([]);
      
      if (user) {
        updateUserCredits(response.creditsUsed);
        await usageService.recordUsage(user.id, 1, response.creditsUsed);
      }

      toast.success('Prompt updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update prompt');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(result);
    toast.success('Prompt copied to clipboard!');
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
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Gamepad2" size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            HTML Game Prompt Generator
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Generate comprehensive game development prompts using our OMFF analysis framework
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <h2 className="text-xl font-bold text-white mb-6">Game Details</h2>
              
              <div className="space-y-6">
                <Input
                  label="Game Name"
                  name="gameName"
                  value={formData.gameName}
                  onChange={handleChange}
                  placeholder="Enter your game name"
                  icon="Type"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Game Idea
                  </label>
                  <textarea
                    name="gameIdea"
                    value={formData.gameIdea}
                    onChange={handleChange}
                    placeholder="Describe your game idea in detail..."
                    className="w-full px-4 py-3 bg-surface/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/20 resize-none"
                    rows="6"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  loading={loading}
                  className="w-full"
                  disabled={!formData.gameName.trim() || !formData.gameIdea.trim()}
                >
                  Generate OMFF Prompt
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {loading ? (
              <Loading />
            ) : result ? (
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Generated Prompt</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyPrompt}
                    icon="Copy"
                  >
                    Copy
                  </Button>
                </div>
                
                <div className="bg-surface/30 rounded-lg p-4 mb-6">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                    {result}
                  </pre>
                </div>

                {suggestions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Suggested Improvements
                    </h3>
                    <div className="space-y-2 mb-4">
                      {suggestions.map((suggestion, index) => (
                        <label key={index} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedSuggestions.includes(suggestion)}
                            onChange={() => handleSuggestionToggle(suggestion)}
                            className="w-4 h-4 text-primary bg-surface border-gray-600 rounded focus:ring-primary"
                          />
                          <span className="text-sm text-gray-300">{suggestion}</span>
                        </label>
                      ))}
                    </div>
                    
                    <Button
                      onClick={handleUpdatePrompt}
                      variant="secondary"
                      className="w-full"
                      disabled={selectedSuggestions.length === 0}
                      loading={loading}
                    >
                      Update Prompt
                    </Button>
                  </div>
                )}
              </Card>
            ) : (
              <Card className="text-center">
                <ApperIcon name="Sparkles" size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Ready to Generate
                </h3>
                <p className="text-gray-400">
                  Fill in the form and click generate to create your game prompt
                </p>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GamePromptGenerator;
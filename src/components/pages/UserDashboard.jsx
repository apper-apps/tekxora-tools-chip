import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { usageService } from '@/services/api/usageService';
import { plansService } from '@/services/api/plansService';
import CreditIndicator from '@/components/molecules/CreditIndicator';
import ToolsGrid from '@/components/organisms/ToolsGrid';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Loading from '@/components/ui/Loading';
import ApperIcon from '@/components/ApperIcon';

const UserDashboard = () => {
  const { user } = useAuth();
  const [usage, setUsage] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [usageData, plansData] = await Promise.all([
        usageService.getUserUsage(user.id),
        plansService.getAll()
      ]);
      setUsage(usageData);
      setPlans(plansData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentPlan = plans.find(plan => plan.Id === user?.plan_id);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <Loading type="skeleton" />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Welcome back, <span className="gradient-text">{user?.email}</span>
          </h1>
          <p className="text-gray-400">
            Manage your AI tools and track your usage
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Credit Status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CreditIndicator 
                credits={user?.credits || 0} 
                maxCredits={currentPlan?.credits || 300}
              />
            </motion.div>

            {/* Current Plan */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Current Plan</h3>
                  <ApperIcon name="Crown" size={20} className="text-primary" />
                </div>
                <div className="text-2xl font-bold gradient-text mb-2">
                  {currentPlan?.name || 'Free'}
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  {currentPlan?.credits || 300} credits per month
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Upgrade Plan
                </Button>
              </Card>
            </motion.div>

            {/* Recent Usage */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-white mb-4">Recent Usage</h3>
                <div className="space-y-3">
                  {usage.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{item.tool_name}</span>
                      <span className="text-primary">{item.credits_used} credits</span>
                    </div>
                  ))}
                  {usage.length === 0 && (
                    <p className="text-gray-400 text-sm">No usage yet</p>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-display font-bold text-white mb-2">
                  Available Tools
                </h2>
                <p className="text-gray-400">
                  Choose from our collection of AI-powered development tools
                </p>
              </div>
              
              <ToolsGrid showAll={true} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
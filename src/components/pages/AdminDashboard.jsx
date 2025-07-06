import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { adminService } from '@/services/api/adminService';
import { toolsService } from '@/services/api/toolsService';
import { usersService } from '@/services/api/usersService';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Loading from '@/components/ui/Loading';
import ApperIcon from '@/components/ApperIcon';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('settings');
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    site_name: 'Tekxora',
    api_provider: 'openai',
    api_key: '',
    model: 'gpt-4',
    openrouter_key: ''
  });
  const [tools, setTools] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.is_admin) {
      loadAdminData();
    }
  }, [user]);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [settingsData, toolsData, usersData] = await Promise.all([
        adminService.getSettings(),
        toolsService.getAll(),
        usersService.getAll()
      ]);
      setSettings(settingsData);
      setTools(toolsData);
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveSettings = async () => {
    try {
      await adminService.updateSettings(settings);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  const tabs = [
    { id: 'settings', label: 'Settings', icon: 'Settings' },
    { id: 'tools', label: 'Tools', icon: 'Wrench' },
    { id: 'users', label: 'Users', icon: 'Users' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart' }
  ];

  if (!user?.is_admin) {
    return (
      <div className="pt-16 min-h-screen bg-background flex items-center justify-center">
        <Card className="text-center">
          <ApperIcon name="Lock" size={48} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400">You don't have admin privileges</p>
        </Card>
      </div>
    );
  }

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
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-gray-400">
            Manage your AI tools platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <ApperIcon name={tab.icon} size={20} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'settings' && (
              <Card>
                <h2 className="text-xl font-bold text-white mb-6">System Settings</h2>
                
                <div className="space-y-6">
                  <Input
                    label="Site Name"
                    name="site_name"
                    value={settings.site_name}
                    onChange={handleSettingsChange}
                    placeholder="Enter site name"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      API Provider
                    </label>
                    <select
                      name="api_provider"
                      value={settings.api_provider}
                      onChange={handleSettingsChange}
                      className="w-full px-4 py-3 bg-surface/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                    >
                      <option value="openai">OpenAI</option>
                      <option value="gemini">Gemini</option>
                      <option value="deepseek">Deepseek</option>
                      <option value="openrouter">OpenRouter</option>
                    </select>
                  </div>

                  <Input
                    label="API Key"
                    name="api_key"
                    type="password"
                    value={settings.api_key}
                    onChange={handleSettingsChange}
                    placeholder="Enter API key"
                  />

                  <Input
                    label="AI Model"
                    name="model"
                    value={settings.model}
                    onChange={handleSettingsChange}
                    placeholder="Enter model name"
                  />

                  <Input
                    label="OpenRouter Key (Optional)"
                    name="openrouter_key"
                    type="password"
                    value={settings.openrouter_key}
                    onChange={handleSettingsChange}
                    placeholder="Enter OpenRouter API key"
                  />

                  <Button onClick={handleSaveSettings} className="w-full">
                    Save Settings
                  </Button>
                </div>
              </Card>
            )}

            {activeTab === 'tools' && (
              <Card>
                <h2 className="text-xl font-bold text-white mb-6">Tools Management</h2>
                
                <div className="space-y-4">
                  {tools.map((tool) => (
                    <div key={tool.Id} className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">{tool.name}</h3>
                        <p className="text-sm text-gray-400">{tool.description}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'users' && (
              <Card>
                <h2 className="text-xl font-bold text-white mb-6">Users Management</h2>
                
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.Id} className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">{user.email}</h3>
                        <p className="text-sm text-gray-400">
                          {user.credits} credits • {user.plan_name}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="danger">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'analytics' && (
              <Card>
                <h2 className="text-xl font-bold text-white mb-6">Analytics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {users.length}
                    </div>
                    <p className="text-gray-400">Total Users</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {tools.length}
                    </div>
                    <p className="text-gray-400">Active Tools</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">
                      97%
                    </div>
                    <p className="text-gray-400">Success Rate</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
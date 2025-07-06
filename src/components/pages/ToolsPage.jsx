import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { toolsService } from '@/services/api/toolsService';
import SearchBar from '@/components/molecules/SearchBar';
import ToolsGrid from '@/components/organisms/ToolsGrid';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const ToolsPage = () => {
  const { user } = useAuth();
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTools();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = tools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTools(filtered);
    } else {
      setFilteredTools(tools);
    }
  }, [searchQuery, tools]);

  const loadTools = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await toolsService.getAll();
      setTools(data);
      setFilteredTools(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <Loading type="skeleton" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <Error message={error} onRetry={loadTools} />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              AI <span className="gradient-text">Tools</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover powerful AI tools to transform your creative ideas into detailed development specifications.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                placeholder="Search tools..." 
                onSearch={handleSearch}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          {!user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 mb-8 text-center"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                Try Before You Subscribe
              </h3>
              <p className="text-gray-300">
                You can use each tool up to 5 times without an account. Sign up for unlimited access!
              </p>
            </motion.div>
          )}
          
          {filteredTools.length > 0 ? (
            <ToolsGrid tools={filteredTools} showAll={true} />
          ) : (
            <Empty 
              icon="Search"
              title="No tools found"
              description="Try adjusting your search terms or browse all available tools."
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default ToolsPage;
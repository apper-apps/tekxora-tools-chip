import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ placeholder = "Search...", onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative ${className}`}
      whileFocus={{ scale: 1.02 }}
    >
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <ApperIcon name="Search" size={20} className="text-gray-400" />
        </div>
        
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full pl-10 pr-10 py-3 bg-surface/50 border rounded-lg text-white placeholder-gray-400 
            backdrop-blur-sm transition-all duration-200 focus:outline-none
            ${focused ? 'border-primary shadow-lg shadow-primary/20' : 'border-gray-600'}
          `}
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <ApperIcon name="X" size={20} />
          </button>
        )}
      </div>
    </motion.form>
  );
};

export default SearchBar;
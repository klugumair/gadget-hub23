
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory?: string;
}

const InlineSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (searchTerm.trim().length < 2) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price, category, subcategory')
          .or(`name.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%,subcategory.ilike.%${searchTerm}%`)
          .limit(10);

        if (error) throw error;
        setResults(data || []);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleResultClick = (result: SearchResult) => {
    setSearchTerm('');
    setShowResults(false);
    
    // Navigate based on subcategory
    if (result.subcategory) {
      const subcategory = result.subcategory.toLowerCase();
      if (subcategory.includes('samsung')) navigate('/phones/samsung');
      else if (subcategory.includes('iphone')) navigate('/phones/iphone');
      else if (subcategory.includes('vivo')) navigate('/phones/vivo');
      else if (subcategory.includes('oppo')) navigate('/phones/oppo');
      else if (subcategory.includes('redmi')) navigate('/phones/redmi');
      else if (subcategory.includes('realme')) navigate('/phones/realme');
      else if (subcategory.includes('tecno')) navigate('/phones/tecno');
      else if (subcategory.includes('infinix')) navigate('/phones/infinix');
      else if (subcategory.includes('itel')) navigate('/phones/itel');
      else if (subcategory.includes('honor')) navigate('/phones/honor');
      else if (subcategory.includes('huawei')) navigate('/phones/huawei');
      else if (subcategory.includes('google') || subcategory.includes('pixel')) navigate('/phones/google-pixel');
      else if (subcategory.includes('spark')) navigate('/phones/spark-x');
      else navigate('/phones');
    } else {
      navigate('/phones');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative flex items-center">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 pl-10 pr-10 bg-black/30 border-gold-400/30 text-white placeholder:text-gray-400 focus:border-gold-400"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-lg border border-gold-400/30 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-400">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 text-left hover:bg-gold-400/10 transition-colors border-b border-gray-700/50 last:border-b-0"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">{result.name}</p>
                      <p className="text-gray-400 text-sm">{result.subcategory || result.category}</p>
                    </div>
                    <p className="text-gold-400 font-semibold">Rs. {result.price.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-400">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InlineSearchBar;

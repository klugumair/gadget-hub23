
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import { useCart } from '@/contexts/CartContext';

const FloatingNavbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { user, signOut } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    await signOut();
    setIsProfileOpen(false);
    navigate('/');
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, category, subcategory')
        .or(`name.ilike.%${term}%,category.ilike.%${term}%,subcategory.ilike.%${term}%`)
        .limit(5);

      if (error) throw error;
      setSearchResults(data || []);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  const handleResultClick = (result: any) => {
    setSearchTerm('');
    setShowSearchResults(false);
    
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
      else navigate('/phones');
    } else {
      navigate('/phones');
    }
  };

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 z-50 bg-black/80 backdrop-blur-lg border border-gold-400/20 rounded-3xl shadow-2xl h-20">
        <div className="container mx-auto px-8 py-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo and Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-gold-400">
                GadgetHub
              </Link>
              
              <div className="hidden md:flex items-center space-x-6">
                <Link 
                  to="/phones" 
                  className="text-white hover:text-gold-400 transition-colors font-medium"
                >
                  Phones
                </Link>
                <Link 
                  to="/headphones" 
                  className="text-white hover:text-gold-400 transition-colors font-medium"
                >
                  Headphones
                </Link>
                <Link 
                  to="/covers" 
                  className="text-white hover:text-gold-400 transition-colors font-medium"
                >
                  Covers
                </Link>
                <Link 
                  to="/chargers" 
                  className="text-white hover:text-gold-400 transition-colors font-medium"
                >
                  Chargers
                </Link>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-xs mx-8">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gold-400/30 rounded-xl text-white placeholder:text-gray-400 focus:border-gold-400 focus:outline-none text-sm"
                />
              </div>

              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-lg border border-gold-400/30 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                  {searchResults.map((result: any) => (
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
              )}
            </div>

            {/* Right Side - Cart, Profile */}
            <div className="flex items-center space-x-6">
              <Link 
                to="/cart" 
                className="relative p-2 text-gold-400 hover:text-gold-300 transition-colors"
              >
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-black hover:from-gold-300 hover:to-gold-500 transition-all duration-300 border-2 border-gold-400/30"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img 
                        src={user.user_metadata.avatar_url} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={24} />
                    )}
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-black/95 backdrop-blur-lg border border-gold-400/30 rounded-xl shadow-2xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-700/50">
                        <p className="text-gold-400 font-medium text-sm">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-300 hover:text-gold-400 hover:bg-gold-400/10 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <Link
                        to="/admin/phone-submissions"
                        className="block px-4 py-2 text-gray-300 hover:text-gold-400 hover:bg-gold-400/10 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Phone Submissions
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-white hover:text-gold-400 transition-colors font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-black font-semibold rounded-full transition-all duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isAuthModalOpen && (
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      )}
    </>
  );
};

export default FloatingNavbar;

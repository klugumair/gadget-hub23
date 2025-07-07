import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import { useCart } from '@/contexts/CartContext';

interface NavLink {
  to: string;
  label: string;
}

const FloatingNavbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-6">
        <div className="bg-black/80 backdrop-blur-md border border-gold-400/30 rounded-2xl px-8 py-4 shadow-2xl">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className="text-gold-400 hover:text-gold-300 transition-all duration-300 font-medium hover:scale-105"
              >
                Gadgets
              </Link>
              <Link 
                to="/phones" 
                className="text-gold-400 hover:text-gold-300 transition-all duration-300 font-medium hover:scale-105"
              >
                Phones
              </Link>
              <Link 
                to="/headphones" 
                className="text-gold-400 hover:text-gold-300 transition-all duration-300 font-medium hover:scale-105"
              >
                Headphones
              </Link>
              <Link 
                to="/covers" 
                className="text-gold-400 hover:text-gold-300 transition-all duration-300 font-medium hover:scale-105"
              >
                Covers
              </Link>
              <Link 
                to="/chargers" 
                className="text-gold-400 hover:text-gold-300 transition-all duration-300 font-medium hover:scale-105"
              >
                Chargers
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gold-400 hover:text-gold-300 transition-colors duration-300 hover:bg-gold-400/10 rounded-full"
                >
                  <Search size={20} />
                </button>
              </div>

              <Link 
                to="/cart" 
                className="relative p-2 text-gold-400 hover:text-gold-300 transition-colors duration-300 hover:bg-gold-400/10 rounded-full"
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
                    className="flex items-center space-x-2 p-2 text-gold-400 hover:text-gold-300 transition-colors duration-300 hover:bg-gold-400/10 rounded-full"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg border-2 border-gold-300">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-black/90 backdrop-blur-md border border-gold-400/30 rounded-xl shadow-2xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-gold-400/20">
                        <p className="text-gold-400 font-medium text-sm">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-300 hover:text-gold-400 hover:bg-gold-400/10 transition-colors duration-200"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-red-400/10 transition-colors duration-200"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-gold-400 to-gold-600 text-black font-semibold rounded-full hover:from-gold-500 hover:to-gold-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isAuthModalOpen && (
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      )}

      {isSearchOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="bg-black/90 border border-gold-400/30 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
            <h2 className="text-3xl font-bold text-white mb-6">Search</h2>
            <input
              type="text"
              placeholder="Enter your search query"
              className="w-full px-4 py-3 bg-gray-800 border border-gold-400/30 text-white rounded-xl focus:outline-none focus:border-gold-400 transition-colors duration-300"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="px-6 py-3 text-gray-300 hover:text-gold-400 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingNavbar;

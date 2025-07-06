
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import AuthModal from './AuthModal';
import SearchModal from './SearchModal';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search, User, LogOut, Menu, X } from 'lucide-react';

const FloatingNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { items } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Phones', path: '/phones' },
    { name: 'Covers', path: '/covers' },
    { name: 'Headphones', path: '/headphones' },
    { name: 'Services', path: '/repairing-service' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-gold-400/20 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}>
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-gold-400/25 transition-all duration-300 group-hover:scale-110">
                <span className="text-black font-bold text-lg">GH</span>
              </div>
              <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text">
                GadgetHub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-gold-400/20 to-gold-300/20 text-gold-400 border border-gold-400/30 shadow-lg'
                      : 'text-gray-300 hover:text-gold-400 hover:bg-gold-400/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <Button
                onClick={() => setShowSearchModal(true)}
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 hover:border-gold-400/50 hover:bg-gold-400/10 text-gray-300 hover:text-gold-400 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-gold-400/25"
              >
                <Search size={16} />
                <span className="text-sm">Search</span>
              </Button>

              {/* Mobile Search */}
              <Button
                onClick={() => setShowSearchModal(true)}
                variant="ghost"
                size="sm"
                className="md:hidden p-2 rounded-full bg-gray-800/50 border border-gray-700/50 hover:border-gold-400/50 hover:bg-gold-400/10 text-gray-300 hover:text-gold-400 transition-all duration-300"
              >
                <Search size={18} />
              </Button>

              {/* Cart */}
              <Link to="/cart" className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 rounded-full bg-gray-800/50 border border-gray-700/50 hover:border-gold-400/50 hover:bg-gold-400/10 text-gray-300 hover:text-gold-400 transition-all duration-300 group-hover:scale-110"
                >
                  <ShoppingCart size={18} />
                </Button>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg border border-red-400/30 animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User Actions */}
              {user ? (
                <div className="hidden md:flex items-center space-x-2">
                  <Link to="/profile">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 rounded-full bg-gray-800/50 border border-gray-700/50 hover:border-gold-400/50 hover:bg-gold-400/10 text-gray-300 hover:text-gold-400 transition-all duration-300 hover:scale-110"
                    >
                      <User size={18} />
                    </Button>
                  </Link>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-full bg-gray-800/50 border border-gray-700/50 hover:border-red-400/50 hover:bg-red-400/10 text-gray-300 hover:text-red-400 transition-all duration-300 hover:scale-110"
                  >
                    <LogOut size={18} />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="hidden md:flex bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-black font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg border border-gold-300/30"
                >
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                variant="ghost"
                size="sm"
                className="md:hidden p-2 rounded-full bg-gray-800/50 border border-gray-700/50 hover:border-gold-400/50 hover:bg-gold-400/10 text-gray-300 hover:text-gold-400 transition-all duration-300"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-gold-400/20 shadow-2xl rounded-b-3xl">
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-gold-400/20 to-gold-300/20 text-gold-400 border border-gold-400/30'
                        : 'text-gray-300 hover:text-gold-400 hover:bg-gold-400/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="border-t border-gray-700/50 pt-4 space-y-3">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-gray-300 hover:text-gold-400 hover:bg-gold-400/10 transition-all duration-300"
                      >
                        <User size={18} />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-gray-300 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 w-full text-left"
                      >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setShowAuthModal(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-black font-semibold px-4 py-3 rounded-2xl transition-all duration-300 shadow-lg"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      <SearchModal 
        isOpen={showSearchModal} 
        onClose={() => setShowSearchModal(false)} 
      />
    </>
  );
};

export default FloatingNavbar;

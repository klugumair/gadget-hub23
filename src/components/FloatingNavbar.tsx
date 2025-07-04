
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const FloatingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalItems } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Phones', path: '/phones' },
    { name: 'Headphones', path: '/headphones' },
    { name: 'Covers', path: '/covers' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-morphism backdrop-blur-md shadow-2xl' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-shimmer">GadgetHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-gold-400 bg-gold-400/10'
                    : 'text-white hover:text-gold-400 hover:bg-white/5'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute inset-0 rounded-full border border-gold-400/30 animate-pulse" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:text-gold-400">
                <ShoppingCart size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Profile Section */}
            <Link to={user ? "/profile" : "/"} className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-white hover:text-gold-400">
                <User size={20} />
              </Button>
              {user && (
                <span className="text-white text-sm font-medium hidden lg:block">
                  {user.user_metadata?.username || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:text-gold-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 glass-morphism rounded-2xl">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-gold-400 bg-gold-400/10'
                      : 'text-white hover:text-gold-400 hover:bg-white/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-4 pt-4 border-t border-white/10">
                <Link to="/cart" className="relative flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="icon" className="text-white hover:text-gold-400">
                    <ShoppingCart size={20} />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gold-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {getTotalItems()}
                      </span>
                    )}
                  </Button>
                  <span className="text-white">Cart</span>
                </Link>
                <Link to={user ? "/profile" : "/"} className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="icon" className="text-white hover:text-gold-400">
                    <User size={20} />
                  </Button>
                  <span className="text-white">
                    {user ? (user.user_metadata?.username || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Profile') : 'Login'}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default FloatingNavbar;

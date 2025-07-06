
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu, X, Phone, Search } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import AuthModal from './AuthModal';
import SearchModal from './SearchModal';

const FloatingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { getTotalItems } = useCart();
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('id', user.id)
            .single();
          
          if (error) {
            console.error('Error fetching profile:', error);
            return;
          }
          
          if (data?.avatar_url) {
            setProfilePicture(data.avatar_url);
          }
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      }
    };

    fetchProfilePicture();
  }, [user]);

  const navItems = [
    { name: 'Phones', path: '/phones' },
    { name: 'Headphones', path: '/headphones' },
    { name: 'Covers', path: '/covers' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? 'glass-morphism backdrop-blur-xl shadow-2xl' : 'glass-morphism backdrop-blur-md'
      } rounded-full px-6 py-3 border border-gold-400/20`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold">
              <span className="text-shimmer">GadgetHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
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
            
            {/* Contact Button */}
            <Button
              onClick={scrollToContact}
              variant="ghost"
              className="text-white hover:text-gold-400 hover:bg-white/5 rounded-full px-4 py-2"
            >
              <Phone size={16} className="mr-2" />
              Contact
            </Button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Search Button */}
            <Button
              onClick={() => setIsSearchModalOpen(true)}
              variant="ghost"
              size="icon"
              className="text-white hover:text-gold-400 rounded-full"
            >
              <Search size={20} />
            </Button>

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:text-gold-400 rounded-full">
                <ShoppingCart size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-white/5 transition-colors">
                  <div className="relative">
                    {profilePicture ? (
                      <img 
                        src={profilePicture} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full object-cover border-2 border-gold-400/30"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gold-400/20 border-2 border-gold-400/30 flex items-center justify-center">
                        <User size={16} className="text-gold-400" />
                      </div>
                    )}
                  </div>
                  <span className="text-white text-sm font-medium">
                    {user.user_metadata?.username || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                  </span>
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  className="text-white hover:text-gold-400 hover:bg-white/5 rounded-full px-4 py-2"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handleAuthClick('login')}
                  variant="ghost"
                  className="text-white hover:text-gold-400 hover:bg-white/5 rounded-full px-4 py-2"
                >
                  Login
                </Button>
                <Button
                  onClick={() => handleAuthClick('signup')}
                  className="bg-gradient-gold hover:bg-gold-500 text-black font-semibold rounded-full px-4 py-2"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:text-gold-400 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 glass-morphism rounded-2xl border border-gold-400/20">
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
              
              <Button
                onClick={scrollToContact}
                variant="ghost"
                className="text-white hover:text-gold-400 hover:bg-white/5 rounded-lg px-4 py-2 justify-start"
              >
                <Phone size={16} className="mr-2" />
                Contact
              </Button>
              
              <Button
                onClick={() => {
                  setIsSearchModalOpen(true);
                  setIsMenuOpen(false);
                }}
                variant="ghost"
                className="text-white hover:text-gold-400 hover:bg-white/5 rounded-lg px-4 py-2 justify-start"
              >
                <Search size={16} className="mr-2" />
                Search
              </Button>
              
              <div className="flex flex-col space-y-4 pt-4 border-t border-white/10">
                <Link to="/cart" className="relative flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="icon" className="text-white hover:text-gold-400 rounded-full">
                    <ShoppingCart size={20} />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gold-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {getTotalItems()}
                      </span>
                    )}
                  </Button>
                  <span className="text-white">Cart</span>
                </Link>
                
                {user ? (
                  <>
                    <Link to="/profile" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                      <div className="relative">
                        {profilePicture ? (
                          <img 
                            src={profilePicture} 
                            alt="Profile" 
                            className="w-8 h-8 rounded-full object-cover border-2 border-gold-400/30"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gold-400/20 border-2 border-gold-400/30 flex items-center justify-center">
                            <User size={16} className="text-gold-400" />
                          </div>
                        )}
                      </div>
                      <span className="text-white">
                        {user.user_metadata?.username || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Profile'}
                      </span>
                    </Link>
                    <Button
                      onClick={handleSignOut}
                      variant="ghost"
                      className="text-white hover:text-gold-400 hover:bg-white/5 rounded-lg px-4 py-2 justify-start"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button
                      onClick={() => {
                        handleAuthClick('login');
                        setIsMenuOpen(false);
                      }}
                      variant="ghost"
                      className="text-white hover:text-gold-400 hover:bg-white/5 rounded-lg px-4 py-2 justify-start"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        handleAuthClick('signup');
                        setIsMenuOpen(false);
                      }}
                      className="bg-gradient-gold hover:bg-gold-500 text-black font-semibold rounded-lg px-4 py-2"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
};

export default FloatingNavbar;

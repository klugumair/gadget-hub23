
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

const FloatingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user, signOut, loading } = useAuth();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Phones', href: '/phones' },
    { name: 'Covers', href: '/covers' },
    { name: 'Headphones', href: '/headphones' },
    { name: 'Repairing Service', href: '/repairing-service' },
    { name: 'Contact', href: '#contact' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMobileMenu();
  };

  return (
    <>
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass-morphism rounded-full px-8 py-4 shadow-2xl">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gold-400 font-bold text-xl">
              <span className="text-shimmer">GadgetHub</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-gold-400 transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-white hover:text-gold-400 transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/cart">
                <Button variant="ghost" className="text-white hover:text-gold-400 p-2">
                  <ShoppingCart size={20} />
                </Button>
              </Link>
              
              {/* Authentication Section */}
              {loading ? (
                <div className="hidden md:block w-8 h-8 rounded-full bg-white/20 animate-pulse" />
              ) : user ? (
                <div className="hidden md:flex items-center space-x-2">
                  <Link to="/profile">
                    <Button variant="ghost" className="text-white hover:text-gold-400 p-2">
                      <User size={16} />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="text-white hover:text-gold-400 p-2"
                  >
                    <LogOut size={16} />
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => openAuthModal('login')}
                    className="text-white hover:text-gold-400 font-medium"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => openAuthModal('signup')}
                    className="bg-gradient-gold hover:bg-gold-500 text-black font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
              
              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                className="md:hidden text-white hover:text-gold-400 p-2"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          ></div>
          
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 w-11/12 max-w-sm">
            <div className="glass-morphism rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  item.href.startsWith('#') ? (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-white hover:text-gold-400 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-gold-400/10"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-white hover:text-gold-400 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-gold-400/10"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                
                {/* Mobile Authentication */}
                {loading ? (
                  <div className="w-full h-10 rounded-lg bg-white/20 animate-pulse mt-4" />
                ) : user ? (
                  <div className="mt-4 space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 text-white py-2 px-4 hover:bg-gold-400/10 rounded-lg"
                      onClick={closeMobileMenu}
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={handleSignOut}
                      className="w-full text-white hover:text-gold-400 justify-start"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="mt-4 space-y-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        openAuthModal('login');
                        closeMobileMenu();
                      }}
                      className="w-full text-white hover:text-gold-400 justify-center"
                    >
                      Login
                    </Button>
                    <Button 
                      onClick={() => {
                        openAuthModal('signup');
                        closeMobileMenu();
                      }}
                      className="w-full bg-gradient-gold hover:bg-gold-500 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default FloatingNavbar;

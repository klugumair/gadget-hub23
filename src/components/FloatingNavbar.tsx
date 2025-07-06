
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search, User, LogOut, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import SearchModal from './SearchModal';

const FloatingNavbar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { cartItems } = useCart();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('id', user.id)
            .single();
          
          if (data && data.avatar_url) {
            setProfilePicture(data.avatar_url);
          }
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      }
    };

    fetchProfilePicture();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 z-50 bg-black/60 backdrop-blur-lg border border-gold-400/20 rounded-3xl px-8 py-5 shadow-2xl">
        <div className="flex items-center justify-between w-full">
          {/* Logo - moved more to the left */}
          <div className="flex items-center -ml-6">
            <Link to="/" className="text-3xl font-bold text-shimmer hover:scale-105 transition-transform">
              GadgetHub
            </Link>
          </div>

          {/* Desktop Navigation - Extended */}
          <div className="hidden lg:flex items-center space-x-12">
            <Link to="/phones" className="text-white hover:text-gold-400 transition-colors font-medium text-lg">
              Phones
            </Link>
            <Link to="/headphones" className="text-white hover:text-gold-400 transition-colors font-medium text-lg">
              Headphones
            </Link>
            <Link to="/covers" className="text-white hover:text-gold-400 transition-colors font-medium text-lg">
              Covers & Cases
            </Link>
            <div className="h-8 w-px bg-gold-400/30"></div>
            <span className="text-gray-400 text-sm font-medium">Premium Collection</span>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button
              onClick={() => setIsSearchOpen(true)}
              variant="ghost"
              size="sm"
              className="text-gold-400 hover:text-gold-300 hover:bg-gold-400/10 p-3 rounded-full"
            >
              <Search size={22} />
            </Button>

            {/* Cart Button */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="text-gold-400 hover:text-gold-300 hover:bg-gold-400/10 relative p-3 rounded-full">
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-400 text-black text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Authentication */}
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Profile Picture - Larger and Circular */}
                <Link to="/profile">
                  <div className="w-12 h-12 rounded-full border-2 border-gold-400 overflow-hidden hover:border-gold-300 transition-colors cursor-pointer shadow-lg">
                    {profilePicture ? (
                      <img 
                        src={profilePicture} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                        <User size={24} className="text-black" />
                      </div>
                    )}
                  </div>
                </Link>

                {/* User Menu */}
                <div className="hidden md:flex items-center space-x-3">
                  <Link to="/profile">
                    <Button variant="ghost" size="sm" className="text-gold-400 hover:text-gold-300 hover:bg-gold-400/10 px-4 py-2 rounded-full">
                      <Settings size={18} className="mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleSignOut}
                    variant="ghost" 
                    size="sm" 
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-4 py-2 rounded-full"
                  >
                    <LogOut size={18} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="text-gold-400 hover:text-gold-300 hover:bg-gold-400/10 px-4 py-2 rounded-full">
                    <User size={18} className="mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button size="sm" className="bg-gold-400 hover:bg-gold-500 text-black font-semibold px-6 py-2 rounded-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              size="sm"
              className="lg:hidden text-gold-400 hover:text-gold-300 p-3 rounded-full"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 pt-6 border-t border-gold-400/30">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/phones" 
                className="text-white hover:text-gold-400 transition-colors font-medium py-3 text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Phones
              </Link>
              <Link 
                to="/headphones" 
                className="text-white hover:text-gold-400 transition-colors font-medium py-3 text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Headphones
              </Link>
              <Link 
                to="/covers" 
                className="text-white hover:text-gold-400 transition-colors font-medium py-3 text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Covers & Cases
              </Link>
              
              {user ? (
                <div className="flex flex-col space-y-3 pt-6 border-t border-gold-400/30">
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="text-gold-400 hover:text-gold-300 w-full justify-start py-3 rounded-full">
                      <Settings size={18} className="mr-3" />
                      Profile
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="ghost" 
                    size="sm" 
                    className="text-red-400 hover:text-red-300 w-full justify-start py-3 rounded-full"
                  >
                    <LogOut size={18} className="mr-3" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 pt-6 border-t border-gold-400/30">
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="text-gold-400 hover:text-gold-300 w-full justify-start py-3 rounded-full">
                      <User size={18} className="mr-3" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button size="sm" className="bg-gold-400 hover:bg-gold-500 text-black font-semibold w-full py-3 rounded-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default FloatingNavbar;

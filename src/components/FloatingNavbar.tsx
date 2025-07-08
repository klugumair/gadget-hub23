
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { isAdmin } from '@/utils/adminUtils';
import { useToast } from '@/hooks/use-toast';

const FloatingNavbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [isAdminUploadOpen, setIsAdminUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { user, signOut } = useAuth();
  const { cartItems } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Fetch user profile data including avatar
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('id', user.id)
            .maybeSingle();

          if (data?.avatar_url) {
            setUserAvatar(data.avatar_url);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
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

  const handleMobileNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const handleAdminHeroImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      console.log('Starting hero image upload for admin...');
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      console.log('File selected:', file.name, file.type, file.size);
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file.');
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB.');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `hero-tablet-${Date.now()}.${fileExt}`;

      console.log('Uploading hero image:', fileName);

      // Upload the new file to avatars bucket
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { 
          upsert: true,
          contentType: file.type
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const heroImageUrl = `${publicUrl}?t=${Date.now()}`;
      console.log('New hero image URL:', heroImageUrl);

      // Update the settings table with the new hero image URL
      const { error: updateError } = await supabase
        .from('settings')
        .upsert({
          key: 'hero_image_url',
          value: heroImageUrl,
          updated_at: new Date().toISOString()
        });

      if (updateError) {
        console.error('Settings update error:', updateError);
        throw updateError;
      }

      console.log('Hero image setting updated successfully');
      
      toast({
        title: "Hero image updated! ✅",
        description: "The floating tablet image has been updated successfully. Refresh the page to see changes.",
        className: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold",
      });

      setIsAdminUploadOpen(false);

      // Refresh the page to show the new hero image
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error: any) {
      console.error('Error uploading hero image:', error);
      toast({
        title: "Error uploading image ❌",
        description: error.message || "There was an error uploading the hero image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset the file input
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 z-50 bg-black/80 backdrop-blur-lg border border-gold-400/20 rounded-3xl shadow-2xl h-20">
        <div className="container mx-auto px-8 py-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo and Desktop Navigation Links */}
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

            {/* Search Bar - Hidden on mobile */}
            <div className="relative flex-1 max-w-xs mx-8 hidden md:block">
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

            {/* Right Side - Cart, Admin Upload, Profile, Mobile Menu */}
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

              {/* Admin Upload Button - Only visible for admins */}
              {user && isAdmin(user.email) && (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setIsAdminUploadOpen(!isAdminUploadOpen)}
                    className="p-2 text-gold-400 hover:text-gold-300 transition-colors bg-black/50 rounded-full border border-gold-400/30"
                    disabled={uploading}
                  >
                    <Plus size={16} />
                  </button>
                  
                  {isAdminUploadOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-black/95 backdrop-blur-lg border border-gold-400/30 rounded-xl shadow-2xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-700/50">
                        <p className="text-gold-400 font-medium text-sm">Upload Hero Image</p>
                        <p className="text-gray-400 text-xs">Update floating tablet image</p>
                      </div>
                      <div className="p-4">
                        <label className="block cursor-pointer">
                          <div className="flex items-center justify-center p-3 border-2 border-dashed border-gold-400/30 rounded-lg hover:border-gold-400/50 transition-colors">
                            <div className="text-center">
                              <Plus size={20} className="mx-auto text-gold-400 mb-2" />
                              <p className="text-sm text-gray-300">
                                {uploading ? 'Uploading...' : 'Choose Image'}
                              </p>
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAdminHeroImageUpload}
                            disabled={uploading}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Menu Button - Only visible on mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gold-400 hover:text-gold-300 transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Desktop Profile/Auth - Hidden on mobile */}
              {user ? (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-black hover:from-gold-300 hover:to-gold-500 transition-all duration-300 border-2 border-gold-400/30"
                  >
                    {userAvatar ? (
                      <img 
                        src={userAvatar} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                        key={userAvatar}
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
                <div className="hidden md:flex items-center space-x-3">
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

        {/* Mobile Menu - Only visible when opened */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-black/95 backdrop-blur-lg border border-gold-400/30 rounded-xl shadow-2xl py-4 z-50">
            <div className="space-y-2">
              <button
                onClick={() => handleMobileNavClick('/phones')}
                className="block w-full text-left px-4 py-2 text-white hover:text-gold-400 hover:bg-gold-400/10 transition-colors"
              >
                Phones
              </button>
              <button
                onClick={() => handleMobileNavClick('/headphones')}
                className="block w-full text-left px-4 py-2 text-white hover:text-gold-400 hover:bg-gold-400/10 transition-colors"
              >
                Headphones
              </button>
              <button
                onClick={() => handleMobileNavClick('/covers')}
                className="block w-full text-left px-4 py-2 text-white hover:text-gold-400 hover:bg-gold-400/10 transition-colors"
              >
                Covers
              </button>
              <button
                onClick={() => handleMobileNavClick('/chargers')}
                className="block w-full text-left px-4 py-2 text-white hover:text-gold-400 hover:bg-gold-400/10 transition-colors"
              >
                Chargers
              </button>
              
              {user ? (
                <>
                  <div className="border-t border-gray-700/50 my-2"></div>
                  <div className="px-4 py-2">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                        {userAvatar ? (
                          <img 
                            src={userAvatar} 
                            alt="Profile" 
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User size={20} className="text-black" />
                        )}
                      </div>
                      <div>
                        <p className="text-gold-400 font-medium text-sm">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleMobileNavClick('/profile')}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:text-gold-400 hover:bg-gold-400/10 transition-colors"
                  >
                    Profile Settings
                  </button>
                  <button
                    onClick={() => handleMobileNavClick('/admin/phone-submissions')}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:text-gold-400 hover:bg-gold-400/10 transition-colors"
                  >
                    Phone Submissions
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-gray-700/50 my-2"></div>
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="block w-full text-left px-4 py-2 text-white hover:text-gold-400 hover:bg-gold-400/10 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="block w-full text-left px-4 py-2 text-gold-400 hover:text-gold-300 hover:bg-gold-400/10 transition-colors font-semibold"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {isAuthModalOpen && (
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      )}
    </>
  );
};

export default FloatingNavbar;

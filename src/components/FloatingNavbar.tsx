import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              
              {/* Desktop Shop Now Button */}
              <Button className="hidden md:block bg-gradient-gold hover:bg-gold-500 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105">
                Shop Now
              </Button>
              
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
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          ></div>
          
          {/* Mobile Menu */}
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
                
                {/* Mobile Shop Now Button */}
                <Button 
                  className="bg-gradient-gold hover:bg-gold-500 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 mt-4"
                  onClick={closeMobileMenu}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingNavbar;
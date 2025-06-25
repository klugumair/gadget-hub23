
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingNavbar = () => {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Phones', href: '/phones' },
    { name: 'Covers', href: '/covers' },
    { name: 'Headphones', href: '/headphones' },
    { name: 'Repairing Service', href: '/repairing-service' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glass-morphism rounded-full px-8 py-4 shadow-2xl">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-gold-400 font-bold text-xl">
            <span className="text-shimmer">GadgetHub</span>
          </Link>
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
            <Button className="bg-gradient-gold hover:bg-gold-500 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FloatingNavbar;

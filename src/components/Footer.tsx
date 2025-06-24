
import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-to-r from-black to-gray-900 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-3xl font-bold text-shimmer mb-4">LUXE</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Premium mobile accessories for the discerning customer. Experience luxury in every detail.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center text-black font-bold cursor-pointer hover:scale-110 transition-transform">
                f
              </div>
              <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center text-black font-bold cursor-pointer hover:scale-110 transition-transform">
                t
              </div>
              <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center text-black font-bold cursor-pointer hover:scale-110 transition-transform">
                i
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-gold-400 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-gold-400 transition-colors">Home</a></li>
              <li><a href="#phones" className="hover:text-gold-400 transition-colors">Phones</a></li>
              <li><a href="#covers" className="hover:text-gold-400 transition-colors">Covers</a></li>
              <li><a href="#headphones" className="hover:text-gold-400 transition-colors">Headphones</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-gold-400 mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📧 info@luxemobile.com</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>📍 123 Luxury Ave, Premium City</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 LUXE Mobile. All rights reserved. Crafted with precision.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

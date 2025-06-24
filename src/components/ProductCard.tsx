
import React from 'react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, category }) => {
  return (
    <div className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 hover:scale-105 transition-all duration-500 glass-morphism">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <div className="w-full h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-6xl">
          {image}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="space-y-3">
        <div className="text-sm text-gold-400 font-medium uppercase tracking-wider">
          {category}
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors duration-300">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gold-400">{price}</span>
          <Button className="bg-gold-400 hover:bg-gold-500 text-black font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:scale-105">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

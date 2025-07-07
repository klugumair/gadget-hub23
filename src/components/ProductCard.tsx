
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import ProductDetailModal from './ProductDetailModal';

interface ProductCardProps {
  title: string;
  price: string | number;
  image: string;
  category: string;
  size?: 'normal' | 'compact';
  description?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  title, 
  price, 
  image, 
  category, 
  size = 'normal',
  description 
}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    const priceValue = typeof price === 'string' ? 
      parseFloat(price.replace(/[^0-9.-]+/g, "")) : price;
    
    addToCart({
      title,
      price: priceValue,
      image,
      category
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${title} has been added to your cart`,
      className: "bg-gradient-gold text-black font-semibold",
    });
  };

  const formatPrice = (priceValue: string | number) => {
    if (typeof priceValue === 'string') {
      return priceValue;
    }
    return `Rs. ${priceValue.toLocaleString()}`;
  };

  const isCompact = size === 'compact';

  return (
    <>
      <div className="group relative">
        <div className="glass-morphism rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer border border-gold-400/20 shadow-xl max-w-sm mx-auto">
          <div
            className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center overflow-hidden ${
              isCompact ? 'h-32' : 'h-48'
            }`}
            onClick={() => setIsDetailModalOpen(true)}
          >
            <div className={`transition-transform duration-300 group-hover:scale-110 ${
              isCompact ? 'text-4xl' : 'text-6xl'
            }`}>
              {image}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute top-3 right-3 z-10">
              <span className="bg-gradient-to-r from-green-600 to-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg border border-green-400/30">
                NEW
              </span>
            </div>
          </div>

          <div className={`bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-sm ${
            isCompact ? 'p-3' : 'p-4'
          }`}>
            <div className={`text-xs text-gold-400 font-semibold uppercase tracking-wider mb-2 flex items-center ${
              isCompact ? 'mb-1' : 'mb-2'
            }`}>
              <span className="w-1.5 h-1.5 bg-gold-400 rounded-full mr-1.5"></span>
              {category}
            </div>
            
            <h3 className={`font-bold text-white mb-2 group-hover:text-gold-400 transition-colors duration-300 line-clamp-2 leading-tight ${
              isCompact ? 'text-sm mb-1' : 'text-lg mb-2'
            }`}>
              {title}
            </h3>
            
            <div className={`flex items-center justify-between border-t border-gray-700/50 pt-3 ${
              isCompact ? 'pt-2' : 'pt-3'
            }`}>
              <div>
                <span className={`font-bold text-transparent bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text ${
                  isCompact ? 'text-lg' : 'text-xl'
                }`}>
                  {formatPrice(price)}
                </span>
              </div>
              <div className="flex gap-1.5">
                <Button
                  onClick={() => setIsDetailModalOpen(true)}
                  variant="ghost"
                  size="sm"
                  className="text-gold-400 hover:text-gold-300 hover:bg-gold-400/10 p-1.5 rounded-full transition-all duration-200"
                >
                  <Eye size={14} />
                </Button>
                <Button
                  onClick={handleAddToCart}
                  className={`bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg border border-gold-300/30 text-xs ${
                    isCompact ? 'px-2 py-1' : 'px-3 py-1.5'
                  }`}
                >
                  <ShoppingCart size={12} className="mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductDetailModal
        open={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={{
          id: `static-${title.replace(/\s+/g, '-').toLowerCase()}`,
          name: title,
          price: typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, "")) : price,
          images: [image],
          category,
          description: description || `${title} - ${category} device with premium features and quality.`
        }}
      />
    </>
  );
};

export default ProductCard;

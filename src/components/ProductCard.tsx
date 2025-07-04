
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  category: string;
  size?: 'default' | 'compact';
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, category, size = 'default' }) => {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Convert price string to number (remove "Rs. " and commas)
    const numericPrice = parseInt(price.replace(/Rs\.\s?|,|₨/g, ''));
    
    addToCart({
      title,
      price: numericPrice,
      image,
      category
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${title} has been added to your cart`,
      className: "bg-gradient-gold text-black font-semibold",
    });
  };

  const isImageUrl = image.startsWith('/') || image.startsWith('http');
  const cardHeight = size === 'compact' ? 'h-56' : 'h-64';
  const imageHeight = size === 'compact' ? 'h-40' : 'h-48';

  return (
    <div className="glass-morphism rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300">
      <div className={`relative ${cardHeight} bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center`}>
        {isImageUrl ? (
          <img 
            src={image} 
            alt={title}
            className={`max-w-full ${imageHeight} object-contain`}
            loading="eager"
            onLoad={() => console.log(`Image loaded: ${title}`)}
            onError={(e) => console.error(`Image failed to load: ${title}`, e)}
          />
        ) : (
          <span className={size === 'compact' ? 'text-5xl' : 'text-6xl'}>{image}</span>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>
      <div className="p-4">
        <div className="text-sm text-gold-400 font-medium uppercase tracking-wider mb-2">
          {category}
        </div>
        <h3 className={`font-bold text-white mb-3 group-hover:text-gold-400 transition-colors line-clamp-2 ${size === 'compact' ? 'text-sm' : 'text-lg'}`}>
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <span className={`font-bold text-gold-400 ${size === 'compact' ? 'text-lg' : 'text-xl'}`}>
            {price}
          </span>
          <Button 
            onClick={handleAddToCart}
            className={`bg-gold-400 hover:bg-gold-500 text-black font-semibold rounded-full transition-all duration-300 hover:scale-105 ${size === 'compact' ? 'px-3 py-1 text-sm' : 'px-4 py-2'}`}
          >
            <ShoppingCart size={size === 'compact' ? 14 : 16} className="mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

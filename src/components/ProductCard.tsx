
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
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, category }) => {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Convert price string to number (remove "Rs. " and commas)
    const numericPrice = parseInt(price.replace(/Rs\.\s?|,/g, ''));
    
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

  return (
    <div className="glass-morphism rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300">
      <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        {isImageUrl ? (
          <img 
            src={image} 
            alt={title}
            className="max-w-full max-h-full object-contain"
            loading="eager"
            onLoad={() => console.log(`Image loaded: ${title}`)}
            onError={(e) => console.error(`Image failed to load: ${title}`, e)}
          />
        ) : (
          <span className="text-6xl">{image}</span>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>
      <div className="p-6">
        <div className="text-sm text-gold-400 font-medium uppercase tracking-wider mb-2">
          {category}
        </div>
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold-400 transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gold-400">{price}</span>
          <Button 
            onClick={handleAddToCart}
            className="bg-gold-400 hover:bg-gold-500 text-black font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

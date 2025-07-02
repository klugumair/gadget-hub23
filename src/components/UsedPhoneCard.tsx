
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

interface UsedPhoneCardProps {
  id: string;
  title: string;
  price: number;
  condition: string;
  storage: string;
  ram: string;
  images: string[];
  usage_duration: string;
  onClick: () => void;
}

const UsedPhoneCard: React.FC<UsedPhoneCardProps> = ({ 
  id, 
  title, 
  price, 
  condition, 
  storage, 
  ram, 
  images, 
  usage_duration,
  onClick 
}) => {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    addToCart({
      title: `${title} (Used)`,
      price: price,
      image: images[0] || '/placeholder-phone.jpg',
      category: 'Used Phone'
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${title} has been added to your cart`,
      className: "bg-gradient-gold text-black font-semibold",
    });
  };

  return (
    <div className="glass-morphism rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center" onClick={onClick}>
        {images && images.length > 0 ? (
          <img 
            src={images[0]} 
            alt={title}
            className="max-w-full max-h-full object-contain"
            loading="eager"
          />
        ) : (
          <span className="text-6xl">📱</span>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            USED
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="text-sm text-gold-400 font-medium uppercase tracking-wider mb-2">
          Used Samsung
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
          {title}
        </h3>
        <div className="space-y-1 text-sm text-gray-400 mb-4">
          <p><strong>Condition:</strong> {condition}</p>
          <p><strong>Storage:</strong> {storage} | <strong>RAM:</strong> {ram}</p>
          <p><strong>Used for:</strong> {usage_duration}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gold-400">Rs. {price.toLocaleString()}</span>
          <div className="flex gap-2">
            <Button 
              onClick={onClick}
              variant="ghost"
              size="sm"
              className="text-gold-400 hover:text-gold-300"
            >
              <Eye size={16} />
            </Button>
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
    </div>
  );
};

export default UsedPhoneCard;


import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye, Edit } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import ProductDetailModal from './ProductDetailModal';
import AdminProductEditModal from './AdminProductEditModal';

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { isAdmin } = useAdminCheck();

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

  const handleEditClick = () => {
    console.log('Edit button clicked for static product:', title);
    setIsEditModalOpen(true);
  };

  const formatPrice = (priceValue: string | number) => {
    if (typeof priceValue === 'string') {
      return priceValue;
    }
    return `Rs. ${priceValue.toLocaleString()}`;
  };

  const cardClasses = size === 'compact' 
    ? "glass-morphism border-gold-400/20 overflow-hidden hover:border-gold-400/40 transition-all duration-300 group hover:scale-105"
    : "glass-morphism border-gold-400/20 overflow-hidden hover:border-gold-400/50 transition-all duration-300 hover:scale-105";

  const imageClasses = size === 'compact'
    ? "aspect-square bg-gray-800 rounded-lg mb-4 flex items-center justify-center text-4xl cursor-pointer relative"
    : "aspect-square bg-gray-800 rounded-lg mb-6 flex items-center justify-center text-6xl cursor-pointer relative";

  const titleClasses = size === 'compact'
    ? "text-white font-semibold text-sm mb-2 line-clamp-2"
    : "text-white font-semibold text-lg mb-3 line-clamp-2";

  const priceClasses = size === 'compact'
    ? "text-gold-400 font-bold text-lg"
    : "text-gold-400 font-bold text-xl";

  const buttonSize = size === 'compact' ? 'sm' : 'default';
  const buttonTextSize = size === 'compact' ? 'text-xs px-2 py-1' : 'text-sm px-4 py-2';

  return (
    <>
      <Card className={cardClasses}>
        <CardContent className={size === 'compact' ? 'p-4' : 'p-6'}>
          <div className={imageClasses} onClick={() => setIsDetailModalOpen(true)}>
            {image}
            
            {isAdmin && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick();
                  }}
                  className="w-8 h-8 p-0 bg-blue-500/80 border-blue-400 hover:bg-blue-500"
                >
                  <Edit size={14} />
                </Button>
              </div>
            )}
          </div>
          
          <div className="text-center space-y-3">
            <h3 className={titleClasses}>
              {title}
            </h3>
            <p className={priceClasses}>
              {formatPrice(price)}
            </p>
            <p className="text-gray-400 text-xs mt-1">{category}</p>
            
            <div className="flex justify-center space-x-2 mt-3">
              <Button
                onClick={() => setIsDetailModalOpen(true)}
                variant="outline"
                size={buttonSize}
                className={`bg-gray-700 border-gray-600 text-white hover:bg-gray-600 ${buttonTextSize}`}
              >
                <Eye size={size === 'compact' ? 12 : 16} className="mr-1" />
                View
              </Button>
              <Button
                onClick={handleAddToCart}
                size={buttonSize}
                className={`bg-gold-400 hover:bg-gold-500 text-black font-semibold ${buttonTextSize}`}
              >
                <ShoppingCart size={size === 'compact' ? 12 : 16} className="mr-1" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={{
          id: `static-${title.replace(/\s+/g, '-').toLowerCase()}`,
          title,
          price: typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, "")) : price,
          images: [image],
          category,
          description: description || `${title} - ${category} device with premium features and quality.`
        }}
      />

      <AdminProductEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={{
          id: `static-${title.replace(/\s+/g, '-').toLowerCase()}`,
          name: title,
          price: typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, "")) : price,
          category: 'gadget',
          subcategory: category,
          description: description || `${title} - ${category} device with premium features and quality.`,
          images: [image]
        }}
        onUpdate={() => {
          toast({
            title: "Note",
            description: "Static products cannot be permanently edited. Use the admin panel to add real products.",
            className: "bg-yellow-500 text-black font-semibold",
          });
          setIsEditModalOpen(false);
        }}
      />
    </>
  );
};

export default ProductCard;


import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ShoppingCart, Eye } from 'lucide-react';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import AdminProductEditModal from './AdminProductEditModal';
import ProductDetailModal from './ProductDetailModal';

interface DatabaseProductCardProps {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  subcategory?: string;
  description?: string;
  onUpdate: () => void;
}

const DatabaseProductCard: React.FC<DatabaseProductCardProps> = ({
  id,
  title,
  price,
  images,
  category,
  subcategory,
  description,
  onUpdate
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});
  const [imageLoaded, setImageLoaded] = useState<{[key: string]: boolean}>({});
  const { isAdmin } = useAdminCheck();
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Product Deleted! ✅",
        description: `${title} has been deleted successfully`,
        className: "bg-gradient-gold text-black font-semibold",
      });

      onUpdate();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddToCart = () => {
    addToCart({
      title,
      price,
      image: getDisplayImage() || '📦',
      category: subcategory || category
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${title} has been added to your cart`,
      className: "bg-gradient-gold text-black font-semibold",
    });
  };

  const handleEditClick = () => {
    console.log('Edit button clicked for product:', id, title);
    setIsEditModalOpen(true);
  };

  const handleImageError = (imageUrl: string) => {
    console.log('Image failed to load:', imageUrl, 'for product:', title);
    setImageError(prev => ({ ...prev, [imageUrl]: true }));
  };

  const handleImageLoad = (imageUrl: string) => {
    console.log('Image loaded successfully:', imageUrl, 'for product:', title);
    setImageLoaded(prev => ({ ...prev, [imageUrl]: true }));
    setImageError(prev => ({ ...prev, [imageUrl]: false }));
  };

  const getDisplayImage = () => {
    if (!images || images.length === 0) {
      console.log('No images available for product:', title);
      return null;
    }

    // Find the first image that hasn't failed to load
    for (const image of images) {
      if (!imageError[image]) {
        console.log('Using image:', image, 'for product:', title);
        return image;
      }
    }

    console.log('All images failed to load for product:', title);
    return null;
  };

  const displayImage = getDisplayImage();

  return (
    <>
      <Card className="glass-morphism border-gold-400/20 overflow-hidden hover:border-gold-400/40 transition-all duration-300 group hover:scale-105">
        <CardContent className="p-4">
          <div className="relative">
            <div 
              className="aspect-square bg-gray-800 rounded-lg mb-4 flex items-center justify-center text-4xl cursor-pointer overflow-hidden"
              onClick={() => setIsDetailModalOpen(true)}
            >
              {displayImage ? (
                <img 
                  src={displayImage} 
                  alt={title}
                  className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                  onError={() => handleImageError(displayImage)}
                  onLoad={() => handleImageLoad(displayImage)}
                  style={{ 
                    display: imageError[displayImage] ? 'none' : 'block' 
                  }}
                />
              ) : null}
              
              {(!displayImage || imageError[displayImage || '']) && (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <span className="text-2xl mb-2">📦</span>
                  <span className="text-xs">No Image</span>
                </div>
              )}
            </div>
            
            {isAdmin && (
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleEditClick}
                  className="w-8 h-8 p-0 bg-blue-500/80 border-blue-400 hover:bg-blue-500"
                >
                  <Edit size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDelete}
                  className="w-8 h-8 p-0 bg-red-500/80 border-red-400 hover:bg-red-500"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            )}
          </div>
          
          <div className="text-center space-y-3">
            <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-gold-400 font-bold text-lg">
              Rs. {price.toLocaleString()}
            </p>
            {subcategory && (
              <p className="text-gray-400 text-xs mt-1">{subcategory}</p>
            )}
            
            <div className="flex justify-center space-x-2 mt-3">
              <Button
                onClick={() => setIsDetailModalOpen(true)}
                variant="outline"
                size="sm"
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 text-xs px-2 py-1"
              >
                <Eye size={12} className="mr-1" />
                View
              </Button>
              <Button
                onClick={handleAddToCart}
                size="sm"
                className="bg-gold-400 hover:bg-gold-500 text-black font-semibold text-xs px-2 py-1"
              >
                <ShoppingCart size={12} className="mr-1" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AdminProductEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={{
          id,
          name: title,
          price,
          category: category as 'gadget' | 'headphone' | 'cover',
          subcategory,
          description,
          images
        }}
        onUpdate={() => {
          onUpdate();
          setIsEditModalOpen(false);
        }}
      />

      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={{
          id,
          title,
          price,
          images,
          category: subcategory || category,
          description: description || 'No description available'
        }}
      />
    </>
  );
};

export default DatabaseProductCard;

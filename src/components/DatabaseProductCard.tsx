
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface DatabaseProductCardProps {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  subcategory?: string;
  description?: string;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onUpdate?: () => void;
}

const DatabaseProductCard: React.FC<DatabaseProductCardProps> = ({ 
  id, 
  title, 
  price, 
  images, 
  category,
  subcategory,
  description, 
  onClick,
  onEdit,
  onDelete,
  onUpdate
}) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('email')
            .eq('id', user.id)
            .single();
          
          if (data && data.email === 'admin@gadgethub.com') {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      }
    };

    checkAdminStatus();
  }, [user]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    addToCart({
      title,
      price,
      image: images && images.length > 0 ? images[0] : '🎧',
      category
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${title} has been added to your cart`,
      className: "bg-gradient-gold text-black font-semibold",
    });
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only administrators can delete products",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Product Deleted!",
        description: `${title} has been removed`,
        className: "bg-red-500 text-white font-semibold",
      });

      if (onDelete) {
        onDelete();
      } else if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const getDisplayImage = () => {
    if (images && images.length > 0) {
      const imageUrl = images[0];
      // Check if it's a full URL or needs to be constructed
      if (imageUrl.startsWith('http')) {
        return imageUrl;
      } else if (imageUrl.startsWith('gadgethub/')) {
        return `https://sxolgseprhoremnjbual.supabase.co/storage/v1/object/public/${imageUrl}`;
      } else {
        return imageUrl;
      }
    }
    return null;
  };

  const displayImage = getDisplayImage();

  return (
    <div className="glass-morphism rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center" onClick={handleCardClick}>
        {displayImage ? (
          <img 
            src={displayImage} 
            alt={title}
            className="w-full h-full object-contain p-4"
            loading="lazy"
            onError={(e) => {
              console.error('Image failed to load:', displayImage);
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <span className={`text-6xl ${displayImage ? 'hidden' : ''}`}>🎧</span>
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        
        {isAdmin && (
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              onClick={handleEdit}
              variant="ghost"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 h-8 w-8"
            >
              <Edit size={12} />
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white p-2 h-8 w-8"
            >
              <Trash2 size={12} />
            </Button>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="text-sm text-gold-400 font-medium uppercase tracking-wider mb-2">
          {subcategory || category}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gold-400">Rs. {price.toLocaleString()}</span>
          <div className="flex gap-2">
            {onClick && (
              <Button 
                onClick={handleCardClick}
                variant="ghost"
                size="sm"
                className="text-gold-400 hover:text-gold-300"
              >
                <Eye size={16} />
              </Button>
            )}
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

export default DatabaseProductCard;

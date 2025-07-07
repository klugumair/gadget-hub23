
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { isAdmin } from "@/utils/adminUtils";

interface DatabaseProductCardProps {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  subcategory?: string;
  description?: string;
  onClick: () => void;
  onEdit?: () => void;
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
  onUpdate,
}) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isAdminUser, setIsAdminUser] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const checkAdminStatus = () => {
      if (user?.email) {
        setIsAdminUser(isAdmin(user.email));
      } else {
        setIsAdminUser(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    addToCart({
      title: title,
      price: price,
      image: images[0] || "/placeholder.jpg",
      category: category,
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${title} has been added to your cart`,
      className: "bg-gradient-gold text-black font-semibold",
    });
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAdminUser) {
      toast({
        title: "Access Denied",
        description: "Only administrators can delete products",
        variant: "destructive",
      });
      return;
    }

    if (isDeleting) return;

    try {
      setIsDeleting(true);
      console.log("Attempting to delete product with ID:", id);
      
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Delete error:", error);
        throw error;
      }

      console.log("Product deleted successfully");

      toast({
        title: "Product Deleted! ✅",
        description: `${title} has been removed successfully`,
        className: "bg-red-500 text-white font-semibold",
      });

      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Delete Failed ❌",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  const getDisplayImage = () => {
    if (images && images.length > 0) {
      const imageUrl = images[0];
      if (imageUrl.startsWith("http")) {
        return imageUrl;
      } else if (imageUrl.includes("supabase")) {
        return imageUrl;
      }
    }
    return null;
  };

  const displayImage = getDisplayImage();

  const getCategoryColor = () => {
    switch (category.toLowerCase()) {
      case 'headphone':
        return 'from-purple-600 to-purple-500';
      case 'cover':
        return 'from-orange-600 to-orange-500';
      case 'gadget':
        return 'from-green-600 to-green-500';
      default:
        return 'from-blue-600 to-blue-500';
    }
  };

  const getCategoryIcon = () => {
    switch (category.toLowerCase()) {
      case 'headphone':
        return '🎧';
      case 'cover':
        return '📱';
      case 'gadget':
        return '📲';
      default:
        return '⚡';
    }
  };

  return (
    <div className="group relative">
      <div className="glass-morphism rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer border border-gold-400/20 shadow-xl max-w-sm mx-auto">
        <div
          className="relative h-44 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center overflow-hidden"
          onClick={onClick}
        >
          {displayImage ? (
            <img
              src={displayImage}
              alt={title}
              className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                console.error("Image failed to load:", displayImage);
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : (
            <div className="text-4xl text-gold-400/30">{getCategoryIcon()}</div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-2 right-2 z-10">
            <span className={`bg-gradient-to-r ${getCategoryColor()} text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg border border-opacity-30`}>
              NEW
            </span>
          </div>

          {isAdminUser && (
            <>
              <div className="absolute top-2 left-2 z-10">
                <Button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  variant="destructive"
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white p-1 h-7 w-7 rounded-full shadow-lg border border-red-400/30 transition-all duration-200 hover:scale-110"
                >
                  {isDeleting ? (
                    <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Trash2 size={10} />
                  )}
                </Button>
              </div>
              
              <div className="absolute bottom-2 left-2 z-10">
                <Button
                  onClick={handleEdit}
                  variant="ghost"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-1 h-7 w-7 rounded-full shadow-lg border border-blue-400/30 transition-all duration-200 hover:scale-110"
                >
                  <Edit size={10} />
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="p-4 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-sm">
          <div className="text-xs text-gold-400 font-semibold uppercase tracking-wider mb-2 flex items-center">
            <span className="w-1 h-1 bg-gold-400 rounded-full mr-1"></span>
            {subcategory || category}
          </div>
          
          <h3 className="text-sm font-bold text-white mb-2 group-hover:text-gold-400 transition-colors duration-300 line-clamp-2 leading-tight">
            {title}
          </h3>
          
          <div className="flex items-center justify-between border-t border-gray-700/50 pt-3">
            <div>
              <span className="text-lg font-bold text-transparent bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text">
                Rs. {price.toLocaleString()}
              </span>
            </div>
            <div className="flex gap-1">
              <Button
                onClick={onClick}
                variant="ghost"
                size="sm"
                className="text-gold-400 hover:text-gold-300 hover:bg-gold-400/10 p-1 rounded-full transition-all duration-200"
              >
                <Eye size={12} />
              </Button>
              <Button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-black font-bold px-2 py-1 rounded-full transition-all duration-300 hover:scale-105 shadow-lg border border-gold-300/30 text-xs"
              >
                <ShoppingCart size={10} className="mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseProductCard;

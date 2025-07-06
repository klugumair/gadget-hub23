
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { isAdmin } from "@/utils/adminUtils";

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
  onDelete?: () => void;
  isDatabase?: boolean;
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
  onClick,
  onDelete,
  isDatabase = false,
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
      title: `${title} (Used)`,
      price: price,
      image: images[0] || "/placeholder-phone.jpg",
      category: "Used Phone",
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
      
      const { error } = await supabase
        .from("phone_submissions")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Delete error:", error);
        throw error;
      }

      toast({
        title: "Product Deleted! ✅",
        description: `${title} has been removed successfully`,
        className: "bg-red-500 text-white font-semibold",
      });

      if (onDelete) {
        onDelete();
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

  const getDisplayImage = () => {
    if (images && images.length > 0) {
      const imageUrl = images[0];
      if (imageUrl.startsWith("http")) {
        return imageUrl;
      } else if (imageUrl.startsWith("phone-images/")) {
        return `https://sxolgseprhoremnjbual.supabase.co/storage/v1/object/public/${imageUrl}`;
      } else if (imageUrl.includes("supabase")) {
        return imageUrl;
      } else {
        return `https://sxolgseprhoremnjbual.supabase.co/storage/v1/object/public/phone-images/${imageUrl}`;
      }
    }
    return null;
  };

  const displayImage = getDisplayImage();

  return (
    <div className="group relative">
      <div className="glass-morphism rounded-3xl overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer border border-gold-400/20 shadow-2xl">
        <div
          className="relative h-72 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center overflow-hidden"
          onClick={onClick}
        >
          {displayImage ? (
            <img
              src={displayImage}
              alt={title}
              className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                console.error("Image failed to load:", displayImage);
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : (
            <div className="text-8xl text-gold-400/30">📱</div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-4 right-4 z-10">
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg border border-blue-400/30">
              USED
            </span>
          </div>

          {isAdminUser && isDatabase && (
            <div className="absolute top-4 left-4 z-10">
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                variant="destructive"
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white p-2 h-9 w-9 rounded-full shadow-lg border border-red-400/30 transition-all duration-200 hover:scale-110"
              >
                {isDeleting ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Trash2 size={14} />
                )}
              </Button>
            </div>
          )}
        </div>

        <div className="p-6 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-sm">
          <div className="text-sm text-gold-400 font-semibold uppercase tracking-wider mb-3 flex items-center">
            <span className="w-2 h-2 bg-gold-400 rounded-full mr-2"></span>
            Pre-Owned Device
          </div>
          
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300 line-clamp-2 leading-tight">
            {title}
          </h3>
          
          <div className="space-y-2 text-sm text-gray-300 mb-5">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Condition:</span>
              <span className="font-medium text-green-400">{condition}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Storage:</span>
              <span className="font-medium">{storage}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">RAM:</span>
              <span className="font-medium">{ram}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Used for:</span>
              <span className="font-medium text-blue-400">{usage_duration}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-gray-700/50 pt-4">
            <div>
              <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text">
                Rs. {price.toLocaleString()}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={onClick}
                variant="ghost"
                size="sm"
                className="text-gold-400 hover:text-gold-300 hover:bg-gold-400/10 p-2 rounded-full transition-all duration-200"
              >
                <Eye size={18} />
              </Button>
              <Button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-black font-bold px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg border border-gold-300/30"
              >
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedPhoneCard;

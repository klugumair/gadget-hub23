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

    try {
      const { error } = await supabase
        .from("phone_submissions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Product Deleted!",
        description: `${title} has been removed`,
        className: "bg-red-500 text-white font-semibold",
      });

      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const getDisplayImage = () => {
    if (images && images.length > 0) {
      const imageUrl = images[0];
      if (imageUrl.startsWith("http")) {
        return imageUrl;
      } else if (imageUrl.startsWith("phone-images/")) {
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
      <div
        className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
        onClick={onClick}
      >
        {displayImage ? (
          <img
            src={displayImage}
            alt={title}
            className="w-full h-full object-contain p-4"
            loading="lazy"
            onError={(e) => {
              console.error("Image failed to load:", displayImage);
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
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

        {isAdminUser && isDatabase && (
          <div className="absolute top-4 left-4">
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
          Used Phone
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors line-clamp-2">
          {title}
        </h3>
        <div className="space-y-1 text-sm text-gray-400 mb-4">
          <p>
            <strong>Condition:</strong> {condition}
          </p>
          <p>
            <strong>Storage:</strong> {storage} | <strong>RAM:</strong> {ram}
          </p>
          <p>
            <strong>Used for:</strong> {usage_duration}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gold-400">
            Rs. {price.toLocaleString()}
          </span>
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

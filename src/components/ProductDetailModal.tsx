
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductDetailModalProps {
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
    subcategory?: string;
    description?: string;
    images: string[];
    additional_notes?: string;
  } | null;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      title: product.name,
      price: product.price,
      image: product.images[0] || "/placeholder.jpg",
      category: product.category,
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} has been added to your cart`,
      className: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold",
    });

    onClose();
  };

  const getDisplayImage = (imageUrl: string) => {
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    } else if (imageUrl.includes("supabase")) {
      return imageUrl;
    }
    return imageUrl;
  };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border-gold-400/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gold-400 mb-4">
            {product.name}
          </DialogTitle>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </Button>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={getDisplayImage(product.images[0])}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                  onError={(e) => {
                    console.error("Image failed to load:", product.images[0]);
                    e.currentTarget.src = "/placeholder.jpg";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl text-gold-400/30">
                  📱
                </div>
              )}
            </div>

            {/* Additional Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <img
                      src={getDisplayImage(image)}
                      alt={`${product.name} ${index + 2}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-gradient-to-r from-gold-400 to-gold-600 text-black px-3 py-1 rounded-full text-sm font-bold mb-4">
                {product.subcategory || product.category}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Price</h3>
                <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text">
                  Rs. {product.price.toLocaleString()}
                </p>
              </div>

              {product.description && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{product.description}</p>
                </div>
              )}

              {product.additional_notes && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Additional Notes</h3>
                  <p className="text-gray-300 leading-relaxed">{product.additional_notes}</p>
                </div>
              )}
            </div>

            <div className="pt-6 space-y-4">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-black font-bold py-3 text-lg rounded-full transition-all duration-300 hover:scale-105"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;

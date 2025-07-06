
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  description?: string;
}

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product
}) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    addToCart({
      title: product.title,
      price: product.price,
      image: product.images[0] || '🎧',
      category: product.category
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${product.title} has been added to your cart`,
      className: "bg-gradient-gold text-black font-semibold",
    });
  };

  const getDisplayImage = (imageUrl: string) => {
    if (!imageUrl) return null;
    
    // Handle different image URL formats
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    } else if (imageUrl.startsWith("gadgethub/") || imageUrl.startsWith("phone-images/")) {
      return `https://sxolgseprhoremnjbual.supabase.co/storage/v1/object/public/${imageUrl}`;
    } else if (imageUrl.includes("supabase")) {
      return imageUrl;
    } else if (imageUrl.includes('/')) {
      // If it's a relative path with folder, construct the full URL
      return `https://sxolgseprhoremnjbual.supabase.co/storage/v1/object/public/gadgethub/${imageUrl}`;
    } else {
      // Single character emoji or icon
      return null;
    }
  };

  const validImages = product.images.filter(img => getDisplayImage(img) !== null);
  const currentImage = validImages[currentImageIndex];
  const displayImage = currentImage ? getDisplayImage(currentImage) : null;

  const nextImage = () => {
    if (validImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    }
  };

  const prevImage = () => {
    if (validImages.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-black border-gold-400/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gold-400 text-2xl font-bold">
            {product.title}
          </DialogTitle>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </Button>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <div className="bg-gray-800 rounded-lg p-8 flex items-center justify-center min-h-[400px] relative">
              {displayImage ? (
                <>
                  <img
                    src={displayImage}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onError={(e) => {
                      console.error("Image failed to load:", displayImage);
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <div className="text-8xl hidden">
                    {product.images[0] && !getDisplayImage(product.images[0]) ? product.images[0] : '🎧'}
                  </div>
                </>
              ) : (
                <div className="text-8xl">
                  {product.images[0] || '🎧'}
                </div>
              )}
              
              {validImages.length > 1 && (
                <>
                  <Button
                    onClick={prevImage}
                    variant="ghost"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronLeft size={20} />
                  </Button>
                  <Button
                    onClick={nextImage}
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronRight size={20} />
                  </Button>
                </>
              )}
            </div>
            
            {validImages.length > 1 && (
              <div className="flex gap-2 mt-4 justify-center">
                {validImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-gold-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider">
                {product.category}
              </p>
              <h3 className="text-white text-xl font-semibold mt-2">
                {product.title}
              </h3>
            </div>
            
            {product.description && (
              <div>
                <h4 className="text-gold-400 font-semibold mb-2">Description</h4>
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </div>
            )}
            
            <div className="pt-4">
              <p className="text-gold-400 text-3xl font-bold mb-6">
                Rs. {product.price.toLocaleString()}
              </p>
              
              <Button
                onClick={handleAddToCart}
                className="w-full bg-gold-400 hover:bg-gold-500 text-black font-semibold py-3 text-lg"
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

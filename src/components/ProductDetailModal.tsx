
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface Variant {
  ram: string;
  storage: string;
  price: number;
}

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  description?: string;
  additional_notes?: string;
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
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  if (!product) {
    return null;
  }

  // Parse variants from additional_notes if available
  let variants: Variant[] = [];
  let hasVariants = false;
  
  try {
    if (product.additional_notes) {
      const parsedData = JSON.parse(product.additional_notes);
      if (parsedData.variants && Array.isArray(parsedData.variants)) {
        variants = parsedData.variants;
        hasVariants = variants.length > 0;
      }
    }
  } catch (error) {
    console.log('No variants data found');
  }

  const currentVariant = hasVariants ? variants[selectedVariantIndex] : null;
  const displayPrice = currentVariant ? currentVariant.price : product.price;
  const variantLabel = currentVariant ? `${currentVariant.ram} RAM - ${currentVariant.storage}` : '';

  const handleAddToCart = () => {
    const productTitle = hasVariants && currentVariant 
      ? `${product.title} (${currentVariant.ram} RAM - ${currentVariant.storage})`
      : product.title;

    addToCart({
      title: productTitle,
      price: displayPrice,
      image: product.images[0] || '🎧',
      category: product.category
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${productTitle} has been added to your cart`,
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
              {hasVariants && currentVariant && (
                <p className="text-gold-400 text-sm mt-1">
                  {variantLabel}
                </p>
              )}
            </div>

            {hasVariants && variants.length > 0 && (
              <div>
                <h4 className="text-gold-400 font-semibold mb-3">Available Variants</h4>
                <div className="space-y-2">
                  {variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`w-full p-3 rounded-lg border-2 transition-colors text-left ${
                        selectedVariantIndex === index
                          ? 'border-gold-400 bg-gold-400/10 text-gold-400'
                          : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gold-400/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{variant.ram} RAM - {variant.storage}</span>
                        <span className="text-gold-400 font-bold">Rs. {variant.price.toLocaleString()}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {product.description && (
              <div>
                <h4 className="text-gold-400 font-semibold mb-2">Description</h4>
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </div>
            )}
            
            <div className="pt-4">
              <p className="text-gold-400 text-3xl font-bold mb-6">
                Rs. {displayPrice.toLocaleString()}
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

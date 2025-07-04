
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    price: number;
    images: string[];
    category: string;
    description: string;
  };
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product
}) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({
      title: product.title,
      price: product.price,
      image: product.images[0] || '📦',
      category: product.category
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${product.title} has been added to your cart`,
      className: "bg-gradient-gold text-black font-semibold",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">
            {product.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {product.images && product.images.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="glass-morphism rounded-2xl p-8 h-96 flex items-center justify-center">
                        <img 
                          src={image} 
                          alt={`${product.title} ${index + 1}`}
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {product.images.length > 1 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
            ) : (
              <div className="glass-morphism rounded-2xl p-8 h-96 flex items-center justify-center text-6xl">
                📦
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                ))}
                <Star className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 ml-2">(4.2/5 - 89 reviews)</span>
              </div>
              <div className="text-sm text-gold-400 font-medium uppercase tracking-wider mb-2">
                {product.category}
              </div>
            </div>

            <div className="text-3xl font-bold text-gold-400">
              Rs. {product.price.toLocaleString()}
            </div>

            <Button 
              onClick={handleAddToCart}
              className="w-full bg-gold-400 hover:bg-gold-500 text-black font-semibold py-3 text-lg"
            >
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </Button>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 py-6">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-green-400" />
                <span>1 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <RotateCcw className="w-4 h-4 text-purple-400" />
                <span>7 Day Return</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Star className="w-4 h-4 text-gold-400" />
                <span>Premium Quality</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Description:</h3>
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;

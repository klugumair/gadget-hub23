
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X } from 'lucide-react';
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-black border-gold-400/30">
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
          <div className="bg-gray-800 rounded-lg p-8 flex items-center justify-center">
            <span className="text-8xl">{product.images[0] || '🎧'}</span>
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
                <p className="text-gray-300">{product.description}</p>
              </div>
            )}
            
            <div className="pt-4">
              <p className="text-gold-400 text-3xl font-bold mb-4">
                Rs. {product.price.toLocaleString()}
              </p>
              
              <Button
                onClick={handleAddToCart}
                className="w-full bg-gold-400 hover:bg-gold-500 text-black font-semibold py-3"
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

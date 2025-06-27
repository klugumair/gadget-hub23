
import React, { useState } from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const IPhone11 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const productImages = [
    "📱",
    "📱",
    "📱",
    "📱"
  ];

  const variants = [
    { storage: "4GB RAM - 64GB", price: 89999 },
    { storage: "4GB RAM - 128GB", price: 94999 },
    { storage: "4GB RAM - 256GB", price: 104999 }
  ];

  const handleAddToCart = () => {
    addToCart({
      title: `iPhone 11 (${variants[selectedVariant].storage})`,
      price: variants[selectedVariant].price,
      image: productImages[0],
      category: "iPhone"
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `iPhone 11 (${variants[selectedVariant].storage}) has been added to your cart`,
      className: "bg-gradient-gold text-black font-semibold",
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Link to="/phones/new/iphone" className="inline-block">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to iPhone
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative glass-morphism rounded-2xl p-8 h-96 flex items-center justify-center">
                <span className="text-8xl">{productImages[currentImageIndex]}</span>
                
                <Button
                  onClick={prevImage}
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black"
                >
                  <ChevronLeft size={20} />
                </Button>
                
                <Button
                  onClick={nextImage}
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black"
                >
                  <ChevronRight size={20} />
                </Button>
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-2 justify-center">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      currentImageIndex === index 
                        ? 'ring-2 ring-gold-400 glass-morphism' 
                        : 'glass-morphism hover:ring-1 hover:ring-gold-400/50'
                    }`}
                  >
                    <span className="text-2xl">{image}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gold-400 font-medium uppercase tracking-wider mb-2">
                  iPhone
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  iPhone 11
                </h1>
                <div className="text-3xl font-bold text-gold-400 mb-6">
                  Rs. {variants[selectedVariant].price.toLocaleString()}
                </div>
              </div>

              {/* Storage Variants */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Choose Storage</h3>
                <div className="grid gap-3">
                  {variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(index)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedVariant === index
                          ? 'border-gold-400 bg-gold-400/10'
                          : 'border-gray-600 hover:border-gold-400/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-white font-semibold">{variant.storage}</div>
                        <div className="text-gold-400 font-bold">Rs. {variant.price.toLocaleString()}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Features */}
              <div className="glass-morphism rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• A13 Bionic chip with 3rd generation Neural Engine</li>
                  <li>• 6.1-inch Liquid Retina HD display</li>
                  <li>• Dual 12MP camera system</li>
                  <li>• Face ID for secure authentication</li>
                  <li>• All-day battery life</li>
                </ul>
              </div>

              {/* Add to Cart */}
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-gradient-gold hover:bg-gold-500 text-black font-bold py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart - Rs. {variants[selectedVariant].price.toLocaleString()}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default IPhone11;

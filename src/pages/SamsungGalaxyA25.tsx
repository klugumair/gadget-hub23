
import React, { useState } from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const SamsungGalaxyA25 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const productImages = [
    "/lovable-uploads/e0a1f7bd-f278-4d47-899c-5d8a32a1b501.png",
    "/lovable-uploads/47e16dc5-1736-44a5-b243-55fa0c2ea601.png"
  ];

  const price = 98500;
  const storage = "8GB - 256GB";

  const handleAddToCart = () => {
    addToCart({
      title: `Samsung Galaxy A25 5G (${storage})`,
      price: price,
      image: productImages[0],
      category: "Samsung"
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `Samsung Galaxy A25 5G (${storage}) has been added to your cart`,
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
            <Link to="/phones/new/samsung" className="inline-block">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to Samsung
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative glass-morphism rounded-2xl p-8 h-96 flex items-center justify-center">
                <img 
                  src={productImages[currentImageIndex]} 
                  alt={`Samsung Galaxy A25 5G - Image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
                
                {productImages.length > 1 && (
                  <>
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
                  </>
                )}
              </div>
              
              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="flex space-x-2 justify-center">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-300 overflow-hidden ${
                        currentImageIndex === index 
                          ? 'ring-2 ring-gold-400' 
                          : 'glass-morphism hover:ring-1 hover:ring-gold-400/50'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gold-400 font-medium uppercase tracking-wider mb-2">
                  Samsung
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Galaxy A25 5G
                </h1>
                <div className="text-3xl font-bold text-gold-400 mb-6">
                  Rs. {price.toLocaleString()}
                </div>
              </div>

              {/* Storage Display */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Storage Configuration</h3>
                <div className="inline-block">
                  <div className="px-6 py-3 rounded-full font-semibold bg-gradient-gold text-black">
                    {storage}
                  </div>
                </div>
              </div>

              {/* Product Features */}
              <div className="glass-morphism rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• 5G connectivity for ultra-fast speeds</li>
                  <li>• Premium Samsung build quality</li>
                  <li>• Advanced camera system with multiple lenses</li>
                  <li>• Large vibrant AMOLED display</li>
                  <li>• Long-lasting battery with fast charging</li>
                </ul>
              </div>

              {/* Add to Cart */}
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-gradient-gold hover:bg-gold-500 text-black font-bold py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart - Rs. {price.toLocaleString()}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SamsungGalaxyA25;

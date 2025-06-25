
import React, { useState } from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const SamsungGalaxyA06 = () => {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const variants = [
    { storage: "4GB - 128GB", price: 25500 },
    { storage: "6GB - 128GB", price: 30500 }
  ];

  const productImages = ["📱", "📲", "📞", "🔋"]; // Placeholder for the 4 images

  const handleAddToCart = () => {
    const selectedPrice = variants[selectedVariant].price;
    const selectedStorage = variants[selectedVariant].storage;
    
    addToCart({
      title: `Samsung Galaxy A06 (${selectedStorage})`,
      price: selectedPrice,
      image: "📱",
      category: "Samsung"
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `Samsung Galaxy A06 (${selectedStorage}) has been added to your cart`,
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
                    className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl transition-all duration-300 ${
                      currentImageIndex === index 
                        ? 'bg-gold-400 text-black' 
                        : 'glass-morphism text-white hover:bg-gold-400/20'
                    }`}
                  >
                    {image}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gold-400 font-medium uppercase tracking-wider mb-2">
                  Samsung
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Galaxy A06
                </h1>
                <div className="text-3xl font-bold text-gold-400 mb-6">
                  Rs. {variants[selectedVariant].price.toLocaleString()}
                </div>
              </div>

              {/* Variant Selection */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Storage Options</h3>
                <div className="flex space-x-3">
                  {variants.map((variant, index) => (
                    <Button
                      key={index}
                      onClick={() => setSelectedVariant(index)}
                      variant={selectedVariant === index ? "default" : "outline"}
                      className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                        selectedVariant === index
                          ? 'bg-gradient-gold text-black hover:bg-gold-500'
                          : 'border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black'
                      }`}
                    >
                      {variant.storage}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Product Features */}
              <div className="glass-morphism rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Premium Samsung build quality</li>
                  <li>• Large vibrant display</li>
                  <li>• Advanced camera system</li>
                  <li>• Long-lasting battery</li>
                  <li>• Latest Android experience</li>
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

export default SamsungGalaxyA06;

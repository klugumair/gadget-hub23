
import React, { useState } from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Star, Shield, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SamsungGalaxyA25 = () => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState('6GB/128GB');

  const variants = [
    { name: '6GB/128GB', price: 98500 },
    { name: '8GB/256GB', price: 108500 }
  ];

  const images = [
    "/lovable-uploads/e0a1f7bd-f278-4d47-899c-5d8a32a1b501.png",
    "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  ];

  const keyFeatures = [
    "6.5\" Super AMOLED Display",
    "Exynos 1280 Processor",
    "Triple Camera 50MP+8MP+2MP",
    "13MP Front Camera",
    "5000mAh Battery",
    "25W Fast Charging",
    "Android 14 with One UI 6.1"
  ];

  const handleAddToCart = () => {
    const selectedPrice = variants.find(v => v.name === selectedVariant)?.price || variants[0].price;
    
    addToCart({
      title: `Samsung Galaxy A25 5G (${selectedVariant})`,
      price: selectedPrice,
      image: images[0],
      category: "Samsung"
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `Galaxy A25 5G (${selectedVariant}) has been added to your cart`,
      className: "bg-gradient-gold text-black font-semibold",
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <Link to="/phones/new/samsung" className="inline-block mb-8">
            <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
              <ArrowLeft size={20} className="mr-2" />
              Back to Samsung Products
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="glass-morphism rounded-2xl p-8 h-96 flex items-center justify-center">
                        <img 
                          src={image} 
                          alt={`Galaxy A25 ${index + 1}`}
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  <span className="text-shimmer">Samsung Galaxy A25 5G</span>
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                  ))}
                  <Star className="w-5 h-5 fill-gold-400 text-gold-400" />
                  <span className="text-gray-400 ml-2">(4.5/5 - 124 reviews)</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Choose Variant:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {variants.map((variant) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariant(variant.name)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedVariant === variant.name
                          ? 'border-gold-400 bg-gold-400/10 text-gold-400'
                          : 'border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <div className="font-medium">{variant.name}</div>
                      <div className="text-sm">Rs. {variant.price.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-3xl font-bold text-gold-400">
                Rs. {variants.find(v => v.name === selectedVariant)?.price.toLocaleString()}
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
                  <span>5G Ready</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Key Features:</h3>
                <ul className="space-y-2">
                  {keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SamsungGalaxyA25;

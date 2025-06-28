
import React, { useState } from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Star, Shield, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SamsungGalaxyA56 = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState('8GB/128GB');

  const variants = [
    { name: '8GB/128GB', price: 130000 },
    { name: '8GB/256GB', price: 140000 },
    { name: '12GB/256GB', price: 150000 }
  ];

  const images = [
    "/lovable-uploads/7a291dd7-8f8c-4a9b-b4cd-769a23174b5f.png",
    "/lovable-uploads/1db61834-4486-470d-8d69-4dff0bd3a184.png",
    "/lovable-uploads/5d1acced-61df-4631-b3bb-6f6f169f0833.png",
    "/lovable-uploads/a051e490-52dc-40f8-adf3-92f5d8dbf7a1.png"
  ];

  const keyFeatures = [
    "6.7\" Super AMOLED Display",
    "Exynos 1480 Processor",
    "Triple Camera 50MP+12MP+5MP",
    "32MP Front Camera",
    "5000mAh Battery",
    "25W Fast Charging",
    "Android 14 with One UI 6.1"
  ];

  const handleAddToCart = () => {
    const selectedPrice = variants.find(v => v.name === selectedVariant)?.price || variants[0].price;
    
    addToCart({
      title: `Samsung Galaxy A56 (${selectedVariant})`,
      price: selectedPrice,
      image: images[0],
      category: "Samsung"
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `Samsung Galaxy A56 (${selectedVariant}) has been added to your cart`,
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
                          alt={`Galaxy A56 ${index + 1}`}
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
                  <span className="text-shimmer">Samsung Galaxy A56</span>
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                  ))}
                  <Star className="w-5 h-5 fill-gold-400 text-gold-400" />
                  <span className="text-gray-400 ml-2">(4.6/5 - 142 reviews)</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Choose Variant:</h3>
                <div className="grid grid-cols-3 gap-3">
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
                  <span>Premium Choice</span>
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

export default SamsungGalaxyA56;

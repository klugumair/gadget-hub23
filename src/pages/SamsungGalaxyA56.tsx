
import React, { useState } from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
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
  const [selectedImage, setSelectedImage] = useState(0);

  const price = 130000;
  const storage = "12GB - 256GB";

  const images = [
    "/lovable-uploads/7a291dd7-8f8c-4a9b-b4cd-769a23174b5f.png",
    "/lovable-uploads/1db61834-4486-470d-8d69-4dff0bd3a184.png",
    "/lovable-uploads/5d1acced-61df-4631-b3bb-6f6f169f0833.png",
    "/lovable-uploads/a051e490-52dc-40f8-adf3-92f5d8dbf7a1.png"
  ];

  const handleAddToCart = () => {
    addToCart({
      title: `Samsung Galaxy A56 (${storage})`,
      price: price,
      image: images[0],
      category: "Samsung"
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `Samsung Galaxy A56 (${storage}) has been added to your cart`,
      className: "bg-gradient-gold text-black font-semibold",
    });
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
                  src={images[selectedImage]} 
                  alt="Samsung Galaxy A56"
                  className="max-w-full max-h-full object-contain"
                  loading="eager"
                />
              </div>
              
              {/* Image Carousel */}
              <div className="w-full max-w-md mx-auto">
                <Carousel className="w-full">
                  <CarouselContent>
                    {images.map((image, index) => (
                      <CarouselItem key={index} className="basis-1/3">
                        <div className="p-1">
                          <div 
                            className={`glass-morphism rounded-lg p-2 cursor-pointer transition-all duration-300 ${
                              selectedImage === index ? 'ring-2 ring-gold-400' : 'hover:ring-1 hover:ring-gold-400'
                            }`}
                            onClick={() => setSelectedImage(index)}
                          >
                            <img 
                              src={image} 
                              alt={`Samsung Galaxy A56 view ${index + 1}`}
                              className="w-full h-20 object-contain"
                              loading="eager"
                            />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gold-400 font-medium uppercase tracking-wider mb-2">
                  Samsung
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Galaxy A56
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
                  <li>• Premium flagship-level performance</li>
                  <li>• Advanced Samsung build quality</li>
                  <li>• Professional camera system</li>
                  <li>• High-resolution display with premium design</li>
                  <li>• Fast charging with extended battery life</li>
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

export default SamsungGalaxyA56;

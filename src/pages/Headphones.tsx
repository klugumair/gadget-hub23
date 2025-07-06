
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import ProductDetailModal from '@/components/ProductDetailModal';

const Headphones = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const headphones = [
    {
      id: 1,
      title: "Ronin R920 Pro",
      price: 25000,
      originalPrice: 35000,
      image: "🎧",
      category: "Gaming Headphones",
      description: "Professional gaming headphones with surround sound and RGB lighting.",
      link: "/headphones/ronin-r920-pro"
    },
    {
      id: 2,
      title: "Sony WH-1000XM5",
      price: 85000,
      originalPrice: 95000,
      image: "🎧",
      category: "Noise Cancelling",
      description: "Industry-leading noise cancellation with premium sound quality.",
      link: "/headphones/sony-wh-1000xm5"
    },
    {
      id: 3,
      title: "Sennheiser Momentum 4",
      price: 75000,
      originalPrice: 85000,
      image: "🎧",
      category: "Audiophile",
      description: "Audiophile-grade wireless headphones with exceptional clarity.",
      link: "/headphones/sennheiser-momentum-4"
    },
    {
      id: 4,
      title: "AirPods Max Gold",
      price: 135000,
      originalPrice: 150000,
      image: "🎧",
      category: "Premium Wireless",
      description: "Apple's premium over-ear headphones with spatial audio.",
      link: "/headphones/airpods-max-gold"
    },
    {
      id: 5,
      title: "Audionic Blue Beat BB10",
      price: 8500,
      originalPrice: 12000,
      image: "🎧",
      category: "Budget Wireless",
      description: "Affordable wireless headphones with great battery life.",
      link: "/headphones/audionic-blue-beat-bb10"
    }
  ];

  const handleAddToCart = (headphone: any) => {
    addToCart({
      title: headphone.title,
      price: headphone.price,
      image: headphone.image,
      category: headphone.category
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${headphone.title} has been added to your cart`,
      className: "bg-gradient-gold text-black font-semibold",
    });
  };

  const handleViewDetails = (headphone: any) => {
    setSelectedProduct(headphone);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Link to="/" className="inline-block mb-8">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-shimmer">Premium Headphones</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Discover our curated collection of high-quality headphones
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {headphones.map((headphone) => (
              <Card key={headphone.id} className="glass-morphism border-gold-400/20 overflow-hidden hover:border-gold-400/50 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6">
                  <div className="relative">
                    <div className="aspect-square bg-gray-800 rounded-lg mb-6 flex items-center justify-center text-6xl cursor-pointer">
                      {headphone.image}
                    </div>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <h3 className="text-white font-semibold text-lg mb-3 line-clamp-2">
                      {headphone.title}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-gold-400 font-bold text-xl">
                        Rs. {headphone.price.toLocaleString()}
                      </p>
                      {headphone.originalPrice && (
                        <p className="text-gray-500 line-through text-sm">
                          Rs. {headphone.originalPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs mt-1">{headphone.category}</p>
                    
                    <div className="flex justify-center space-x-2 mt-4">
                      <Button
                        onClick={() => handleViewDetails(headphone)}
                        variant="outline"
                        className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 text-sm px-4 py-2"
                      >
                        <Eye size={16} className="mr-2" />
                        View
                      </Button>
                      <Button
                        onClick={() => handleAddToCart(headphone)}
                        className="bg-gold-400 hover:bg-gold-500 text-black font-semibold text-sm px-4 py-2"
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={selectedProduct ? {
          id: selectedProduct.id.toString(),
          title: selectedProduct.title,
          price: selectedProduct.price,
          images: [selectedProduct.image],
          category: selectedProduct.category,
          description: selectedProduct.description
        } : null}
      />
    </div>
  );
};

export default Headphones;

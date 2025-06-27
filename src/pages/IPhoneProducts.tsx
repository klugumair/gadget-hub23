import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';

const IPhoneProducts = () => {
  const iPhoneProducts = [
    {
      title: "iPhone 11",
      price: "From Rs. 89,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-11"
    },
    {
      title: "iPhone 11 Pro",
      price: "From Rs. 119,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-11-pro"
    },
    {
      title: "iPhone 11 Pro Max",
      price: "From Rs. 129,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-11-pro-max"
    },
    {
      title: "iPhone 12",
      price: "From Rs. 109,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-12"
    },
    {
      title: "iPhone 12 Mini",
      price: "From Rs. 99,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-12-mini"
    },
    {
      title: "iPhone 12 Pro",
      price: "From Rs. 139,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-12-pro"
    },
    {
      title: "iPhone 12 Pro Max",
      price: "From Rs. 149,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-12-pro-max"
    },
    {
      title: "iPhone 13",
      price: "From Rs. 129,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-13"
    },
    {
      title: "iPhone 13 Mini",
      price: "From Rs. 119,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-13-mini"
    },
    {
      title: "iPhone 13 Pro",
      price: "From Rs. 159,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-13-pro"
    },
    {
      title: "iPhone 13 Pro Max",
      price: "From Rs. 169,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-13-pro-max"
    },
    {
      title: "iPhone 14",
      price: "From Rs. 149,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-14"
    },
    {
      title: "iPhone 14 Plus",
      price: "From Rs. 159,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-14-plus"
    },
    {
      title: "iPhone 14 Pro",
      price: "From Rs. 179,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-14-pro"
    },
    {
      title: "iPhone 14 Pro Max",
      price: "From Rs. 189,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-14-pro-max"
    },
    {
      title: "iPhone 15",
      price: "From Rs. 169,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-15"
    },
    {
      title: "iPhone 15 Plus",
      price: "From Rs. 179,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-15-plus"
    },
    {
      title: "iPhone 15 Pro",
      price: "From Rs. 199,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-15-pro"
    },
    {
      title: "iPhone 15 Pro Max",
      price: "From Rs. 209,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-15-pro-max"
    },
    {
      title: "iPhone 16",
      price: "From Rs. 189,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-16"
    },
    {
      title: "iPhone 16e",
      price: "From Rs. 179,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-16e"
    },
    {
      title: "iPhone 16 Plus",
      price: "From Rs. 199,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-16-plus"
    },
    {
      title: "iPhone 16 Pro",
      price: "From Rs. 219,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-16-pro"
    },
    {
      title: "iPhone 16 Pro Max",
      price: "From Rs. 229,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-16-pro-max"
    },
    {
      title: "iPhone XR",
      price: "From Rs. 69,999",
      image: "📱",
      category: "iPhone",
      link: "/phones/new/iphone/iphone-xr"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Link to="/phones/new" className="inline-block mb-8">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to New Phones
              </Button>
            </Link>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-shimmer">iPhone Collection</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Discover our premium iPhone smartphone collection
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {iPhoneProducts.map((product, index) => (
              <div key={index} className="cursor-pointer" onClick={() => {
                if (product.link !== '#') {
                  window.location.href = product.link;
                } else {
                  console.log(`Clicked on ${product.title}`);
                }
              }}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default IPhoneProducts;

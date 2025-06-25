
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import PhoneBrandCard from '@/components/PhoneBrandCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewPhones = () => {
  const phoneBrands = [
    { brand: 'Samsung', icon: '📱', route: '/phones/new/samsung' },
    { brand: 'iPhone', icon: '🍎', route: '/phones/new/iphone' },
    { brand: 'Infinix', icon: '📲', route: '/phones/new/infinix' },
    { brand: 'Google Pixel', icon: '🔍', route: '/phones/new/google-pixel' },
    { brand: 'Realme', icon: '⚡', route: '/phones/new/realme' },
    { brand: 'Spark X', icon: '✨', route: '/phones/new/sparkx' },
    { brand: 'Tecno', icon: '🔧', route: '/phones/new/tecno' },
    { brand: 'Vivo', icon: '💙', route: '/phones/new/vivo' },
    { brand: 'Redmi', icon: '🔴', route: '/phones/new/redmi' },
    { brand: 'Honor', icon: '🏆', route: '/phones/new/honor' },
    { brand: 'Oppo', icon: '🟢', route: '/phones/new/oppo' },
    { brand: 'Itel', icon: '📞', route: '/phones/new/itel' },
    { brand: 'Huawei', icon: '🌸', route: '/phones/new/huawei' }
  ];

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Link to="/phones" className="inline-block mb-8">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to Phones
              </Button>
            </Link>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-shimmer">New Phones</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Browse our collection of brand new smartphones
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {phoneBrands.map((phone) => (
              <PhoneBrandCard
                key={phone.brand}
                brand={phone.brand}
                icon={phone.icon}
                route={phone.route}
              />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NewPhones;

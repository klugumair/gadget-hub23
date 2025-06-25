
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import PhoneBrandCard from '@/components/PhoneBrandCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const UsedPhones = () => {
  const phoneBrands = [
    { brand: 'Samsung', icon: '📱', route: '/phones/used/samsung' },
    { brand: 'iPhone', icon: '🍎', route: '/phones/used/iphone' },
    { brand: 'Infinix', icon: '📲', route: '/phones/used/infinix' },
    { brand: 'Google Pixel', icon: '🔍', route: '/phones/used/google-pixel' },
    { brand: 'Realme', icon: '⚡', route: '/phones/used/realme' },
    { brand: 'Spark X', icon: '✨', route: '/phones/used/sparkx' },
    { brand: 'Tecno', icon: '🔧', route: '/phones/used/tecno' },
    { brand: 'Vivo', icon: '💙', route: '/phones/used/vivo' },
    { brand: 'Redmi', icon: '🔴', route: '/phones/used/redmi' },
    { brand: 'Honor', icon: '🏆', route: '/phones/used/honor' },
    { brand: 'Oppo', icon: '🟢', route: '/phones/used/oppo' },
    { brand: 'Itel', icon: '📞', route: '/phones/used/itel' },
    { brand: 'Huawei', icon: '🌸', route: '/phones/used/huawei' }
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
              <span className="text-shimmer">Used Phones</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Quality pre-owned smartphones at great prices
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

export default UsedPhones;

import React from 'react';
import { useParams } from 'react-router-dom';
import SamsungProducts from './SamsungProducts';
import UsedSamsungProducts from './UsedSamsungProducts';
import IPhoneProducts from './IPhoneProducts';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BrandDetail = () => {
  const { category, brand } = useParams();
  const isNew = category === 'new';
  
  // If it's Samsung, show the appropriate Samsung products page
  if (brand === 'samsung') {
    if (isNew) {
      return <SamsungProducts />;
    } else {
      return <UsedSamsungProducts />;
    }
  }
  
  // If it's iPhone, show the iPhone products page (only for new phones for now)
  if (brand === 'iphone') {
    return <IPhoneProducts />;
  }
  
  const brandName = brand?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Brand';
  
  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <Link to={`/phones/${category}`} className="inline-block mb-8">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to {isNew ? 'New' : 'Used'} Phones
              </Button>
            </Link>
            
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-shimmer">{brandName}</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-8">
              {isNew ? 'New' : 'Used'} Collection
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Coming Soon...
            </p>
            <div className="mt-12">
              <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-8xl mb-6">📱</div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  {brandName} Collection
                </h2>
                <p className="text-xl text-gray-400">
                  We're working hard to bring you the best {brandName} devices. Stay tuned!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BrandDetail;


import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import UsedPhoneCard from '@/components/UsedPhoneCard';

const usedGooglePixelProducts = [
  {
    id: '1',
    title: 'Pixel 6 (8GB/128GB, PTA approved)',
    price: 107500, // Average of the range
    image: '🔍',
    condition: 'Like New',
    storage: '128GB',
    ram: '8GB',
    pta_status: 'PTA approved',
    usage_duration: 'N/A',
  },
  {
    id: '2',
    title: 'Pixel 6 Pro (12GB/128GB, PTA approved)',
    price: 122500, // Average of the range
    image: '🔍',
    condition: 'Like New',
    storage: '128GB',
    ram: '12GB',
    pta_status: 'PTA approved',
    usage_duration: 'N/A',
  },
  {
    id: '3',
    title: 'Pixel 6a (6GB/128GB, PTA approved)',
    price: 91500, // Average of the range
    image: '🔍',
    condition: 'Like New',
    storage: '128GB',
    ram: '6GB',
    pta_status: 'PTA approved',
    usage_duration: 'N/A',
  },
  {
    id: '4',
    title: 'Pixel 7 (8GB/128GB, Non-PTA)',
    price: 130000, // Average of the range
    image: '🔍',
    condition: 'Like New',
    storage: '128GB',
    ram: '8GB',
    pta_status: 'Non-PTA',
    usage_duration: 'N/A',
  },
  {
    id: '5',
    title: 'Pixel 7 (8GB/128GB, Import)',
    price: 155000, // Average of the range
    image: '🔍',
    condition: 'Like New',
    storage: '128GB',
    ram: '8GB',
    pta_status: 'Import',
    usage_duration: 'N/A',
  },
  {
    id: '6',
    title: 'Pixel 7 (8GB/256GB, Import)',
    price: 169999,
    image: '🔍',
    condition: 'Like New',
    storage: '256GB',
    ram: '8GB',
    pta_status: 'Import',
    usage_duration: 'N/A',
  },
  {
    id: '7',
    title: 'Pixel 7 Pro (12GB/128GB, Not PTA)',
    price: 105000, // Average of the range
    image: '🔍',
    condition: 'Like New',
    storage: '128GB',
    ram: '12GB',
    pta_status: 'Not PTA',
    usage_duration: 'N/A',
  },
  {
    id: '8',
    title: 'Pixel 7 Pro (12GB/256GB, PTA approved (CPID))',
    price: 97000, // Average of the range
    image: '🔍',
    condition: 'Like New',
    storage: '256GB',
    ram: '12GB',
    pta_status: 'PTA approved (CPID)',
    usage_duration: 'N/A',
  },
  {
    id: '9',
    title: 'Pixel 7 Pro (12GB/256GB, Retail (import))',
    price: 161999,
    image: '🔍',
    condition: 'Like New',
    storage: '256GB',
    ram: '12GB',
    pta_status: 'Retail (import)',
    usage_duration: 'N/A',
  },
  {
    id: '10',
    title: 'Pixel 7 Pro (12GB/512GB, Retail import)',
    price: 177500, // Average of the range
    image: '🔍',
    condition: 'Like New',
    storage: '512GB',
    ram: '12GB',
    pta_status: 'Retail import',
    usage_duration: 'N/A',
  }
];

const UsedGooglePixelProducts = () => {
  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Link to="/phones/used" className="inline-block mb-8">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to Used Phones
              </Button>
            </Link>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-shimmer">Used Google Pixel Phones</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Quality pre-owned Google Pixel smartphones at great prices
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {usedGooglePixelProducts.map((product, idx) => (
              <UsedPhoneCard
                key={idx}
                id={product.id}
                title={product.title}
                price={product.price}
                condition={product.condition}
                storage={product.storage}
                ram={product.ram}
                images={[product.image]}
                usage_duration={product.usage_duration}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default UsedGooglePixelProducts;


import React, { useState, useEffect } from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import AdminPhoneButton from '@/components/AdminPhoneButton';
import DatabaseProductCard from '@/components/DatabaseProductCard';
import { supabase } from '@/integrations/supabase/client';

const googlePixelProducts = [
  {
    title: 'Pixel 6 (8GB/128GB, PTA approved)',
    price: '₨ 105,000 – ₨ 110,000',
    image: '🔍',
    category: 'Google Pixel'
  },
  {
    title: 'Pixel 6 Pro (12GB/128GB, PTA approved)',
    price: '₨ 120,000 – ₨ 125,000',
    image: '🔍',
    category: 'Google Pixel'
  },
  {
    title: 'Pixel 6a (6GB/128GB, PTA approved)',
    price: '₨ 88,000 – ₨ 95,000',
    image: '🔍',
    category: 'Google Pixel'
  },
  {
    title: 'Pixel 7 (8GB/128GB, Non-PTA)',
    price: '₨ 129,999 – ₨ 130,000',
    image: '🔍',
    category: 'Google Pixel'
  },
  {
    title: 'Pixel 7 (8GB/128GB, Import)',
    price: '₨ 144,999 – ₨ 165,923',
    image: '🔍',
    category: 'Google Pixel'
  },
  {
    title: 'Pixel 7 (8GB/256GB, Import)',
    price: '₨ 169,999',
    image: '🔍',
    category: 'Google Pixel'
  },
  {
    title: 'Pixel 7 Pro (12GB/128GB, Not PTA)',
    price: '₨ 90,000 – ₨ 120,000',
    image: '🔍',
    category: 'Google Pixel'
  },
  {
    title: 'Pixel 7 Pro (12GB/256GB, PTA approved (CPID))',
    price: '₨ 94,999 – ₨ 99,000',
    image: '🔍',
    category: 'Google Pixel'
  },
  {
    title: 'Pixel 7 Pro (12GB/256GB, Retail (import))',
    price: '₨ 161,999',
    image: '🔍',
    category: 'Google Pixel'
  },
  {
    title: 'Pixel 7 Pro (12GB/512GB, Retail import)',
    price: '₨ 144,999 – ₨ 209,999',
    image: '🔍',
    category: 'Google Pixel'
  }
];

const GooglePixelProducts = () => {
  const [databaseProducts, setDatabaseProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDatabaseProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or('subcategory.ilike.%pixel%,subcategory.ilike.%google%')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDatabaseProducts(data || []);
    } catch (error) {
      console.error('Error fetching database products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabaseProducts();
  }, []);

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
              <span className="text-shimmer">New Google Pixel Phones</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Browse our collection of brand new Google Pixel smartphones
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {googlePixelProducts.map((product, idx) => (
              <ProductCard
                key={idx}
                title={product.title}
                price={product.price}
                image={product.image}
                category={product.category}
                size="compact"
              />
            ))}
            
            {databaseProducts.map((product) => (
              <DatabaseProductCard
                key={product.id}
                id={product.id}
                title={product.name}
                price={product.price}
                images={product.images || []}
                category={product.category}
                subcategory={product.subcategory}
                description={product.description}
                onUpdate={fetchDatabaseProducts}
              />
            ))}
          </div>
        </div>
      </section>
      <AdminPhoneButton category="Google Pixel" />
      <Footer />
    </div>
  );
};

export default GooglePixelProducts;

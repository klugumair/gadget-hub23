import React, { useState, useEffect } from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminPhoneButton from '@/components/AdminPhoneButton';
import DatabaseProductCard from '@/components/DatabaseProductCard';
import { supabase } from '@/integrations/supabase/client';

const SamsungProducts = () => {
  const [databaseProducts, setDatabaseProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDatabaseProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or('subcategory.ilike.%samsung%,subcategory.ilike.%galaxy%')
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
              <span className="text-shimmer">New Samsung Phones</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Browse our collection of brand new Samsung smartphones
            </p>
          </div>
          
          {loading ? (
            <div className="text-center text-white">Loading products...</div>
          ) : databaseProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {databaseProducts.map((product) => (
                <DatabaseProductCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  price={product.price}
                  images={product.images || []}
                  category={product.category}
                  description={product.description}
                  onUpdate={fetchDatabaseProducts}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <p className="text-xl">No Samsung products available at the moment.</p>
              <p className="text-sm mt-2">Check back later for new arrivals!</p>
            </div>
          )}
        </div>
      </section>
      <AdminPhoneButton category="Samsung" />
      <Footer />
    </div>
  );
};

export default SamsungProducts;

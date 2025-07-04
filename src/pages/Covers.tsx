
import React, { useState, useEffect } from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import AdminFloatingButton from '@/components/AdminFloatingButton';
import DatabaseProductCard from '@/components/DatabaseProductCard';
import { supabase } from '@/integrations/supabase/client';

const Covers = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'cover')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-shimmer">Protective Covers</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-8">
              Premium phone cases and protective covers
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <p className="text-gray-400 text-xl">Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((product) => (
                <DatabaseProductCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  price={product.price}
                  images={product.images || []}
                  category={product.category}
                  subcategory={product.subcategory}
                  description={product.description}
                  onUpdate={fetchProducts}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                No covers available yet. Check back soon for our exclusive range of luxury phone cases and protective covers.
              </p>
            </div>
          )}
        </div>
      </section>
      
      <AdminFloatingButton category="cover" />
      <Footer />
    </div>
  );
};

export default Covers;

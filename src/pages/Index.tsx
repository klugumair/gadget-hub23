
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FloatingNavbar from '@/components/FloatingNavbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import TawkToWidget from '@/components/TawkToWidget';
import AdminFloatingButton from '@/components/AdminFloatingButton';
import DatabaseProductCard from '@/components/DatabaseProductCard';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory: string | null;
  description: string | null;
  additional_notes: string | null;
  images: string[] | null;
  created_at: string;
  updated_at: string;
}

const Index = () => {
  const [gadgetProducts, setGadgetProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGadgetProducts();
  }, []);

  const fetchGadgetProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'gadget')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGadgetProducts(data || []);
    } catch (error) {
      console.error('Error fetching gadget products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductAdded = () => {
    fetchGadgetProducts();
  };

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      <HeroSection />
      
      {/* Gadgets Section */}
      <section id="gadgets" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="text-shimmer">Premium Gadgets</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Discover our curated collection of premium gadgets and accessories
            </p>
            
            {gadgetProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {gadgetProducts.map((product) => (
                  <DatabaseProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    category={product.category}
                    subcategory={product.subcategory}
                    description={product.description}
                    additional_notes={product.additional_notes}
                    images={product.images}
                    created_at={product.created_at}
                    updated_at={product.updated_at}
                    onDelete={fetchGadgetProducts}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-morphism rounded-2xl p-8 max-w-2xl mx-auto mb-16">
                <h3 className="text-3xl font-bold text-white mb-4">
                  <span className="text-shimmer">Add Your Gadgets</span>
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  {loading ? 'Loading gadgets...' : 'No gadgets available yet. Administrators can add new gadget products to showcase in our premium collection.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <AdminFloatingButton category="gadget" onProductAdded={handleProductAdded} />
      
      <Footer />
      <TawkToWidget />
    </div>
  );
};

export default Index;

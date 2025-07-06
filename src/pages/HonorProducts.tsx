
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

const HonorProducts = () => {
  const [databaseProducts, setDatabaseProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDatabaseProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or('subcategory.ilike.%honor%')
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

  const honorProducts = [
    {
      title: "Honor Magic 6 Pro",
      price: "Rs. 125,000",
      image: "🏆",
      category: "Honor"
    },
    {
      title: "Honor X9b",
      price: "Rs. 65,000",
      image: "🏆",
      category: "Honor"
    },
    {
      title: "Honor 200 Pro",
      price: "Rs. 95,000",
      image: "🏆",
      category: "Honor"
    },
    {
      title: "Honor Play 8T",
      price: "Rs. 35,000",
      image: "🏆",
      category: "Honor"
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
              <span className="text-shimmer">Honor Collection</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Discover our premium Honor smartphone collection
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {honorProducts.map((product, index) => (
              <ProductCard
                key={index}
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
      
      <AdminPhoneButton category="Honor" />
      <Footer />
    </div>
  );
};

export default HonorProducts;

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

const SamsungProducts = () => {
  const [databaseProducts, setDatabaseProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const samsungProducts = [
    {
      title: "Samsung Galaxy S24 FE",
      price: "Rs. 289,999",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy S24 FE 8GB/256GB",
      price: "Rs. 309,999",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy S23 Ultra 8GB/256GB",
      price: "Rs. 332,999",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy S23 Ultra 12GB/512GB",
      price: "Rs. 382,999",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy S23 Ultra 12GB/1TB",
      price: "Rs. 432,999",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy A56 8GB/128GB",
      price: "Rs. 130,000",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy A56 8GB/256GB",
      price: "Rs. 140,000",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy A56 12GB/256GB",
      price: "Rs. 150,000",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy A25 6GB/128GB",
      price: "Rs. 98,500",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy A25 8GB/256GB",
      price: "Rs. 108,500",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy A16 4GB/128GB",
      price: "Rs. 44,500",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy A16 6GB/128GB",
      price: "Rs. 49,500",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy A14 4GB/64GB",
      price: "Rs. 62,999",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy A14 4GB/128GB",
      price: "Rs. 68,999",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy A14 6GB/128GB",
      price: "Rs. 74,999",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy A06 4GB/64GB",
      price: "Rs. 25,500",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy A06 4GB/128GB",
      price: "Rs. 28,500",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy S21 FE 8GB/128GB",
      price: "Rs. 144,999",
      image: "🔵",
      category: "Samsung"
    },
    {
      title: "Samsung Galaxy S21 FE 8GB/256GB",
      price: "Rs. 154,999",
      image: "🔵",
      category: "Samsung"
    }
  ];

  const fetchDatabaseProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('subcategory', '%samsung%')
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
              <span className="text-shimmer">Samsung Collection</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Discover our premium Samsung smartphone collection
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {samsungProducts.map((product, index) => (
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
      
      <AdminPhoneButton category="Samsung" />
      <Footer />
    </div>
  );
};

export default SamsungProducts;

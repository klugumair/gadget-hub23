
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import AdminFloatingButton from '@/components/AdminFloatingButton';
import DatabaseProductCard from '@/components/DatabaseProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import AdminProductEditModal from '@/components/AdminProductEditModal';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[] | null;
  category: string;
  description?: string;
}

interface ModalProduct {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: "headphone" | "gadget" | "cover";
  description?: string;
}

const Headphones = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ModalProduct | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'headphone')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct({
      id: product.id,
      title: product.name,
      price: product.price,
      images: product.images || [],
      category: "headphone",
      description: product.description
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Link to="/" className="inline-block mb-8">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-shimmer">Premium Headphones</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Discover our curated collection of high-quality headphones
            </p>
          </div>
          
          {loading ? (
            <div className="text-center">
              <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-8xl mb-6">⏳</div>
                <p className="text-xl text-gray-400">Loading headphones...</p>
              </div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <DatabaseProductCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  price={product.price}
                  images={product.images || []}
                  category={product.category}
                  description={product.description}
                  onClick={() => handleProductClick(product)}
                  onEdit={() => handleEditProduct(product)}
                  onDelete={fetchProducts}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-8xl mb-6">🎧</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  No Headphones Available
                </h3>
                <p className="text-xl text-gray-400">
                  We're working on bringing you amazing headphone products. Check back soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <AdminFloatingButton category="headphone" onProductAdded={fetchProducts} />
      
      {selectedProduct && (
        <ProductDetailModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}
      
      {editingProduct && (
        <AdminProductEditModal
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          product={editingProduct}
          onProductUpdated={fetchProducts}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Headphones;

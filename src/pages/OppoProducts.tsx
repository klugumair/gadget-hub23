<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import FloatingNavbar from "@/components/FloatingNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DatabaseProductCard from "@/components/DatabaseProductCard";
import AdminPhoneButton from "@/components/AdminPhoneButton";
import { supabase } from "@/integrations/supabase/client";

const OppoProducts = () => {
  const [databaseProducts, setDatabaseProducts] = useState<any[]>([]);
=======

import React, { useState, useEffect } from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import AdminPhoneButton from '@/components/AdminPhoneButton';
import DatabaseProductCard from '@/components/DatabaseProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import AdminProductEditModal from '@/components/AdminProductEditModal';
import { supabase } from '@/integrations/supabase/client';

interface DatabaseProduct {
  id: string;
  name: string;
  price: number;
  images: string[] | null;
  category: string;
  subcategory?: string;
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

const OppoProducts = () => {
  const [databaseProducts, setDatabaseProducts] = useState<DatabaseProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ModalProduct | null>(null);
  const [editingProduct, setEditingProduct] = useState<DatabaseProduct | null>(null);
>>>>>>> 3a38c33dbe4e6090a077693b63d81b9dc2dae21f
  const [loading, setLoading] = useState(true);

  const fetchDatabaseProducts = async () => {
    try {
      const { data, error } = await supabase
<<<<<<< HEAD
        .from("products")
        .select("*")
        .or("subcategory.ilike.%oppo%,category.ilike.%oppo%")
        .order("created_at", { ascending: false });
=======
        .from('products')
        .select('*')
        .or('subcategory.ilike.%oppo%,name.ilike.%oppo%')
        .order('created_at', { ascending: false });
>>>>>>> 3a38c33dbe4e6090a077693b63d81b9dc2dae21f

      if (error) throw error;
      setDatabaseProducts(data || []);
    } catch (error) {
<<<<<<< HEAD
      console.error("Error fetching database products:", error);
    } finally {
      setLoading(false);
=======
      console.error('Error fetching database products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabaseProducts();
  }, []);

  const handleProductClick = (product: DatabaseProduct) => {
    setSelectedProduct({
      id: product.id,
      title: product.name,
      price: product.price,
      images: product.images || [],
      category: "gadget",
      description: product.description
    });
  };

  const handleEditProduct = (product: DatabaseProduct) => {
    setEditingProduct(product);
  };

  const oppoProducts = [
    {
      title: "Oppo Find X8 Pro",
      price: "Rs. 155,000",
      image: "🟢",
      category: "Oppo"
    },
    {
      title: "Oppo A79 5G",
      price: "Rs. 55,000",
      image: "🟢",
      category: "Oppo"
    },
    {
      title: "Oppo Reno 12 Pro",
      price: "Rs. 85,000",
      image: "🟢",
      category: "Oppo"
    },
    {
      title: "Oppo A18",
      price: "Rs. 25,000",
      image: "🟢",
      category: "Oppo"
>>>>>>> 3a38c33dbe4e6090a077693b63d81b9dc2dae21f
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
              <Button
                variant="ghost"
                className="text-gold-400 hover:text-gold-300"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to New Phones
              </Button>
            </Link>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-shimmer">Oppo Collection</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Discover our premium Oppo smartphone collection
            </p>
          </div>
<<<<<<< HEAD

=======
          
>>>>>>> 3a38c33dbe4e6090a077693b63d81b9dc2dae21f
          {loading ? (
            <div className="text-center">
              <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-8xl mb-6">⏳</div>
<<<<<<< HEAD
                <p className="text-xl text-gray-400">
                  Loading Oppo products...
                </p>
              </div>
            </div>
          ) : databaseProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
=======
                <p className="text-xl text-gray-400">Loading products...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {oppoProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  size="compact"
                />
              ))}
              
>>>>>>> 3a38c33dbe4e6090a077693b63d81b9dc2dae21f
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
<<<<<<< HEAD
=======
                  onClick={() => handleProductClick(product)}
                  onEdit={() => handleEditProduct(product)}
>>>>>>> 3a38c33dbe4e6090a077693b63d81b9dc2dae21f
                  onUpdate={fetchDatabaseProducts}
                />
              ))}
            </div>
<<<<<<< HEAD
          ) : (
            <div className="text-center">
              <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-8xl mb-6">🟢</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  No Oppo Products Available
                </h3>
                <p className="text-xl text-gray-400">
                  We're working on bringing you amazing Oppo devices. Check back
                  soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <AdminPhoneButton category="Oppo" />
=======
          )}
        </div>
      </section>
      
      <AdminPhoneButton category="Oppo" onProductAdded={fetchDatabaseProducts} />
      
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
          product={{
            ...editingProduct,
            category: editingProduct.category as "headphone" | "gadget" | "cover"
          }}
          onUpdate={fetchDatabaseProducts}
        />
      )}
      
>>>>>>> 3a38c33dbe4e6090a077693b63d81b9dc2dae21f
      <Footer />
    </div>
  );
};

export default OppoProducts;

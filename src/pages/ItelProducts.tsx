<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import FloatingNavbar from "@/components/FloatingNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AdminPhoneButton from "@/components/AdminPhoneButton";
import DatabaseProductCard from "@/components/DatabaseProductCard";
import { supabase } from "@/integrations/supabase/client";
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
>>>>>>> 3a38c33dbe4e6090a077693b63d81b9dc2dae21f

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

const ItelProducts = () => {
  const [databaseProducts, setDatabaseProducts] = useState<DatabaseProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ModalProduct | null>(null);
  const [editingProduct, setEditingProduct] = useState<DatabaseProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDatabaseProducts = async () => {
    try {
      const { data, error } = await supabase
<<<<<<< HEAD
        .from("products")
        .select("*")
        .or("subcategory.ilike.%itel%")
        .order("created_at", { ascending: false });
=======
        .from('products')
        .select('*')
        .or('subcategory.ilike.%itel%,name.ilike.%itel%')
        .order('created_at', { ascending: false });
>>>>>>> 3a38c33dbe4e6090a077693b63d81b9dc2dae21f

      if (error) throw error;
      setDatabaseProducts(data || []);
    } catch (error) {
      console.error("Error fetching database products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabaseProducts();
  }, []);

<<<<<<< HEAD
=======
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

  const itelProducts = [
    {
      title: "Itel A70",
      price: "Rs. 18,000",
      image: "📞",
      category: "Itel"
    },
    {
      title: "Itel S17",
      price: "Rs. 22,000",
      image: "📞",
      category: "Itel"
    },
    {
      title: "Itel A48 Pro",
      price: "Rs. 15,000",
      image: "📞",
      category: "Itel"
    },
    {
      title: "Itel A25 Pro",
      price: "Rs. 12,000",
      image: "📞",
      category: "Itel"
    }
  ];

>>>>>>> 3a38c33dbe4e6090a077693b63d81b9dc2dae21f
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
              <span className="text-shimmer">Itel Collection</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Discover our premium Itel smartphone collection
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
                  Loading Itel products...
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
              {itelProducts.map((product, index) => (
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
                <div className="text-8xl mb-6">📞</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  No Itel Products Available
                </h3>
                <p className="text-xl text-gray-400">
                  We're working on bringing you amazing Itel devices. Check back
                  soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <AdminPhoneButton category="Itel" />
=======
          )}
        </div>
      </section>
      
      <AdminPhoneButton category="Itel" onProductAdded={fetchDatabaseProducts} />
      
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

export default ItelProducts;

import React, { useState, useEffect } from "react";
import FloatingNavbar from "@/components/FloatingNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AdminPhoneButton from "@/components/AdminPhoneButton";
import DatabaseProductCard from "@/components/DatabaseProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import AdminProductEditModal from "@/components/AdminProductEditModal";
import { supabase } from "@/integrations/supabase/client";

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

const HuaweiProducts = () => {
  const [databaseProducts, setDatabaseProducts] = useState<DatabaseProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<DatabaseProduct | null>(null);
  const [editingProduct, setEditingProduct] = useState<DatabaseProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDatabaseProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .or("subcategory.ilike.%huawei%,category.ilike.%huawei%")
        .order("created_at", { ascending: false });

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

  const handleProductClick = (product: DatabaseProduct) => {
    setSelectedProduct(product);
  };

  const handleEditProduct = (product: DatabaseProduct) => {
    setEditingProduct(product);
  };

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
              <span className="text-shimmer">Huawei Collection</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Discover our premium Huawei smartphone collection
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-8xl mb-6">⏳</div>
                <p className="text-xl text-gray-400">
                  Loading Huawei products...
                </p>
              </div>
            </div>
          ) : databaseProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                  onClick={() => handleProductClick(product)}
                  onEdit={() => handleEditProduct(product)}
                  onUpdate={fetchDatabaseProducts}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-8xl mb-6">📱</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  No Huawei Products Available
                </h3>
                <p className="text-xl text-gray-400">
                  We're working on bringing you amazing Huawei devices. Check
                  back soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <AdminPhoneButton
        category="Huawei"
        onProductAdded={fetchDatabaseProducts}
      />

      {selectedProduct && (
        <ProductDetailModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={{
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            images: selectedProduct.images || [],
            category: selectedProduct.category,
            subcategory: selectedProduct.subcategory,
            description: selectedProduct.description,
          }}
        />
      )}

      {editingProduct && (
        <AdminProductEditModal
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          product={{
            ...editingProduct,
            category: editingProduct.category as
              | "headphone"
              | "gadget"
              | "cover",
          }}
          onUpdate={fetchDatabaseProducts}
        />
      )}

      <Footer />
    </div>
  );
};

export default HuaweiProducts;

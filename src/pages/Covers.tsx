import React, { useState, useEffect } from "react";
import FloatingNavbar from "@/components/FloatingNavbar";
import Footer from "@/components/Footer";
import AdminFloatingButton from "@/components/AdminFloatingButton";
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

const Covers = () => {
  const [products, setProducts] = useState<DatabaseProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<DatabaseProduct | null>(null);
  const [editingProduct, setEditingProduct] = useState<DatabaseProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "cover")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
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
              <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-8xl mb-6">⏳</div>
                <p className="text-xl text-gray-400">Loading covers...</p>
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
                  subcategory={product.subcategory}
                  description={product.description}
                  onClick={() => handleProductClick(product)}
                  onEdit={() => handleEditProduct(product)}
                  onUpdate={fetchProducts}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-8xl mb-6">📱</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  No Covers Available
                </h3>
                <p className="text-xl text-gray-400">
                  We're working on bringing you amazing protective covers. Check
                  back soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <AdminFloatingButton category="cover" onProductAdded={fetchProducts} />

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
            description: selectedProduct.description
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
          onUpdate={fetchProducts}
        />
      )}

      <Footer />
    </div>
  );
};

export default Covers;

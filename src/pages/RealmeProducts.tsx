import React, { useState, useEffect } from "react";
import FloatingNavbar from "@/components/FloatingNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DatabaseProductCard from "@/components/DatabaseProductCard";
import AdminPhoneButton from "@/components/AdminPhoneButton";
import { supabase } from "@/integrations/supabase/client";

const RealmeProducts = () => {
  const [databaseProducts, setDatabaseProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDatabaseProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .or("subcategory.ilike.%realme%,category.ilike.%realme%")
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
              <span className="text-shimmer">Realme Collection</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Discover our premium Realme smartphone collection
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-8xl mb-6">⏳</div>
                <p className="text-xl text-gray-400">
                  Loading Realme products...
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
                  onUpdate={fetchDatabaseProducts}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-8xl mb-6">⚡</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  No Realme Products Available
                </h3>
                <p className="text-xl text-gray-400">
                  We're working on bringing you amazing Realme devices. Check
                  back soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <AdminPhoneButton category="Realme" />
      <Footer />
    </div>
  );
};

export default RealmeProducts;

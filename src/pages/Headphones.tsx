
import React, { useState, useEffect } from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import DatabaseProductCard from '@/components/DatabaseProductCard';
import { Link } from 'react-router-dom';
import AdminFloatingButton from '@/components/AdminFloatingButton';
import { supabase } from '@/integrations/supabase/client';

const Headphones = () => {
  const [databaseProducts, setDatabaseProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'headphone')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDatabaseProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const roninProducts = [
    {
      title: "Ronin R-920 Pro",
      price: "Rs. 3,500",
      image: "🎧",
      category: "Ronin",
      link: "/headphones/ronin/r-920-pro"
    },
    {
      title: "Ronin R-810 Wireless",
      price: "Rs. 2,800",
      image: "🎧",
      category: "Ronin"
    },
    {
      title: "Ronin R-750 Gaming",
      price: "Rs. 2,200",
      image: "🎧",
      category: "Ronin"
    },
    {
      title: "Ronin R-650 Bass",
      price: "Rs. 1,800",
      image: "🎧",
      category: "Ronin"
    },
    {
      title: "Ronin R-500 Sport",
      price: "Rs. 1,500",
      image: "🎧",
      category: "Ronin"
    },
    {
      title: "Ronin R-400 Classic",
      price: "Rs. 1,200",
      image: "🎧",
      category: "Ronin"
    },
    {
      title: "Ronin R-300 Compact",
      price: "Rs. 900",
      image: "🎧",
      category: "Ronin"
    },
    {
      title: "Ronin R-200 Essential",
      price: "Rs. 750",
      image: "🎧",
      category: "Ronin"
    }
  ];

  const audionicProducts = [
    {
      title: "Audionic Blue Beat BB-10",
      price: "Rs. 4,500",
      image: "🎧",
      category: "Audionic"
    },
    {
      title: "Audionic Pace P-5 Pro",
      price: "Rs. 3,200",
      image: "🎧",
      category: "Audionic"
    },
    {
      title: "Audionic Max M-8 Wireless",
      price: "Rs. 2,900",
      image: "🎧",
      category: "Audionic"
    },
    {
      title: "Audionic Solo S-15 Gaming",
      price: "Rs. 2,100",
      image: "🎧",
      category: "Audionic"
    },
    {
      title: "Audionic Thunder T-20",
      price: "Rs. 3,800",
      image: "🎧",
      category: "Audionic"
    },
    {
      title: "Audionic Wave W-12",
      price: "Rs. 2,500",
      image: "🎧",
      category: "Audionic"
    },
    {
      title: "Audionic Fusion F-18",
      price: "Rs. 1,900",
      image: "🎧",
      category: "Audionic"
    },
    {
      title: "Audionic Echo E-25",
      price: "Rs. 1,600",
      image: "🎧",
      category: "Audionic"
    }
  ];

  const moreHeadphones = [
    {
      title: "Sony WH-1000XM5",
      price: "Rs. 116,999",
      image: "🎧",
      category: "Premium",
      link: "/headphones/sony/wh-1000xm5"
    },
    {
      title: "Sennheiser Momentum 4",
      price: "Rs. 101,999",
      image: "🎧",
      category: "Premium",
      link: "/headphones/sennheiser/momentum-4"
    },
    {
      title: "JBL Tune 760NC",
      price: "Rs. 8,999",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Boat Rockerz 450",
      price: "Rs. 1,999",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Skullcandy Hesh 3",
      price: "Rs. 6,999",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Marshall Major IV",
      price: "Rs. 12,999",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Audio-Technica ATH-M40x",
      price: "Rs. 8,999",
      image: "🎧",
      category: "More Headphones"
    },
    {
      title: "Bose QuietComfort 35 II",
      price: "Rs. 29,999",
      image: "🎧",
      category: "More Headphones"
    }
  ];

  const BrandHeader = ({ title }: { title: string }) => (
    <div className="flex justify-center mb-12">
      <div className="bg-gradient-gold text-black px-12 py-4 rounded-full font-bold text-2xl shadow-lg">
        {title}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-shimmer">Premium Audio</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-8">
              Discover our collection of high-quality headphones
            </p>
          </div>

          {/* Database Products Section */}
          {!loading && databaseProducts.length > 0 && (
            <>
              <BrandHeader title="Latest Additions" />
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
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
                    onUpdate={fetchProducts}
                  />
                ))}
              </div>
            </>
          )}

          {/* Ronin Section */}
          <BrandHeader title="Ronin" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {roninProducts.map((product, index) => (
              <div key={`ronin-${index}`}>
                {product.link ? (
                  <Link to={product.link} className="block">
                    <ProductCard {...product} />
                  </Link>
                ) : (
                  <ProductCard {...product} />
                )}
              </div>
            ))}
          </div>

          {/* Audionic Section */}
          <BrandHeader title="Audionic" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {audionicProducts.map((product, index) => (
              <ProductCard key={`audionic-${index}`} {...product} />
            ))}
          </div>

          {/* More Headphones Section */}
          <BrandHeader title="Premium & More" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {moreHeadphones.map((product, index) => (
              <div key={`more-${index}`}>
                {product.link ? (
                  <Link to={product.link} className="block">
                    <ProductCard {...product} />
                  </Link>
                ) : (
                  <ProductCard {...product} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <AdminFloatingButton category="headphone" />
      <Footer />
    </div>
  );
};

export default Headphones;

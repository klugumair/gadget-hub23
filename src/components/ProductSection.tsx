
import React from 'react';
import ProductCard from './ProductCard';

interface ProductSectionProps {
  id: string;
  title: string;
  subtitle: string;
  products: Array<{
    title: string;
    price: string;
    image: string;
    category: string;
  }>;
}

const ProductSection: React.FC<ProductSectionProps> = ({ id, title, subtitle, products }) => {
  return (
    <section id={id} className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-shimmer">{title}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

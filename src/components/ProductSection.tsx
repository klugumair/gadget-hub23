
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';

interface ProductSectionProps {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  products: Array<{
    title: string;
    price: string;
    image: string;
    category: string;
    link?: string;
  }>;
}

const ProductSection: React.FC<ProductSectionProps> = ({ 
  id, 
  title, 
  subtitle, 
  buttonText, 
  buttonLink, 
  products 
}) => {
  return (
    <section id={id} className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-shimmer">{title}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>
          <Link to={buttonLink}>
            <Button className="bg-gradient-gold hover:bg-gold-500 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
              {buttonText}
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="cursor-pointer" onClick={() => {
              // Make products clickable - for now just show a placeholder behavior
              console.log(`Clicked on ${product.title}`);
            }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

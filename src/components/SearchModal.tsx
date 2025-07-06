
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Sample product data for search
  const allProducts = [
    { id: 1, title: "iPhone 15 Pro", price: 149999, category: "iPhone", type: "phone", link: "/phones/new/iphone/iphone-15-pro" },
    { id: 2, title: "Samsung Galaxy S24", price: 89999, category: "Samsung", type: "phone", link: "/phones/new/samsung" },
    { id: 3, title: "Sony WH-1000XM5", price: 85000, category: "Headphones", type: "headphone", link: "/headphones/sony/wh-1000xm5" },
    { id: 4, title: "AirPods Pro", price: 24999, category: "Headphones", type: "headphone", link: "/headphones" },
    { id: 5, title: "iPhone 14", price: 79999, category: "iPhone", type: "phone", link: "/phones/new/iphone/iphone-14" },
    { id: 6, title: "Sennheiser Momentum 4", price: 75000, category: "Headphones", type: "headphone", link: "/headphones/sennheiser/momentum-4" },
  ];

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = allProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  const handleAddToCart = (product: any) => {
    addToCart({
      title: product.title,
      price: product.price,
      image: product.type === 'phone' ? '📱' : '🎧',
      category: product.category
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${product.title} has been added to your cart`,
      className: "bg-gradient-gold text-black font-semibold",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-morphism border-gold-400/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Search Products</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search for phones, headphones, or accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 glass-morphism rounded-lg border border-gold-400/20">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{product.title}</h3>
                    <p className="text-gray-400 text-sm">{product.category}</p>
                    <p className="text-gold-400 font-bold">Rs. {product.price.toLocaleString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link to={product.link} onClick={onClose}>
                      <Button variant="outline" size="sm" className="text-white border-gray-600">
                        View
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      size="sm"
                      className="bg-gold-400 hover:bg-gold-500 text-black"
                    >
                      <ShoppingCart size={16} className="mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              ))
            ) : searchQuery.trim() !== '' ? (
              <div className="text-center text-gray-400 py-8">
                No products found for "{searchQuery}"
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                Start typing to search for products...
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;

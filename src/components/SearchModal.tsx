
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const searchProducts = async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,category.ilike.%${query}%,subcategory.ilike.%${query}%`)
        .limit(10);

      if (error) throw error;
      setSearchResults(data || []);
    } catch (error) {
      console.error('Error searching products:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchProducts(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleAddToCart = (product: any) => {
    addToCart({
      title: product.name,
      price: product.price,
      image: product.images?.[0] || '📱',
      category: product.subcategory || product.category
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} has been added to your cart`,
      className: "bg-gradient-gold text-black font-semibold",
    });
  };

  const getProductLink = (product: any) => {
    const subcategory = product.subcategory?.toLowerCase();
    if (subcategory?.includes('samsung')) return '/phones/new/samsung';
    if (subcategory?.includes('iphone')) return '/phones/new/iphone';
    if (subcategory?.includes('infinix')) return '/phones/new/infinix';
    if (subcategory?.includes('pixel') || subcategory?.includes('google')) return '/phones/new/google-pixel';
    if (subcategory?.includes('realme')) return '/phones/new/realme';
    if (subcategory?.includes('spark')) return '/phones/new/spark-x';
    if (subcategory?.includes('tecno')) return '/phones/new/tecno';
    if (subcategory?.includes('vivo')) return '/phones/new/vivo';
    if (subcategory?.includes('redmi')) return '/phones/new/redmi';
    if (subcategory?.includes('honor')) return '/phones/new/honor';
    if (subcategory?.includes('oppo')) return '/phones/new/oppo';
    if (subcategory?.includes('itel')) return '/phones/new/itel';
    if (subcategory?.includes('huawei')) return '/phones/new/huawei';
    return '/phones/new';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-morphism border-gold-400/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <Search className="mr-2 text-gold-400" size={20} />
            Search Products
          </DialogTitle>
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
            {loading ? (
              <div className="text-center text-gray-400 py-8">
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 glass-morphism rounded-lg border border-gold-400/20">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{product.name}</h3>
                    <p className="text-gray-400 text-sm">{product.subcategory || product.category}</p>
                    <p className="text-gold-400 font-bold">Rs. {product.price.toLocaleString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link to={getProductLink(product)} onClick={onClose}>
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

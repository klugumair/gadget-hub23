
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-shimmer">Shopping Cart</span>
            </h1>
            <p className="text-xl text-gray-400">
              Review your premium selections
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={80} className="mx-auto text-gray-600 mb-6" />
              <h2 className="text-3xl font-bold text-gray-300 mb-4">Your cart is empty</h2>
              <p className="text-gray-400 mb-8">Add some premium items to get started</p>
              <Link to="/">
                <Button className="bg-gradient-gold hover:bg-gold-500 text-black font-semibold px-8 py-3 rounded-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Cart Items</h2>
                  <Button 
                    onClick={clearCart}
                    variant="outline" 
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Clear Cart
                  </Button>
                </div>
                
                {cartItems.map((item) => (
                  <div key={item.id} className="glass-morphism rounded-2xl p-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-3xl">
                        {item.image}
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-sm text-gold-400 font-medium uppercase tracking-wider mb-1">
                          {item.category}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <div className="text-2xl font-bold text-gold-400">
                          Rs. {item.price.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          variant="outline"
                          size="icon"
                          className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black"
                        >
                          <Minus size={16} />
                        </Button>
                        
                        <span className="w-12 text-center text-white font-bold text-lg">
                          {item.quantity}
                        </span>
                        
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          variant="outline"
                          size="icon"
                          className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black"
                        >
                          <Plus size={16} />
                        </Button>
                        
                        <Button
                          onClick={() => removeItem(item.id)}
                          variant="outline"
                          size="icon"
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white ml-4"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="lg:col-span-1">
                <div className="glass-morphism rounded-2xl p-8 sticky top-24">
                  <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal:</span>
                      <span>Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Tax:</span>
                      <span>Rs. {Math.round(tax).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between text-xl font-bold text-gold-400">
                        <span>Total:</span>
                        <span>Rs. {Math.round(total).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Link to="/checkout">
                      <Button className="w-full bg-gradient-gold hover:bg-gold-500 text-black font-bold py-4 text-lg rounded-full transition-all duration-300 hover:scale-105">
                        Proceed to Checkout
                      </Button>
                    </Link>
                    <Link to="/">
                      <Button variant="outline" className="w-full border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black font-semibold py-3 rounded-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                      <span>🔒</span>
                      <span>Secure Checkout</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Cart;

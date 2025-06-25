
import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, MessageCircle, Instagram, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const Checkout = () => {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const generateOrderSummary = () => {
    let summary = "Order Summary:\n\n";
    cartItems.forEach((item, index) => {
      summary += `${index + 1}. ${item.title}\n`;
      summary += `   Quantity: ${item.quantity}\n`;
      summary += `   Price: Rs. ${item.price.toLocaleString()} each\n`;
      summary += `   Total: Rs. ${(item.price * item.quantity).toLocaleString()}\n\n`;
    });
    summary += `Subtotal: Rs. ${subtotal.toLocaleString()}\n`;
    summary += `Tax: Rs. ${Math.round(tax).toLocaleString()}\n`;
    summary += `Total Amount: Rs. ${Math.round(total).toLocaleString()}`;
    return summary;
  };

  const copyOrderSummary = () => {
    const orderText = generateOrderSummary();
    navigator.clipboard.writeText(orderText).then(() => {
      toast.success("Order summary copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy order summary");
    });
  };

  const openWhatsApp = () => {
    const orderText = generateOrderSummary();
    const message = encodeURIComponent(`Hi! I'd like to place an order:\n\n${orderText}`);
    window.open(`https://wa.me/923200511010?text=${message}`, '_blank');
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/itxgadgethub2.0/', '_blank');
  };

  const openTikTok = () => {
    window.open('https://www.tiktok.com/@itxgadgethub2.0', '_blank');
  };

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-shimmer">Checkout</span>
            </h1>
            <p className="text-xl text-gray-400">
              Complete your order through your preferred platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Order Summary Section */}
            <div className="glass-morphism rounded-2xl p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Order Summary</h2>
                <Button 
                  onClick={copyOrderSummary}
                  className="bg-gradient-gold hover:bg-gold-500 text-black font-semibold"
                >
                  <Copy size={16} className="mr-2" />
                  Copy Order
                </Button>
              </div>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-700">
                    <div>
                      <span className="text-white font-medium">{item.title}</span>
                      <span className="text-gray-400 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="text-gold-400 font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 pt-4 border-t border-gray-700">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax:</span>
                  <span>Rs. {Math.round(tax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gold-400 pt-2 border-t border-gray-700">
                  <span>Total:</span>
                  <span>Rs. {Math.round(total).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="glass-morphism rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">How to Place Your Order</h3>
              <div className="text-gray-300 space-y-2">
                <p>1. Copy your order summary using the button above</p>
                <p>2. Choose your preferred contact method below</p>
                <p>3. Send us your order details</p>
                <p>4. We'll confirm your order and arrange delivery</p>
              </div>
            </div>

            {/* Contact Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Button
                onClick={openWhatsApp}
                className="glass-morphism h-auto p-8 flex flex-col items-center space-y-4 hover:scale-105 transition-all duration-300 border-green-500 hover:bg-green-500/20"
              >
                <MessageCircle size={40} className="text-green-500" />
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white">WhatsApp</h3>
                  <p className="text-sm text-gray-400">+92 320 0511010</p>
                  <p className="text-xs text-gray-500 mt-2">Quick response & order confirmation</p>
                </div>
              </Button>

              <Button
                onClick={openInstagram}
                className="glass-morphism h-auto p-8 flex flex-col items-center space-y-4 hover:scale-105 transition-all duration-300 border-pink-500 hover:bg-pink-500/20"
              >
                <Instagram size={40} className="text-pink-500" />
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white">Instagram</h3>
                  <p className="text-sm text-gray-400">@itxgadgethub2.0</p>
                  <p className="text-xs text-gray-500 mt-2">DM us your order details</p>
                </div>
              </Button>

              <Button
                onClick={openTikTok}
                className="glass-morphism h-auto p-8 flex flex-col items-center space-y-4 hover:scale-105 transition-all duration-300 border-purple-500 hover:bg-purple-500/20"
              >
                <Music size={40} className="text-purple-500" />
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white">TikTok</h3>
                  <p className="text-sm text-gray-400">@itxgadgethub2.0</p>
                  <p className="text-xs text-gray-500 mt-2">Follow & message us</p>
                </div>
              </Button>
            </div>

            {/* Back to Cart */}
            <div className="text-center">
              <Link to="/cart">
                <Button className="bg-gradient-gold hover:bg-gold-500 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                  <ArrowLeft size={20} className="mr-2" />
                  Back to Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Checkout;

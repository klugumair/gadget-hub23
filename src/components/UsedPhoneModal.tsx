
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

interface PhoneSubmission {
  id: string;
  brand: string;
  model_name: string;
  storage: string;
  ram: string;
  condition: string;
  usage_duration: string;
  asking_price: number;
  phone_images: string[] | null;
  additional_notes: string | null;
  admin_notes: string | null;
}

interface UsedPhoneModalProps {
  phone: PhoneSubmission;
  onClose: () => void;
}

const UsedPhoneModal: React.FC<UsedPhoneModalProps> = ({ phone, onClose }) => {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      title: `${phone.brand} ${phone.model_name} (Used)`,
      price: phone.asking_price,
      image: phone.phone_images?.[0] || '/placeholder-phone.jpg',
      category: 'Used Phone'
    });

    toast({
      title: "Added to Cart! 🛒",
      description: `${phone.brand} ${phone.model_name} has been added to your cart`,
      className: "bg-gradient-gold text-black font-semibold",
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="glass-morphism rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-4xl font-bold text-white">
              <span className="text-shimmer">{phone.brand} {phone.model_name}</span>
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {phone.phone_images && phone.phone_images.length > 0 ? (
                <div className="space-y-4">
                  <img
                    src={phone.phone_images[0]}
                    alt={`${phone.brand} ${phone.model_name}`}
                    className="w-full h-96 object-contain rounded-lg bg-gray-800"
                  />
                  {phone.phone_images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {phone.phone_images.slice(1).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${phone.brand} ${phone.model_name} ${index + 2}`}
                          className="w-full h-20 object-cover rounded-lg bg-gray-800"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-8xl">📱</span>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-4xl font-bold text-gold-400">
                  Rs. {phone.asking_price.toLocaleString()}
                </span>
                <div className="mt-2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    USED PHONE
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <p className="font-semibold text-white">Storage</p>
                    <p>{phone.storage}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">RAM</p>
                    <p>{phone.ram}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Condition</p>
                    <p>{phone.condition}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Usage Duration</p>
                    <p>{phone.usage_duration}</p>
                  </div>
                </div>
              </div>

              {phone.additional_notes && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Additional Notes</h3>
                  <p className="text-gray-300">{phone.additional_notes}</p>
                </div>
              )}

              <div className="pt-4">
                <Button
                  onClick={handleAddToCart}
                  className="w-full premium-gradient text-black font-semibold text-lg py-3 rounded-full hover:scale-105 transition-transform"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart - Rs. {phone.asking_price.toLocaleString()}
                </Button>
              </div>

              <div className="text-sm text-gray-400 space-y-2">
                <p>✓ Inspected and verified by our team</p>
                <p>✓ 7-day return policy</p>
                <p>✓ Authentic product guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedPhoneModal;

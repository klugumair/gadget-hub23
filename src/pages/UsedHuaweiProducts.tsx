
import React, { useState, useEffect } from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import UsedPhoneCard from '@/components/UsedPhoneCard';
import UsedPhoneModal from '@/components/UsedPhoneModal';

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

const UsedHuaweiProducts = () => {
  const [approvedPhones, setApprovedPhones] = useState<PhoneSubmission[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<PhoneSubmission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedPhones();
  }, []);

  const fetchApprovedPhones = async () => {
    try {
      const { data, error } = await supabase
        .from('phone_submissions')
        .select('*')
        .eq('status', 'approved')
        .eq('brand', 'Huawei')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApprovedPhones(data || []);
    } catch (error) {
      console.error('Error fetching approved phones:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="min-h-screen flex flex-col items-center justify-center relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Link to="/phones/used" className="inline-block mb-8">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to Used Phones
              </Button>
            </Link>
            
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-shimmer">Used Huawei Collection</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-12">
              Quality pre-owned Huawei devices at great prices
            </p>
            
            <div className="mb-16">
              <div className="glass-morphism rounded-2xl p-8 max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-4">
                  <span className="text-shimmer">Sell Your Used Huawei Phone</span>
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  Get the best value for your Huawei device. Upload details and images, and our team will review your submission.
                </p>
                <Link to="/sell-huawei-phone">
                  <Button className="premium-gradient text-black font-semibold text-lg px-8 py-3 rounded-full hover:scale-105 transition-transform">
                    <Upload size={20} className="mr-2" />
                    Sell Your Phone
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-white mb-8">
              <span className="text-shimmer">Available Used Huawei Phones</span>
            </h2>
            
            {loading ? (
              <div className="text-center">
                <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                  <div className="text-8xl mb-6">⏳</div>
                  <p className="text-xl text-gray-400">Loading available phones...</p>
                </div>
              </div>
            ) : approvedPhones.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {approvedPhones.map((phone) => (
                  <UsedPhoneCard
                    key={phone.id}
                    id={phone.id}
                    title={`${phone.brand} ${phone.model_name}`}
                    price={phone.asking_price}
                    condition={phone.condition}
                    storage={phone.storage}
                    ram={phone.ram}
                    images={phone.phone_images || []}
                    usage_duration={phone.usage_duration}
                    onClick={() => setSelectedPhone(phone)}
                    onDelete={fetchApprovedPhones}
                    isDatabase={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <div className="glass-morphism rounded-2xl p-12 max-w-md mx-auto">
                  <div className="text-8xl mb-6">📱</div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    No Used Huawei Phones Available
                  </h3>
                  <p className="text-xl text-gray-400">
                    We're working hard to bring you quality used Huawei devices. Check back soon or sell your phone to us!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {selectedPhone && (
        <UsedPhoneModal
          phone={selectedPhone}
          onClose={() => setSelectedPhone(null)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default UsedHuaweiProducts;

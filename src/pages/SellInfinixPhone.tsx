import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SellInfinixPhone = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    model_name: '',
    storage: '',
    ram: '',
    condition: '',
    usage_duration: '',
    asking_price: '',
    phone_number: '',
    additional_notes: ''
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 5 images",
        variant: "destructive"
      });
      return;
    }
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (submissionId: string) => {
    const uploadedUrls: string[] = [];
    
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${submissionId}/${Date.now()}_${i}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('phone-images')
        .upload(fileName, file);
        
      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }
      
      const { data } = supabase.storage
        .from('phone-images')
        .getPublicUrl(fileName);
        
      uploadedUrls.push(data.publicUrl);
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to sell your phone",
        variant: "destructive"
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: "Images required",
        description: "Please upload at least one image of your phone",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data: submission, error: submissionError } = await supabase
        .from('phone_submissions')
        .insert({
          user_id: user.id,
          brand: 'Infinix',
          model_name: formData.model_name,
          storage: formData.storage,
          ram: formData.ram,
          condition: formData.condition,
          usage_duration: formData.usage_duration,
          asking_price: formData.asking_price ? parseFloat(formData.asking_price) : null,
          phone_number: formData.phone_number,
          additional_notes: formData.additional_notes
        })
        .select()
        .single();

      if (submissionError) throw submissionError;

      const imageUrls = await uploadImages(submission.id);
      
      const { error: updateError } = await supabase
        .from('phone_submissions')
        .update({ phone_images: imageUrls })
        .eq('id', submission.id);

      if (updateError) throw updateError;

      toast({
        title: "Submission successful!",
        description: "Your phone submission is pending admin review. We'll get back to you soon!",
      });

      navigate('/phones/used/infinix');
      
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your phone. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <FloatingNavbar />
        <section className="min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white mb-6">Authentication Required</h1>
            <p className="text-xl text-gray-400 mb-8">Please sign in to sell your phone</p>
            <Link to="/phones/used/infinix">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to Used Infinix
              </Button>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <Link to="/phones/used/infinix" className="inline-block mb-8">
              <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to Used Infinix
              </Button>
            </Link>
            
            <div className="glass-morphism rounded-2xl p-8">
              <h1 className="text-4xl font-bold mb-6 text-center">
                <span className="text-shimmer">Sell Your Infinix Phone</span>
              </h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="model_name" className="text-white text-lg font-semibold">
                    Model Name *
                  </Label>
                  <Input
                    id="model_name"
                    name="model_name"
                    value={formData.model_name}
                    onChange={handleInputChange}
                    placeholder="e.g., Galaxy S21, Galaxy A54"
                    className="mt-2 bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="storage" className="text-white text-lg font-semibold">
                      Storage *
                    </Label>
                    <select
                      id="storage"
                      name="storage"
                      value={formData.storage}
                      onChange={handleInputChange}
                      className="w-full mt-2 p-3 rounded-md bg-gray-800 border border-gray-600 text-white"
                      required
                    >
                      <option value="">Select Storage</option>
                      <option value="64GB">64GB</option>
                      <option value="128GB">128GB</option>
                      <option value="256GB">256GB</option>
                      <option value="512GB">512GB</option>
                      <option value="1TB">1TB</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="ram" className="text-white text-lg font-semibold">
                      RAM *
                    </Label>
                    <select
                      id="ram"
                      name="ram"
                      value={formData.ram}
                      onChange={handleInputChange}
                      className="w-full mt-2 p-3 rounded-md bg-gray-800 border border-gray-600 text-white"
                      required
                    >
                      <option value="">Select RAM</option>
                      <option value="4GB">4GB</option>
                      <option value="6GB">6GB</option>
                      <option value="8GB">8GB</option>
                      <option value="12GB">12GB</option>
                      <option value="16GB">16GB</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="condition" className="text-white text-lg font-semibold">
                      Condition *
                    </Label>
                    <select
                      id="condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full mt-2 p-3 rounded-md bg-gray-800 border border-gray-600 text-white"
                      required
                    >
                      <option value="">Select Condition</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Very Good">Very Good</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="usage_duration" className="text-white text-lg font-semibold">
                      Usage Duration *
                    </Label>
                    <select
                      id="usage_duration"
                      name="usage_duration"
                      value={formData.usage_duration}
                      onChange={handleInputChange}
                      className="w-full mt-2 p-3 rounded-md bg-gray-800 border border-gray-600 text-white"
                      required
                    >
                      <option value="">Select Duration</option>
                      <option value="Less than 6 months">Less than 6 months</option>
                      <option value="6-12 months">6-12 months</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="2-3 years">2-3 years</option>
                      <option value="More than 3 years">More than 3 years</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="asking_price" className="text-white text-lg font-semibold">
                      Asking Price (Optional)
                    </Label>
                    <Input
                      id="asking_price"
                      name="asking_price"
                      type="number"
                      value={formData.asking_price}
                      onChange={handleInputChange}
                      placeholder="Enter your expected price"
                      className="mt-2 bg-gray-800 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone_number" className="text-white text-lg font-semibold">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone_number"
                      name="phone_number"
                      type="tel"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="mt-2 bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone_images" className="text-white text-lg font-semibold">
                    Phone Images * (Max 5 images)
                  </Label>
                  <div className="mt-2">
                    <input
                      id="phone_images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-400 file:text-black hover:file:bg-gold-300"
                    />
                  </div>
                  
                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Phone image ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600"
                          >
                            <X size={16} className="text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="additional_notes" className="text-white text-lg font-semibold">
                    Additional Notes
                  </Label>
                  <textarea
                    id="additional_notes"
                    name="additional_notes"
                    value={formData.additional_notes}
                    onChange={handleInputChange}
                    placeholder="Any additional information about your phone..."
                    rows={4}
                    className="w-full mt-2 p-3 rounded-md bg-gray-800 border border-gray-600 text-white resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full premium-gradient text-black font-semibold text-lg py-3 rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Upload className="animate-spin mr-2" size={20} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload size={20} className="mr-2" />
                      Submit Phone for Review
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SellInfinixPhone;

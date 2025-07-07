
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';

interface SellPhonePageTemplateProps {
  brand: string;
  backUrl: string;
  pageTitle: string;
}

const SellPhonePageTemplate: React.FC<SellPhonePageTemplateProps> = ({ brand, backUrl, pageTitle }) => {
  const [formData, setFormData] = useState({
    modelName: '',
    storage: '',
    ram: '',
    condition: '',
    usageDuration: '',
    askingPrice: '',
    phoneNumber: '',
    additionalNotes: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    const imageUrls: string[] = [];
    
    for (const image of images) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `phone-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('phone-images')
        .upload(filePath, image);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('phone-images')
        .getPublicUrl(filePath);

      imageUrls.push(publicUrl);
    }

    return imageUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to sell your phone",
        variant: "destructive",
      });
      return;
    }

    if (!formData.modelName || !formData.storage || !formData.ram || !formData.condition || !formData.usageDuration) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const imageUrls = await uploadImages();

      const { error } = await supabase
        .from('phone_submissions')
        .insert({
          user_id: user.id,
          brand: brand,
          model_name: formData.modelName,
          storage: formData.storage,
          ram: formData.ram,
          condition: formData.condition,
          usage_duration: formData.usageDuration,
          asking_price: formData.askingPrice ? parseFloat(formData.askingPrice) : null,
          phone_number: formData.phoneNumber || null,
          additional_notes: formData.additionalNotes || null,
          phone_images: imageUrls,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Submission Successful! ✅",
        description: "Your phone has been submitted for review. We'll contact you soon!",
        className: "bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold",
      });

      // Reset form
      setFormData({
        modelName: '',
        storage: '',
        ram: '',
        condition: '',
        usageDuration: '',
        askingPrice: '',
        phoneNumber: '',
        additionalNotes: ''
      });
      setImages([]);

    } catch (error) {
      console.error('Error submitting phone:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your phone. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6 max-w-2xl">
          <Link to={backUrl} className="inline-block mb-8">
            <Button variant="ghost" className="text-gold-400 hover:text-gold-300">
              <ArrowLeft size={20} className="mr-2" />
              Back to {brand} Products
            </Button>
          </Link>

          <div className="glass-morphism rounded-2xl p-8">
            <h1 className="text-4xl font-bold text-center mb-8">
              <span className="text-shimmer">{pageTitle}</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="modelName" className="text-gold-400">Model Name *</Label>
                <Input
                  id="modelName"
                  value={formData.modelName}
                  onChange={(e) => handleInputChange('modelName', e.target.value)}
                  placeholder={`e.g., ${brand} Model`}
                  className="bg-gray-800/50 border-gold-400/30 text-white mt-2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storage" className="text-gold-400">Storage *</Label>
                  <Select onValueChange={(value) => handleInputChange('storage', value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gold-400/30 text-white mt-2">
                      <SelectValue placeholder="Select storage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="64GB">64GB</SelectItem>
                      <SelectItem value="128GB">128GB</SelectItem>
                      <SelectItem value="256GB">256GB</SelectItem>
                      <SelectItem value="512GB">512GB</SelectItem>
                      <SelectItem value="1TB">1TB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="ram" className="text-gold-400">RAM *</Label>
                  <Select onValueChange={(value) => handleInputChange('ram', value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gold-400/30 text-white mt-2">
                      <SelectValue placeholder="Select RAM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4GB">4GB</SelectItem>
                      <SelectItem value="6GB">6GB</SelectItem>
                      <SelectItem value="8GB">8GB</SelectItem>
                      <SelectItem value="12GB">12GB</SelectItem>
                      <SelectItem value="16GB">16GB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="condition" className="text-gold-400">Condition *</Label>
                  <Select onValueChange={(value) => handleInputChange('condition', value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gold-400/30 text-white mt-2">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Very Good">Very Good</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="usageDuration" className="text-gold-400">Usage Duration *</Label>
                  <Select onValueChange={(value) => handleInputChange('usageDuration', value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gold-400/30 text-white mt-2">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Less than 6 months">Less than 6 months</SelectItem>
                      <SelectItem value="6 months to 1 year">6 months to 1 year</SelectItem>
                      <SelectItem value="1 to 2 years">1 to 2 years</SelectItem>
                      <SelectItem value="2 to 3 years">2 to 3 years</SelectItem>
                      <SelectItem value="More than 3 years">More than 3 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="askingPrice" className="text-gold-400">Asking Price (Rs.)</Label>
                  <Input
                    id="askingPrice"
                    type="number"
                    value={formData.askingPrice}
                    onChange={(e) => handleInputChange('askingPrice', e.target.value)}
                    placeholder="Enter your asking price"
                    className="bg-gray-800/50 border-gold-400/30 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber" className="text-gold-400">Contact Number</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="Your contact number"
                    className="bg-gray-800/50 border-gold-400/30 text-white mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="additionalNotes" className="text-gold-400">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  placeholder="Any additional information about your phone..."
                  className="bg-gray-800/50 border-gold-400/30 text-white mt-2"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-gold-400">Phone Images</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gold-400/30 rounded-lg cursor-pointer hover:bg-gold-400/5 transition-colors"
                  >
                    <Upload className="mr-2 text-gold-400" size={20} />
                    <span className="text-white">Upload Images</span>
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-red-500 hover:bg-red-600 rounded-full"
                        >
                          <X size={12} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-black font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                {loading ? 'Submitting...' : 'Submit Phone for Review'}
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SellPhonePageTemplate;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Upload, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Variant {
  ram: string;
  storage: string;
  price: number;
}

interface AdminPhoneProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded?: () => void | Promise<void>;
  defaultSubcategory: string;
}

const AdminPhoneProductModal: React.FC<AdminPhoneProductModalProps> = ({ 
  isOpen, 
  onClose, 
  onProductAdded,
  defaultSubcategory 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    additional_notes: ''
  });
  const [variants, setVariants] = useState<Variant[]>([
    { ram: '', storage: '', price: 0 }
  ]);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { ram: '', storage: '', price: 0 }]);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index));
    }
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
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gadgethub')
        .upload(filePath, image);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('gadgethub')
        .getPublicUrl(filePath);

      imageUrls.push(publicUrl);
    }

    return imageUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload images first
      const imageUrls = await uploadImages();

      // Get the base price (lowest variant price)
      const basePrice = Math.min(...variants.map(v => v.price));

      // Create a single product with variants stored in additional_notes as JSON structure
      const variantsData = {
        variants: variants,
        base_price: basePrice
      };

      const { error } = await supabase
        .from('products')
        .insert({
          name: formData.name,
          price: basePrice,
          category: 'gadget',
          subcategory: defaultSubcategory,
          description: formData.description || null,
          additional_notes: JSON.stringify(variantsData),
          images: imageUrls
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Product Added! ✅",
        description: `${formData.name} with ${variants.length} variant(s) has been added successfully`,
        className: "bg-gradient-gold text-black font-semibold",
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        additional_notes: ''
      });
      setVariants([{ ram: '', storage: '', price: 0 }]);
      setImages([]);
      onClose();

      // Call the onProductAdded callback if provided
      if (onProductAdded) {
        await onProductAdded();
      }

    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-morphism rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Add New {defaultSubcategory} Phone</h2>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-white hover:text-gold-400 p-2"
            >
              <X size={24} />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-white">Phone Model Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-2 bg-white/10 border-gold-400/30 text-white placeholder:text-gray-400"
                placeholder="Enter phone model name"
              />
            </div>

            <div>
              <Label className="text-white">Variants *</Label>
              <div className="space-y-4 mt-2">
                {variants.map((variant, index) => (
                  <div key={index} className="glass-morphism rounded-lg p-4 border border-gold-400/20">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-semibold">Variant {index + 1}</h4>
                      {variants.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeVariant(index)}
                          className="w-8 h-8 p-0 bg-red-500 hover:bg-red-600 rounded-full"
                        >
                          <Minus size={16} />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-white">RAM *</Label>
                        <Input
                          value={variant.ram}
                          onChange={(e) => handleVariantChange(index, 'ram', e.target.value)}
                          required
                          className="mt-1 bg-white/10 border-gold-400/30 text-white placeholder:text-gray-400"
                          placeholder="e.g., 8GB"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-white">Storage *</Label>
                        <Input
                          value={variant.storage}
                          onChange={(e) => handleVariantChange(index, 'storage', e.target.value)}
                          required
                          className="mt-1 bg-white/10 border-gold-400/30 text-white placeholder:text-gray-400"
                          placeholder="e.g., 128GB"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-white">Price (Rs.) *</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={variant.price}
                          onChange={(e) => handleVariantChange(index, 'price', parseFloat(e.target.value) || 0)}
                          required
                          className="mt-1 bg-white/10 border-gold-400/30 text-white placeholder:text-gray-400"
                          placeholder="Enter price"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button
                  type="button"
                  onClick={addVariant}
                  className="w-full bg-gold-400/20 hover:bg-gold-400/30 text-gold-400 border border-gold-400/30"
                >
                  <Plus size={16} className="mr-2" />
                  Add Another Variant
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-white">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-2 w-full bg-white/10 border border-gold-400/30 text-white placeholder:text-gray-400 rounded-md px-3 py-2 resize-none"
                placeholder="Enter phone description"
              />
            </div>

            <div>
              <Label className="text-white">Product Images</Label>
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
                  className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gold-400/30 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
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

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="flex-1 text-white hover:text-gold-400"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-gold hover:bg-gold-500 text-black font-semibold"
                disabled={loading}
              >
                {loading ? 'Adding...' : `Add Product`}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPhoneProductModal;

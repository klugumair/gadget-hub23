
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Upload, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: 'gadget' | 'headphone' | 'cover';
  subcategory?: string;
}

const AdminProductModal: React.FC<AdminProductModalProps> = ({ 
  isOpen, 
  onClose, 
  category,
  subcategory 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    additional_notes: '',
    subcategory: subcategory || ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

      // Direct insert with type casting to bypass type checking issues
      const { error } = await (supabase as any)
        .from('products')
        .insert({
          name: formData.name,
          price: parseFloat(formData.price),
          category,
          subcategory: formData.subcategory,
          description: formData.description,
          additional_notes: formData.additional_notes,
          images: imageUrls
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Product Added! ✅",
        description: `${formData.name} has been added successfully`,
        className: "bg-gradient-gold text-black font-semibold",
      });

      // Reset form
      setFormData({
        name: '',
        price: '',
        description: '',
        additional_notes: '',
        subcategory: subcategory || ''
      });
      setImages([]);
      onClose();

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
      <div className="glass-morphism rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Add New {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
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
              <Label htmlFor="name" className="text-white">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-2 bg-white/10 border-gold-400/30 text-white placeholder:text-gray-400"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-white">Price (Rs.) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="mt-2 bg-white/10 border-gold-400/30 text-white placeholder:text-gray-400"
                placeholder="Enter price"
              />
            </div>

            {!subcategory && (
              <div>
                <Label htmlFor="subcategory" className="text-white">Subcategory</Label>
                <Input
                  id="subcategory"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  className="mt-2 bg-white/10 border-gold-400/30 text-white placeholder:text-gray-400"
                  placeholder="Enter subcategory (optional)"
                />
              </div>
            )}

            <div>
              <Label htmlFor="description" className="text-white">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-2 w-full bg-white/10 border border-gold-400/30 text-white placeholder:text-gray-400 rounded-md px-3 py-2 resize-none"
                placeholder="Enter product description"
              />
            </div>

            <div>
              <Label htmlFor="additional_notes" className="text-white">Additional Notes</Label>
              <textarea
                id="additional_notes"
                name="additional_notes"
                value={formData.additional_notes}
                onChange={handleInputChange}
                rows={2}
                className="mt-2 w-full bg-white/10 border border-gold-400/30 text-white placeholder:text-gray-400 rounded-md px-3 py-2 resize-none"
                placeholder="Any additional notes"
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
                {loading ? 'Adding...' : 'Add Product'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductModal;

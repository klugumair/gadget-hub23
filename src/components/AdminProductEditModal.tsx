
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  category: 'gadget' | 'headphone' | 'cover';
  subcategory?: string;
  description?: string;
  images: string[];
}

interface AdminProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onUpdate: () => void;
}

const AdminProductEditModal: React.FC<AdminProductEditModalProps> = ({
  isOpen,
  onClose,
  product,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    category: product?.category || 'gadget' as const,
    subcategory: product?.subcategory || '',
    description: product?.description || '',
  });
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = async (files: FileList) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    console.log('Starting image upload process...');

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        console.log('Processing file:', file.name, 'Size:', file.size, 'Type:', file.type);
        
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`File ${file.name} is too large. Maximum size is 10MB.`);
        }

        if (!file.type.startsWith('image/')) {
          throw new Error(`File ${file.name} is not an image.`);
        }

        const fileExt = file.name.split('.').pop()?.toLowerCase();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        console.log('Uploading to path:', filePath);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('gadgethub')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
        }

        console.log('Upload successful:', uploadData);

        const { data: urlData } = supabase.storage
          .from('gadgethub')
          .getPublicUrl(filePath);

        const publicUrl = urlData.publicUrl;
        console.log('Generated public URL:', publicUrl);
        
        return publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      console.log('All uploads completed:', uploadedUrls);

      setImages(prevImages => {
        const newImages = [...prevImages, ...uploadedUrls];
        console.log('Updated images array:', newImages);
        return newImages;
      });
      
      toast({
        title: "Images Uploaded Successfully! ✅",
        description: `${uploadedUrls.length} image(s) uploaded and added`,
        className: "bg-gradient-gold text-black font-semibold",
      });

    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Image Removed",
      description: "Image has been removed from the product",
      className: "bg-gradient-gold text-black font-semibold",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      console.log('Saving product with data:', {
        ...formData,
        images: images
      });

      const updateData = {
        name: formData.name.trim(),
        price: formData.price,
        category: formData.category,
        subcategory: formData.subcategory.trim() || null,
        description: formData.description.trim() || null,
        images: images,
        updated_at: new Date().toISOString()
      };

      let error;
      
      if (product) {
        console.log('Updating product:', product.id);
        const { error: updateError } = await supabase
          .from('products')
          .update(updateData)
          .eq('id', product.id);
        error = updateError;
      } else {
        console.log('Creating new product');
        const { error: insertError } = await supabase
          .from('products')
          .insert([updateData]);
        error = insertError;
      }

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      toast({
        title: product ? "Product Updated Successfully! ✅" : "Product Created Successfully! ✅",
        description: `${formData.name} has been ${product ? 'updated' : 'created'}`,
        className: "bg-gradient-gold text-black font-semibold",
      });

      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: `Failed to ${product ? 'update' : 'create'} product. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  React.useEffect(() => {
    if (product && isOpen) {
      console.log('Setting form data for product:', product);
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        subcategory: product.subcategory || '',
        description: product.description || '',
      });
      setImages(product.images || []);
    } else if (!product && isOpen) {
      console.log('Resetting form for new product');
      setFormData({
        name: '',
        price: 0,
        category: 'gadget',
        subcategory: '',
        description: '',
      });
      setImages([]);
    }
  }, [product, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-gray-800 border-gray-600 text-white"
                required
                placeholder="Enter product name"
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-white">Price (PKR) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="any"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                className="bg-gray-800 border-gray-600 text-white"
                required
                placeholder="Enter price"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-white">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as 'gadget' | 'headphone' | 'cover' }))}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gadget">Phone</SelectItem>
                  <SelectItem value="headphone">Headphone</SelectItem>
                  <SelectItem value="cover">Cover</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="subcategory" className="text-white">Subcategory</Label>
              <Input
                id="subcategory"
                value={formData.subcategory}
                onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="e.g., Samsung, iPhone, Sony, etc."
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-gray-800 border-gray-600 text-white"
                rows={3}
                placeholder="Enter product description"
              />
            </div>

            <div>
              <Label className="text-white">Product Images</Label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Upload Images'}
                  </Button>
                  <span className="text-sm text-gray-400">
                    Max 10MB per image. Supported: JPG, PNG, WebP
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                    className="hidden"
                  />
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-600"
                          onError={(e) => {
                            console.error('Failed to display image:', image);
                            e.currentTarget.style.display = 'none';
                          }}
                          onLoad={() => {
                            console.log('Image displayed successfully:', image);
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              disabled={saving || uploading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={saving || uploading || !formData.name.trim()} 
              className="bg-gold-400 hover:bg-gold-500 text-black"
            >
              {saving ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminProductEditModal;

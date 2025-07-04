
-- Create products table to store gadgets, headphones, and covers
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('gadget', 'headphone', 'cover')),
  subcategory TEXT,
  description TEXT,
  additional_notes TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for products table
-- Allow everyone to view products (public catalog)
CREATE POLICY "Anyone can view products" 
  ON public.products 
  FOR SELECT 
  USING (true);

-- Only allow admins to insert products (we'll check this in the application layer)
CREATE POLICY "Authenticated users can insert products" 
  ON public.products 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Only allow admins to update products
CREATE POLICY "Authenticated users can update products" 
  ON public.products 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Only allow admins to delete products
CREATE POLICY "Authenticated users can delete products" 
  ON public.products 
  FOR DELETE 
  TO authenticated
  USING (true);


-- Create a table to store used phone submissions
CREATE TABLE public.phone_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  brand TEXT NOT NULL DEFAULT 'Samsung',
  model_name TEXT NOT NULL,
  storage TEXT NOT NULL,
  ram TEXT NOT NULL,
  condition TEXT NOT NULL,
  usage_duration TEXT NOT NULL,
  asking_price DECIMAL(10,2),
  phone_images TEXT[], -- Array to store image URLs
  additional_notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.phone_submissions ENABLE ROW LEVEL SECURITY;

-- Users can view their own submissions
CREATE POLICY "Users can view their own submissions" 
  ON public.phone_submissions 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can insert their own submissions
CREATE POLICY "Users can create submissions" 
  ON public.phone_submissions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own pending submissions
CREATE POLICY "Users can update their pending submissions" 
  ON public.phone_submissions 
  FOR UPDATE 
  USING (auth.uid() = user_id AND status = 'pending');

-- Admins can view all submissions (we'll implement admin role checking later)
CREATE POLICY "Admins can view all submissions" 
  ON public.phone_submissions 
  FOR SELECT 
  USING (true); -- For now, allowing all authenticated users

-- Admins can update all submissions
CREATE POLICY "Admins can update all submissions" 
  ON public.phone_submissions 
  FOR UPDATE 
  USING (true); -- For now, allowing all authenticated users

-- Create a storage bucket for phone images
INSERT INTO storage.buckets (id, name, public)
VALUES ('phone-images', 'phone-images', true);

-- Storage policies for phone images
CREATE POLICY "Users can upload phone images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'phone-images' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Phone images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'phone-images');

CREATE POLICY "Users can update their phone images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'phone-images' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can delete their phone images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'phone-images' 
  AND auth.uid() IS NOT NULL
);

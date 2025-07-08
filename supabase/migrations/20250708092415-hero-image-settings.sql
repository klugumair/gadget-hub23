
-- Create a settings table to store hero image URL
CREATE TABLE IF NOT EXISTS public.settings (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default hero image setting
INSERT INTO public.settings (key, value) 
VALUES ('hero_image_url', '/lovable-uploads/f2353fe1-f956-4d32-8129-7eefb75528d2.png')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view settings" 
ON public.settings 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can update settings" 
ON public.settings 
FOR UPDATE 
TO authenticated 
USING (true);

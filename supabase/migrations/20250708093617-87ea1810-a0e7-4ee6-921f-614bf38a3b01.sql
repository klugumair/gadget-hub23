
-- Ensure the avatars bucket has proper policies for admin uploads
-- Drop any conflicting policies first
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Give users authenticated access to folder" ON storage.objects;
DROP POLICY IF EXISTS "Give users authenticated delete access to folder" ON storage.objects;
DROP POLICY IF EXISTS "Give users authenticated update access to folder" ON storage.objects;

-- Create comprehensive policies for the avatars bucket
CREATE POLICY "Anyone can view avatars and hero images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload to avatars bucket" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can update avatars bucket" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can delete from avatars bucket" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'avatars');

-- Ensure the avatars bucket is public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'avatars';

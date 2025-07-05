
-- First, let's check and update the storage policies for the gadgethub bucket
-- Remove any existing restrictive policies
DROP POLICY IF EXISTS "Give users authenticated access to folder" ON storage.objects;
DROP POLICY IF EXISTS "Give users authenticated delete access to folder" ON storage.objects;
DROP POLICY IF EXISTS "Give users authenticated update access to folder" ON storage.objects;

-- Create permissive policies for the gadgethub bucket
CREATE POLICY "Allow authenticated users to upload files" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'gadgethub');

CREATE POLICY "Allow authenticated users to view files" 
ON storage.objects 
FOR SELECT 
TO authenticated 
USING (bucket_id = 'gadgethub');

CREATE POLICY "Allow authenticated users to update files" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'gadgethub');

CREATE POLICY "Allow authenticated users to delete files" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'gadgethub');

-- Also allow public access for viewing files (so images can be displayed publicly)
CREATE POLICY "Allow public users to view files" 
ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'gadgethub');

-- Make sure the bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gadgethub', 'gadgethub', true)
ON CONFLICT (id) DO UPDATE SET public = true;

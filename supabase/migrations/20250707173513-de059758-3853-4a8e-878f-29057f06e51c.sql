-- Add DELETE policies for phone_submissions table

-- Allow admins to delete phone submissions
CREATE POLICY "Admins can delete all submissions" 
  ON public.phone_submissions 
  FOR DELETE 
  USING (true);

-- Allow users to delete their own pending submissions  
CREATE POLICY "Users can delete their pending submissions" 
  ON public.phone_submissions 
  FOR DELETE 
  USING (auth.uid() = user_id AND status = 'pending');
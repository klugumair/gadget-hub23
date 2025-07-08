
-- Create the get_setting function
CREATE OR REPLACE FUNCTION public.get_setting(setting_key TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  setting_value TEXT;
BEGIN
  SELECT value INTO setting_value 
  FROM public.settings 
  WHERE key = setting_key;
  
  RETURN setting_value;
END;
$$;

-- Create the update_setting function  
CREATE OR REPLACE FUNCTION public.update_setting(setting_key TEXT, setting_value TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.settings (key, value, updated_at)
  VALUES (setting_key, setting_value, NOW())
  ON CONFLICT (key) 
  DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = NOW();
END;
$$;

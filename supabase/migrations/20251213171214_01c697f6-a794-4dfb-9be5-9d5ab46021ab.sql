-- Fix function search path for hash_pan function
CREATE OR REPLACE FUNCTION public.hash_pan(pan TEXT)
RETURNS TEXT
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT encode(sha256(pan::bytea), 'hex')
$$;
-- Create table to store MF Central connection status
CREATE TABLE public.mf_central_connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  pan_number TEXT NOT NULL,
  connected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_synced_at TIMESTAMP WITH TIME ZONE,
  connection_status TEXT NOT NULL DEFAULT 'connected',
  folios_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mf_central_connections ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own MF Central connection"
ON public.mf_central_connections
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own MF Central connection"
ON public.mf_central_connections
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own MF Central connection"
ON public.mf_central_connections
FOR UPDATE
USING (auth.uid() = user_id);

-- Create table to store portfolio holdings (mock data for demo)
CREATE TABLE public.portfolio_holdings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scheme_name TEXT NOT NULL,
  scheme_code TEXT,
  amc_name TEXT NOT NULL,
  category TEXT NOT NULL,
  folio_number TEXT NOT NULL,
  units DECIMAL(18,4) NOT NULL,
  nav DECIMAL(18,4) NOT NULL,
  current_value DECIMAL(18,2) NOT NULL,
  invested_value DECIMAL(18,2) NOT NULL,
  returns_percentage DECIMAL(8,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_holdings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own holdings"
ON public.portfolio_holdings
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own holdings"
ON public.portfolio_holdings
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own holdings"
ON public.portfolio_holdings
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own holdings"
ON public.portfolio_holdings
FOR DELETE
USING (auth.uid() = user_id);
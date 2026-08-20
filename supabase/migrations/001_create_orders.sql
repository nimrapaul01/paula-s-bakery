-- Paula's Bakery - Database Migration
-- Run this in your Supabase SQL Editor

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  cake_description TEXT,
  cake_image_url TEXT,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert orders (customers placing orders)
CREATE POLICY "Allow public insert" ON orders
  FOR INSERT TO anon WITH CHECK (true);

-- Only service role can read/update/delete orders (admin use)
CREATE POLICY "Allow service role full access" ON orders
  FOR ALL TO service_role USING (true);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS orders_pickup_date_idx ON orders(pickup_date);

-- Grant usage to anon for inserts
GRANT INSERT ON orders TO anon;

// Database types for Paula's Bakery
// These match the Supabase schema defined in migrations/001_create_orders.sql

export interface OrderRow {
  id: string;
  customer_name: string;
  phone_number: string;
  cake_description: string | null;
  cake_image_url: string | null;
  pickup_date: string;
  pickup_time: string;
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      orders: {
        Row: OrderRow;
        Insert: {
          id?: string;
          customer_name: string;
          phone_number: string;
          cake_description?: string | null;
          cake_image_url?: string | null;
          pickup_date: string;
          pickup_time: string;
          created_at?: string;
        };
        Update: Partial<OrderRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

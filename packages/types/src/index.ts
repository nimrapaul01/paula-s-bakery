// Order entity as stored in the database
export interface Order {
  id: string;
  customer_name: string;
  phone_number: string;
  cake_description: string | null;
  cake_image_url: string | null;
  pickup_date: string; // ISO date string YYYY-MM-DD
  pickup_time: string; // HH:MM format
  created_at: string;
}

// Form data submitted by the customer
export interface OrderFormData {
  customerName: string;
  phoneNumber: string;
  cakeDescription: string;
  cakeImage: File | null;
  pickupDate: string;
  pickupTime: string;
}

// API response shape
export interface ApiResponse<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

// Order creation request payload
export interface CreateOrderRequest {
  customerName: string;
  phoneNumber: string;
  cakeDescription: string;
  pickupDate: string;
  pickupTime: string;
}

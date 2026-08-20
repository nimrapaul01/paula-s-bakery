# Paula's Bakery 🎂

A beautiful, premium custom cake ordering web application for Paula's Bakery.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage

## Project Structure

```
paulas-bakery/
├── apps/
│   └── web/              # Next.js frontend + API routes
├── packages/
│   ├── types/            # Shared TypeScript types
│   └── config/           # Shared configuration
├── package.json
└── .env.example
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example apps/web/.env.local
```

Then fill in your Supabase credentials in `apps/web/.env.local`.

### 3. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your **Project URL**, **anon key**, and **service role key** into `.env.local`
3. Go to **SQL Editor** in Supabase and run the migration:

```sql
-- Run this in Supabase SQL Editor
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  cake_description TEXT,
  cake_image_url TEXT,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

4. Go to **Storage** → **Buckets** → create a new bucket called `cake-images` and set it to **Public**

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- 🎨 Beautiful pink & white design
- 📸 Cake reference image upload with preview
- 📅 Date & time picker (no past dates)
- ✅ Form validation
- ☁️ Supabase Storage for images
- 🗄️ Supabase PostgreSQL for orders
- 💗 Animated thank-you confirmation
- 📱 Fully responsive

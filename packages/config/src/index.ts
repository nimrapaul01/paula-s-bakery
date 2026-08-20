export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
} as const;

export const STORAGE_CONFIG = {
  bucketName: 'cake-images',
  maxFileSizeBytes: 10 * 1024 * 1024, // 10 MB
  acceptedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  acceptedExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
} as const;

export const APP_CONFIG = {
  name: "Paula's",
  tagline: 'Custom Cakes for Every Celebration',
  established: 2000,
  owner: 'Nimra Paul',
} as const;

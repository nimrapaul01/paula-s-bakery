import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { Database } from "@/lib/database.types";

const ACCEPTED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const BUCKET_NAME = "cake-images";

function validateFields(fields: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (!fields.customerName?.trim()) {
    errors.customerName = "Full name is required.";
  } else if (fields.customerName.trim().length < 2) {
    errors.customerName = "Name must be at least 2 characters.";
  }

  if (!fields.phoneNumber?.trim()) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(fields.phoneNumber.trim())) {
    errors.phoneNumber = "Please enter a valid phone number.";
  }

  if (!fields.pickupDate?.trim()) {
    errors.pickupDate = "Pickup date is required.";
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(fields.pickupDate);
    if (selectedDate < today) {
      errors.pickupDate = "Pickup date cannot be in the past.";
    }
  }

  if (!fields.pickupTime?.trim()) {
    errors.pickupTime = "Pickup time is required.";
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const fields = {
      customerName: formData.get("customerName") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      cakeDescription: formData.get("cakeDescription") as string,
      pickupDate: formData.get("pickupDate") as string,
      pickupTime: formData.get("pickupTime") as string,
    };

    // Validate fields
    const errors = validateFields(fields);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Please fix the errors below.", errors },
        { status: 400 }
      );
    }

    // Handle image upload
    let cakeImageUrl: string | null = null;
    const imageFile = formData.get("cakeImage") as File | null;

    if (imageFile && imageFile.size > 0) {
      // Validate file type
      if (!ACCEPTED_MIME_TYPES.includes(imageFile.type)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid file type. Please upload JPG, PNG, or WEBP.",
            errors: { cakeImage: "Unsupported file format." },
          },
          { status: 400 }
        );
      }

      // Validate file size
      if (imageFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            message: "Image is too large. Maximum size is 10MB.",
            errors: { cakeImage: "File too large." },
          },
          { status: 400 }
        );
      }

      // Generate unique file path
      const ext = imageFile.name.split(".").pop() || "jpg";
      const timestamp = Date.now();
      const random = Math.random().toString(36).slice(2, 8);
      const filePath = `orders/${timestamp}-${random}.${ext}`;

      // Convert File to ArrayBuffer
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      // Upload to Supabase Storage
      const { error: uploadError } = await getSupabaseAdmin().storage
        .from(BUCKET_NAME)
        .upload(filePath, buffer, {
          contentType: imageFile.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        return NextResponse.json(
          {
            success: false,
            message: "Failed to upload image. Please try again.",
          },
          { status: 500 }
        );
      }

      // Get public URL
      const { data: urlData } = getSupabaseAdmin().storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      cakeImageUrl = urlData.publicUrl;
    }

    // Insert order into database
    type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
    const orderInsert: OrderInsert = {
      customer_name: fields.customerName.trim(),
      phone_number: fields.phoneNumber.trim(),
      cake_description: fields.cakeDescription?.trim() || null,
      cake_image_url: cakeImageUrl,
      pickup_date: fields.pickupDate,
      pickup_time: fields.pickupTime,
    };
    const { error: dbError } = await getSupabaseAdmin()
      .from("orders")
      .insert([orderInsert as never]);

    if (dbError) {
      console.error("Database insert error:", dbError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save your order. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your order has been placed successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}

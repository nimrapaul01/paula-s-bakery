"use client";

import React, { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import Button from "@/components/ui/Button";
import SuccessModal from "@/components/SuccessModal";
import { submitOrder } from "@/lib/api";

interface FormData {
  customerName: string;
  phoneNumber: string;
  cakeDescription: string;
  cakeImage: File | null;
  pickupDate: string;
  pickupTime: string;
}

interface FormErrors {
  customerName?: string;
  phoneNumber?: string;
  cakeDescription?: string;
  cakeImage?: string;
  pickupDate?: string;
  pickupTime?: string;
  general?: string;
}

function FormField({
  label,
  id,
  required,
  error,
  children,
  hint,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-pink-700 flex items-center gap-1"
      >
        {label}
        {required && <span className="text-pink-400">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-pink-400">{hint}</p>}
      {error && (
        <p className="text-xs text-rose-500 flex items-center gap-1">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border text-pink-900 placeholder-pink-300 bg-white/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 hover:border-pink-300 text-base";

const inputStyle = { border: "1.5px solid rgba(244,114,182,0.3)" };
const inputErrorStyle = { border: "1.5px solid #f43f5e" };

// Today's date as YYYY-MM-DD
function getMinDate() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

export default function OrderSection() {
  const [form, setForm] = useState<FormData>({
    customerName: "",
    phoneNumber: "",
    cakeDescription: "",
    cakeImage: null,
    pickupDate: "",
    pickupTime: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateField = (field: keyof FormData, value: string | File | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.customerName.trim()) {
      newErrors.customerName = "Full name is required.";
    } else if (form.customerName.trim().length < 2) {
      newErrors.customerName = "Name must be at least 2 characters.";
    }

    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(form.phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid phone number.";
    }

    if (!form.pickupDate) {
      newErrors.pickupDate = "Please select a pickup date.";
    }

    if (!form.pickupTime) {
      newErrors.pickupTime = "Please select a pickup time.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to first error
      const firstError = document.querySelector("[data-error='true']");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await submitOrder({
        customerName: form.customerName,
        phoneNumber: form.phoneNumber,
        cakeDescription: form.cakeDescription,
        cakeImage: form.cakeImage,
        pickupDate: form.pickupDate,
        pickupTime: form.pickupTime,
      });

      setShowSuccess(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrors({ general: message });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceAnother = () => {
    setShowSuccess(false);
    setForm({
      customerName: "",
      phoneNumber: "",
      cakeDescription: "",
      cakeImage: null,
      pickupDate: "",
      pickupTime: "",
    });
    setErrors({});
  };

  return (
    <>
      <div
        className="relative min-h-screen overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fff0f6 0%, #fce7f3 60%, #fdf2f8 100%)" }}
      >
        {/* Background decorations */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #f9a8d4, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #fbcfe8, transparent)" }}
        />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          {/* Header */}
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{
                background: "rgba(244, 114, 182, 0.1)",
                border: "1px solid rgba(244, 114, 182, 0.3)",
              }}
            >
              <span className="text-lg">🎂</span>
              <span className="text-sm font-semibold text-pink-500 tracking-widest uppercase">
                Custom Order
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-3"
              style={{
                fontFamily: "var(--font-playfair), serif",
                background: "linear-gradient(135deg, #ec4899, #be185d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Order Your Cake
            </h2>
            <p className="text-pink-600/70 text-base sm:text-lg max-w-md mx-auto">
              Fill in the details below and we&apos;ll create your dream cake
              with love. ✨
            </p>
          </div>

          {/* Form card */}
          <div
            className="rounded-3xl p-6 sm:p-10"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(244, 114, 182, 0.2)",
              boxShadow:
                "0 20px 60px rgba(236, 72, 153, 0.1), 0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* Section: Customer Info */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                    style={{ background: "linear-gradient(135deg, #f472b6, #ec4899)" }}
                  >
                    1
                  </div>
                  <h3
                    className="text-lg font-bold text-pink-700"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Your Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    label="Full Name"
                    id="customerName"
                    required
                    error={errors.customerName}
                  >
                    <input
                      id="customerName"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Sarah Johnson"
                      value={form.customerName}
                      onChange={(e) => updateField("customerName", e.target.value)}
                      className={inputClass}
                      style={errors.customerName ? inputErrorStyle : inputStyle}
                      data-error={!!errors.customerName}
                    />
                  </FormField>

                  <FormField
                    label="Phone Number"
                    id="phoneNumber"
                    required
                    error={errors.phoneNumber}
                  >
                    <input
                      id="phoneNumber"
                      type="tel"
                      autoComplete="tel"
                      placeholder="e.g. +1 555 000 0000"
                      value={form.phoneNumber}
                      onChange={(e) => updateField("phoneNumber", e.target.value)}
                      className={inputClass}
                      style={errors.phoneNumber ? inputErrorStyle : inputStyle}
                      data-error={!!errors.phoneNumber}
                    />
                  </FormField>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-none h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(244,114,182,0.3), transparent)" }} />

              {/* Section: Cake Details */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                    style={{ background: "linear-gradient(135deg, #f472b6, #ec4899)" }}
                  >
                    2
                  </div>
                  <h3
                    className="text-lg font-bold text-pink-700"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Cake Details
                  </h3>
                </div>

                <div className="space-y-5">
                  <FormField
                    label="Cake Description & Special Instructions"
                    id="cakeDescription"
                    error={errors.cakeDescription}
                    hint="Describe the flavors, colors, occasion, size, or any special touches you'd like."
                  >
                    <textarea
                      id="cakeDescription"
                      rows={4}
                      placeholder="e.g. A 2-tier vanilla sponge cake with pink buttercream roses for a baby shower. Please write 'Baby Emma' on top in gold lettering..."
                      value={form.cakeDescription}
                      onChange={(e) => updateField("cakeDescription", e.target.value)}
                      className={`${inputClass} resize-none`}
                      style={errors.cakeDescription ? inputErrorStyle : inputStyle}
                    />
                  </FormField>

                  <FormField
                    label="Reference Photo"
                    id="cake-image-input"
                    error={errors.cakeImage}
                    hint="Upload a photo of your dream cake for reference."
                  >
                    <ImageUpload
                      onImageSelect={(file) => updateField("cakeImage", file)}
                      selectedImage={form.cakeImage}
                      error={errors.cakeImage}
                    />
                  </FormField>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-none h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(244,114,182,0.3), transparent)" }} />

              {/* Section: Pickup Details */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                    style={{ background: "linear-gradient(135deg, #f472b6, #ec4899)" }}
                  >
                    3
                  </div>
                  <h3
                    className="text-lg font-bold text-pink-700"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Pickup Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    label="Pickup Date"
                    id="pickupDate"
                    required
                    error={errors.pickupDate}
                  >
                    <input
                      id="pickupDate"
                      type="date"
                      value={form.pickupDate}
                      min={getMinDate()}
                      onChange={(e) => updateField("pickupDate", e.target.value)}
                      className={inputClass}
                      style={errors.pickupDate ? inputErrorStyle : inputStyle}
                      data-error={!!errors.pickupDate}
                    />
                  </FormField>

                  <FormField
                    label="Pickup Time"
                    id="pickupTime"
                    required
                    error={errors.pickupTime}
                    hint="Our hours: 9am – 6pm"
                  >
                    <input
                      id="pickupTime"
                      type="time"
                      value={form.pickupTime}
                      min="09:00"
                      max="18:00"
                      onChange={(e) => updateField("pickupTime", e.target.value)}
                      className={inputClass}
                      style={errors.pickupTime ? inputErrorStyle : inputStyle}
                      data-error={!!errors.pickupTime}
                    />
                  </FormField>
                </div>
              </div>

              {/* General error */}
              {errors.general && (
                <div
                  className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{
                    background: "rgba(244, 63, 94, 0.06)",
                    border: "1px solid rgba(244, 63, 94, 0.2)",
                  }}
                >
                  <svg
                    className="flex-shrink-0 mt-0.5"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p className="text-rose-600 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Submit button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  isLoading={isLoading}
                  id="submit-order"
                  className="w-full text-lg"
                >
                  {isLoading ? "Placing Your Order..." : "🍰 Place My Order"}
                </Button>
                <p className="text-center text-xs text-pink-400 mt-4">
                  🔒 Your information is kept private and secure
                </p>
              </div>
            </form>
          </div>

          {/* Bottom decorative note */}
          <p className="text-center text-pink-400 text-sm mt-8 italic"
            style={{ fontFamily: "var(--font-playfair)" }}>
            &ldquo;Every celebration deserves something sweet.&rdquo; — Paula&apos;s Bakery
          </p>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal isOpen={showSuccess} onPlaceAnother={handlePlaceAnother} />
    </>
  );
}

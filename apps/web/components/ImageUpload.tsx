"use client";

import React, { useRef, useState, useCallback } from "react";

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  selectedImage: File | null;
  error?: string;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE_MB = 10;

export default function ImageUpload({
  onImageSelect,
  selectedImage,
  error,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = useCallback(
    (file: File) => {
      setValidationError(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setValidationError("Unsupported format. Please use JPG, PNG, or WEBP.");
        return;
      }

      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setValidationError(`File is too large. Maximum size is ${MAX_SIZE_MB}MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
      onImageSelect(file);
    },
    [onImageSelect]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleRemove = () => {
    setPreview(null);
    setValidationError(null);
    onImageSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const displayError = validationError || error;

  return (
    <div className="w-full">
      {!preview ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload cake reference image"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          className="relative cursor-pointer rounded-2xl transition-all duration-300 group"
          style={{
            border: `2px dashed ${
              isDragging
                ? "#ec4899"
                : displayError
                ? "#f43f5e"
                : "rgba(244, 114, 182, 0.5)"
            }`,
            background: isDragging
              ? "rgba(244, 114, 182, 0.08)"
              : "rgba(255, 255, 255, 0.6)",
            padding: "40px 24px",
          }}
        >
          {/* Shimmer on drag */}
          {isDragging && (
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(244,114,182,0.3), transparent)",
                backgroundSize: "200% auto",
                animation: "shimmer 1s linear infinite",
              }}
            />
          )}

          <div className="relative z-10 flex flex-col items-center text-center gap-4">
            {/* Upload icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, rgba(244,114,182,0.15), rgba(236,72,153,0.1))",
                border: "1px solid rgba(244,114,182,0.3)",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ec4899"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>

            <div>
              <p className="text-pink-700 font-semibold text-base mb-1">
                {isDragging
                  ? "Drop your image here! 🌸"
                  : "Upload Cake Inspiration Photo"}
              </p>
              <p className="text-pink-400 text-sm">
                Drag & drop or{" "}
                <span className="text-pink-500 font-semibold underline underline-offset-2">
                  click to browse
                </span>
              </p>
              <p className="text-pink-300 text-xs mt-2">
                JPG, PNG, WEBP · Max {MAX_SIZE_MB}MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Preview */
        <div
          className="relative rounded-2xl overflow-hidden group"
          style={{
            border: "2px solid rgba(244, 114, 182, 0.3)",
            background: "#fff",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Cake reference preview"
            className="w-full object-cover rounded-2xl"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-pink-600 text-sm font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-rose-500 text-sm font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
              Remove
            </button>
          </div>

          {/* File name badge */}
          <div className="absolute bottom-3 left-3">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              {selectedImage?.name?.slice(0, 30) ?? "Image selected"}
            </div>
          </div>
        </div>
      )}

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        id="cake-image-input"
        accept=".jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Error message */}
      {displayError && (
        <p className="mt-2 text-sm text-rose-500 flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {displayError}
        </p>
      )}

      {!displayError && selectedImage && (
        <p className="mt-2 text-sm text-emerald-500 flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Image ready to upload!
        </p>
      )}
    </div>
  );
}

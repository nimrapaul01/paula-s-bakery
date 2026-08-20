"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

interface SuccessModalProps {
  isOpen: boolean;
  onPlaceAnother: () => void;
}

function ConfettiPiece({
  color,
  style,
}: {
  color: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute pointer-events-none rounded-sm"
      style={{
        width: "8px",
        height: "8px",
        background: color,
        ...style,
      }}
    />
  );
}

const CONFETTI_COLORS = [
  "#f472b6",
  "#ec4899",
  "#f9a8d4",
  "#fbcfe8",
  "#fde68a",
  "#a78bfa",
  "#67e8f9",
  "#6ee7b7",
];

export default function SuccessModal({
  isOpen,
  onPlaceAnother,
}: SuccessModalProps) {
  const [confetti, setConfetti] = useState<
    Array<{
      id: number;
      color: string;
      style: React.CSSProperties;
    }>
  >([]);
  const [sparkles, setSparkles] = useState<number[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    // Generate confetti
    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      style: {
        left: `${Math.random() * 100}%`,
        top: "-20px",
        animation: `confetti-fall ${2 + Math.random() * 3}s ease-in ${
          Math.random() * 2
        }s forwards`,
        transform: `rotate(${Math.random() * 360}deg)`,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        width: `${6 + Math.random() * 8}px`,
        height: `${6 + Math.random() * 8}px`,
      } as React.CSSProperties,
    }));

    setConfetti(pieces);
    setSparkles(Array.from({ length: 6 }, (_, i) => i));

    return () => {
      setConfetti([]);
      setSparkles([]);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(131, 24, 67, 0.4)", backdropFilter: "blur(8px)" }}
    >
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((piece) => (
          <ConfettiPiece key={piece.id} color={piece.color} style={piece.style} />
        ))}
      </div>

      {/* Modal card */}
      <div
        className="relative w-full max-w-md animate-bounce-in"
        style={{
          background: "rgba(255, 255, 255, 0.97)",
          borderRadius: "32px",
          padding: "48px 40px",
          boxShadow:
            "0 25px 80px rgba(236, 72, 153, 0.3), 0 4px 24px rgba(0,0,0,0.08)",
          border: "1px solid rgba(244, 114, 182, 0.3)",
        }}
      >
        {/* Decorative corner accents */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20 pointer-events-none"
          style={{ background: "linear-gradient(135deg, #f9a8d4, #ec4899)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-24 h-24 rounded-tr-full opacity-10 pointer-events-none"
          style={{ background: "linear-gradient(135deg, #fbcfe8, #f472b6)" }}
        />

        {/* Floating sparkles */}
        {sparkles.map((i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              top: `${10 + i * 15}%`,
              left: i % 2 === 0 ? `${5 + i * 3}%` : undefined,
              right: i % 2 !== 0 ? `${5 + i * 3}%` : undefined,
              animation: `sparkle ${1.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z"
                fill="#f9a8d4"
              />
            </svg>
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Icon */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #f472b6, #ec4899)",
              boxShadow: "0 8px 32px rgba(236, 72, 153, 0.4)",
              animation: "pulse-pink 2s ease-in-out infinite",
            }}
          >
            <span className="text-5xl">🎂</span>
          </div>

          {/* Heading */}
          <h2
            className="text-2xl sm:text-3xl font-bold mb-3 leading-tight"
            style={{
              fontFamily: "var(--font-playfair), serif",
              background: "linear-gradient(135deg, #ec4899, #be185d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Thank You for Placing Your Order! 💗
          </h2>

          {/* Message */}
          <p className="text-pink-600/80 text-base leading-relaxed mb-2">
            We&apos;ve received your cake order and can&apos;t wait to create
            something sweet and special for you!
          </p>
          <p className="text-pink-400 text-sm mb-8">
            We&apos;ll be in touch soon to confirm your order details. 🌸
          </p>

          {/* Divider */}
          <hr
            className="divider-pink border-none mb-8"
            style={{ height: "1px" }}
          />

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: "✅", label: "Order Confirmed" },
              { icon: "📸", label: "Image Saved" },
              { icon: "📅", label: "Date Booked" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1 p-3 rounded-2xl"
                style={{
                  background: "rgba(244, 114, 182, 0.08)",
                  border: "1px solid rgba(244, 114, 182, 0.2)",
                }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-medium text-pink-600 text-center leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Button
            size="lg"
            onClick={onPlaceAnother}
            id="place-another-order"
            className="w-full"
          >
            🍰 Place Another Order
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface AboutSectionProps {
  onOrderClick: () => void;
}

function FloatingSparkle({
  style,
  delay,
}: {
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        ...style,
        animation: `sparkle ${2 + delay}s ease-in-out ${delay}s infinite`,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z"
          fill="#f9a8d4"
        />
      </svg>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  delay,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <div
      className="animate-fade-in-up text-center p-6 rounded-3xl"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(244, 114, 182, 0.2)",
        boxShadow: "0 8px 32px rgba(236, 72, 153, 0.08)",
      }}
    >
      <div className="flex justify-center mb-3">{icon}</div>
      <div
        className="text-3xl font-bold mb-1"
        style={{
          fontFamily: "var(--font-playfair), serif",
          background: "linear-gradient(135deg, #ec4899, #be185d)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </div>
      <div className="text-sm text-pink-400 font-medium tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}

export default function AboutSection({ onOrderClick }: AboutSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Trigger on mount too
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen"
    >
      {/* Decorative background blobs */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, #f9a8d4, transparent)" }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #fbcfe8, transparent)" }}
      />

      {/* Floating sparkles */}
      <FloatingSparkle style={{ top: "10%", left: "5%" }} delay={0} />
      <FloatingSparkle style={{ top: "20%", right: "8%" }} delay={0.7} />
      <FloatingSparkle style={{ top: "60%", left: "3%" }} delay={1.3} />
      <FloatingSparkle style={{ bottom: "15%", right: "5%" }} delay={0.4} />
      <FloatingSparkle style={{ top: "80%", left: "15%" }} delay={1.8} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Hero section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
          {/* Left: Text */}
          <div
            className={`flex-1 text-center lg:text-left transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Eyebrow tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(244, 114, 182, 0.1)",
                border: "1px solid rgba(244, 114, 182, 0.3)",
              }}>
              <span className="text-xl">🎂</span>
              <span className="text-sm font-semibold text-pink-500 tracking-widest uppercase">
                Established 2000
              </span>
            </div>

            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{
                fontFamily: "var(--font-playfair), serif",
                background: "linear-gradient(135deg, #ec4899, #be185d, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Paula&apos;s
            </h2>

            <p
              className="text-lg sm:text-xl text-pink-700/80 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Welcome to Paula&apos;s, where every celebration deserves
              something sweet. Since 2000, we&apos;ve been crafting beautiful,
              delicious cakes for life&apos;s most precious moments — made with
              care, creativity, and a little bit of magic. ✨
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={onOrderClick}
                id="about-order-cta"
              >
                🍰 Order Your Dream Cake
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("our-story")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn More ↓
              </Button>
            </div>
          </div>

          {/* Right: Cake image */}
          <div
            className={`flex-shrink-0 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-full animate-float-slow"
                style={{
                  background:
                    "radial-gradient(circle, rgba(249,168,212,0.4) 0%, transparent 70%)",
                  transform: "scale(1.3)",
                }}
              />
              {/* Cake image */}
              <div className="relative w-full h-full animate-float">
                <Image
                  src="/cake-hero.png"
                  alt="Paula's signature celebration cake"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Floating badge - years */}
              <div
                className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-xl animate-wiggle"
                style={{
                  background: "linear-gradient(135deg, #f472b6, #ec4899)",
                }}
              >
                <span className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>25+</span>
                <span className="text-xs leading-none">Years</span>
              </div>

              {/* Floating badge - love */}
              <div
                className="absolute -top-4 -left-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: "white",
                  border: "2px solid rgba(244,114,182,0.3)",
                  animation: "float 3s ease-in-out 1s infinite",
                }}
              >
                <span className="text-2xl">💗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <StatCard
            icon={<span className="text-4xl">🎂</span>}
            value="2000"
            label="Est. Year"
            delay={0}
          />
          <StatCard
            icon={<span className="text-4xl">👩‍🍳</span>}
            value="Nimra Paul"
            label="Owner & Founder"
            delay={100}
          />
          <StatCard
            icon={<span className="text-4xl">💗</span>}
            value="1000+"
            label="Happy Customers"
            delay={200}
          />
        </div>

        {/* Our Story section */}
        <div id="our-story" className="scroll-mt-24">
          <hr className="divider-pink mb-16 border-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Story text */}
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h3
                className="text-3xl sm:text-4xl font-bold mb-6"
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  color: "#be185d",
                }}
              >
                Our Sweet Story
              </h3>
              <div className="space-y-4 text-pink-800/80 leading-relaxed text-base sm:text-lg">
                <p>
                  Paula&apos;s Bakery was born from a deep love for the art of
                  cake making. Founded in 2000 by{" "}
                  <strong className="text-pink-600">Nimra Paul</strong>, what
                  started as a passion project became one of the most beloved
                  custom cake bakeries around.
                </p>
                <p>
                  Every cake we create is a one-of-a-kind masterpiece. From
                  elegant wedding tiers adorned with sugar flowers, to playful
                  birthday cakes bursting with personality — we pour our heart
                  into every detail.
                </p>
                <p>
                  We believe that a cake isn&apos;t just a dessert; it&apos;s
                  the centerpiece of your most treasured memories. Let us make
                  yours unforgettable. 🌸
                </p>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🌸", title: "Handcrafted", desc: "Each cake made with love and precision" },
                { icon: "✨", title: "Custom Design", desc: "Bring your dream cake to life" },
                { icon: "🎀", title: "Premium Quality", desc: "Only the finest ingredients" },
                { icon: "🍒", title: "Made Fresh", desc: "Baked fresh for your special day" },
              ].map((feat, i) => (
                <div
                  key={feat.title}
                  className="p-5 rounded-2xl group hover:scale-105 transition-all duration-300 cursor-default"
                  style={{
                    background: "rgba(255, 255, 255, 0.85)",
                    border: "1px solid rgba(244, 114, 182, 0.2)",
                    boxShadow: "0 4px 16px rgba(236, 72, 153, 0.06)",
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                    {feat.icon}
                  </span>
                  <h4
                    className="font-bold text-pink-700 mb-1"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {feat.title}
                  </h4>
                  <p className="text-xs text-pink-500 leading-snug">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div
            className="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center"
            style={{
              background: "linear-gradient(135deg, #f472b6, #ec4899, #db2777)",
              boxShadow: "0 20px 60px rgba(236, 72, 153, 0.3)",
            }}
          >
            {/* Shimmer overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none rounded-3xl"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            />

            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />

            <div className="relative z-10">
              <p className="text-white/90 text-lg mb-2">Ready to order?</p>
              <h3
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Let&apos;s Create Your Dream Cake 🎂
              </h3>
              <p className="text-white/80 mb-8 max-w-md mx-auto">
                Upload your inspiration, choose your pickup date, and leave the
                rest to us.
              </p>
              <button
                onClick={onOrderClick}
                id="about-order-cta-bottom"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white font-bold text-pink-500 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 cursor-pointer"
              >
                🍰 Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

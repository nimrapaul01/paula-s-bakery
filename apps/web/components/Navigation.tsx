"use client";

import React from "react";

interface NavigationProps {
  activeTab: "about" | "order";
  onTabChange: (tab: "about" | "order") => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <header className="sticky top-0 z-50">
      {/* Glassmorphism navbar */}
      <div
        className="backdrop-blur-xl border-b"
        style={{
          background: "rgba(255, 240, 246, 0.9)",
          borderColor: "rgba(244, 114, 182, 0.2)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo / Brand */}
            <div className="flex items-center gap-2.5">
              {/* Cake icon */}
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
                style={{ background: "linear-gradient(135deg, #f9a8d4, #ec4899)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2C11 2 10.5 3 10.5 3.5C10.5 4 11 4.5 12 4.5C13 4.5 13.5 4 13.5 3.5C13.5 3 13 2 12 2Z" fill="white"/>
                  <path d="M3 9C3 8 3.5 7 5 7H19C20.5 7 21 8 21 9V10H3V9Z" fill="white"/>
                  <path d="M3 11H21V18C21 19.5 20 20 19 20H5C4 20 3 19.5 3 18V11Z" fill="white" opacity="0.7"/>
                  <rect x="3" y="10" width="18" height="2" fill="white"/>
                  <circle cx="8" cy="7" r="1.5" fill="white" opacity="0.8"/>
                  <circle cx="16" cy="7" r="1.5" fill="white" opacity="0.8"/>
                </svg>
              </div>
              <div>
                <h1
                  className="text-xl sm:text-2xl font-bold leading-none"
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    background: "linear-gradient(135deg, #ec4899, #be185d)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Paula&apos;s
                </h1>
                <p className="text-xs text-pink-400 font-medium tracking-widest uppercase">
                  Bakery
                </p>
              </div>
            </div>

            {/* Tab Navigation */}
            <nav className="flex items-center">
              <div
                className="flex rounded-full p-1 gap-1"
                style={{
                  background: "rgba(244, 114, 182, 0.12)",
                  border: "1px solid rgba(244, 114, 182, 0.2)",
                }}
              >
                <button
                  id="nav-about"
                  onClick={() => onTabChange("about")}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 cursor-pointer ${
                    activeTab === "about"
                      ? "text-white shadow-md"
                      : "text-pink-500 hover:text-pink-600 hover:bg-pink-50"
                  }`}
                  style={
                    activeTab === "about"
                      ? {
                          background:
                            "linear-gradient(135deg, #f472b6, #ec4899)",
                          boxShadow: "0 4px 15px rgba(236, 72, 153, 0.4)",
                        }
                      : {}
                  }
                >
                  About
                </button>
                <button
                  id="nav-order"
                  onClick={() => onTabChange("order")}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 cursor-pointer ${
                    activeTab === "order"
                      ? "text-white shadow-md"
                      : "text-pink-500 hover:text-pink-600 hover:bg-pink-50"
                  }`}
                  style={
                    activeTab === "order"
                      ? {
                          background:
                            "linear-gradient(135deg, #f472b6, #ec4899)",
                          boxShadow: "0 4px 15px rgba(236, 72, 153, 0.4)",
                        }
                      : {}
                  }
                >
                  Order Now
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div
        style={{
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #f9a8d4, #ec4899, #f9a8d4, transparent)",
        }}
      />
    </header>
  );
}

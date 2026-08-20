"use client";

import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import OrderSection from "@/components/OrderSection";

type Tab = "about" | "order";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("about");

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    // Smooth scroll to top on tab change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="flex-1">
        <div
          className="transition-all duration-500"
          style={{
            opacity: activeTab === "about" ? 1 : 0,
            display: activeTab === "about" ? "block" : "none",
          }}
        >
          <AboutSection onOrderClick={() => handleTabChange("order")} />
        </div>

        <div
          className="transition-all duration-500"
          style={{
            opacity: activeTab === "order" ? 1 : 0,
            display: activeTab === "order" ? "block" : "none",
          }}
        >
          <OrderSection />
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-6 border-t"
        style={{
          borderColor: "rgba(244,114,182,0.15)",
          background: "rgba(255,240,246,0.6)",
          backdropFilter: "blur(8px)",
        }}
      >
        <p
          className="text-pink-400 text-sm italic mb-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Made with 💗 by Paula&apos;s Bakery
        </p>
        <p className="text-pink-300 text-xs">
          © {new Date().getFullYear()} Paula&apos;s · Est. 2000 · Owned by Nimra Paul
        </p>
      </footer>
    </div>
  );
}

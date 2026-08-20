import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Paula's Bakery — Custom Cakes for Every Celebration",
  description:
    "Paula's Bakery has been creating beautiful, delicious custom cakes since 2000. Order your dream cake today — owned by Nimra Paul.",
  keywords: "custom cakes, bakery, Paula's, celebration cakes, cake order",
  openGraph: {
    title: "Paula's Bakery",
    description: "Custom cakes for every celebration. Est. 2000.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-rose-50">{children}</body>
    </html>
  );
}

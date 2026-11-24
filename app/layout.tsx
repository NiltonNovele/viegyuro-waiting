import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Vieg Yuro — Em breve",
  description:
    "O melhor do streetwear angolano a expandir-se para Moçambique. Deixa o teu email e sê dos primeiros a entrar na loja.",
  icons: { icon: "/logo.png" },
  openGraph: {
    title: "Vieg Yuro — Em breve",
    description: "O melhor do streetwear angolano a expandir-se para Moçambique. Deixa o teu email e sê dos primeiros a entrar na loja.",
    images: ["/logo.png"],
    locale: "pt_MZ",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

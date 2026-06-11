import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://josiedealbuquerque.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Josie de Albuquerque | Desenvolvimento humano",
    template: "%s | Josie de Albuquerque",
  },
  description:
    "Desenvolvimento humano, das pessoas às organizações. Mentoria de autoconhecimento para mulheres e programas de bem-estar organizacional e adequação à NR-1 para empresas.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Josie de Albuquerque",
    description: "Desenvolvimento humano, das pessoas às organizações.",
    url: siteUrl,
    siteName: "Josie de Albuquerque",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

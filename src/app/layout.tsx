import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sofia_Sans } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthProvider } from "@/components/AuthProvider";
import { LanguageProvider } from "@/i18n/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sofiaSans = Sofia_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-sofia-sans",
});

export const metadata: Metadata = {
  title: "Български език за мигранти A1",
  description: "Интерактивен дигитален учебник по български език - ниво A1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sofiaSans.variable} antialiased font-[family-name:var(--font-sofia-sans)]`}
      >
        <LanguageProvider>
          <AuthProvider>
            <AppLayout>{children}</AppLayout>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

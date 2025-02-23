import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { MobileFooter } from "@/components/mobile-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeLingo - Learn Programming",
  description: "Learn programming languages interactively with CodeLingo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen bg-slate-50`}>
        <Navbar />
        <div className="flex pt-16">
          <Sidebar />
          <main className="flex-1 pl-[70px] lg:pl-[70px] pb-[64px] lg:pb-0">
            {children}
          </main>
        </div>
        <MobileFooter />
      </body>
    </html>
  );
}

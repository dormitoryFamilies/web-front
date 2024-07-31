import "./globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "@/components/common/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "기숙사 식구들",
  description: "충북대학교 기숙사 식구들 관리 프로젝트입니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

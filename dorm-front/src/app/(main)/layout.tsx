"use client";

import Header from "@/components/common/Header";
import NavBar from "@/components/common/NavBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="h-[52px]" />
      {children}
      <div className="h-[104px]" />
      <NavBar />
    </div>
  );
}

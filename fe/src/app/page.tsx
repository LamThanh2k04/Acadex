"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const fullText = "Chào mừng đến với ACADEX";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 100); // tốc độ gõ (100ms/ký tự)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#dbeafe] via-[#ede9fe] to-[#ffffff] text-gray-900">

      {/* HEADER */}
      <header className="flex items-center justify-between px-10 py-6 border-b border-gray-300/80 backdrop-blur-sm bg-white/50 sticky top-0 z-50">
        {/* LOGO + TÊN */}
        <div className="flex items-center gap-4 group">
          {/* Logo */}
          <div className="w-14 h-14 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/images/acadex_logo.jpg"
              alt="Acadex logo"
              width={300}
              height={200}
              className="object-contain rounded-3xl drop-shadow-[0_0_12px_rgba(99,102,241,0.4)]"
              priority
            />
          </div>

          {/* Tên */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] transition-all duration-300">
              ACADEX
            </span>
          </h1>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex gap-8 text-[#094067] font-medium">
          <a href="#" className="hover:text-[#5f6c7b] transition-colors">
            Giới thiệu
          </a>
          <a href="#" className="hover:text-[#5f6c7b] transition-colors">
            Tính năng
          </a>
          <a href="#" className="hover:text-[#5f6c7b] transition-colors">
            Liên hệ
          </a>
        </nav>
      </header>


      {/* MAIN */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-wide mb-6">
          {text}
          <span className="animate-pulse">|</span>
        </h1>

        <p className="text-[#094067] text-lg max-w-2xl mb-8 leading-relaxed">
          ACADEX là nền tảng quản lý học tập hiện đại giúp kết nối sinh viên, giảng viên và quản trị viên trong một hệ thống thống nhất.
          Trải nghiệm quy trình học tập – chấm điểm – thống kê dữ liệu được tối ưu và thông minh hơn bao giờ hết.
        </p>

        <Link
          href="/role"
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-1"
        >
          Bắt đầu ngay
        </Link>
      </main>

      {/* FOOTER */}
      <footer className="py-6 text-center border-t border-gray-300/80 backdrop-blur-sm bg-white/50 text-[#094067] text-sm">
        © {new Date().getFullYear()} ACADEX — Hệ thống quản lý học tập thông minh.
      </footer>
    </div>
  );
}

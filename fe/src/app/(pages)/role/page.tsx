"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import BackHeader from "@/app/components/BackHeader/BackHeader";

export default function Role() {
    const [text, setText] = useState("");
    const fullText = "Vui lòng chọn vai trò của bạn";
    const roles = [
        {
            href: "/student-login",
            img: "/images/sinh_vien.png",
            video: "/videos/sinh_vien.mp4",
            title: "Sinh Viên",
            delay: 0.1,
            gradient:
                "from-blue-50/40 to-white/60 hover:from-blue-100/80 hover:to-blue-50/90",
            border: "hover:border-blue-500",
        },
        {
            href: "/admin-login",
            img: "/images/quan_tri_vien.png",
            video: "/videos/quan_tri_vien.mp4",
            title: "Quản trị viên",
            delay: 0.2,
            gradient:
                "from-green-50/40 to-white/60 hover:from-green-100/80 hover:to-green-50/60",
            border: "hover:border-green-500",
        },
        {
            href: "/lecturer-login",
            img: "/images/giang_vien.png",
            video: "/videos/giang_vien.mp4",
            title: "Giảng viên",
            delay: 0.3,
            gradient:
                "from-purple-50/40 to-white/60 hover:from-purple-100/80 hover:to-purple-50/90",
            border: "hover:border-purple-500",
        },
    ];


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
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center relative"
            style={{ backgroundImage: "url('/images/bg_role.jpg')" }}
        >
            {/* Overlay gradient nhẹ để chữ nổi bật */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-white/10" />

            <div className="relative z-10 w-full flex flex-col items-center">
                {/* Header */}
                <header className="w-full p-1">
                    <BackHeader href="/" label="Back" />
                </header>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-12 text-center drop-shadow-md"
                >
                    {text}
                </motion.h1>

                {/* Main content */}
                <main className="flex flex-wrap justify-center gap-10 px-6 mb-16">
                    {roles.map((role, index) => {
                        const [hovered, setHovered] = useState(false);

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: role.delay }}
                            >
                                <Link
                                    href={role.href}
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                    className={`
                    w-72 h-80 rounded-2xl p-6 text-center
                    bg-gradient-to-br ${role.gradient}
                    border-2 border-gray-200 ${role.border}
                    shadow-md transition-all duration-300
                    hover:-translate-y-2 hover:scale-105 hover:shadow-xl
                    flex flex-col justify-between overflow-hidden
                  `}
                                >
                                    <div className=" flex flex-1 items-center justify-center">
                                        {hovered ? (
                                            <video
                                                src={role.video}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-44 h-32 object-contain drop-shadow-sm"
                                            />
                                        ) : (
                                            <img
                                                src={role.img}
                                                alt={role.title}
                                                className="w-44 h-32 object-contain drop-shadow-sm"
                                            />
                                        )}
                                    </div>
                                    <h1 className="text-xl border-none border-white bg-gradient-to-br from-blue-300 to-white text-[#094067] rounded-xl p-2 font-semibold mt-4 drop-shadow-sm">
                                        {role.title}
                                    </h1>
                                </Link>
                            </motion.div>
                        );
                    })}
                </main>
            </div>
        </div>
    );
}

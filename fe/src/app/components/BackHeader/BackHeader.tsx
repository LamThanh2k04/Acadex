"use client";
import { BackHeaderType } from "@/app/common/types/backType";
import Link from "next/link";

export default function BackHeader({
    href = "/role",
    label = "Quay lại",
}: BackHeaderType) {
    return (
        <header className="w-full p-4">
            <Link
                href={href}
                className="text-[#3da9fc] font-semibold hover:text-[#094067] transition duration-300"
            >
                &larr; {label}
            </Link>
        </header>
    );
}

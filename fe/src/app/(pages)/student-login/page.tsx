"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BackHeader from "@/app/components/BackHeader/BackHeader";
import { LoginForm } from '@/app/types/authType';
import { useRouter } from "next/navigation";
export default function StudentLogin() {
    const [toggle, setToggle] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginForm>({ mode: "onChange" });

    const onSubmit = (data: LoginForm) => {
        toast.success("Đăng nhập thành công!");
        console.log("Form Data:", data);
        router.push("/doashboard-student");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-200 via-white to-blue-100">
            {/* Header */}
            <BackHeader href="/role" label="Back" />

            {/* Content */}
            <main className="flex flex-1 flex-col items-center justify-center px-4">
                <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 w-full max-w-md border border-blue-100 hover:shadow-2xl transition duration-300">
                    {/* Avatar & Title */}
                    <div className="flex flex-col items-center gap-3 mb-8">
                        <div className="relative">
                            <img
                                src="/images/sinh_vien.png"
                                alt="lecturer"
                                className="w-40 h-28 object-contain drop-shadow-md"
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-[#094067]">
                            Đăng nhập sinh viên
                        </h1>
                        <p className="text-gray-500 text-sm text-center">
                            Vui lòng nhập thông tin để tiếp tục
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-5 text-gray-700"
                    >
                        {/* Email */}
                        <div>
                            <label className="font-medium mb-1 block">Email</label>
                            <input
                                type="text"
                                placeholder="Nhập email của bạn..."
                                {...register("email", {
                                    required: "Email không được để trống!",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Email không hợp lệ!",
                                    },
                                })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400 transition"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="font-medium mb-1 block">Mật khẩu</label>
                            <input
                                type={toggle ? "text" : "password"}
                                placeholder="********"
                                {...register("password", {
                                    required: "Mật khẩu không được để trống!",
                                    pattern: {
                                        value:
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                                        message:
                                            "8-16 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt!",
                                    },
                                })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400 transition"
                            />
                            <span
                                onClick={() => setToggle(!toggle)}
                                className="absolute right-4 top-10 cursor-pointer text-gray-500 hover:text-blue-500 text-lg transition"
                            >
                                {toggle ? "👁️" : "🙈"}
                            </span>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`w-full mt-3 py-2.5 rounded-lg font-medium text-white transition duration-300 ${isValid
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-gray-300 cursor-not-allowed"
                                }`}
                        >
                            Đăng nhập
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-sm text-gray-500 mt-6 text-center">
                        Bạn chưa có tài khoản?{" "}
                        <a
                            href="#"
                            className="text-blue-500 hover:underline hover:text-blue-600"
                        >
                            Liên hệ quản trị viên
                        </a>
                    </p>
                </div>
            </main>
        </div>
    );
}

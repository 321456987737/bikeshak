"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

export default function AdminSignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    setupKey: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showSetupKey, setShowSetupKey] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "تعذّر إنشاء حساب المسؤول."
        );
        setLoading(false);
        return;
      }

      setSuccess("تم إنشاء الحساب. جارٍ تحويلك إلى صفحة تسجيل الدخول...");

      setTimeout(() => {
        router.replace("/admin/login");
      }, 1000);
    } catch (error) {
      console.error("SIGNUP ERROR:", error);

      setError("حدث خطأ ما. يُرجى المحاولة مرة أخرى.");
      setLoading(false);
    }
  }

  return (
    <main className=" z-[100] overflow-y-auto min-h-screen h-full flex  w-full items-center justify-center  bg-[#f5f5f2] px-5 py-6">
      <div className="w-full max-w-2xl">
        <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.07)] sm:p-8 md:p-9">
          {/* HEADER */}
          <div className="mb-7 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#181818]">
              <span className="text-xs font-bold tracking-tight text-white">
                BS
              </span>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/35">
                BIKESHACK · الإدارة
              </p>

              <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-[#181818] sm:text-3xl">
                إنشاء حساب مسؤول
              </h1>

              <p className="mt-1.5 text-sm text-black/45">
                أنشئ حساب المسؤول الخاص بوكالتك.
              </p>
            </div>
          </div>

          {/* SETUP NOTICE */}
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-black/10 bg-[#fafafa] px-4 py-3.5">
            <KeyRound
              size={16}
              strokeWidth={1.8}
              className="mt-0.5 shrink-0 text-black/40"
            />

            <div>
              <p className="text-xs font-semibold text-black/70">
                إعداد لمرة واحدة
              </p>

              <p className="mt-1 text-[11px] leading-5 text-black/40">
                يلزم إدخال مفتاح الإعداد الخاص لإنشاء حساب المسؤول الأول.
              </p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME + EMAIL */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* NAME */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-black/75"
                >
                  الاسم الكامل
                </label>

                <div className="relative">
                  <UserRound
                    size={17}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="اسم المسؤول"
                    autoComplete="name"
                    required
                    className="h-13 w-full rounded-2xl border border-black/10 bg-[#fafafa] pl-11 pr-4 text-sm text-black outline-none transition placeholder:text-black/25 hover:border-black/20 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.03]"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-black/75"
                >
                  البريد الإلكتروني
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="البريد الإلكتروني للمسؤول"
                    autoComplete="email"
                    required
                    className="h-13 w-full rounded-2xl border border-black/10 bg-[#fafafa] pl-11 pr-4 text-sm text-black outline-none transition placeholder:text-black/25 hover:border-black/20 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.03]"
                  />
                </div>
              </div>
            </div>

            {/* PASSWORD + SETUP KEY */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-black/75"
                >
                  كلمة المرور
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="٨ أحرف على الأقل"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="h-13 w-full rounded-2xl border border-black/10 bg-[#fafafa] pl-11 pr-14 text-sm text-black outline-none transition placeholder:text-black/25 hover:border-black/20 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.03]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-black/35 transition hover:bg-black/[0.05] hover:text-black"
                    aria-label={
                      showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} strokeWidth={1.8} />
                    ) : (
                      <Eye size={17} strokeWidth={1.8} />
                    )}
                  </button>
                </div>
              </div>

              {/* SETUP KEY */}
              <div>
                <label
                  htmlFor="setupKey"
                  className="mb-2 block text-sm font-medium text-black/75"
                >
                  مفتاح الإعداد
                </label>

                <div className="relative">
                  <KeyRound
                    size={17}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                  />

                  <input
                    id="setupKey"
                    name="setupKey"
                    type={showSetupKey ? "text" : "password"}
                    value={form.setupKey}
                    onChange={handleChange}
                    placeholder="أدخل مفتاح الإعداد"
                    required
                    className="h-13 w-full rounded-2xl border border-black/10 bg-[#fafafa] pl-11 pr-14 text-sm text-black outline-none transition placeholder:text-black/25 hover:border-black/20 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.03]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowSetupKey((current) => !current)
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-black/35 transition hover:bg-black/[0.05] hover:text-black"
                    aria-label={
                      showSetupKey
                        ? "إخفاء مفتاح الإعداد"
                        : "إظهار مفتاح الإعداد"
                    }
                  >
                    {showSetupKey ? (
                      <EyeOff size={17} strokeWidth={1.8} />
                    ) : (
                      <Eye size={17} strokeWidth={1.8} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-5 text-green-700">
                {success}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="group flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#181818] px-5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>
                {loading
                  ? "جارٍ إنشاء الحساب..."
                  : "إنشاء حساب مسؤول"}
              </span>

              {!loading && (
                <ArrowRight
                  size={17}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              )}
            </button>
          </form>

          {/* LOGIN */}
          <div className="mt-6 border-t border-black/10 pt-5 text-center">
            <p className="text-sm text-black/45">
              لديك حساب مسؤول بالفعل؟{" "}
              <Link
                href="/admin/login"
                className="font-semibold text-[#181818] underline decoration-black/20 underline-offset-4 hover:decoration-black/60"
              >
                سجّل الدخول
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-black/25">
          إدارة خاصة بالوكالة
        </p>
      </div>
    </main>
  );
}
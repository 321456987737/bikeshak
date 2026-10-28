"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, Mail, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        setLoading(false);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError("حدث خطأ ما. يُرجى المحاولة مرة أخرى.");
      setLoading(false);
    }
  }

  return (
    <main className="z-[100] overflow-y-auto flex min-h-screen h-full w-full items-center justify-center  bg-[#f5f5f2] px-5">
      <div className="w-full max-w-[440px]">
        <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.07)] sm:p-8">
          {/* BRAND */}
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-[#181818]">
              <span className="text-xs font-bold tracking-tight text-white">
                BS
              </span>
            </div>

            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/35">
              BIKESHACK · الإدارة
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#181818]">
              مرحبًا بعودتك
            </h1>

            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-black/45">
              سجّل الدخول لإدارة وكالتك.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="البريد الإلكتروني للمسؤول"
                  autoComplete="email"
                  required
                  className="h-13 w-full rounded-2xl border border-black/10 bg-[#fafafa] pl-11 pr-4 text-sm text-black outline-none transition placeholder:text-black/25 hover:border-black/20 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.03]"
                />
              </div>
            </div>

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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="أدخل كلمة المرور"
                  autoComplete="current-password"
                  required
                  className="h-13 w-full rounded-2xl border border-black/10 bg-[#fafafa] pl-11 pr-14 text-sm text-black outline-none transition placeholder:text-black/25 hover:border-black/20 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.03]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                  }
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-black/35 transition hover:bg-black/[0.05] hover:text-black"
                >
                  {showPassword ? (
                    <EyeOff size={17} strokeWidth={1.8} />
                  ) : (
                    <Eye size={17} strokeWidth={1.8} />
                  )}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700">
                {error}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="group flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#181818] px-5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>{loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}</span>

              {!loading && (
                <ArrowRight
                  size={17}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-7 border-t border-black/10 pt-6 text-center">
            <p className="text-sm text-black/45">
              ليس لديك حساب مسؤول؟{" "}
              <Link
                href="/admin/signup"
                className="font-semibold text-[#181818] underline decoration-black/20 underline-offset-4 transition hover:decoration-black/60"
              >
                أنشئ حسابًا
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-[11px] text-black/25">
          الدخول مخصص لموظفي الوكالة المصرح لهم فقط
        </p>
      </div>
    </main>
  );
}
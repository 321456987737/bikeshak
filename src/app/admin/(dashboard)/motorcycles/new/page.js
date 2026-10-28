import Link from "next/link";
import MotorcycleForm from "@/components/admin/MotorcycleForm";

export default function NewMotorcyclePage() {
  return (
    <div className="mx-auto max-w-5xl md:pb-0 pb-20">
      <div className="mb-8">
        <Link
          href="/admin/motorcycles"
          className="text-sm text-black/45 underline underline-offset-4 transition hover:text-black"
        >
          ← العودة إلى المخزون
        </Link>

        <div className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">
            المخزون
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            إضافة دراجة نارية
          </h1>

          <p className="mt-2 text-sm leading-6 text-black/45">
            أضف دراجة نارية إلى مخزون وكالتك الإلكتروني.
          </p>
        </div>
      </div>

      <MotorcycleForm />
    </div>
  );
}
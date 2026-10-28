
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bike, MapPin, MessageCircle } from "lucide-react";

const waysToGetStarted = [
  {
    id: 1,
    title: "استكشف الدراجات المتوفرة",
    icon: Bike,
    text: "تصفّح الدراجات النارية المتوفرة وقارن بين مواصفاتها وحالتها وأسعارها.",
    category: "دراجات نارية متوفرة",
  },
  {
    id: 2,
    title: "تواصل مع فريقنا",
    icon: MessageCircle,
    text: "تواصل مع BIKESHACK للاستفسار عن أي دراجة نارية أو لترتيب زيارة للمعرض.",
    category: "مساعدة تناسب احتياجك",
  },
  {
    id: 3,
    title: "زر المعرض",
    icon: MapPin,
    text: "تفضل بزيارة BIKESHACK في الرياض، وافتح الخريطة لمعرفة الاتجاهات قبل وصولك.",
    category: "الرياض، المملكة العربية السعودية",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ReviewsSection() {
  return (
    <section className="relative overflow-hidden bg-white text-black">
      <div className="mx-auto max-w-[1800px] px-6 py-20 md:px-10 md:py-24 lg:px-14 lg:py-28">
        {/* HEADER */}
        <div className="mb-14 flex flex-col justify-between gap-8 md:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <motion.p
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="mb-4 font-montserrat text-[9px] font-medium uppercase tracking-[0.35em] text-black/30 md:text-[10px]"
            >
              اعثر على دراجتك المناسبة
            </motion.p>

            <motion.h2
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="font-bebas text-[clamp(4.5rem,9vw,9rem)] leading-[0.8] tracking-[-0.04em] text-black"
            >
              دراجتك القادمة
              <br />
              تبدأ من هنا
            </motion.h2>

            <motion.p
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="mt-6 max-w-md font-montserrat text-[10px] leading-[1.9] tracking-[0.04em] text-black/40 md:text-[11px]"
            >
              استكشف مجموعتنا، أو أرسل استفساراتك، أو خطط لزيارة معرض
              BIKESHACK في الرياض.
            </motion.p>
          </div>

          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group inline-flex w-fit items-center gap-3 border-b border-black/20 pb-2 font-montserrat text-[9px] font-semibold uppercase tracking-[0.16em] transition-colors hover:border-black md:text-[10px]"
          >
            تواصل مع فريقنا
            <ArrowUpRight
              size={14}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </motion.a>
        </div>

        {/* GETTING STARTED */}
        <div className="grid grid-cols-1 border-l border-t border-black/10 sm:grid-cols-2 lg:grid-cols-3">
          {waysToGetStarted.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex min-h-[310px] flex-col border-b border-r border-black/10 p-6 transition-colors duration-300 hover:bg-[#f7f7f5] md:min-h-[340px] md:p-8 lg:p-9"
            >
              <div className="mb-8 flex items-center justify-between">
                <item.icon
                  size={25}
                  strokeWidth={1}
                  className="text-black/20 transition-colors group-hover:text-black"
                />
              </div>

              <h3 className="font-bebas text-3xl tracking-wide md:text-4xl">
                {item.title}
              </h3>

              <p className="mt-4 flex-1 font-montserrat text-[11px] leading-[2] tracking-[0.02em] text-black/65 md:text-xs">
                {item.text}
              </p>

              <div className="mt-9 border-t border-black/10 pt-5">
                <span className="font-montserrat text-[8px] uppercase tracking-[0.1em] text-black/40">
                  {item.category}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* BOTTOM NOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-montserrat text-[9px] leading-[1.8] tracking-[0.04em] text-black/35">
            لديك استفسار؟ تواصل مباشرة مع فريقنا.
          </p>

          <a
            href="/contact"
            className="group inline-flex w-fit items-center gap-2 font-montserrat text-[9px] font-semibold uppercase tracking-[0.14em] hover:text-black/55"
          >
            تواصل معنا
            <ArrowUpRight
              size={13}
              strokeWidth={1.4}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </motion.div>
      </div>

      <div className="h-px w-full bg-black/10" />
    </section>
  );
}

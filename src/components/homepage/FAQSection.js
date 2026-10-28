"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "هل يمكن مشاهدة جميع الدراجات النارية؟",
    answer:
      "يمكنك مشاهدة الدراجات النارية المتوفرة في المعرض. ننصحك بالتواصل مع فريقنا قبل الزيارة للتأكد من توفر الدراجة التي تفضلها وتجهيزها لك.",
  },
  {
    id: 2,
    question: "هل يمكنني حجز تجربة قيادة؟",
    answer:
      "نعم، يمكنك طلب تجربة قيادة للدراجات المؤهلة عبر موقعنا أو بالتواصل مباشرة مع فريقنا. وسنرتب لك موعدًا مناسبًا.",
  },
  {
    id: 3,
    question: "هل تقبلون استبدال الدراجات؟",
    answer:
      "نعم، يمكننا تقييم دراجتك الحالية ضمن عملية الاستبدال. أرسل تفاصيلها إلى فريقنا وسنرشدك خلال خطوات التقييم.",
  },
  {
    id: 4,
    question: "هل توفرون تمويلًا للدراجات النارية؟",
    answer:
      "قد تتوفر خيارات تمويل بحسب الدراجة النارية واحتياجاتك. تواصل مع فريقنا لمناقشة الخيارات المتاحة لشرائك.",
  },
  {
    id: 5,
    question: "هل يمكنني حجز دراجة نارية؟",
    answer:
      "يمكن حجز بعض الدراجات النارية لفترة محدودة. تختلف إمكانية الحجز وشروطه من دراجة لأخرى، لذا تواصل معنا لمعرفة التفاصيل الحالية.",
  },
  {
    id: 6,
    question: "هل توفرون خدمة توصيل الدراجات النارية؟",
    answer:
      "يمكنك مناقشة ترتيبات التوصيل مع فريقنا بحسب الدراجة والوجهة. تواصل معنا لمعرفة خيارات التوصيل المتاحة.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState(1);

  const toggleFAQ = (id) => {
    setOpenId((currentId) => (currentId === id ? null : id));
  };

  return (
    <section className="relative bg-white text-black">
      {/* ======================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="mx-auto max-w-[1800px] px-6 py-20 md:px-10 md:py-24 lg:px-14 lg:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 xl:grid-cols-[0.75fr_1.25fr]">
          {/* ==================================================
              LEFT SIDE
          ================================================== */}

          <div className="lg:sticky lg:top-20 lg:z-10 lg:h-fit">
            {/* EYEBROW */}

            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-4 font-montserrat text-[9px] font-medium uppercase tracking-[0.35em] text-black/30 md:text-[10px]"
            >
              معلومات تهمك
            </motion.p>

            {/* TITLE */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 28,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.6,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-bebas text-[clamp(5rem,10vw,10rem)] leading-[0.78] tracking-[-0.045em] text-black"
            >
              الأسئلة الشائعة
            </motion.h2>

            {/* DESCRIPTION */}

            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.5,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 max-w-sm font-montserrat text-[10px] leading-[1.8] tracking-[0.06em] text-black/40 md:text-[11px]"
            >
              إليك أهم ما تحتاج إلى معرفته قبل اختيار دراجتك النارية القادمة.
              وإذا كان لديك أي استفسار آخر، يسعد فريقنا بمساعدتك.
            </motion.p>
          </div>

          {/* ==================================================
              RIGHT SIDE — FAQ LIST
          ================================================== */}

          <div className="border-t border-black/10">
            {faqs.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.04, 0.2),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-black/10"
                >
                  {/* QUESTION */}

                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    className="group flex w-full cursor-pointer items-center justify-between gap-8 py-6 text-left md:py-7 lg:py-8"
                  >
                    <div className="flex items-start gap-5 md:gap-7">
                      {/* NUMBER */}

                      <span className="pt-1 font-montserrat text-[8px] tracking-[0.2em] text-black/20 md:text-[9px]">
                        {String(faq.id).padStart(2, "0")}
                      </span>

                      {/* QUESTION */}

                      <span
                        className={`font-montserrat text-sm font-medium tracking-[-0.01em] transition-colors duration-300 md:text-[15px] lg:text-base ${
                          isOpen
                            ? "text-black"
                            : "text-black/60 group-hover:text-black"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>

                    {/* ICON */}

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-300 md:h-9 md:w-9 ${
                        isOpen
                          ? "border-black bg-black text-white"
                          : "border-black/15 text-black/50 group-hover:border-black/35 group-hover:text-black"
                      }`}
                    >
                      {isOpen ? (
                        <Minus size={14} strokeWidth={1.3} />
                      ) : (
                        <Plus size={14} strokeWidth={1.3} />
                      )}
                    </span>
                  </button>

                  {/* ANSWER */}

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{
                            y: -8,
                          }}
                          animate={{
                            y: 0,
                          }}
                          exit={{
                            y: -5,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="pb-7 pl-10 pr-12 md:pb-8 md:pl-14 lg:pl-[4.5rem]"
                        >
                          <p className="max-w-2xl font-montserrat text-[10px] leading-[1.9] tracking-[0.04em] text-black/40 md:text-[11px]">
                            {faq.answer}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ======================================================
          BOTTOM ACCENT
      ====================================================== */}

      <div className="h-px w-full bg-black/10" />
    </section>
  );
}

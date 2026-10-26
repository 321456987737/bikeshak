"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import {
  BUSINESS_NAME,
  BUSINESS_PHONE,
  SHOWROOM_DIRECTIONS_URL,
  SHOWROOM_LOCATION,
} from "@/lib/business";

export default function LocationSection() {
  return (
    <section className="relative min-h-[55dvh] overflow-hidden bg-black text-white md:min-h-[65dvh]">
      {/* ==================================================
          BACKGROUND IMAGE
      ================================================== */}

      <div className="absolute inset-0">
        <img
          src="/images/motorcycle/motorcycle1.jpg"
          alt="Motorcycle showroom"
          className="h-full w-full object-cover"
        />
      </div>

      {/* ==================================================
          BLACK TINT
      ================================================== */}

      <div className="absolute inset-0 bg-black/65" />

      {/* ==================================================
          EXTRA GRADIENT
      ================================================== */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/75" />

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className="relative z-10 flex min-h-[55dvh] items-center justify-center px-6 py-20 md:min-h-[65dvh] md:px-10 lg:px-14">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col items-center text-center">
          {/* EYEBROW */}

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
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-6 font-montserrat text-[9px] font-medium uppercase tracking-[0.35em] text-white/55 md:mb-8 md:text-[10px]"
          >
            Visit {BUSINESS_NAME} · {SHOWROOM_LOCATION}
          </motion.p>

          {/* MAIN TITLE */}

          <motion.h2
            initial={{
              opacity: 0,
              y: 35,
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
              duration: 0.7,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-6xl font-bebas text-[clamp(4rem,10vw,10rem)] leading-[0.82] tracking-[-0.045em]"
          >
            A Showroom Experience
          </motion.h2>

          {/* CTA */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-9 md:mt-11"
          >
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/motorcycle"
                className="group inline-flex items-center gap-3 border border-white/35 bg-white px-6 py-3.5 font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-white md:px-7 md:py-4"
              >
                Browse motorcycles
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <a
                href={SHOWROOM_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-white/35 px-6 py-3.5 font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10 md:px-7 md:py-4"
              >
                <MapPin size={15} strokeWidth={1.3} />
                Get directions
              </a>

              <a
                href={`tel:${BUSINESS_PHONE}`}
                className="inline-flex items-center gap-3 border border-white/35 px-6 py-3.5 font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10 md:px-7 md:py-4"
              >
                <Phone size={15} strokeWidth={1.3} />
                Call {BUSINESS_PHONE}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

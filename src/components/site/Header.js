"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useSession } from "next-auth/react";
import {
  Home,
  Bike,
  Wrench,
  Info,
  Phone,
} from "lucide-react";
import Image from "next/image";
const navLinks = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/motorcycle", label: "الدراجات النارية", icon: Bike },
  { href: "/services", label: "خدماتنا", icon: Wrench },
  { href: "/about", label: "من نحن", icon: Info },
  { href: "/contact", label: "تواصل معنا", icon: Phone },
];

const navSpring = {
  type: "spring",
  stiffness: 500,
  damping: 32,
  mass: 0.7,
};

const iconSpring = {
  type: "spring",
  stiffness: 450,
  damping: 25,
};

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;

  console.log(user, "the user");

  const pathname = usePathname();

  const { scrollY } = useScroll();

  const isMotorcycleDetailsPage =
    pathname.startsWith("/motorcycle/") && pathname !== "/motorcycle";

  /* =====================================================
     SCROLL BACKGROUND
  ====================================================== */

  const backgroundColor = useTransform(
    scrollY,
    [0, 40],
    isMotorcycleDetailsPage
      ? ["#181818", "#181818"]
      : ["rgba(24, 24, 24, 0)", "#181818"]
  );

  const borderColor = useTransform(
    scrollY,
    [0, 40],
    isMotorcycleDetailsPage
      ? [
          "rgba(255,255,255,0.10)",
          "rgba(255,255,255,0.10)",
        ]
      : [
          "rgba(255,255,255,0)",
          "rgba(255,255,255,0.10)",
        ]
  );

  /* =====================================================
     ACTIVE NAV
  ====================================================== */

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  return (
    <>
      {/* =====================================================
          DESKTOP HEADER
      ====================================================== */}

      <motion.header
        initial={false}
        style={{
          backgroundColor,
          borderBottomColor: borderColor,
        }}
        className="fixed inset-x-0 top-0 z-50 hidden h-20 border-b text-white md:block"
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-8 px-5 md:px-8">
          {/* Logo */}

          <Link
            href="/"
            aria-label="الصفحة الرئيسية لـ BIKESHACK"
            className="flex shrink-0 items-center gap-3"
          >
            <Image src="/logo.png" alt="شعار BIKESHACK" width={85} height={85} />
            </Link>
          <nav
            aria-label="التنقل الرئيسي"
            className="flex items-center gap-8"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={
                    active ? "page" : undefined
                  }
                  className={`group relative py-1 font-montserrat text-sm transition-colors ${
                    active
                      ? "font-medium text-white"
                      : "text-white/65 hover:text-white"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ease-out ${
                      active
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/motorcycle"
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-[#181818] transition hover:bg-white/90"
            >
              تصفّح الدراجات النارية
            </Link>

            {/* Admin */}

            {session && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-medium text-white transition active:scale-95"
              >
                لوحة الإدارة
              </Link>
            )}
          </div>
        </div>
      </motion.header>

      {/* =====================================================
          MOBILE TOP HEADER
      ====================================================== */}

      <motion.header
        initial={false}
        style={{
          backgroundColor,
          borderBottomColor: borderColor,
        }}
        className="fixed inset-x-0 top-0 z-50 h-[10dvh] min-h-[72px] border-b text-white md:hidden"
      >
        <div className="flex h-full items-center justify-between px-4">
          {/* Logo */}

          <Link
            href="/"
            aria-label="الصفحة الرئيسية لـ BIKESHACK"
            className="flex shrink-0 items-center gap-2.5"
          >
          
          {/* <Link
            href="/"
            aria-label="الصفحة الرئيسية لـ BIKESHACK"
            className="flex shrink-0 items-center gap-3"
          >
            <Image src="/logo.png" alt="شعار BIKESHACK" width={85} height={85} />
            </Link> */}
          </Link>

          {session && (
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-medium text-white transition active:scale-95"
            >
              لوحة الإدارة
            </Link>
          )}
        </div>
      </motion.header>

      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
      ====================================================== */}

      <nav
        aria-label="التنقل عبر الجوال"
        className="fixed  bottom-3 left-3 right-3 z-50 h-[82px] rounded-[22px] border border-white/10 bg-[#181818]/95 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden"
        style={{
          paddingBottom:
            "max(6px, env(safe-area-inset-bottom))",
        }}
      >
        <div className="grid h-full grid-cols-5 px-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.label}
                aria-current={
                  active ? "page" : undefined
                }
                className="group flex h-full min-w-0 flex-col items-center justify-center"
              >
                {/* Icon */}

                <motion.div
                  animate={{
                    y: active ? -2 : 0,
                  }}
                  transition={navSpring}
                  className="relative flex h-11 w-11 shrink-0 items-center justify-center"
                >
                  {/* Active Circle */}

                  {active && (
                    <motion.div
                      layoutId="mobile-nav-active"
                      transition={navSpring}
                      className="absolute inset-0 rounded-full border-2 border-white bg-[#181818] shadow-[0_8px_22px_rgba(0,0,0,0.4)]"
                    />
                  )}

                  {/* Icon */}

                  <motion.div
                    animate={{
                      scale: active ? 1.08 : 1,
                    }}
                    transition={iconSpring}
                    className="relative z-10 flex items-center justify-center"
                  >
                    <Icon
                      size={active ? 22 : 20}
                      strokeWidth={
                        active ? 2 : 1.7
                      }
                      className={`transition-colors duration-200 ${
                        active
                          ? "text-white"
                          : "text-white/40 group-hover:text-white/70"
                      }`}
                    />
                  </motion.div>
                </motion.div>

                {/* Label */}

                <motion.span
                  animate={{
                    y: active ? -2 : 0,
                  }}
                  transition={navSpring}
                  className={`mt-1.5 max-w-[58px] truncate text-center font-montserrat text-[12px] font-medium leading-none transition-colors duration-200 ${
                    active
                      ? "text-white"
                      : "text-white/40 group-hover:text-white/70"
                  }`}
                >
                  {link.label}
                </motion.span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
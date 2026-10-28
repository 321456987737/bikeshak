import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/site/ScrollReveal";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bike,
  Check,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-black">
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative h-[40dvh] min-h-[320px] overflow-hidden bg-[#e8e8e5] md:min-h-[440px]">
        <Image
          src="/images/motorcycle/motorcycle1.jpg"
          alt="دراجة نارية في BIKESHACK"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1800px] items-end px-6 pb-10 md:px-10 md:pb-14 lg:px-14">
          <ScrollReveal className="max-w-4xl" y={20}>
            <p className="mb-4 font-montserrat text-[9px] font-medium uppercase tracking-[0.35em] text-white/55 md:text-[10px]">
              حكاية المعرض
            </p>

            <h1 className="font-bebas text-[clamp(4.5rem,9vw,9rem)] leading-[0.78] tracking-[-0.05em] text-white">
              من نحن
            </h1>

            <p className="mt-6 max-w-lg font-montserrat text-[10px] leading-[1.8] tracking-[0.04em] text-white/55 md:text-[11px]">
              انطلقنا من شغفنا بالدراجات النارية وحرصنا على الجودة، لنجمع
              الدراجين بدراجاتهم المناسبة. من الدراجات المختارة بعناية إلى
              الخدمة الموثوقة، نحرص على أن تكون كل خطوة في رحلتك مميزة.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}

      <section className="border-b border-black/10 bg-[#f7f7f5]">
        <div className="mx-auto max-w-[1800px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
            <ScrollReveal>
              <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/35 md:text-xs">
                من نحن
              </p>

              <h2 className="mt-5 max-w-4xl font-bebas text-5xl leading-[0.95] tracking-wide md:text-7xl lg:text-8xl">
                معرض يجعل تجربتك سهلة
              </h2>
            </ScrollReveal>

            <ScrollReveal className="flex items-end" delay={0.1}>
              <p className="max-w-xl font-montserrat text-sm leading-7 text-black/55 md:text-base md:leading-8">
                BIKESHACK معرض للدراجات النارية في الرياض. استكشف الدراجات
                المتوفرة واطّلع على تفاصيلها، وتواصل مع فريقنا للاستفسار أو
                لترتيب زيارة.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          IMAGE + STORY
      ========================================================= */}

      <section className="bg-white">
        <div className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-24 lg:px-14">
          <div className="grid overflow-hidden border border-black/10 lg:grid-cols-2">
            {/* IMAGE */}
            <ScrollReveal className="relative min-h-[380px] overflow-hidden bg-[#ededeb] md:min-h-[520px]">
              <Image
                src="/images/motorcycle/motorcycle2.jpg"
                alt="دراجة نارية في المعرض"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/5" />

              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                <span className="font-montserrat text-[9px] font-medium uppercase tracking-[0.25em] text-white drop-shadow-md">
                  رؤيتنا
                </span>
              </div>
            </ScrollReveal>

            {/* CONTENT */}
            <ScrollReveal
              className="flex flex-col justify-between bg-[#f3f3f1] p-8 md:p-12 lg:p-16"
              delay={0.12}
            >
              <div>
                <span className="font-bebas text-7xl leading-none text-black/[0.07] md:text-8xl">
                  01
                </span>

                <h2 className="mt-6 max-w-xl font-bebas text-5xl leading-[0.95] tracking-wide md:text-6xl lg:text-7xl">
                  رحلة البحث عن دراجتك لازم تكون سهلة
                </h2>

                <div className="mt-8 max-w-xl space-y-5 font-montserrat text-sm leading-7 text-black/55">
                  <p>
                    العثور على دراجتك النارية القادمة ما يحتاج يكون أمرًا
                    معقدًا. لذلك نحرص على تزويدك بالمعلومات التي تحتاج إليها
                    وتسهيل تواصلك مع فريقنا.
                  </p>

                  <p>
                    تصفّح الدراجات المتوفرة، واستكشف تفاصيل كل دراجة، ورتّب
                    تجربة قيادة، وتحدث مباشرة مع فريق المعرض متى ما كنت جاهزًا.
                  </p>
                </div>
              </div>

              <div className="mt-12 flex items-center gap-3 border-t border-black/10 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white">
                  <ArrowDownRight size={17} strokeWidth={1.5} />
                </div>

                <span className="font-montserrat text-[10px] font-medium uppercase tracking-[0.2em] text-black/45">
                  البساطة في كل التفاصيل
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          OUR APPROACH
      ========================================================= */}

      <section className="border-y border-black/10 bg-[#f7f7f5]">
        <div className="mx-auto max-w-[1800px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            {/* LEFT */}
            <ScrollReveal>
              <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/35 md:text-xs">
                نهجنا
              </p>

              <h2 className="mt-5 font-bebas text-6xl leading-[0.9] tracking-wide md:text-8xl">
                ما
                <br />
                يهمنا
              </h2>

              <p className="mt-7 max-w-sm font-montserrat text-sm leading-7 text-black/50">
                نؤمن أن تجربة المعرض المميزة تبدأ بالوضوح والتواصل الصادق
                والدراجات التي تستحق اهتمامك.
              </p>
            </ScrollReveal>

            {/* RIGHT */}
            <div className="grid border-t border-black/10 md:grid-cols-2">
              <AboutFeature
                number="01"
                icon={Bike}
                title="دراجات نارية بجودة عالية"
                description="نعرض الدراجات المتوفرة لدينا مع التفاصيل التي تساعدك على اتخاذ قرار مناسب."
                delay={0}
              />

              <AboutFeature
                number="02"
                icon={ShieldCheck}
                title="خدمة واضحة ومباشرة"
                description="من استفسارك الأول إلى تجربة القيادة، نحرص على أن تكون خطواتك واضحة ومريحة."
                delay={0.08}
              />

              <AboutFeature
                number="03"
                icon={Users}
                title="اهتمام شخصي"
                description="لكل عميل احتياجاته، وفريقنا هنا ليفهم ما تبحث عنه."
                delay={0.16}
              />

              <AboutFeature
                number="04"
                icon={MapPin}
                title="معرض محلي"
                description="تفضل بزيارتنا واستكشف دراجاتنا وتحدث مباشرة مع فريقنا."
                delay={0.24}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================= */}

      <section className="bg-black text-white">
        <div className="mx-auto max-w-[1800px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <ScrollReveal>
              <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-white/35 md:text-xs">
                لماذا تختارنا؟
              </p>

              <h2 className="mt-5 max-w-lg font-bebas text-6xl leading-[0.9] tracking-wide md:text-8xl">
                تعقيد أقل،
                <br />
                ووضوح أكثر.
              </h2>
            </ScrollReveal>

            <div className="grid gap-10 sm:grid-cols-2">
              <ValueItem
                title="شفافية"
                description="معلومات واضحة عن الدراجات وطريقة سهلة للتواصل معنا."
                delay={0}
              />

              <ValueItem
                title="اهتمام بالعميل"
                description="نخصص الوقت لفهم ما تبحث عنه فعلًا."
                delay={0.08}
              />

              <ValueItem
                title="سهولة وراحة"
                description="استكشف الدراجات عبر الإنترنت قبل زيارة المعرض."
                delay={0.16}
              />

              <ValueItem
                title="قريبون منك"
                description="معرض حقيقي وفريق مستعد لمساعدتك."
                delay={0.24}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}

      <section className="bg-[#f7f7f5] px-6 py-5 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1800px]">
          <div className="relative overflow-hidden bg-[#e9e9e6] px-7 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            {/* DECORATIVE NUMBER */}
            <span className="absolute -bottom-16 -right-4 font-bebas text-[18rem] leading-none tracking-[-0.08em] text-black/[0.035] md:text-[24rem]">
              04
            </span>

            <ScrollReveal className="relative z-10 max-w-3xl">
              <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/35 md:text-xs">
                اعثر على دراجتك النارية القادمة
              </p>

              <h2 className="mt-5 font-bebas text-6xl leading-[0.9] tracking-wide md:text-8xl">
                مستعد للعثور على
                <br />
                دراجتك؟
              </h2>

              <p className="mt-6 max-w-xl font-montserrat text-sm leading-7 text-black/50 md:text-base">
                استكشف مجموعتنا الحالية واكتشف الدراجات النارية المتوفرة لدى
                BIKESHACK.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/motorcycle"
                  className="group inline-flex items-center gap-4 bg-black px-6 py-4 font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/80"
                >
                  تصفّح الدراجات النارية
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-4 border border-black/15 bg-white px-6 py-4 font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:border-black/30"
                >
                  تواصل معنا
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
              </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function AboutFeature({ number, icon: Icon, title, description, delay }) {
  return (
    <ScrollReveal
      className="group border-b border-black/10 p-7 md:p-9 md:first:border-r md:nth-[2]:border-r"
      delay={delay}
      y={18}
    >
      <div className="flex items-start justify-between gap-5">
        <span className="font-bebas text-4xl leading-none text-black/10">
          {number}
        </span>

        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-500 group-hover:border-black/30 group-hover:scale-105">
          <Icon size={19} strokeWidth={1.3} className="text-black/60" />
        </div>
      </div>

      <h3 className="mt-12 font-bebas text-4xl tracking-wide md:text-5xl">
        {title}
      </h3>

      <p className="mt-4 font-montserrat text-sm leading-7 text-black/50">
        {description}
      </p>
    </ScrollReveal>
  );
}

/* =========================================================
   VALUE ITEM
========================================================= */

function ValueItem({ title, description, delay }) {
  return (
    <ScrollReveal className="border-t border-white/10 pt-6" delay={delay} y={18}>
      <div className="flex items-center gap-3">
        <Check size={17} strokeWidth={1.5} className="text-white/50" />

        <h3 className="font-bebas text-3xl tracking-wide md:text-4xl">
          {title}
        </h3>
      </div>

      <p className="mt-4 max-w-sm font-montserrat text-sm leading-7 text-white/45">
        {description}
      </p>
    </ScrollReveal>
  );
}

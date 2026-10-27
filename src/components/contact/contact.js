"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/site/ScrollReveal";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  Bike,
  ExternalLink,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import {
  BUSINESS_NAME,
  BUSINESS_PHONE,
  SHOWROOM_DIRECTIONS_URL,
  SHOWROOM_LOCATION,
  SHOWROOM_MAP_EMBED_URL,
  SHOWROOM_MAP_URL,
} from "@/lib/business";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const motorcycleId = searchParams.get("motorcycle");

  const [motorcycle, setMotorcycle] = useState(null);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      if (!motorcycleId) {
        setMotorcycle(null);
        return;
      }

      try {
        const response = await fetch(
          `/api/motorcycle/${encodeURIComponent(motorcycleId)}`,
          { cache: "no-store" },
        );

        if (!response.ok) return;

        const result = await response.json();

        if (cancelled || !result.success) return;

        const selectedMotorcycle = result.data?.motorcycle;

        if (!selectedMotorcycle) return;

        setMotorcycle(selectedMotorcycle);

        setForm((current) => ({
          ...current,
          message:
            current.message ||
            `Hello, I'm interested in the ${selectedMotorcycle.year} ${selectedMotorcycle.make} ${selectedMotorcycle.model} motorcycle. Please send me more information.`,
        }));
      } catch (loadError) {
        if (!cancelled) {
          console.error("Contact page load error:", loadError);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [motorcycleId]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          motorcycleId: motorcycleId || null,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send inquiry.");
      }

      setSuccess(
        `Thank you for contacting ${BUSINESS_NAME}. Your inquiry has been received, and our team will get back to you.`,
      );

      setForm({
        customerName: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (submitError) {
      setError(
        submitError.message || "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-black">
      {/* HERO */}

      <section className="relative h-[40dvh] min-h-[320px] overflow-hidden bg-[#e8e8e5] md:min-h-[440px]">
        <Image
          src="/images/motorcycle/motorcycle1.jpg"
          alt="Motorcycle at BIKESHACK"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1800px] items-end px-6 pb-10 md:px-10 md:pb-14 lg:px-14">
          <ScrollReveal className="max-w-4xl" y={20}>
            <p className="mb-4 font-montserrat text-[9px] font-medium uppercase tracking-[0.35em] text-white/65 md:text-[10px]">
              We are here to help
            </p>

            <h1 className="font-bebas text-[clamp(4.5rem,9vw,9rem)] leading-[0.78] tracking-[-0.05em] text-white">
              Contact Us
            </h1>

            <p className="mt-6 max-w-lg font-montserrat text-[10px] leading-[1.8] tracking-[0.04em] text-white/65 md:text-[11px]">
              Have a question about a motorcycle? Our team is here to help
              you explore your options, learn more about our inventory, and
              take the next step towards your next ride. Call us or send us
              an inquiry today.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* INTRO */}

      <section className="border-b border-black/10 bg-[#f7f7f5]">
        <div className="mx-auto max-w-[1800px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
            <ScrollReveal>
              <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/40 md:text-xs">
                Contact BIKESHACK
              </p>

              <h2 className="mt-5 max-w-4xl font-bebas text-5xl leading-[0.95] tracking-wide md:text-7xl lg:text-8xl">
                Questions?
                <br />
                We are here.
              </h2>
            </ScrollReveal>

            <ScrollReveal className="flex items-end" delay={0.1}>
              <p className="max-w-xl font-montserrat text-sm leading-7 text-black/60 md:text-base md:leading-8">
                Looking for your next motorcycle, need more information
                about a model, or want to arrange a showroom visit? Get in
                touch with our team. We are here to answer your questions
                and help you find the right ride.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CONTACT DETAILS + INQUIRY FORM */}

      <section className="bg-white">
        <div className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-24 lg:px-14">
          <div className="grid gap-0 border border-black/10 lg:grid-cols-[0.75fr_1.25fr] ">
            {/* CONTACT INFORMATION */}

            <ScrollReveal className="bg-[#f3f3f1] p-7 md:p-10 lg:p-12 ">
              <div className="sticky top-25">
                
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
                    Contact details
                  </p>

                  <h3 className="mt-3 font-bebas text-4xl tracking-wide md:text-5xl">
                    Reach us
                  </h3>
                </div>

                <span className="font-bebas text-7xl leading-none text-black/[0.06]">
                  01
                </span>
              </div>

              <div className="mt-10 space-y-0">
                <ContactInfo
                  icon={Phone}
                  label="Call us"
                  value={BUSINESS_PHONE}
                  href={`tel:${BUSINESS_PHONE}`}
                  delay={0}
                />

                <ContactInfo
                  icon={MapPin}
                  label="Showroom"
                  value={`${BUSINESS_NAME}, ${SHOWROOM_LOCATION}`}
                  href={SHOWROOM_MAP_URL}
                  delay={0.08}
                />
              </div>

              <div className="mt-8 border-t border-black/10 pt-7">
                <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.2em] text-black/40">
                  Need directions?
                </p>

                <a
                  href={SHOWROOM_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex items-center gap-3 font-montserrat text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:text-black/55"
                >
                  Open Google Maps
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
              
              </div>
            </ScrollReveal>

            {/* INQUIRY FORM */}

            <ScrollReveal
              className="bg-white p-7 md:p-10 lg:p-14"
              delay={0.12}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/40">
                    Send an inquiry
                  </p>

                  <h3 className="mt-3 font-bebas text-4xl tracking-wide md:text-5xl">
                    Tell us what you need.
                  </h3>

                  <p className="mt-3 max-w-lg font-montserrat text-xs leading-6 text-black/50 md:text-sm">
                    Fill in your details and tell us how we can help.
                    Our team will get back to you.
                  </p>
                </div>

                <span className="hidden font-bebas text-7xl leading-none text-black/[0.05] sm:block">
                  02
                </span>
              </div>

              {/* SELECTED MOTORCYCLE */}

              {motorcycle && (
                <div className="mt-10 overflow-hidden border border-black/10 bg-[#f3f3f1]">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative h-52 w-full shrink-0 sm:h-36 sm:w-52">
                      {motorcycle.images?.[0]?.url ? (
                        <Image
                          src={motorcycle.images[0].url}
                          alt={`${motorcycle.make} ${motorcycle.model}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 208px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-black/[0.04]">
                          <Bike
                            size={32}
                            strokeWidth={1}
                            className="text-black/30"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-center p-5">
                      <p className="font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-black/40">
                        Your motorcycle inquiry
                      </p>

                      <h4 className="mt-2 font-bebas text-3xl tracking-wide">
                        {motorcycle.make} {motorcycle.model}
                      </h4>

                      <p className="mt-1 font-montserrat text-xs text-black/50">
                        {motorcycle.year} · {motorcycle.currency}{" "}
                        {new Intl.NumberFormat("en-US").format(
                          motorcycle.price,
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SUCCESS MESSAGE */}

              {success && (
                <div
                  role="status"
                  className="mt-8 border border-green-200 bg-green-50 px-5 py-4"
                >
                  <p className="font-montserrat text-sm leading-6 text-green-700">
                    {success}
                  </p>
                </div>
              )}

              {/* ERROR MESSAGE */}

              {error && (
                <div
                  role="alert"
                  className="mt-8 border border-red-200 bg-red-50 px-5 py-4"
                >
                  <p className="font-montserrat text-sm leading-6 text-red-700">
                    {error}
                  </p>
                </div>
              )}

              {/* FORM */}

              <form onSubmit={handleSubmit} className="mt-10 space-y-7">
                <div>
                  <label
                    htmlFor="customerName"
                    className="mb-2 block font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-black/55"
                  >
                    Full name
                  </label>

                  <input
                    id="customerName"
                    name="customerName"
                    type="text"
                    autoComplete="name"
                    value={form.customerName}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="Your full name"
                    className="h-14 w-full border-b border-black/15 bg-transparent px-1 font-montserrat text-sm outline-none transition-colors placeholder:text-black/30 focus:border-black"
                  />
                </div>

                <div className="grid gap-7 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-black/55"
                    >
                      Phone number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      maxLength={30}
                      placeholder="Your phone number"
                      className="h-14 w-full border-b border-black/15 bg-transparent px-1 font-montserrat text-sm outline-none transition-colors placeholder:text-black/30 focus:border-black"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-black/55"
                    >
                      Email{" "}
                      <span className="font-normal text-black/35">
                        (optional)
                      </span>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      maxLength={150}
                      placeholder="you@example.com"
                      className="h-14 w-full border-b border-black/15 bg-transparent px-1 font-montserrat text-sm outline-none transition-colors placeholder:text-black/30 focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-black/55"
                  >
                    How can we help?
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    maxLength={2000}
                    rows={6}
                    placeholder="Tell us which motorcycle you're interested in or ask us a question..."
                    className="w-full resize-y border-b border-black/15 bg-transparent px-1 py-3 font-montserrat text-sm leading-7 outline-none transition-colors placeholder:text-black/30 focus:border-black"
                  />

                  <p className="mt-2 text-right font-montserrat text-[10px] text-black/35">
                    {form.message.length}/2000
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex w-full items-center justify-between gap-4 bg-black px-6 py-5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>{submitting ? "Sending..." : "Send inquiry"}</span>

                  <Send
                    size={17}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <p className="font-montserrat text-[10px] leading-5 text-black/40">
                  Your information will be used to respond to your inquiry.
                </p>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SHOWROOM LOCATION */}

      <section
        id="location"
        className="bg-[#f7f7f5] px-6 py-16 md:px-10 md:py-24 lg:px-14"
      >
        <div className="mx-auto max-w-[1800px]">
          <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
            <ScrollReveal>
              <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/40 md:text-xs">
                Find us
              </p>

              <h2 className="mt-4 font-bebas text-5xl leading-[0.9] tracking-wide md:text-7xl lg:text-8xl">
                Visit {BUSINESS_NAME}.
                <br />
                Let&apos;s get you riding.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <p className="max-w-xl font-montserrat text-sm leading-7 text-black/60 md:justify-self-end md:text-base md:leading-8">
                Looking for your next motorcycle? Visit {BUSINESS_NAME} in{" "}
                {SHOWROOM_LOCATION} to explore our motorcycles, ask questions,
                and speak with our team about finding the right ride.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid overflow-hidden border border-black/10 bg-white lg:grid-cols-[0.8fr_1.2fr]">
            {/* LOCATION DETAILS */}

            <ScrollReveal className="flex flex-col justify-between bg-[#181818] p-7 text-white md:p-10 lg:p-14">
              <div>
                <div className="flex h-12 w-12 items-center justify-center border border-white/15">
                  <MapPin size={21} strokeWidth={1.3} />
                </div>

                <p className="mt-8 font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-white/45">
                  Our location
                </p>

                <h3 className="mt-4 font-bebas text-5xl tracking-wide md:text-6xl">
                  {BUSINESS_NAME}
                </h3>

                <p className="mt-3 font-montserrat text-sm leading-7 text-white/65">
                  {SHOWROOM_LOCATION}
                </p>

                <div className="mt-8 border-t border-white/15 pt-6">
                  <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
                    Phone
                  </p>

                  <a
                    href={`tel:${BUSINESS_PHONE}`}
                    className="mt-3 inline-flex items-center gap-3 font-montserrat text-base transition-colors hover:text-white/65"
                  >
                    <Phone size={16} strokeWidth={1.4} />
                    {BUSINESS_PHONE}
                  </a>
                </div>

                <div className="mt-6 border-t border-white/15 pt-6">
                  <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
                    Map coordinates
                  </p>

                  <p className="mt-3 font-montserrat text-sm text-white/65">
                    24.6093008, 46.7638595
                  </p>
                </div>
              </div>

              <a
                href={SHOWROOM_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 inline-flex w-full items-center justify-between gap-4 bg-white px-5 py-5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:bg-white/85"
              >
                Get directions

                <ExternalLink
                  size={17}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </ScrollReveal>

            {/* EMBEDDED GOOGLE MAP */}

            <ScrollReveal
              className="min-h-[350px] bg-[#e8e8e5] md:min-h-[480px] lg:min-h-[600px]"
              delay={0.12}
            >
              <iframe
                src={SHOWROOM_MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  minHeight: "350px",
                  display: "block",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${BUSINESS_NAME} showroom location in ${SHOWROOM_LOCATION}`}
                className="min-h-[350px] md:min-h-[480px] lg:min-h-[600px]"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="bg-black px-6 py-5 text-white md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1800px]">
          <div className="relative overflow-hidden px-7 py-16 md:px-12 md:py-24 lg:px-16">
            <span className="pointer-events-none absolute -bottom-16 -right-4 font-bebas text-[18rem] leading-none tracking-[-0.08em] text-white/[0.035] md:text-[24rem]">
              03
            </span>

            <ScrollReveal className="relative z-10 max-w-3xl">
              <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-white/45 md:text-xs">
                Your next motorcycle
              </p>

              <h2 className="mt-5 font-bebas text-6xl leading-[0.9] tracking-wide md:text-8xl">
                Still looking?
                <br />
                Find your next ride.
              </h2>

              <p className="mt-6 max-w-xl font-montserrat text-sm leading-7 text-white/55 md:text-base">
                Explore our motorcycles and discover a ride that
                matches your style. Have questions? Our team is ready
                to help.
              </p>

              <Link
                href="/motorcycle"
                className="group mt-9 inline-flex items-center gap-5 bg-white px-6 py-4 font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:bg-white/90"
              >
                Browse motorcycles

                <ArrowUpRight
                  size={17}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 bg-black px-6 pb-8 text-white md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1800px] flex-col justify-between gap-4 pt-8 sm:flex-row">
          <p className="font-montserrat text-[10px] uppercase tracking-[0.15em] text-white/35">
            © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
          </p>

          <a
            href={SHOWROOM_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-montserrat text-[10px] uppercase tracking-[0.15em] text-white/45 transition-colors hover:text-white"
          >
            {SHOWROOM_LOCATION}
            <ExternalLink size={12} strokeWidth={1.4} />
          </a>
        </div>
      </footer>
    </main>
  );
}

/* CONTACT INFORMATION ITEM */

function ContactInfo({ icon: Icon, label, value, href, delay = 0 }) {
  const isExternal = href?.startsWith("https://");

  const content = (
    <div className="group flex gap-4 border-b border-black/10 py-5 first:pt-0 last:border-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-black/10 bg-white transition-colors duration-300 group-hover:border-black/30">
        <Icon
          size={17}
          strokeWidth={1.3}
          className="text-black/60"
        />
      </div>

      <div className="min-w-0">
        <p className="font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-black/40">
          {label}
        </p>

        <p className="mt-2 break-words font-montserrat text-sm font-medium">
          {value || "Not provided"}
        </p>
      </div>

      {href && (
        <ArrowUpRight
          size={16}
          strokeWidth={1.3}
          className="ml-auto shrink-0 text-black/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      )}
    </div>
  );

  return (
    <ScrollReveal delay={delay} y={16}>
      {href ? (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="block"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </ScrollReveal>
  );
}

// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import ScrollReveal from "@/components/site/ScrollReveal";
// import { useSearchParams } from "next/navigation";
// import {
//   ArrowUpRight,
//   Bike,
//   ExternalLink,
//   Mail,
//   MapPin,
//   Phone,
//   Send,
// } from "lucide-react";

// export default function ContactPage() {
//   const searchParams = useSearchParams();

//   const motorcycleId = searchParams.get("motorcycle");

//   const [motorcycle, setMotorcycle] = useState(null);

//   const [form, setForm] = useState({
//     customerName: "",
//     phone: "",
//     email: "",
//     message: "",
//   });

//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function loadData() {
//       try {
//         if (motorcycleId) {
//           const motorcycleResponse = await fetch(
//             `/api/motorcycle/${motorcycleId}`,
//             {
//             cache: "no-store",
//             },
//           );

//           if (motorcycleResponse.ok) {
//             const motorcycleResult = await motorcycleResponse.json();

//             if (motorcycleResult.success) {
//               const selectedMotorcycle = motorcycleResult.data.motorcycle;

//               setMotorcycle(selectedMotorcycle);

//               setForm((current) => ({
//                 ...current,
//                 message:
//                   current.message ||
//                   `Hello, I'm interested in the ${selectedMotorcycle.year} ${selectedMotorcycle.make} ${selectedMotorcycle.model} motorcycle. Please send me more information.`,
//               }));
//             }
//           }
//         }
//       } catch (loadError) {
//         console.error("Contact page load error:", loadError);
//       }
//     }

//     loadData();
//   }, [motorcycleId]);

//   function handleChange(event) {
//     const { name, value } = event.target;

//     setForm((current) => ({
//       ...current,
//       [name]: value,
//     }));
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();

//     setSubmitting(true);
//     setSuccess("");
//     setError("");

//     try {
//       const response = await fetch("/api/inquiries", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...form,
//           motorcycleId: motorcycleId || null,
//         }),
//       });

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(
//           result.message || "Failed to send inquiry"
//         );
//       }

//       setSuccess(
//         "Your demo inquiry has been submitted successfully."
//       );

//       setForm({
//         customerName: "",
//         phone: "",
//         email: "",
//         message: "",
//       });
//     } catch (submitError) {
//       setError(
//         submitError.message ||
//           "Something went wrong. Please try again."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (

//     <main className="min-h-screen bg-[#f7f7f5] text-black">
//       {/* =========================================================
//           HERO
//       ========================================================= */}

//       <section className="relative h-[40dvh] min-h-[320px] overflow-hidden bg-[#e8e8e5] md:min-h-[440px]">
//         <Image
//           src={"/images/motorcycle/motorcycle1.jpg"}
//           alt="Demo motorcycle contact page"
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover"
//         />

//         <div className="absolute inset-0 bg-black/25" />

//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

//         <div className="relative z-10 mx-auto flex h-full max-w-[1800px] items-end px-6 pb-10 md:px-10 md:pb-14 lg:px-14">
//           <ScrollReveal className="max-w-4xl" y={20}>
//             <p className="mb-4 font-montserrat text-[9px] font-medium uppercase tracking-[0.35em] text-white/55 md:text-[10px]">
//               We are here to help
//             </p>

//             <h1 className="font-bebas text-[clamp(4.5rem,9vw,9rem)] leading-[0.78] tracking-[-0.05em] text-white">
//               Contact Us
//             </h1>

//             <p className="mt-6 max-w-lg font-montserrat text-[10px] leading-[1.8] tracking-[0.04em] text-white/55 md:text-[11px]">
//               Have a question about a motorcycle or need help finding the right
//               ride? Get in touch with our team. We are here to answer your
//               questions, guide your choices, and help you take the next step in
//               your riding journey.
//             </p>
//           </ScrollReveal>
//         </div>
//       </section>

//       {/* =========================================================
//           INTRO
//       ========================================================= */}

//       <section className="border-b border-black/10 bg-[#f7f7f5]">
//         <div className="mx-auto max-w-[1800px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
//           <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
//             <ScrollReveal>
//               <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/35 md:text-xs">
//                 Contact us
//               </p>

//               <h2 className="mt-5 max-w-4xl font-bebas text-5xl leading-[0.95] tracking-wide md:text-7xl lg:text-8xl">
//                 Questions?
//                 <br />
//                 We are here.
//               </h2>
//             </ScrollReveal>

//             <ScrollReveal className="flex items-end" delay={0.1}>
//               <p className="max-w-xl font-montserrat text-sm leading-7 text-black/55 md:text-base md:leading-8">
//                 Have a question about a motorcycle, want to arrange a visit,
//                 schedule a test drive or simply need more information? Send us
//                 a message and our team will get back to you.
//               </p>
//             </ScrollReveal>
//           </div>
//         </div>
//       </section>

//       {/* =========================================================
//           CONTACT + FORM
//       ========================================================= */}

//       <section className="bg-white">
//         <div className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-24 lg:px-14">
//           <div className="grid gap-0 border border-black/10 lg:grid-cols-[0.75fr_1.25fr]">
//             {/* =====================================================
//                 LEFT INFORMATION
//             ===================================================== */}

//             <ScrollReveal className="bg-[#f3f3f1] p-7 md:p-10 lg:p-12">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/35">
//                     Contact details
//                   </p>

//                   <h3 className="mt-3 font-bebas text-4xl tracking-wide md:text-5xl">
//                     Reach us
//                   </h3>
//                 </div>

//                 <span className="font-bebas text-7xl leading-none text-black/[0.06]">
//                   01
//                 </span>
//               </div>

//               <div className="mt-10 space-y-0">
//                 <ContactInfo
//                   icon={Phone}
//                   label="Phone"
//                   value="00000000"
//                   delay={0}
//                 />

//                 <ContactInfo
//                   icon={Mail}
//                   label="Email"
//                   value="hello@example.com"
//                   href="mailto:hello@example.com"
//                   delay={0.08}
//                 />

//                 <ContactInfo
//                   icon={MapPin}
//                   label="Address"
//                   value={
//                     "Demo showroom address"
//                   }
//                   delay={0.16}
//                 />
//               </div>

//             </ScrollReveal>

//             {/* =====================================================
//                 FORM
//             ===================================================== */}

//             <ScrollReveal
//               className="bg-white p-7 md:p-10 lg:p-14"
//               delay={0.12}
//             >
//               <div className="flex items-start justify-between gap-6">
//                 <div>
//                   <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/35">
//                     Send an inquiry
//                   </p>

//                   <h3 className="mt-3 font-bebas text-4xl tracking-wide md:text-5xl">
//                     Tell us what you need.
//                   </h3>
//                 </div>

//                 <span className="hidden font-bebas text-7xl leading-none text-black/[0.05] sm:block">
//                   02
//                 </span>
//               </div>

//               {/* VEHICLE INQUIRY */}
//               {motorcycle && (
//                 <div className="mt-10 overflow-hidden border border-black/10 bg-[#f3f3f1]">
//                   <div className="flex flex-col sm:flex-row">
//                     <div className="relative h-52 w-full shrink-0 sm:h-36 sm:w-52">
//                       {motorcycle.images?.[0]?.url ? (
//                         <Image
//                           src={motorcycle.images[0].url}
//                           alt={`${motorcycle.make} ${motorcycle.model}`}
//                           fill
//                           sizes="(max-width: 640px) 100vw, 208px"
//                           className="object-cover"
//                         />
//                       ) : (
//                         <div className="flex h-full w-full items-center justify-center bg-black/[0.04]">
//                           <Bike
//                             size={32}
//                             strokeWidth={1}
//                             className="text-black/20"
//                           />
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex flex-1 flex-col justify-center p-5">
//                       <p className="font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-black/35">
//                         Motorcycle inquiry
//                       </p>

//                       <h4 className="mt-2 font-bebas text-3xl tracking-wide">
//                         {motorcycle.make} {motorcycle.model}
//                       </h4>

//                       <p className="mt-1 font-montserrat text-xs text-black/45">
//                         {motorcycle.year} · {motorcycle.currency}{" "}
//                         {new Intl.NumberFormat("en-US").format(
//                           motorcycle.price
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {success && (
//                 <div className="mt-8 border border-green-200 bg-green-50 px-5 py-4">
//                   <p className="font-montserrat text-sm leading-6 text-green-700">
//                     {success}
//                   </p>
//                 </div>
//               )}

//               {error && (
//                 <div className="mt-8 border border-red-200 bg-red-50 px-5 py-4">
//                   <p className="font-montserrat text-sm leading-6 text-red-700">
//                     {error}
//                   </p>
//                 </div>
//               )}

//               <form
//                 onSubmit={handleSubmit}
//                 className="mt-10 space-y-7"
//               >
//                 {/* NAME */}
//                 <div>
//                   <label
//                     htmlFor="customerName"
//                     className="mb-2 block font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50"
//                   >
//                     Full name
//                   </label>

//                   <input
//                     id="customerName"
//                     name="customerName"
//                     value={form.customerName}
//                     onChange={handleChange}
//                     required
//                     maxLength={100}
//                     placeholder="John Smith"
//                     className="h-14 w-full border-b border-black/15 bg-transparent px-1 font-montserrat text-sm outline-none placeholder:text-black/25 transition-colors focus:border-black"
//                   />
//                 </div>

//                 {/* PHONE + EMAIL */}
//                 <div className="grid gap-7 sm:grid-cols-2">
//                   <div>
//                     <label
//                       htmlFor="phone"
//                       className="mb-2 block font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50"
//                     >
//                       Phone
//                     </label>

//                     <input
//                       id="phone"
//                       name="phone"
//                       type="tel"
//                       value={form.phone}
//                       onChange={handleChange}
//                       required
//                       maxLength={30}
//                       placeholder="00000000"
//                       className="h-14 w-full border-b border-black/15 bg-transparent px-1 font-montserrat text-sm outline-none placeholder:text-black/25 transition-colors focus:border-black"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="mb-2 block font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50"
//                     >
//                       Email
//                       <span className="ml-1 font-normal text-black/30">
//                         (optional)
//                       </span>
//                     </label>

//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={form.email}
//                       onChange={handleChange}
//                       maxLength={150}
//                       placeholder="john@example.com"
//                       className="h-14 w-full border-b border-black/15 bg-transparent px-1 font-montserrat text-sm outline-none placeholder:text-black/25 transition-colors focus:border-black"
//                     />
//                   </div>
//                 </div>

//                 {/* MESSAGE */}
//                 <div>
//                   <label
//                     htmlFor="message"
//                     className="mb-2 block font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50"
//                   >
//                     Message
//                   </label>

//                   <textarea
//                     id="message"
//                     name="message"
//                     value={form.message}
//                     onChange={handleChange}
//                     required
//                     maxLength={2000}
//                     rows={6}
//                     placeholder="How can we help?"
//                     className="w-full resize-none border-b border-black/15 bg-transparent px-1 py-3 font-montserrat text-sm leading-7 outline-none placeholder:text-black/25 transition-colors focus:border-black"
//                   />
//                 </div>

//                 {/* SUBMIT */}
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="group inline-flex w-full items-center justify-between bg-black px-6 py-5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   <span>
//                     {submitting ? "Sending..." : "Send message"}
//                   </span>

//                   <Send
//                     size={17}
//                     strokeWidth={1.4}
//                     className="transition-transform duration-300 group-hover:translate-x-1"
//                   />
//                 </button>
//               </form>
//             </ScrollReveal>
//           </div>
//         </div>
//       </section>



//       {/* =========================================================
//           LOCATION
//       ========================================================= */}

//       <section className="bg-[#f7f7f5] px-6 py-16 md:px-10 md:py-24 lg:px-14">
//         <div className="mx-auto grid max-w-[1800px] overflow-hidden border border-black/10 bg-white lg:grid-cols-[0.7fr_1.3fr]">
//           <ScrollReveal className="flex flex-col justify-center bg-[#181818] p-7 text-white md:p-10 lg:p-14">
//             <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-white/35">
//               Demo location
//             </p>

//             <h2 className="mt-5 max-w-lg font-bebas text-5xl leading-[0.92] tracking-wide md:text-7xl">
//               Showroom details
//               <br />
//               go here.
//             </h2>

//             <p className="mt-6 max-w-sm font-montserrat text-sm leading-7 text-white/60">
//               This area is placeholder content for the demo website. Add a verified showroom address and map before launch.
//             </p>
//             <Link
//               href="https://www.google.com/maps/place/Bike+shak/@24.6093008,46.7612846,757m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e2f09005ebcd62f:0x7413e373c571c9c!8m2!3d24.6093008!4d46.7638595!16s%2Fg%2F11vm8kqtlm?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-6 inline-flex items-center gap-2 font-montserrat text-sm font-semibold uppercase tracking-[0.2em] text-white/60 hover:text-white"
//             >
//               Open in Google Maps
//               <ExternalLink size={16} strokeWidth={1.4} />
//             </Link>
//           </ScrollReveal>

//           <ScrollReveal
//             className="flex min-h-[320px] items-center justify-center bg-[#e8e8e5] p-8 text-center md:min-h-[420px]"
//             delay={0.12}
//           >
//             <iframe
//   src="https://maps.google.com/maps?q=24.6093008,46.7638595&z=15&output=embed"
//   width="100%"
//   height="450"
//   style={{ border: 0 }}
//   allowFullScreen
//   loading="lazy"
//   referrerPolicy="no-referrer-when-downgrade"
//   title="Bike Shak Riyadh Location"
// />
//           </ScrollReveal>
//         </div>
//       </section>

//       {/* =========================================================
//           FINAL CTA
//       ========================================================= */}

//       <section className="bg-black px-6 py-5 text-white md:px-10 lg:px-14">
//         <div className="mx-auto max-w-[1800px]">
//           <div className="relative overflow-hidden px-7 py-16 md:px-12 md:py-24 lg:px-16">
//             {/* DECORATIVE NUMBER */}
//             <span className="absolute -bottom-16 -right-4 font-bebas text-[18rem] leading-none tracking-[-0.08em] text-white/[0.035] md:text-[24rem]">
//               03
//             </span>

//             <ScrollReveal className="relative z-10 max-w-3xl">
//               <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-white/35 md:text-xs">
//                 Your next motorcycle
//               </p>

//               <h2 className="mt-5 font-bebas text-6xl leading-[0.9] tracking-wide md:text-8xl">
//                 Still looking?
//                 <br />
//                 Explore our motorcycles.
//               </h2>

//               <p className="mt-6 max-w-xl font-montserrat text-sm leading-7 text-white/45 md:text-base">
//                 Take a look at our current motorcycles and find something that
//                 catches your eye.
//               </p>

//               <Link
//                 href="/motorcycle"
//                 className="group mt-9 inline-flex items-center gap-5 bg-white px-6 py-4 font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:bg-white/90"
//               >
//                 Browse motorcycles

//                 <ArrowUpRight
//                   size={17}
//                   strokeWidth={1.4}
//                   className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//                 />
//               </Link>
//             </ScrollReveal>
//           </div>
//         </div>
//       </section>

//       {/* =========================================================
//           FOOTER
//       ========================================================= */}

//       <footer className="border-t border-white/10 bg-black px-6 pb-8 text-white md:px-10 lg:px-14">
//         <div className="mx-auto flex max-w-[1800px] flex-col justify-between gap-4 pt-8 sm:flex-row">
//           <p className="font-montserrat text-[10px] uppercase tracking-[0.15em] text-white/25">
//             © {new Date().getFullYear()} Demo Auto · Demo website
//           </p>

//           <p className="font-montserrat text-[10px] uppercase tracking-[0.15em] text-white/25">
//             All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </main>
//   );
// }
// /* =========================================================
//    CONTACT INFO
// ========================================================= */

// function ContactInfo({
//   icon: Icon,
//   label,
//   value,
//   href,
//   delay,
// }) {
//   const content = (
//     <div className="group flex gap-4 border-b border-black/10 py-5 first:pt-0 last:border-0">
//       <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-black/10 bg-white transition-all duration-300 group-hover:border-black/25">
//         <Icon
//           size={17}
//           strokeWidth={1.3}
//           className="text-black/55"
//         />
//       </div>

//       <div className="min-w-0">
//         <p className="font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-black/35">
//           {label}
//         </p>

//         <p className="mt-2 break-words font-montserrat text-sm font-medium">
//           {value || "Not provided"}
//         </p>
//       </div>

//       {href && (
//         <ArrowUpRight
//           size={16}
//           strokeWidth={1.3}
//           className="ml-auto shrink-0 text-black/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//         />
//       )}
//     </div>
//   );

//   if (!value || !href) {
//     return (
//       <ScrollReveal delay={delay} y={16}>
//         {content}
//       </ScrollReveal>
//     );
//   }

//   return (
//     <ScrollReveal delay={delay} y={16}>
//       <a
//         href={href}
//         target={
//           href.startsWith("https://")
//             ? "_blank"
//             : undefined
//         }
//         rel={
//           href.startsWith("https://")
//             ? "noopener noreferrer"
//             : undefined
//         }
//         className="block"
//       >
//         {content}
//       </a>
//     </ScrollReveal>
//   );
// }












// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import {
//   ArrowUpRight,
//   CarFront,
//   Mail,
//   MapPin,
//   Phone,
//   Send,
// } from "lucide-react";

// export default function ContactPage() {
//   const searchParams = useSearchParams();

//   const motorcycleId = searchParams.get("motorcycle");

//   const [motorcycle, setMotorcycle] = useState(null);

//   const [form, setForm] = useState({
//     customerName: "",
//     phone: "",
//     email: "",
//     message: "",
//   });

//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function loadData() {
//       try {
//         if (motorcycleId) {
//           const carResponse = await fetch(`/api/motorcycles/${motorcycleId}`, {
//             cache: "no-store",
//           });

//           if (carResponse.ok) {
//             const carResult = await carResponse.json();

//             if (carResult.success) {
//               const selectedMotorcycle = carResult.data.motorcycle;

//               setMotorcycle(selectedMotorcycle);

//               setForm((current) => ({
//                 ...current,
//                 message:
//                   current.message ||
//                   `Hello, I'm interested in the ${selectedMotorcycle.year} ${selectedMotorcycle.make} ${selectedMotorcycle.model}. Please send me more information about this motorcycle.`,
//               }));
//             }
//           }
//         }
//       } catch (loadError) {
//         console.error("Contact page load error:", loadError);
//       }
//     }

//     loadData();
//   }, [motorcycleId]);

//   function handleChange(event) {
//     const { name, value } = event.target;

//     setForm((current) => ({
//       ...current,
//       [name]: value,
//     }));
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();

//     setSubmitting(true);
//     setSuccess("");
//     setError("");

//     try {
//       const response = await fetch("/api/inquiries", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...form,
//           motorcycleId: motorcycleId || null,
//         }),
//       });

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(
//           result.message || "Failed to send inquiry"
//         );
//       }

//       setSuccess(
//         "Your demo inquiry has been submitted successfully."
//       );

//       setForm({
//         customerName: "",
//         phone: "",
//         email: "",
//         message: "",
//       });
//     } catch (submitError) {
//       setError(
//         submitError.message ||
//           "Something went wrong. Please try again."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
    
//     <main className="min-h-screen bg-[#f7f7f5] text-black">
//       {/* =========================================================
//           HERO
//       ========================================================= */}

//       <section className="relative h-[40dvh] min-h-[320px] overflow-hidden bg-[#e8e8e5] md:min-h-[440px]">
//         <Image
//           src={business?.heroImage || "/images/motorcycles/car1.jpg"}
//           alt="Demo motorcycle contact page"
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover"
//         />

//         <div className="absolute inset-0 bg-black/25" />

//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

//         <div className="relative z-10 mx-auto flex h-full max-w-[1800px] items-end px-6 pb-10 md:px-10 md:pb-14 lg:px-14">
//           <div className="max-w-5xl">
//             <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-white/65 md:text-xs">
//               Get in touch
//             </p>

//             <h1 className="mt-3 font-bebas text-6xl leading-[0.9] tracking-wide text-white md:text-8xl lg:text-9xl">
//               Let us talk
//               <br />
//               about your next motorcycle.
//             </h1>
//           </div>
//         </div>
//       </section>

//       {/* =========================================================
//           INTRO
//       ========================================================= */}

//       <section className="border-b border-black/10 bg-[#f7f7f5]">
//         <div className="mx-auto max-w-[1800px] px-6 py-20 md:px-10 md:py-28 lg:px-14">
//           <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
//             <div>
//               <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/35 md:text-xs">
//                 Contact us
//               </p>

//               <h2 className="mt-5 max-w-4xl font-bebas text-5xl leading-[0.95] tracking-wide md:text-7xl lg:text-8xl">
//                 Questions?
//                 <br />
//                 We are here.
//               </h2>
//             </div>

//             <div className="flex items-end">
//               <p className="max-w-xl font-montserrat text-sm leading-7 text-black/55 md:text-base md:leading-8">
//                 Have a question about a motorcycle, want to arrange a visit,
//                 schedule a test drive or simply need more information? Send us
//                 a message and our team will get back to you.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* =========================================================
//           CONTACT + FORM
//       ========================================================= */}

//       <section className="bg-white">
//         <div className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-24 lg:px-14">
//           <div className="grid gap-0 border border-black/10 lg:grid-cols-[0.75fr_1.25fr]">
//             {/* =====================================================
//                 LEFT INFORMATION
//             ===================================================== */}

//             <div className="bg-[#f3f3f1] p-7 md:p-10 lg:p-12">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/35">
//                     Contact details
//                   </p>

//                   <h3 className="mt-3 font-bebas text-4xl tracking-wide md:text-5xl">
//                     Reach us
//                   </h3>
//                 </div>

//                 <span className="font-bebas text-7xl leading-none text-black/[0.06]">
//                   01
//                 </span>
//               </div>

//               <div className="mt-10 space-y-0">
//                 <ContactInfo
//                   icon={Phone}
//                   label="Phone"
//                   value="00000000"
//                 />

//                 <ContactInfo
//                   icon={Mail}
//                   label="Email"
//                   value="hello@example.com"
//                   href="mailto:hello@example.com"
//                 />

//                 <ContactInfo
//                   icon={MapPin}
//                   label="Address"
//                   value={
//                     "Demo showroom address"
//                   }
//                 />
//               </div>

//             </div>

//             {/* =====================================================
//                 FORM
//             ===================================================== */}

//             <div className="bg-white p-7 md:p-10 lg:p-14">
//               <div className="flex items-start justify-between gap-6">
//                 <div>
//                   <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/35">
//                     Send an inquiry
//                   </p>

//                   <h3 className="mt-3 font-bebas text-4xl tracking-wide md:text-5xl">
//                     Tell us what you need.
//                   </h3>
//                 </div>

//                 <span className="hidden font-bebas text-7xl leading-none text-black/[0.05] sm:block">
//                   02
//                 </span>
//               </div>

//               {/* VEHICLE INQUIRY */}
//               {motorcycle && (
//                 <div className="mt-10 overflow-hidden border border-black/10 bg-[#f3f3f1]">
//                   <div className="flex flex-col sm:flex-row">
//                     <div className="relative h-52 w-full shrink-0 sm:h-36 sm:w-52">
//                       {motorcycle.images?.[0]?.url ? (
//                         <Image
//                           src={motorcycle.images[0].url}
//                           alt={`${motorcycle.make} ${motorcycle.model}`}
//                           fill
//                           sizes="(max-width: 640px) 100vw, 208px"
//                           className="object-cover"
//                         />
//                       ) : (
//                         <div className="flex h-full w-full items-center justify-center bg-black/[0.04]">
//                           <CarFront
//                             size={32}
//                             strokeWidth={1}
//                             className="text-black/20"
//                           />
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex flex-1 flex-col justify-center p-5">
//                       <p className="font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-black/35">
//                         Motorcycle inquiry
//                       </p>

//                       <h4 className="mt-2 font-bebas text-3xl tracking-wide">
//                         {motorcycle.make} {motorcycle.model}
//                       </h4>

//                       <p className="mt-1 font-montserrat text-xs text-black/45">
//                         {motorcycle.year} · {motorcycle.currency}{" "}
//                         {new Intl.NumberFormat("en-US").format(
//                           motorcycle.price
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {success && (
//                 <div className="mt-8 border border-green-200 bg-green-50 px-5 py-4">
//                   <p className="font-montserrat text-sm leading-6 text-green-700">
//                     {success}
//                   </p>
//                 </div>
//               )}

//               {error && (
//                 <div className="mt-8 border border-red-200 bg-red-50 px-5 py-4">
//                   <p className="font-montserrat text-sm leading-6 text-red-700">
//                     {error}
//                   </p>
//                 </div>
//               )}

//               <form
//                 onSubmit={handleSubmit}
//                 className="mt-10 space-y-7"
//               >
//                 {/* NAME */}
//                 <div>
//                   <label
//                     htmlFor="customerName"
//                     className="mb-2 block font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50"
//                   >
//                     Full name
//                   </label>

//                   <input
//                     id="customerName"
//                     name="customerName"
//                     value={form.customerName}
//                     onChange={handleChange}
//                     required
//                     maxLength={100}
//                     placeholder="John Smith"
//                     className="h-14 w-full border-b border-black/15 bg-transparent px-1 font-montserrat text-sm outline-none placeholder:text-black/25 transition-colors focus:border-black"
//                   />
//                 </div>

//                 {/* PHONE + EMAIL */}
//                 <div className="grid gap-7 sm:grid-cols-2">
//                   <div>
//                     <label
//                       htmlFor="phone"
//                       className="mb-2 block font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50"
//                     >
//                       Phone
//                     </label>

//                     <input
//                       id="phone"
//                       name="phone"
//                       type="tel"
//                       value={form.phone}
//                       onChange={handleChange}
//                       required
//                       maxLength={30}
//                       placeholder="00000000"
//                       className="h-14 w-full border-b border-black/15 bg-transparent px-1 font-montserrat text-sm outline-none placeholder:text-black/25 transition-colors focus:border-black"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="mb-2 block font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50"
//                     >
//                       Email
//                       <span className="ml-1 font-normal text-black/30">
//                         (optional)
//                       </span>
//                     </label>

//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={form.email}
//                       onChange={handleChange}
//                       maxLength={150}
//                       placeholder="john@example.com"
//                       className="h-14 w-full border-b border-black/15 bg-transparent px-1 font-montserrat text-sm outline-none placeholder:text-black/25 transition-colors focus:border-black"
//                     />
//                   </div>
//                 </div>

//                 {/* MESSAGE */}
//                 <div>
//                   <label
//                     htmlFor="message"
//                     className="mb-2 block font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50"
//                   >
//                     Message
//                   </label>

//                   <textarea
//                     id="message"
//                     name="message"
//                     value={form.message}
//                     onChange={handleChange}
//                     required
//                     maxLength={2000}
//                     rows={6}
//                     placeholder="How can we help?"
//                     className="w-full resize-none border-b border-black/15 bg-transparent px-1 py-3 font-montserrat text-sm leading-7 outline-none placeholder:text-black/25 transition-colors focus:border-black"
//                   />
//                 </div>

//                 {/* SUBMIT */}
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="group inline-flex w-full items-center justify-between bg-black px-6 py-5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   <span>
//                     {submitting ? "Sending..." : "Send message"}
//                   </span>

//                   <Send
//                     size={17}
//                     strokeWidth={1.4}
//                     className="transition-transform duration-300 group-hover:translate-x-1"
//                   />
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>


   
//       {/* =========================================================
//           LOCATION
//       ========================================================= */}

//       <section className="bg-[#f7f7f5] px-6 py-16 md:px-10 md:py-24 lg:px-14">
//         <div className="mx-auto grid max-w-[1800px] overflow-hidden border border-black/10 bg-white lg:grid-cols-[0.7fr_1.3fr]">
//           <div className="flex flex-col justify-center bg-[#181818] p-7 text-white md:p-10 lg:p-14">
//             <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-white/35">
//               Demo location
//             </p>

//             <h2 className="mt-5 max-w-lg font-bebas text-5xl leading-[0.92] tracking-wide md:text-7xl">
//               Showroom details
//               <br />
//               go here.
//             </h2>

//             <p className="mt-6 max-w-sm font-montserrat text-sm leading-7 text-white/60">
//               This area is placeholder content for the demo website. Add a verified showroom address and map before launch.
//             </p>
//           </div>

//           <div className="flex min-h-[320px] items-center justify-center bg-[#e8e8e5] p-8 text-center md:min-h-[420px]">
//             <div>
//               <MapPin size={28} strokeWidth={1.2} className="mx-auto text-black/35" />
//               <p className="mt-4 font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-black/45">
//                 Demo map placeholder
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* =========================================================
//           FINAL CTA
//       ========================================================= */}

//       <section className="bg-black px-6 py-5 text-white md:px-10 lg:px-14">
//         <div className="mx-auto max-w-[1800px]">
//           <div className="relative overflow-hidden px-7 py-16 md:px-12 md:py-24 lg:px-16">
//             {/* DECORATIVE NUMBER */}
//             <span className="absolute -bottom-16 -right-4 font-bebas text-[18rem] leading-none tracking-[-0.08em] text-white/[0.035] md:text-[24rem]">
//               03
//             </span>

//             <div className="relative z-10 max-w-3xl">
//               <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-white/35 md:text-xs">
//                 Your next motorcycle
//               </p>

//               <h2 className="mt-5 font-bebas text-6xl leading-[0.9] tracking-wide md:text-8xl">
//                 Still looking?
//                 <br />
//                 Explore our inventory.
//               </h2>

//               <p className="mt-6 max-w-xl font-montserrat text-sm leading-7 text-white/45 md:text-base">
//                 Take a look at our current motorcycles and find something that
//                 catches your eye.
//               </p>

//               <Link
//                 href="/motorcycles"
//                 className="group mt-9 inline-flex items-center gap-5 bg-white px-6 py-4 font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:bg-white/90"
//               >
//                 Browse inventory

//                 <ArrowUpRight
//                   size={17}
//                   strokeWidth={1.4}
//                   className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//                 />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* =========================================================
//           FOOTER
//       ========================================================= */}

//       <footer className="border-t border-white/10 bg-black px-6 pb-8 text-white md:px-10 lg:px-14">
//         <div className="mx-auto flex max-w-[1800px] flex-col justify-between gap-4 pt-8 sm:flex-row">
//           <p className="font-montserrat text-[10px] uppercase tracking-[0.15em] text-white/25">
//             © {new Date().getFullYear()} Demo Auto · Demo website
//           </p>

//           <p className="font-montserrat text-[10px] uppercase tracking-[0.15em] text-white/25">
//             All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </main>
//   );
// }

// /* =========================================================
//    CONTACT INFO
// ========================================================= */

// function ContactInfo({
//   icon: Icon,
//   label,
//   value,
//   href,
// }) {
//   const content = (
//     <div className="group flex gap-4 border-b border-black/10 py-5 first:pt-0 last:border-0">
//       <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-black/10 bg-white transition-all duration-300 group-hover:border-black/25">
//         <Icon
//           size={17}
//           strokeWidth={1.3}
//           className="text-black/55"
//         />
//       </div>

//       <div className="min-w-0">
//         <p className="font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-black/35">
//           {label}
//         </p>

//         <p className="mt-2 break-words font-montserrat text-sm font-medium">
//           {value || "Not provided"}
//         </p>
//       </div>

//       {href && (
//         <ArrowUpRight
//           size={16}
//           strokeWidth={1.3}
//           className="ml-auto shrink-0 text-black/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//         />
//       )}
//     </div>
//   );

//   if (!value || !href) {
//     return content;
//   }

//   return (
//     <a
//       href={href}
//       target={
//         href.startsWith("https://")
//           ? "_blank"
//           : undefined
//       }
//       rel={
//         href.startsWith("https://")
//           ? "noopener noreferrer"
//           : undefined
//       }
//       className="block"
//     >
//       {content}
//     </a>
//   );
// }

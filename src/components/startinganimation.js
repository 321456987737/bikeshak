"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BikeStartup({
  brand = "BIKESHACK",
  duration = 1800,
}) {
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setLeaving(true);
    }, Math.max(0, duration - 500));

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration]);

  if (!visible) return null;

  return (
    <motion.div
      role="status"
      aria-label={`جارٍ تحميل ${brand}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#0b0b0b] text-white"
      style={{ pointerEvents: leaving ? "none" : "auto" }}
    >
      <div className="flex flex-col items-center px-6 text-center">
        {/* LOGO WITH BLACK BOX REVEAL */}
        <div className="relative w-44 sm:w-52">
          <Image
            src="/logo.png"
            alt=""
            width={512}
            height={512}
            priority
            className="block h-auto w-full"
          />

          {/* Black box slides upward to reveal the logo */}
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: "-110%" }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute inset-0 z-10 bg-[#0b0b0b]"
          />
        </div>

        {/* RED LINE EXPANDS FROM THE CENTER */}
        <motion.div
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          animate={{
            scaleX: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.45,
            delay: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-7 h-[2px] w-28 origin-center bg-red-500 sm:w-36"
        />

        {/* BIKESHACK BRAND NAME REVEAL */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 14,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.95,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-5 font-montserrat text-xl font-semibold uppercase tracking-[0.32em] text-white sm:text-2xl"
        >
          {brand}
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 1.15,
          }}
          className="mt-3 font-montserrat text-[9px] font-medium uppercase tracking-[0.3em] text-white/45"
        >
          دراجات نارية وإكسسوارات مميزة
        </motion.p>
      </div>
    </motion.div>
  );
}
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";

// export default function BikeStartup({
//   brand = "BIKESHACK",
//   duration = 1800,
// }) {
//   const [started, setStarted] = useState(false);
//   const [leaving, setLeaving] = useState(false);
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const frame = requestAnimationFrame(() => {
//       setStarted(true);
//     });

//     const fadeTimer = setTimeout(() => {
//       setLeaving(true);
//     }, Math.max(0, duration - 300));

//     const removeTimer = setTimeout(() => {
//       setVisible(false);
//     }, duration);

//     return () => {
//       cancelAnimationFrame(frame);
//       clearTimeout(fadeTimer);
//       clearTimeout(removeTimer);
//     };
//   }, [duration]);

//   if (!visible) return null;

//   return (
//     <div
//       role="status"
//       aria-label={`${brand} loading`}
//       className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#0b0b0b] text-white transition-opacity duration-500 motion-reduce:transition-none ${
//         leaving
//           ? "pointer-events-none opacity-0"
//           : "opacity-100"
//       }`}
//     >
//       <div className="flex flex-col items-center px-6 text-center">
//         <div
//           className={`transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
//             started
//               ? "scale-100 opacity-100"
//               : "scale-95 opacity-0"
//           }`}
//         >
//           <Image
//             src="/logo.png"
//             alt=""
//             width={512}
//             height={512}
//             className="h-auto w-44 sm:w-52"
//           />
//         </div>

//         <div
//           className={`mt-7 h-px w-20 origin-center bg-red-500 transition-[transform,opacity] duration-700 delay-200 ease-out motion-reduce:transition-none ${
//             started
//               ? "scale-x-100 opacity-100"
//               : "scale-x-0 opacity-0"
//           }`}
//         />

//         <p
//           className={`mt-4 text-[9px] font-medium uppercase tracking-[0.32em] text-white/55 transition-opacity duration-500 delay-300 motion-reduce:transition-none ${
//             started ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           Preparing your experience
//         </p>
//       </div>
//     </div>
//   );
// }
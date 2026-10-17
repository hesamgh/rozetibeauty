"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  align?: "center" | "right";
}

export default function SectionHeading({
  badge,
  title,
  description,
  className = "",
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-right";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 sm:mb-16 ${alignClass} ${className}`}
    >
      <span className="section-badge mb-4">{badge}</span>
      <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold mt-4 mb-4 leading-tight tracking-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`text-charcoal/60 text-base sm:text-lg leading-relaxed max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

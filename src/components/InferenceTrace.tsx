"use client";

import type { FiredRule } from "@/lib/types";
import { motion, type Variants } from "framer-motion";

interface InferenceTraceProps {
  firedRules: FiredRule[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export default function InferenceTrace({ firedRules }: InferenceTraceProps) {
  return (
    <motion.section
      aria-label="Inference trace"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex w-full flex-col gap-2"
    >
      <h2 className="text-sm font-bold text-text">Inference trace</h2>
      <motion.ol variants={containerVariants} className="flex w-full flex-col gap-2">
        {firedRules.map((fired) => (
          <motion.li
            key={fired.rule.id}
            variants={cardVariants}
            className="rounded-md border border-border border-l-4 border-l-fired bg-surface px-3 py-2.5 shadow-xs"
          >
            <p className="font-mono text-xs font-semibold text-text break-words">
              Rule {fired.rule.id} → <span className="text-fired">{fired.conclusion}</span>
            </p>
            <p className="mt-1 text-xs text-text-muted break-words">
              {fired.rule.description}
              <span className="ml-2 inline-block rounded bg-accent-dim px-1.5 py-0.5 font-mono text-[10px] text-text">
                iteration {fired.iterationNumber}
              </span>
            </p>
          </motion.li>
        ))}
      </motion.ol>
    </motion.section>
  );
}

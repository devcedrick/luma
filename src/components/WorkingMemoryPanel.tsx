"use client";

import type { Fact } from "@/lib/types";
import { motion, type Variants } from "framer-motion";

interface WorkingMemoryPanelProps {
  facts: Fact[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export default function WorkingMemoryPanel({ facts }: WorkingMemoryPanelProps) {
  return (
    <section aria-label="Working memory" className="flex w-full flex-col gap-2">
      <h2 className="text-sm font-bold text-text">Working memory</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex w-full flex-row flex-wrap gap-1.5"
      >
        {facts.map((fact) => (
          <motion.span
            key={fact}
            variants={chipVariants}
            className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-xs text-text shadow-xs"
          >
            {fact}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}

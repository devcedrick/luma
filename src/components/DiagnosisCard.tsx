"use client";

import { motion } from "framer-motion";

interface DiagnosisCardProps {
  recommendation: string;
}

export default function DiagnosisCard({ recommendation }: DiagnosisCardProps) {
  return (
    <motion.section
      aria-label="Diagnosis"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
      className="w-full rounded-xl border border-conclusion/60 border-l-4 border-l-conclusion bg-surface p-5 sm:p-6 shadow-xs"
    >
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-conclusion" />
        <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
          Clinical Recommendation
        </h2>
      </div>
      <p className="mt-2 text-lg font-bold tracking-tight text-conclusion sm:text-xl break-words">
        {recommendation}
      </p>
    </motion.section>
  );
}

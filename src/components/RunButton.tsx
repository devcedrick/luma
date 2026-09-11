"use client";

import { motion } from "framer-motion";

interface RunButtonProps {
  onRun: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function RunButton({
  onRun,
  isLoading,
  disabled = false,
}: RunButtonProps) {
  const busy = isLoading || disabled;

  return (
    <motion.button
      type="button"
      onClick={onRun}
      disabled={busy}
      whileTap={busy ? undefined : { scale: 0.99 }}
      className="w-full rounded-lg bg-accent px-4 py-3 text-sm font-bold text-bg transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span
            aria-hidden
            className="h-4 w-4 animate-spin rounded-full border-2 border-bg border-t-transparent"
          />
          Running inference…
        </span>
      ) : (
        "Run Inference"
      )}
    </motion.button>
  );
}

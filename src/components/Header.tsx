"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HeaderProps {
  onOpenAbout: () => void;
}

export default function Header({ onOpenAbout }: HeaderProps) {
  return (
    <header className="w-full border-b border-border bg-surface/50 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative rounded-xl border border-border bg-surface p-5 sm:p-6 shadow-xs"
        >
          <div className="relative flex flex-col gap-4">
            {/* Top row: Brand mascot mark, title, tag, and About trigger */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface shadow-xs">
                  <Image
                    src="/app-mascot.png"
                    alt="Luma App Mascot"
                    width={40}
                    height={40}
                    sizes="32px"
                    priority
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
                      Luma
                    </h1>
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                      Expert System
                    </span>
                  </div>
                  <p className="text-xs font-medium text-text-muted">
                    Rule-Based Forward-Chaining Inference Engine
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenAbout}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-text transition-colors hover:border-accent hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <span>About</span>
              </button>
            </div>

            {/* Academic purpose banner text (exact C-6 copy) */}
            <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-bg/40 p-3.5 sm:p-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent mt-0.5 shadow-xs">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                This application is submitted as Laboratory Activity #2 for Intelligent
                Systems. It is an academic exercise and is not intended for real
                medical diagnosis or use.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

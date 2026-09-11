"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {

  // Close on Escape key press and lock background scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-surface text-text shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h2 id="about-dialog-title" className="text-lg font-bold tracking-tight text-text">
                  About Luma
                </h2>
                <p className="text-xs text-text-muted">
                  Rule-Based Forward-Chaining Expert System
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition-colors hover:border-border/80 hover:bg-surface/80 hover:text-text focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 text-sm text-text-muted">
              <section className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
                  Overview & Architecture
                </h3>
                <p className="text-xs leading-relaxed">
                  Luma is an automated reasoning engine that applies classic forward-chaining inference over a defined production rule base. Given observation parameters, it iteratively fires matching antecedent conditions to derive intermediate and terminal facts until reaching a deductive fixpoint.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
                  Engine Specifications
                </h3>
                <div className="divide-y divide-border/60 rounded-lg border border-border bg-bg/40 font-mono text-xs">
                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3">
                    <span className="text-text font-medium">Knowledge Base</span>
                    <span className="sm:col-span-2 text-text-muted">12 deterministic production rules (Rules 1–12)</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3">
                    <span className="text-text font-medium">Inference Strategy</span>
                    <span className="sm:col-span-2 text-text-muted">Pure forward chaining to fixpoint (&Delta;WorkingMemory = &empty;)</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3">
                    <span className="text-text font-medium">Observations</span>
                    <span className="sm:col-span-2 text-text-muted">6 raw inputs (temperature, nasal state, 4 symptoms)</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3">
                    <span className="text-text font-medium">Terminal Derivation</span>
                    <span className="sm:col-span-2 text-text-muted">Disease and prescription conclusion precedence</span>
                  </div>
                </div>
              </section>

              <section className="space-y-2 rounded-lg border border-border/80 bg-bg/50 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text">
                  Academic Disclaimer & Attribution
                </h3>
                <p className="text-xs leading-relaxed text-text">
                  Developed by <span className="font-semibold text-text">Ken Cedrick Jimeno</span> for Intelligent Systems Laboratory Activity #2.
                </p>
                <p className="text-xs leading-relaxed text-text-muted">
                  This application is submitted as Laboratory Activity #2 for Intelligent Systems. It is an academic exercise and is not intended for real medical diagnosis or use.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-border bg-surface/80 px-6 py-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-xs font-medium text-text transition-colors hover:border-accent hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

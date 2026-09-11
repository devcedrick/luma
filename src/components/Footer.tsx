export default function Footer() {
  return (
    <footer className="w-full border-t border-border/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-4 py-6 text-center">
        <p className="text-sm text-text">
          Luma — Rule-Based Expert System · Laboratory Activity #2, Intelligent
          Systems
        </p>
        <p className="text-xs text-text-muted">
          Developed by{" "}
          <span className="font-semibold text-text">
            Ken Cedrick Jimeno
          </span>{" "}
          · Not for medical use.
        </p>
      </div>
    </footer>
  );
}

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
    <button
      type="button"
      onClick={onRun}
      disabled={busy}
      className="w-full rounded-md bg-accent px-4 py-3 text-base font-bold text-bg disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span
            aria-hidden
            className="h-4 w-4 animate-spin rounded-full border-2 border-bg border-t-transparent"
          />
          Running…
        </span>
      ) : (
        "Run Inference"
      )}
    </button>
  );
}

import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-4 pt-8 pb-2">
        <div className="flex flex-row items-center gap-3">
          <Image
            src="/app-mascot.png"
            alt="Luma App Mascot"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <h1 className="text-3xl font-bold tracking-tight text-text">
            Luma
          </h1>
        </div>
        <p className="text-sm text-text-muted">
          This application is submitted as Laboratory Activity #2 for Intelligent
        Systems. It is an academic exercise and is not intended for real
        medical diagnosis or use.
        </p>
        <a
          href="#about"
          className="w-fit text-sm font-medium text-accent hover:underline"
        >
          About
        </a>
      </div>
    </header>
  );
}

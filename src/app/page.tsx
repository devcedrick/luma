import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InputForm from "@/components/InputForm";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-bg text-text">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <InputForm />
      </main>
      <Footer />
    </div>
  );
}

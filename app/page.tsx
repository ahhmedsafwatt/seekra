"use client";
import Logo from "@/components/ui/Logo";
import SeekraLogo from "@/components/ui/SeekraLogo";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-background justify-center items-center gap-5 ">
      <h1 className="text-white text-4xl font-bold font-serif">
        Hello World <SeekraLogo />
      </h1>
      <Logo />{" "}
    </main>
  );
}

"use client";
import Logo from "@/components/ui/Logo";
import SeekraLogo from "@/components/ui/SeekraLogo";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-background  items-center gap-5 ">
      <div className="container ">
        <h1 className="text-white text-4xl">
          Hello World <SeekraLogo />
        </h1>
        <Logo />
      </div>
    </main>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <section className="h-[80vh]  flex flex-col items-center justify-center relative px-4">
          <h1 className="my-4 text-8xl md:text-8xl font-black text-center tracking-tighter bg-gradient-to-t from-neutral-900 to-neutral-400 bg-clip-text text-transparent">
            SKYWAY
          </h1>

          <Link href="/search" className="mx-auto" ><Button>Plan your travel</Button></Link>
        </section>
      </main>
    </div>
  );
}

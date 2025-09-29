"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="text-center max-w-4xl mx-auto">
      <h1 className="text-6xl md:text-8xl py-12 tracking-wide">
        Høgfjellia 53
      </h1>

      <div className="relative w-full max-w-3xl mx-auto">
        <Image
          src="/images/h53.png"
          alt="Mountain cabin illustration with pine trees and flowing wind lines"
          width={800}
          height={600}
          className="w-full h-auto opacity-95 transition-opacity duration-500 hover:opacity-100"
          priority
        />
      </div>
    </div>
  );
}

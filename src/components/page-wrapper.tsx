import { ReactNode } from "react";

import Hero from "@components/hero";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <Hero />
      <section className="relative">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div>{children}</div>
        </div>
      </section>
    </>
  );
}

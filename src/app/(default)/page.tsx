"use client";

import Hero from "@components/hero";
import Branches from "@/components/branches/branches";
import Announcements from "@/components/announcements/announcements";

export default function Home() {
  return (
    <>
      <Hero />
      <Branches />
      <Announcements />
    </>
  );
}

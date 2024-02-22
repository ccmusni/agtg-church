export const metadata = {
  title: "Home - AGTG Church",
  description: "Christian Church",
};

import Hero from "@components/hero";
import Branches from "@components/branches";
import Announcements from "@/components/announcements";

export default function Home() {
  return (
    <>
      <Hero />
      <Branches />
      <Announcements />
    </>
  );
}

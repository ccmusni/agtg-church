export const metadata = {
  title: "Home - AGTG Church",
  description: "Christian Church",
};

import Hero from "@components/hero";
import Branches from "@components/branches";

export default function Home() {
  return (
    <>
      <Hero />
      <Branches />
    </>
  );
}

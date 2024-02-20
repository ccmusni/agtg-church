export const metadata = {
  title: "Home - Simple",
  description: "Page description",
};

import Hero from "../../components/hero";
import Branches from "../../components/branches";
import FeaturesBlocks from "../../components/features-blocks";
import Testimonials from "../../components/testimonials";
import Newsletter from "../../components/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Branches />
      {/* <FeaturesBlocks />
      <Testimonials />
      <Newsletter /> */}
    </>
  );
}

import Hero from "../../components/hero";

export const metadata = {
  title: "Services - AGTG Church",
  description: "Christian Church",
};

export default function Services() {
  return (
    <>
      <Hero />
      <section className="relative">
        {/* Section background (needs .relative class on parent and next sibling elements) */}
        <div
          className="absolute inset-0 bg-gray-100 pointer-events-none mb-16"
          aria-hidden="true"
        ></div>
        <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-12 md:pt-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="h2 mb-4">Morning Service</h1>
              <p className="text-xl text-gray-600">Every Sunday at 9:00 AM</p>
            </div>

            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="h2 mb-4">Kids Service</h1>
              <p className="text-xl text-gray-600">Every Sunday at 9:00 AM</p>
            </div>

            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="h2 mb-4">Youth Service</h1>
              <p className="text-xl text-gray-600">Every Sunday at 2:30 PM</p>
            </div>

            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="h2 mb-4">Young Adult Service</h1>
              <p className="text-xl text-gray-600">
                Every other Sunday at 6:00 PM
              </p>
            </div>

            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="h2 mb-4">Couples Fellowship</h1>
              <p className="text-xl text-gray-600">To be announced</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

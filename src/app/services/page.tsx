"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { IService } from "Service";

import Hero from "@components/hero";
import Loading from "@/components/ui/loading";
import ServiceItem from "@/components/service-item";

export default function Services() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [services, setServices] = useState<IService[]>();

  const supabase = createClientComponentClient();

  const fetchMembers = async () => {
    const { data, error } = await supabase
      .from("services")
      .select(`id, title, description`);

    if (error) {
      setFetchError("Could not fetch the YA members");
      setServices(null);
      console.log(error);
    }

    if (data?.length) {
      const fetchedServices: IService[] = data.map((d) => ({
        id: d["id"] as number,
        title: d["title"] as string,
        description: d["description"] as string,
      }));

      setServices(fetchedServices);
      setIsLoading(false);
      setFetchError(null);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <>
      <Hero />
      <section className="relative pb-16">
        <div
          className="absolute inset-0 bg-gray-100 pointer-events-none mb-16"
          aria-hidden="true"
        ></div>
        <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-8 md:pt-16 pb-8 md:pb-16">
            {fetchError && <p>{fetchError}</p>}
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {services?.length &&
                  services.map((service) => <ServiceItem service={service} />)}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

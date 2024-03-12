"use client";

import { useEffect, useState } from "react";

import { IService } from "Service";
import { fetchServices } from "@/services/services.service";
import Loading from "../ui/loading";

import ServiceItem from "./service-item";

export default function Services() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [services, setServices] = useState<IService[]>();

  const fetchStaticServices = async () => {
    const { data, error } = await fetchServices();

    if (error) {
      setFetchError("Could not fetch the Services");
      setServices(null);
    }

    if (data?.length) {
      const fetchedServices: IService[] = data;

      setServices(fetchedServices);
      setFetchError(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!services?.length && !isLoading) {
      fetchStaticServices();
    }
  }, [services]);

  return (
    <section className="relative">
      {/* Section background (needs .relative className on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-8 md:pt-16 pb-16 md:pb-24">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h2 mb-4">Services</h1>
            <p className="text-xl text-gray-600">Stay Updated, Stay Engaged</p>
          </div>

          {/* Section content */}
          <div className="pt-8 md:pt-16 pb-8 md:pb-16">
            {/* Content */}
            {fetchError && <p>{fetchError}</p>}
            {isLoading ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
                {!!services?.length &&
                  services.map((service) => (
                    <ServiceItem key={service.id} service={service} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

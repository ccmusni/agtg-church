"use client";

import { useEffect, useState } from "react";

import Hero from "@components/hero";
import Loading from "@/components/ui/loading";

import { ILeadership } from "Leadership";
import { fetchLeaderships } from "@/services/leaderships.service";
import Leaderships from "@/components/leaderships/leaderships";
import Articles from "@/components/articles/articles";

export default function About() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [leaderships, setLeaderships] = useState<ILeadership[]>();

  const fetchStaticLeaderships = async () => {
    const { data, error } = await fetchLeaderships();

    if (error) {
      setFetchError("Could not fetch the Leaderships");
      setLeaderships(null);
      console.log(error);
    }

    if (data?.length) {
      const fetchedLeaderships: ILeadership[] = data.map((d) => ({
        ...d,
        honorific: d["leadership_titles"]?.["honorific"] as string,
      }));

      setLeaderships(fetchedLeaderships);
      setFetchError(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!leaderships?.length && !isLoading) {
      fetchStaticLeaderships();
    }
  }, [leaderships]);

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
              <div className="flex flex-col w-full items-center">
                <div className="w-full mx-auto text-center pl-24 pr-24 pb-12">
                  <p
                    className="text-5xl mb-3 ls-51"
                    data-aos="zoom-y-out"
                    data-aos-delay="150"
                  >
                    A very warm welcome
                  </p>
                  <p
                    className="text-normal mb-3 ls-51"
                    data-aos="zoom-y-out"
                    data-aos-delay="150"
                  >
                    We are a group of ordinary people who believe that church is
                    a great place to make friends and experience God together.
                    We are a family who believe that church should not only be
                    great fun but also a place where lives are radically
                    transformed.
                  </p>
                </div>

                <div className="max-w-3xl mx-auto">
                  <p
                    className="text-4xl mb-3 ls-51 uppercase"
                    data-aos="zoom-y-out"
                    data-aos-delay="150"
                  >
                    Staff and Leadership
                  </p>
                </div>

                <Leaderships />

                <div className="max-w-3xl mx-auto mt-12">
                  <p
                    className="text-4xl mb-3 ls-51 uppercase"
                    data-aos="zoom-y-out"
                    data-aos-delay="150"
                  >
                    Life at Church
                  </p>
                </div>
                <div className="flex max-w-6xl mx-auto">
                  <Articles />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

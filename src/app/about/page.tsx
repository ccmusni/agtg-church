"use client";

import { useEffect, useState } from "react";
import { Button } from "flowbite-react";

import Hero from "@components/hero";
import Loading from "@/components/ui/loading";
import CustomCard from "@/components/custom-card";

import { ILeadership } from "Leadership";
import { fetchLeaderships } from "@/services/leaderships.service";

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

                {!!leaderships?.length &&
                  leaderships.map(({ id, name, details }) => (
                    <CustomCard
                      key={id}
                      customClassName="mb-4"
                      title={name}
                      details={details}
                      imgSrc="/images/default-profile-pic.png"
                      horizontal
                    />
                  ))}

                <div className="max-w-3xl mx-auto mt-24">
                  <p
                    className="text-4xl mb-3 ls-51 uppercase"
                    data-aos="zoom-y-out"
                    data-aos-delay="150"
                  >
                    Life at Church
                  </p>
                </div>

                <div className="flex max-w-6xl mx-auto">
                  <CustomCard
                    customClassName="m-4"
                    title={"NEW TO CHURCH"}
                    details={
                      "Visitor information to help you get to know more about our church and how you can become involved."
                    }
                    imgSrc="/images/branches-template.jpg"
                  >
                    <Button>
                      Read more
                      <svg
                        className="-mr-1 ml-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </CustomCard>
                  <CustomCard
                    customClassName="m-4"
                    title={"NEW TO CHURCH"}
                    details={
                      "Visitor information to help you get to know more about our church and how you can become involved."
                    }
                    imgSrc="/images/branches-template.jpg"
                  >
                    <Button>
                      Read more
                      <svg
                        className="-mr-1 ml-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </CustomCard>
                  <CustomCard
                    customClassName="m-4"
                    title={"NEW TO CHURCH"}
                    details={
                      "Visitor information to help you get to know more about our church and how you can become involved."
                    }
                    imgSrc="/images/branches-template.jpg"
                  >
                    <Button>
                      Read more
                      <svg
                        className="-mr-1 ml-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </CustomCard>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

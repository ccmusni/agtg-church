"use client";

import { useState, useEffect } from "react";

import { IBranch } from "Branch";
import { fetchbranches } from "@/services/branches.service";

import Loading from "../ui/loading";
import BranchList from "./branch-list";

export default function Branches() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [branches, setBranches] = useState<IBranch[]>();

  const fetchStaticBranches = async () => {
    const { data, error } = await fetchbranches();

    if (error) {
      setFetchError("Could not fetch the Branches");
      setBranches(null);
    }

    if (data?.length) {
      const fetchedBranches: IBranch[] = data;
      setBranches(fetchedBranches);
      setFetchError(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!branches?.length && !isLoading) {
      fetchStaticBranches();
    }
  }, [branches]);

  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-8 md:pt-16">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Branches</h1>
            <p className="text-xl text-gray-600">
              Explore Our Network of Church Branches Near You
            </p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            {fetchError && <p>{fetchError}</p>}
            {isLoading ? (
              <Loading />
            ) : (
              <>{!!branches?.length && <BranchList branches={branches} />}</>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

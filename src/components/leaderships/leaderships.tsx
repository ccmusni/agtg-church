"use client";

import { useEffect, useState } from "react";

import { ILeadership, ILeadershipTitle } from "Leadership";
import {
  fetchLeadershipTitles,
  fetchLeaderships,
} from "@/services/leaderships.service";
import Loading from "../ui/loading";

import LeadershipItem from "./leadership-item";

export default function Leaderships() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [leaderships, setLeaderships] = useState<ILeadership[]>();
  const [leadershipTitles, setLeadershipTitles] =
    useState<ILeadershipTitle[]>();

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

  const fetchStaticLeadershipTitles = async () => {
    const { data, error } = await fetchLeadershipTitles();

    if (error) {
      setFetchError("Could not fetch the LeadershipTitles");
      setLeadershipTitles(null);
    }

    if (data?.length) {
      setLeadershipTitles(data);
      setFetchError(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!leadershipTitles?.length && !isLoading) {
      setIsLoading(true);
      fetchStaticLeadershipTitles();
    }
  }, [leadershipTitles]);

  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!!leaderships?.length &&
            leaderships.map((leadership) => (
              <LeadershipItem
                key={leadership.id}
                leadership={leadership}
                leadershipTitles={leadershipTitles}
                imgSize={{ height: 280, width: 280 }}
              />
            ))}
        </>
      )}
    </>
  );
}

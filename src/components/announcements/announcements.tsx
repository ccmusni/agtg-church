"use client";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";

import { IAnnouncement } from "Announcement";

import Loading from "../ui/loading";
import AnnouncementItem from "./announcement-item";
import { fetchAnnouncements } from "@/services/announcement.service";

export default function Announcement() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [announcements, setAnnouncements] = useState<IAnnouncement[]>();

  const fetchStaticAnnouncements = async () => {
    const { data, error } = await fetchAnnouncements();

    if (error) {
      setFetchError("Could not fetch the Announcements");
      setAnnouncements(null);
    }

    if (data?.length) {
      const fetchedAnnouncements: IAnnouncement[] = data;

      setAnnouncements(fetchedAnnouncements);
      setIsLoading(false);
      setFetchError(null);
    }
  };

  useEffect(() => {
    fetchStaticAnnouncements();
  }, []);

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
            <h1 className="h2 mb-4">Announcements</h1>
            <p className="text-xl text-gray-600">Stay Updated, Stay Engaged</p>
          </div>

          {/* Section content */}
          <div className="pt-8 md:pt-16 pb-8 md:pb-16">
            {/* Content */}
            {fetchError && <p>{fetchError}</p>}
            {isLoading ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {!!announcements?.length &&
                  announcements.map((announcement) => (
                    <AnnouncementItem
                      key={announcement.id}
                      announcement={announcement}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

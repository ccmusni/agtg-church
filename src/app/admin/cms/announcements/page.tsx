"use client";

import { ChangeEvent, useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { fetchAnnouncements } from "@/services/announcement.service";

import { IAnnouncement } from "Announcement";
import Loading from "@/components/ui/loading";
import AnnouncementItem from "@/components/announcement-item";

export default function AnnouncementsCms() {
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

  const handleEdit = () => {};

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>, id: number) => {
    let file = e.target.files[0];

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`announcements/2/${file?.name.trim()}`, file as File);

    if (data) {
      console.log(data);
    } else if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStaticAnnouncements();
  }, []);

  return (
    <>
      <section className="relative pt-16">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-8 md:pt-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="h2 mb-4">Announcements</h1>
            </div>

            {/* Section content */}
            <div className="pt-4 md:pt-8 pb-8 md:pb-16">
              {/* Content */}
              {fetchError && <p>{fetchError}</p>}
              {isLoading ? (
                <Loading />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {announcements?.length &&
                    announcements.map((announcement) => (
                      <AnnouncementItem
                        key={announcement.id}
                        announcement={announcement}
                        admin
                      />
                    ))}
                </div>
              )}
            </div>

            {/* {announcements?.map((announcement) => (
            <form className="max-w-lg mx-auto pb-16">
              <div className="mb-5">
                <input
                  type="text"
                  id="base-input"
                  placeholder="Title"
                  value={announcement.title}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Details..."
                  value={announcement.details}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></textarea>
              </div>

              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(e, announcement.id)}
              />
            </form>
          ))} */}
          </div>
        </div>
      </section>
    </>
  );
}

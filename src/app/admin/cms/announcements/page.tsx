"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  fetchAnnouncements,
  updateAnnouncement,
  updateImage,
} from "@/services/announcement.service";

import { IAnnouncement } from "Announcement";
import Loading from "@/components/ui/loading";
import AnnouncementItem from "@/components/announcements/announcement-item";

export default function AnnouncementsCms() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [announcements, setAnnouncements] = useState<IAnnouncement[]>();
  const [file, setFile] = useState<File>();
  const [imgPreviewUrlSrc, setImgPreviewUrlSrc] = useState("");

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

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const newFile = e.target.files[0];

    setFile(newFile);
    setImgPreviewUrlSrc(URL.createObjectURL(newFile));
  };

  const handleSave = async (
    id: number,
    title: string,
    details: string,
    oldImgfileName: string
  ) => {
    setIsLoading(true);
    const newfileName = `${file?.name.replace(/\s/g, "")}`;

    const { error: updateImgError } = await updateImage(
      id,
      oldImgfileName,
      newfileName,
      file
    );

    if (!updateImgError) {
      const { error: updateAnnouncementError } = await updateAnnouncement(
        id,
        title,
        details,
        newfileName
      );

      if (!updateAnnouncementError) {
        fetchStaticAnnouncements();
      }
    }
  };

  useEffect(() => {
    if (!announcements?.length && !isLoading) {
      setIsLoading(true);
      fetchStaticAnnouncements();
    }
  }, [announcements]);

  return (
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
                {!!announcements?.length &&
                  announcements.map((announcement) => (
                    <AnnouncementItem
                      key={announcement.id}
                      announcement={announcement}
                      admin
                      imgPreviewUrlSrc={imgPreviewUrlSrc}
                      onUploadImage={handleUploadImage}
                      onSave={handleSave}
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

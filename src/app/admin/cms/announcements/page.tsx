"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import {
  fetchAnnouncements,
  addUpdateAnnouncement,
  deleteAnnouncement,
} from "@/services/announcement.service";

import { IAnnouncement } from "Announcement";
import Loading from "@/components/ui/loading";
import AnnouncementItem from "@/components/announcements/announcement-item";
import CustomCard from "@/components/custom-card";
import { Button } from "flowbite-react";
import AnnouncementItemAddEditModal from "@/components/announcements/announcement-item-add-edit-modal";

export type TAnnouncementOnSaveProps = {
  id?: number;
  title: string;
  details: string;
  oldFileName?: string;
};

export default function AnnouncementsCms() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [announcements, setAnnouncements] = useState<IAnnouncement[]>();
  const [file, setFile] = useState<File>();
  const [imgPreviewUrlSrc, setImgPreviewUrlSrc] = useState("");
  const [openModal, setOpenModal] = useState(false);

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
    if (!announcements?.length && !isLoading) {
      setIsLoading(true);
      fetchStaticAnnouncements();
    }
  }, [announcements]);

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const newFile = e.target.files[0];

    setFile(newFile);
    setImgPreviewUrlSrc(URL.createObjectURL(newFile));
  };

  const handleSave = async ({
    id,
    title,
    details,
    oldFileName,
  }: TAnnouncementOnSaveProps) => {
    setIsLoading(true);

    const { error } = await addUpdateAnnouncement(
      id,
      title,
      details,
      oldFileName,
      file
    );

    if (!error) {
      fetchStaticAnnouncements();
    }
  };

  const handleDelete = (id: number) => {
    setIsLoading(true);

    const status = deleteAnnouncement(id);

    status.finally(() => {
      fetchStaticAnnouncements();
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
            <>
              {isLoading && <Loading />}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
                <CustomCard>
                  <Button
                    color="gray"
                    className="h-full w-full border-0"
                    onClick={() => setOpenModal(true)}
                  >
                    <HiOutlinePlus className="h-full w-full text-5xl" />
                  </Button>
                </CustomCard>
                {!!announcements?.length &&
                  announcements.map((announcement) => (
                    <AnnouncementItem
                      key={announcement.id}
                      announcement={announcement}
                      admin
                      imgPreviewUrlSrc={imgPreviewUrlSrc}
                      onUploadImage={handleUploadImage}
                      onSave={handleSave}
                      onDelete={handleDelete}
                    />
                  ))}
              </div>
              {openModal && (
                <AnnouncementItemAddEditModal
                  imgSrc={imgPreviewUrlSrc}
                  open={openModal}
                  onUploadImage={handleUploadImage}
                  onSave={({ title, details }) => {
                    handleSave({ title, details });
                    handleCloseModal();
                  }}
                  onClose={handleCloseModal}
                />
              )}
            </>
          </div>
        </div>
      </div>
    </section>
  );
}

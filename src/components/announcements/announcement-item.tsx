import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "flowbite-react";

import { IAnnouncement } from "Announcement";
import AnnouncementItemAddEdit from "./announcement-item-add-edit";
import CustomCard from "../card";
import { fetchImage } from "@/services/announcement.service";

const CDNURL =
  "https://yrrhmzptqtwwbvytrpjv.supabase.co/storage/v1/object/public/images/";

export default function AnnouncementItem({
  announcement,
  imgPreviewUrlSrc,
  admin,
  onEdit,
  onUploadImage,
  onSave,
}: {
  announcement: IAnnouncement;
  admin?: boolean;
  imgPreviewUrlSrc?: string;
  onEdit?: () => void;
  onUploadImage?: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onSave?: (
    id: number,
    title: string,
    details: string,
    img_file_name: string
  ) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  // TODO: Apply fetchError
  const [fetchError, setFetchError] = useState("");
  const [image, setImage] = useState<{ name: string }>();
  const [imgSrc, setImgSrc] = useState("/images/announcement-template.jpg");
  const [openModal, setOpenModal] = useState(false);

  const fetchStaticImage = async () => {
    const { data, error } = await fetchImage(announcement?.id);

    if (error) {
      setFetchError("Could not fetch the Announcements");
      setImage(null);
    }

    if (data?.length) {
      setImage(data[0]);
      setIsLoading(false);
      setFetchError(null);
    }
  };

  useEffect(() => {
    if (!image && !isLoading) {
      setIsLoading(true);
      fetchStaticImage();
    }
  }, [image]);

  useMemo(() => {
    if (!!image) {
      const newImage = image?.name
        ? `${CDNURL}announcements/${announcement.id}/${image?.name}`
        : imgSrc;
      setImgSrc(newImage);
    }
  }, [image]);

  return (
    <CustomCard
      title={announcement.title}
      details={announcement.details}
      imgSrc={imgSrc}
    >
      {admin && (
        <>
          <Button onClick={() => setOpenModal(true)}>Edit</Button>
          <AnnouncementItemAddEdit
            announcement={announcement}
            imgSrc={imgPreviewUrlSrc || imgSrc}
            open={openModal}
            onUploadImage={onUploadImage}
            onSave={onSave}
            onClose={() => setOpenModal(false)}
          />
        </>
      )}
    </CustomCard>
  );
}

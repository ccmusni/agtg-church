import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "flowbite-react";

import { IAnnouncement } from "Announcement";
import AnnouncementItemAddEdit from "./announcement-item-add-edit";
import CustomCard from "../card";
import { fetchImage } from "@/services/announcement.service";
import { TAnnouncementOnSaveProps } from "@/app/admin/cms/announcements/page";

const CDNURL =
  "https://yrrhmzptqtwwbvytrpjv.supabase.co/storage/v1/object/public/images/";

export default function AnnouncementItem({
  announcement,
  imgPreviewUrlSrc,
  admin,
  onUploadImage,
  onSave,
}: {
  announcement: IAnnouncement;
  admin?: boolean;
  imgPreviewUrlSrc?: string;
  onUploadImage?: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onSave?: ({
    id,
    title,
    details,
    oldFileName,
  }: TAnnouncementOnSaveProps) => void;
}) {
  const { id, img_file_name: imgFileName } = announcement;
  const [imgSrc, setImgSrc] = useState("/images/announcement-template.jpg");
  const [openModal, setOpenModal] = useState(false);

  useMemo(() => {
    if (!!imgFileName) {
      setImgSrc(`${CDNURL}announcements/${id}/${imgFileName}`);
    }
  }, [imgFileName]);

  const handleSave = ({
    title,
    details,
  }: Partial<TAnnouncementOnSaveProps>) => {
    onSave({
      ...announcement,
      title,
      details,
      oldFileName: announcement.img_file_name,
    });
    handleClose();
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <CustomCard
      title={announcement.title}
      details={announcement.details}
      imgSrc={imgSrc}
    >
      {admin && (
        <>
          <Button className="z-0" onClick={() => setOpenModal(true)}>
            Edit
          </Button>
          <AnnouncementItemAddEdit
            announcement={announcement}
            imgSrc={imgPreviewUrlSrc || imgSrc}
            open={openModal}
            onUploadImage={onUploadImage}
            onSave={handleSave}
            onClose={handleClose}
          />
        </>
      )}
    </CustomCard>
  );
}

import { ChangeEvent, useMemo, useState } from "react";
import { Button, ButtonGroup } from "flowbite-react";

import { IAnnouncement } from "Announcement";

import CustomCard from "../custom-card";
import { TAnnouncementOnSaveProps } from "./announcements-cms";
import AnnouncementItemAddEditModal from "./announcement-item-add-edit-modal";

const CDNURL =
  "https://yrrhmzptqtwwbvytrpjv.supabase.co/storage/v1/object/public/images/";

export default function AnnouncementItem({
  announcement,
  imgPreviewUrlSrc,
  admin,
  onUploadImage,
  onSave,
  onDelete,
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
  onDelete?: (id: number) => void;
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
          <ButtonGroup>
            <Button className="w-full z-0" onClick={() => setOpenModal(true)}>
              Edit
            </Button>
            <Button
              className="w-full z-0"
              color="failure"
              onClick={() => onDelete(id)}
            >
              Delete
            </Button>
          </ButtonGroup>
          <AnnouncementItemAddEditModal
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

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Button, ButtonGroup } from "flowbite-react";

import { ILeadership, ILeadershipTitle } from "Leadership";

import CustomCard from "../custom-card";
import { TLeadershipOnSaveProps } from "./leaderships-cms";
import LeadershipItemAddEditModal from "./leadership-item-add-edit-modal";

const CDNURL =
  "https://yrrhmzptqtwwbvytrpjv.supabase.co/storage/v1/object/public/images/";

export default function LeadershipItem({
  leadership,
  leadershipTitles,
  imgPreviewUrlSrc,
  imgSize,
  horizontalCard = true,
  admin,
  onUploadImage,
  onSave,
  onDelete,
}: {
  leadership: ILeadership;
  leadershipTitles: ILeadershipTitle[];
  admin?: boolean;
  imgPreviewUrlSrc?: string;
  imgSize?: { width?: string | number; height?: string | number };
  horizontalCard?: boolean;
  onUploadImage?: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onSave?: ({
    id,
    name,
    details,
    leadership_title_id,
    oldFileName,
  }: TLeadershipOnSaveProps) => void;
  onDelete?: (id: number) => void;
}) {
  const { id, img_file_name: imgFileName } = leadership;
  const [imgSrc, setImgSrc] = useState("/images/default-profile-pic.png");
  const [openModal, setOpenModal] = useState(false);

  useMemo(() => {
    if (!!imgFileName) {
      setImgSrc(`${CDNURL}leaderships/${id}/${imgFileName}`);
    }
  }, [imgFileName]);

  const handleSave = ({
    name,
    details,
    leadership_title_id,
  }: Partial<TLeadershipOnSaveProps>) => {
    onSave({
      ...leadership,
      name,
      details,
      leadership_title_id,
      oldFileName: leadership.img_file_name,
    });
    handleClose();
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <CustomCard
      customClassName="mb-4"
      title={leadership.name}
      details={leadership.details}
      imgSrc={imgSrc}
      imgSize={imgSize}
      horizontal={horizontalCard}
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
          <LeadershipItemAddEditModal
            leadership={leadership}
            leadershipTitles={leadershipTitles}
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

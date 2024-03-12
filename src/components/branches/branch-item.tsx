import { ChangeEvent, useMemo, useState } from "react";
import { Button, ButtonGroup } from "flowbite-react";

import { IBranch } from "Branch";

import CustomCard from "../custom-card";
import { TBranchOnSaveProps } from "./branches-cms";
import BranchItemAddEditModal from "./branches-item-add-edit-modal";

const CDNURL =
  "https://yrrhmzptqtwwbvytrpjv.supabase.co/storage/v1/object/public/images/";

export default function BranchItem({
  branch,
  imgPreviewUrlSrc,
  admin,
  onUploadImage,
  onSave,
  onDelete,
}: {
  branch: IBranch;
  admin?: boolean;
  imgPreviewUrlSrc?: string;
  onUploadImage?: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onSave?: ({ id, name, address, oldFileName }: TBranchOnSaveProps) => void;
  onDelete?: (id: number) => void;
}) {
  const { id, img_file_name: imgFileName } = branch;
  const [imgSrc, setImgSrc] = useState("/images/branch-template.jpg");
  const [openModal, setOpenModal] = useState(false);

  useMemo(() => {
    if (!!imgFileName) {
      setImgSrc(`${CDNURL}branches/${id}/${imgFileName}`);
    }
  }, [imgFileName]);

  const handleSave = ({ name, address }: Partial<TBranchOnSaveProps>) => {
    onSave({
      ...branch,
      name,
      address,
      oldFileName: branch.img_file_name,
    });
    handleClose();
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <CustomCard title={branch.name} details={branch.address} imgSrc={imgSrc}>
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
          <BranchItemAddEditModal
            branch={branch}
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

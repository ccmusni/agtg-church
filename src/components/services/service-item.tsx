import { useState } from "react";
import { Button, ButtonGroup } from "flowbite-react";

import { IService } from "Service";

import CustomCard from "../custom-card";
import { TServiceOnSaveProps } from "./services-cms";
import ServiceItemAddEditModal from "./service-item-add-edit-modal";

export default function ServiceItem({
  service,
  admin,
  onSave,
  onDelete,
}: {
  service: IService;
  admin?: boolean;
  onSave?: ({ id, title, description }: TServiceOnSaveProps) => void;
  onDelete?: (id: number) => void;
}) {
  const { id } = service;
  const [openModal, setOpenModal] = useState(false);

  const handleSave = ({ title, description }: Partial<TServiceOnSaveProps>) => {
    onSave({
      ...service,
      title,
      description,
    });
    handleClose();
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <CustomCard title={service.title} details={service.description}>
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
          <ServiceItemAddEditModal
            service={service}
            open={openModal}
            onSave={handleSave}
            onClose={handleClose}
          />
        </>
      )}
    </CustomCard>
  );
}

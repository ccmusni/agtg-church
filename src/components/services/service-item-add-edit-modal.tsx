import { ChangeEvent, useState } from "react";

import { Button, Modal, Label, TextInput, Textarea } from "flowbite-react";

import { IService } from "Service";
import { TServiceOnSaveProps } from "./services-cms";

export default function ServiceItemAddEditModal({
  service,
  open,
  onSave,
  onClose,
}: {
  service?: IService;
  open?: boolean;
  onSave?: ({ title, description }: Partial<TServiceOnSaveProps>) => void;
  onClose?: () => void;
}) {
  const [values, setValues] = useState({
    title: service?.title || "",
    description: service?.description || "",
  });

  const handleTextChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [target.id]: target.value }));
  };

  const handleOnSave = () => {
    onSave({
      ...values,
    });

    onClose();
  };

  return (
    <Modal show={open} size="md" popup onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit Service
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput
              id="title"
              placeholder="Title here..."
              value={values.title}
              required
              onChange={handleTextChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Description" />
            </div>
            <Textarea
              id="description"
              placeholder="Details here..."
              rows={4}
              value={values.description}
              onChange={handleTextChange}
            />
          </div>
          <div className="w-full">
            <Button onClick={handleOnSave}>Save</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

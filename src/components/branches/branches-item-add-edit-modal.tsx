import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";

import {
  Button,
  Modal,
  Label,
  TextInput,
  Textarea,
  FileInput,
} from "flowbite-react";

import { IBranch } from "Branch";
import { TBranchOnSaveProps } from "./branches-cms";

export default function BranchItemAddEditModal({
  branch,
  imgSrc,
  open,
  onUploadImage,
  onSave,
  onClose,
}: {
  branch?: IBranch;
  imgSrc?: string;
  open?: boolean;
  onUploadImage?: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onSave?: ({ name, address }: Partial<TBranchOnSaveProps>) => void;
  onClose?: () => void;
}) {
  const fileUploadRef = useRef(null);
  const [values, setValues] = useState({
    name: branch?.name || "",
    address: branch?.address || "",
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
  };

  return (
    <Modal show={open} size="md" popup onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit Branch
          </h3>
          {imgSrc ? (
            <Image
              className="w-full"
              width={370}
              height={240}
              src={imgSrc}
              alt={values.name}
              style={{
                height: 240,
                minHeight: 240,
                borderTopLeftRadius: "0.5rem",
                borderTopRightRadius: "0.5rem",
              }}
            />
          ) : (
            <button
              color="gray"
              className="border-dashed border-2"
              style={{ width: 370, height: 240 }}
              onClick={() => {
                fileUploadRef.current?.click();
              }}
            >
              Upload Image
            </button>
          )}
          <FileInput
            id="file-upload"
            ref={fileUploadRef}
            sizing="sm"
            onChange={(e) => onUploadImage(e, branch?.id)}
          />

          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              placeholder="name here..."
              value={values.name}
              required
              onChange={handleTextChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="address" value="Address" />
            </div>
            <Textarea
              id="address"
              placeholder="address here..."
              rows={4}
              value={values.address}
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

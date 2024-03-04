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

import { IAnnouncement } from "Announcement";
import { TAnnouncementOnSaveProps } from "@/app/admin/cms/announcements/page";

const CDNURL =
  "https://yrrhmzptqtwwbvytrpjv.supabase.co/storage/v1/object/public/images/";

export default function AnnouncementItemAddEditModal({
  announcement,
  imgSrc,
  open,
  onUploadImage,
  onSave,
  onClose,
}: {
  announcement?: IAnnouncement;
  imgSrc?: string;
  open?: boolean;
  onUploadImage?: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onSave?: ({ title, details }: Partial<TAnnouncementOnSaveProps>) => void;
  onClose?: () => void;
}) {
  const fileUploadRef = useRef(null);
  const [values, setValues] = useState({
    title: announcement?.title || "",
    details: announcement?.details || "",
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
            Edit Announcement
          </h3>
          {imgSrc ? (
            <Image
              className="w-full"
              width={370}
              height={240}
              src={imgSrc}
              alt={values.title}
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
            onChange={(e) => onUploadImage(e, announcement?.id)}
          />

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
              <Label htmlFor="details" value="Details" />
            </div>
            <Textarea
              id="details"
              placeholder="Details here..."
              rows={4}
              value={values.details}
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

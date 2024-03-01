import { ChangeEvent } from "react";
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

const CDNURL =
  "https://yrrhmzptqtwwbvytrpjv.supabase.co/storage/v1/object/public/images/";

export default function AnnouncementItemAddEdit({
  announcement,
  imgSrc,
  open,
  onUploadImage,
  onSave,
  onClose,
}: {
  announcement: IAnnouncement;
  imgSrc: string;
  open?: boolean;
  onUploadImage?: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onSave?: (
    id: number,
    title: string,
    details: string,
    img_file_name: string
  ) => void;
  onClose?: () => void;
}) {
  const handleOnSave = () => {
    onSave(
      announcement.id,
      announcement.title,
      announcement.details,
      announcement.img_file_name
    );
  };

  return (
    <Modal show={open} size="md" popup onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit Announcement
          </h3>

          <div className="mb-2">
            <Image
              className="w-full"
              width={355}
              height={240}
              src={imgSrc}
              alt={announcement.title}
              style={{
                height: 240,
                minHeight: 240,
                borderTopLeftRadius: "0.5rem",
                borderTopRightRadius: "0.5rem",
              }}
            />
            <div>
              <Label htmlFor="file-upload" value="Upload Image" />
            </div>
            <FileInput
              id="file-upload"
              sizing="sm"
              onChange={(e) => onUploadImage(e, announcement.id)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput
              id="title"
              placeholder="Title here..."
              value={announcement.title}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="details" value="Details" />
            </div>
            <Textarea
              id="details"
              placeholder="Details here..."
              value={announcement.details}
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
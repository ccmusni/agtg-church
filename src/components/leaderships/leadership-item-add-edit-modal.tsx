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

import { ILeadership, ILeadershipTitle } from "Leadership";
import { TLeadershipOnSaveProps } from "./leaderships-cms";
import SelectInput from "../select-input";

export default function LeadershipItemAddEditModal({
  leadership,
  leadershipTitles = [],
  imgSrc,
  open,
  onUploadImage,
  onSave,
  onClose,
}: {
  leadership?: ILeadership;
  leadershipTitles: ILeadershipTitle[];
  imgSrc?: string;
  open?: boolean;
  onUploadImage?: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onSave?: ({
    name,
    details,
    leadership_title_id,
  }: Partial<TLeadershipOnSaveProps>) => void;
  onClose?: () => void;
}) {
  const fileUploadRef = useRef(null);
  const [values, setValues] = useState({
    title: leadership?.name || "",
    details: leadership?.details || "",
    leadership_title_id: leadership?.leadership_title_id || 2,
  });
  const leadershipTitlesOptions = leadershipTitles.map((item) => ({
    label: item.title,
    value: item.id,
  }));

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
            Edit Leadership
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
            onChange={(e) => onUploadImage(e, leadership?.id)}
          />

          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput
              id="title"
              placeholder="Name here..."
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
          <div>
            <SelectInput
              label="Select Title"
              options={leadershipTitlesOptions}
              value={values.leadership_title_id}
              onChange={(value) =>
                setValues((prev) => ({ ...prev, leadership_title_id: value }))
              }
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

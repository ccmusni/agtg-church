import { ChangeEvent, useState } from "react";

import { Button, Modal, Label, TextInput } from "flowbite-react";

import { IMember } from "Member";

export type TMemberOnSaveProps = {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  contact_number: string;
  nickname: string;
  role_id: number;
};

export default function MemberItemAddEditModal({
  member,
  open,
  onSave,
  onClose,
}: {
  member?: IMember;
  open?: boolean;
  onUploadImage?: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onSave?: ({
    last_name,
    first_name,
    middle_name,
    contact_number,
    nickname,
    role_id,
  }: Partial<TMemberOnSaveProps>) => void;
  onClose?: () => void;
}) {
  const [values, setValues] = useState({
    first_name: member?.first_name || "",
    middle_name: member?.middle_name || "",
    last_name: member?.last_name || "",
    nickname: member?.nickname || "",
    contact_number: member?.contact_number || "",
    role_id: member?.role_id || null,
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
            Add Member
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="first_name" value="First Name" />
            </div>
            <TextInput
              id="first_name"
              placeholder="Type your first name here..."
              value={values.first_name}
              required
              onChange={handleTextChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="middle_name" value="Middle Initial (optional)" />
            </div>
            <TextInput
              id="middle_name"
              placeholder="Type your middle name here..."
              value={values.middle_name}
              required
              onChange={handleTextChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="last_name" value="Last Name" />
            </div>
            <TextInput
              id="last_name"
              placeholder="Type your last name here..."
              value={values.last_name}
              required
              onChange={handleTextChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="nickname" value="Nickname" />
            </div>
            <TextInput
              id="nickname"
              placeholder="Type your nickname here..."
              value={values.nickname}
              required
              onChange={handleTextChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="contact_number" value="Contact Number" />
            </div>
            <TextInput
              id="contact_number"
              placeholder="09123456789"
              value={values.contact_number}
              required
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

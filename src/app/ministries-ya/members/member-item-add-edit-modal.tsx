import { ChangeEvent, useState } from "react";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import InputMask from "react-input-mask";

import SelectInput from "@/components/select-input";

import { IMember } from "Member";
import { IRole } from "Role";
export type TMemberOnSaveProps = {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  contact_number: string;
  nickname: string;
  role_id: string | number;
};

export default function MemberItemAddEditModal({
  open,
  member,
  roles = [],
  onSave,
  onClose,
}: {
  open?: boolean;
  member?: IMember;
  roles: IRole[];
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
    role_id: member?.role_id || 3,
  });
  const roleOptions = roles.map((role) => ({
    label: role.name,
    value: role.id,
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
            <div className="mb-2 block flex">
              <Label htmlFor="first_name" value="First Name" />
              <span className="text-red-500"> *</span>
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
              <Label htmlFor="middle_name" value="Middle Initial" />
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
            <div className="mb-2 block flex">
              <Label htmlFor="last_name" value="Last Name" />
              <span className="text-red-500"> *</span>
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
            <div className="mb-2 block flex">
              <Label htmlFor="contact_number" value="Contact Number" />
              <span className="text-red-500"> *</span>
            </div>
            <InputMask
              id="contact_number"
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
              mask="+63 (999) 999-9999"
              maskChar="_"
              placeholder="+63 (___) ___-____"
              value={values.contact_number}
              onChange={handleTextChange}
            />
          </div>
          <div>
            <SelectInput
              label="Select Role"
              options={roleOptions}
              value={values.role_id}
              onChange={(value) =>
                setValues((prev) => ({ ...prev, role_id: value }))
              }
            />
          </div>
          <Modal.Footer className="flex p-0 justify-end">
            <Button onClick={handleOnSave}>Save</Button>
            <Button color="light" onClick={onClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </div>
      </Modal.Body>
    </Modal>
  );
}

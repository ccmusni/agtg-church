import { useState } from "react";
import { Table } from "flowbite-react";

import { IMember } from "Member";
import { IRole } from "Role";
import MemberTableRow from "./member-table-row";
import MemberItemAddEditModal, {
  TMemberOnSaveProps,
} from "./member-item-add-edit-modal";

type TMembersTableProps = {
  members: IMember[];
  roles: IRole[];
  onSave?: ({
    last_name,
    first_name,
    middle_name,
    contact_number,
    nickname,
    role_id,
  }: Partial<TMemberOnSaveProps>) => void;
  onDelete?: (id: number) => void;
};

export default function MembersTable({
  members,
  roles,
  onSave,
  onDelete,
}: TMembersTableProps) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<IMember>();

  return (
    <div className="block h-96 overflow-y-auto mt-4">
      <Table striped>
        <Table.Head>
          <Table.HeadCell className="sticky top-0">NAME</Table.HeadCell>
          <Table.HeadCell className="sticky top-0">NICKNAME</Table.HeadCell>
          <Table.HeadCell className="sticky top-0">ROLE</Table.HeadCell>
          <Table.HeadCell className="sticky top-0">
            CONTACT NUMBER
          </Table.HeadCell>
          <Table.HeadCell className="sticky top-0">
            <span className="sr-only">Actions</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {!!members?.length &&
            members.map((member) => (
              <MemberTableRow
                key={member?.id}
                member={member}
                onEdit={() => {
                  setSelectedMember(member);
                  setOpenModal(true);
                }}
                onDelete={onDelete}
              />
            ))}
        </Table.Body>
      </Table>
      {openModal && (
        <MemberItemAddEditModal
          open={openModal}
          member={selectedMember}
          roles={roles}
          onSave={onSave}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}

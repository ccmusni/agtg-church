import { Table } from "flowbite-react";

import { IMember } from "Member";
import MemberTableRow from "./member-table-row";

export default function MembersTable({ members }: { members: IMember[] }) {
  return (
    <Table striped>
      <Table.Head>
        <Table.HeadCell>NAME</Table.HeadCell>
        <Table.HeadCell>NICKNAME</Table.HeadCell>
        <Table.HeadCell>ROLE</Table.HeadCell>
        <Table.HeadCell>CONTACT NUMBER</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {!!members?.length &&
          members.map((member) => (
            <MemberTableRow key={member?.id} member={member} />
          ))}
      </Table.Body>
    </Table>
  );
}

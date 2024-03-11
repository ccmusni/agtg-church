import { Table } from "flowbite-react";
import { HiOutlinePencil } from "react-icons/hi";

import { IMember } from "Member";

export default function MemberTableRow({ member }: { member: IMember }) {
  return (
    <Table.Row>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {member?.name}
      </Table.Cell>
      <Table.Cell>{member?.nickname}</Table.Cell>
      <Table.Cell>{member?.role}</Table.Cell>
      <Table.Cell>{member?.contact_number}</Table.Cell>
      <Table.Cell>
        <a
          href="#"
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          <HiOutlinePencil className="mr-3 h-4 w-4" />
        </a>
      </Table.Cell>
    </Table.Row>
  );
}

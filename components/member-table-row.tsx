import { IMember } from "Member";

export default function MemberTableRow({ member }: { member: IMember }) {
  return (
    <tr
      key={member?.id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {member?.name}
      </th>
      <td className="px-6 py-4">{member?.nickname}</td>
      <td className="px-6 py-4">{member?.role}</td>
      <td className="px-6 py-4">{member?.contact_number}</td>
      <td className="px-6 py-4 text-right">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline disabled"
        >
          Edit
        </a>
      </td>
    </tr>
  );
}

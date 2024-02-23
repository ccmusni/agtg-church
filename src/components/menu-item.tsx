import { INavItem } from "Nav";

export default function MenuItem({ item }: { item: INavItem }) {
  return (
    <li>
      <a
        href={item.path}
        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        aria-current="page"
      >
        {item.title}
      </a>
    </li>
  );
}
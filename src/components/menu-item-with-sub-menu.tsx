import { INavItem } from "Nav";
import MenuItem from "./menu-item";

export default function MenuItemWithSubMenu({
  title,
  items,
}: {
  title: string;
  items: INavItem[];
}) {
  return (
    <li>
      <button
        id="dropdownNavbarLink"
        data-dropdown-toggle={`dropdownNavbar-${title}`}
        className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        {title}
        <svg
          className="w-2.5 h-2.5 ms-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        id={`dropdownNavbar-${title}`}
        className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownLargeButton"
        >
          {items?.length &&
            items.map((item, idx) =>
              item.submenu ? (
                <MenuItemWithSubMenu
                  key={idx}
                  title={item.title}
                  items={item.subMenuItems}
                />
              ) : (
                <MenuItem key={idx} item={item} />
              )
            )}
        </ul>
      </div>
    </li>
  );
}

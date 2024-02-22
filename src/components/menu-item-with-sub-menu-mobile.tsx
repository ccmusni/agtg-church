import { INavItem } from "Nav";
import Dropdown from "./utils/dropdown";
import MenuItem from "./menu-item";

export default function MenuItemWithSubMenuMobile({
  title,
  items,
}: {
  title: string;
  items: INavItem[];
}) {
  return (
    <Dropdown title={title}>
      <ul
        className="text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="doubleDropdownButton"
      >
        {items?.length &&
          items.map((item, idx) =>
            item.submenu ? (
              <MenuItemWithSubMenuMobile
                key={idx}
                title={item.title}
                items={item.subMenuItems}
              />
            ) : (
              <MenuItem key={idx} item={item} />
            )
          )}
      </ul>
    </Dropdown>
  );
}

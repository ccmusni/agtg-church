import { usePathname } from "next/navigation";
import { INavbarItem } from "Navbar";
import { Dropdown, DropdownItem } from "flowbite-react";

import NavbarItem from "./navbar-item";

export default function NavbarDropdown({
  label,
  items,
}: {
  label: string;
  items: INavbarItem[];
}) {
  const path = usePathname();

  return (
    <Dropdown inline label={label} size="lg">
      {!!items?.length &&
        items.map((item, idx) =>
          item.hasSubMenu ? (
            <div key={idx} className="text-sm md:text-lg py-2 pr-4 pl-3 md:p-3">
              <NavbarDropdown label={item.label} items={item.subMenuItems} />
            </div>
          ) : (
            <div key={idx} className="text-sm md:text-lg  md:p-3">
              <NavbarItem key={idx} item={item} />
            </div>
          )
        )}
    </Dropdown>
  );
}

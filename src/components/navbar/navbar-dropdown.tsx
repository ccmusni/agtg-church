import { Dropdown } from "flowbite-react";

import { useAppSelector } from "@/store";
import { INavbarItem } from "Navbar";

import NavbarItem from "./navbar-item";

export default function NavbarDropdown({
  label,
  items,
}: {
  label: string;
  items: INavbarItem[];
}) {
  const authState = useAppSelector((state) => state.auth.authState);

  const isShow = (forAdmin: boolean): boolean => {
    return (forAdmin && authState) || !forAdmin;
  };

  return (
    <Dropdown inline label={label} size="lg">
      {!!items?.length &&
        items.map((item, idx) =>
          item.hasSubMenu
            ? isShow(item.forAdmin) && (
                <div
                  key={idx}
                  className="text-sm md:text-lg py-2 pr-4 pl-3 md:p-3"
                >
                  <NavbarDropdown
                    label={item.label}
                    items={item.subMenuItems}
                  />
                </div>
              )
            : isShow(item.forAdmin) && (
                <div key={idx} className="text-sm md:text-lg  md:p-3">
                  <NavbarItem key={idx} item={item} />
                </div>
              )
        )}
    </Dropdown>
  );
}

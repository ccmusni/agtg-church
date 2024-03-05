import { usePathname } from "next/navigation";
import { INavbarItem } from "Navbar";
import { Navbar } from "flowbite-react";

export default function NavbarItem({ item }: { item: INavbarItem }) {
  const path = usePathname();

  return (
    <Navbar.Link
      href={item.path}
      {...(path === item.path ? { active: true } : {})}
    >
      {item.label}
    </Navbar.Link>
  );
}

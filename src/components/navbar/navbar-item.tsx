import { usePathname } from "next/navigation";
import { INavItem } from "Nav";
import { Navbar } from "flowbite-react";

export default function NavbarItem({ item }: { item: INavItem }) {
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

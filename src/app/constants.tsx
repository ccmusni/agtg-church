import { INavbarItem } from "Navbar";

export const NAV_ITEMS: INavbarItem[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Services",
    path: "/services",
  },
  {
    label: "Ministries",
    path: "/ministries",
    hasSubMenu: true,
    subMenuItems: [
      {
        label: "Young Adult Ministry",
        path: "/ministries-ya",
        hasSubMenu: true,
        subMenuItems: [
          { label: "Gallery", path: "/ministries-ya" },
          { label: "Members", path: "/ministries-ya/members", forAdmin: true },
          { label: "Online Cell Group", path: "/ministries-ya/online-cg" },
        ],
      },
    ],
  },
];

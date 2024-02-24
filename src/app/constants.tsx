import { INavItem } from "Nav";

export const NAV_ITEMS: INavItem[] = [
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
          { label: "Members", path: "/ministries-ya/members" },
          { label: "Online Cell Group", path: "/ministries-ya/online-cg" },
        ],
      },
    ],
  },
];

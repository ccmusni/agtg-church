import { INavItem } from "Nav";

export const NAV_ITEMS: INavItem[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Services",
    path: "/services",
  },
  {
    title: "Ministries",
    path: "/ministries",
    submenu: true,
    subMenuItems: [
      {
        title: "Young Adult Ministry",
        path: "/ministries-ya",
        submenu: true,
        subMenuItems: [
          { title: "Gallery", path: "/ministries-ya" },
          { title: "Members", path: "/ministries-ya/members" },
          { title: "Online Cell Group", path: "/ministries-ya/online-cg" },
        ],
      },
    ],
  },
];

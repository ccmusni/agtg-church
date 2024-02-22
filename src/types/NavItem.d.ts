declare module 'Nav' {

  interface INavItem {
    title: string;
    path: string;
    submenu?: boolean;
    subMenuItems?: INavItem[];
  }
}
declare module 'Nav' {

  interface INavItem {
    label: string;
    path: string;
    hasSubMenu?: boolean;
    subMenuItems?: INavItem[];
  }
}
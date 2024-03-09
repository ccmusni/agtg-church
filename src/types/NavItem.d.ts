declare module "Navbar" {
  interface INavbarItem {
    label: string;
    path: string;
    hasSubMenu?: boolean;
    subMenuItems?: INavbarItem[];
    forAdmin?: boolean;
  }
}

export default interface INavItem {
  label: string;
  adminOnly: boolean;
  href: string;
  subLabel?: string;
  children?: Array<INavItem>;
}

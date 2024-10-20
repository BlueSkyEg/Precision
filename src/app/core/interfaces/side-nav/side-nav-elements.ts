export interface SideNavElements {
  name: string;
  children?: SideNavElements[];
  icon?: string;
  route?: string;
  expanded?: boolean;
}

export interface SidebarState {
  navData: SideNavElements[];
}

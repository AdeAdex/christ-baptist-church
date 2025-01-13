export interface DropdownLink {
  path: string;
  label: string;
}

export interface NavLinkProps {
  path: string;
  label: string;
  dropdown?: DropdownLink[];
}

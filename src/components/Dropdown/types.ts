import { ReactNode } from "react";

export type DropdownProps = {
  id: string;
  buttonContent: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  toggleDropdown: () => void;
};

import {
  JustifyContentProps,
  LayoutProps,
  SpaceProps,
  TextAlignProps,
} from "styled-system";

export type ButtonProps = {
  value: string;
  icon?: "world" | "edit";
  onClick: () => void;
  isDisabled?: boolean;
  variant?: "primary" | "secondary";
} & SpaceProps &
  TextAlignProps &
  JustifyContentProps &
  LayoutProps;

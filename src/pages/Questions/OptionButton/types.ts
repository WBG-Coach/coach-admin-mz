import {
  JustifyContentProps,
  LayoutProps,
  SpaceProps,
  TextAlignProps,
} from "styled-system";

export type ButtonProps = {
  value: string;
  variant?: "primary" | "secondary";
} & SpaceProps &
  TextAlignProps &
  JustifyContentProps &
  LayoutProps;

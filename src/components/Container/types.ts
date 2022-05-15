import { ReactNode } from "react";
import { FlexboxProps, LayoutProps, SpaceProps } from "styled-system";

export type ContainerProps = {
  children?: ReactNode;
} & LayoutProps &
  SpaceProps &
  FlexboxProps;

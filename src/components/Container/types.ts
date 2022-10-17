import { ReactNode } from "react";
import {
  BackgroundProps,
  BorderProps,
  BoxShadowProps,
  FlexboxProps,
  GridGapProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
} from "styled-system";

export type ContainerProps = {
  children?: ReactNode;
  onClick?: () => void;
  hoverColor?: string;
  rotate?: number;
  hideScrollbar?: boolean;
  ref?: any;
} & LayoutProps &
  SpaceProps &
  FlexboxProps &
  BorderProps &
  BackgroundProps &
  PositionProps &
  GridGapProps &
  BoxShadowProps;

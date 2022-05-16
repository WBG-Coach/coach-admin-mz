import { ReactNode } from "react";
import {
  BackgroundProps,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
} from "styled-system";

export type ContainerProps = {
  children?: ReactNode;
} & LayoutProps &
  SpaceProps &
  BackgroundProps &
  FlexboxProps;

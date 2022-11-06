import { ReactNode } from "react";
import { LayoutProps, SpaceProps } from "styled-system";

export type CustomCardProps = {
  children: ReactNode;
  title: string;
  description?: string;
} & SpaceProps &
  LayoutProps;

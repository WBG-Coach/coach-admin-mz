import { PositionProps, SpaceProps } from "styled-system";

export type IconProps = {
  size: number;
  color?: string;
  rotate?: number;
  name: string;
} & SpaceProps &
  PositionProps;

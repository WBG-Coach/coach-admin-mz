import { SpaceProps } from "styled-system";

export type ButtonProps = {
  value: string;
  onClick: () => void;
} & SpaceProps;

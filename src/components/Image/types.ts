import { ImgHTMLAttributes } from "react";
import { SpaceProps } from "styled-system";

export type ImageProps = {
  src: string;
} & SpaceProps &
  ImgHTMLAttributes<HTMLInputElement>;

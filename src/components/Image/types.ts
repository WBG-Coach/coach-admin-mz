import { ImgHTMLAttributes } from "react";
import { BorderRadiusProps, SpaceProps } from "styled-system";

export type ImageProps = {
  src: string;
  transform?: string;
} & SpaceProps &
  ImgHTMLAttributes<HTMLInputElement> &
  BorderRadiusProps;

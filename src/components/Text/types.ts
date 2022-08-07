import { ReactNode } from "react";
import {
  ColorProps,
  FontSizeProps,
  FontWeightProps,
  LineHeightProps,
  SpaceProps,
  TextAlignProps,
} from "styled-system";

export type TextProps = {
  value?: string;
  children?: ReactNode;
} & SpaceProps &
  FontWeightProps &
  FontSizeProps &
  TextAlignProps &
  LineHeightProps &
  ColorProps;

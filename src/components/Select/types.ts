import { ReactNode } from "react";
import { FlexProps, SpaceProps } from "styled-system";

export type SelectProps<T> = {
  id?: string;
  options: T[];
  placeholder?: string;
  errorMessage?: string;
  layout?: "small" | "default";
  onChange: (option: T) => void;
  renderOption?: (option: T) => ReactNode;
  value?: string | number;
  label?: string;
} & SpaceProps &
  FlexProps;

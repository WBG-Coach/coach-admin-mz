import { FlexProps, SpaceProps } from "styled-system";

export type InputProps = {
  value?: string;
  icon?: "search";
  type?: string;
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  handlePressEnter?: () => void;
} & SpaceProps &
  FlexProps;

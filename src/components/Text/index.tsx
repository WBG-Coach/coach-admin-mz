import React from "react";
import { StyledText } from "./styles";
import { TextProps } from "./types";

export const Text: React.FC<TextProps> = (props) => {
  return <StyledText {...props}>{props.value || props.children}</StyledText>;
};

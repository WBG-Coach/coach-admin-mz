import React from "react";
import { StyledButton } from "./styles";
import { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props}>{props.value}</StyledButton>;
};

import React from "react";
import { StyledContainer } from "./styles";
import { ContainerProps } from "./types";

export const Container: React.FC<ContainerProps> = (props) => {
  return <StyledContainer {...props}>{props.children}</StyledContainer>;
};

import React from "react";
import { StyledContainer } from "./styles";
import { ContainerProps } from "./types";

export const Container: React.FC<ContainerProps> = React.forwardRef(
  (props, ref) => {
    return (
      <StyledContainer {...props} ref={ref}>
        {props.children}
      </StyledContainer>
    );
  }
);

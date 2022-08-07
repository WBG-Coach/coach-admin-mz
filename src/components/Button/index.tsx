import React from "react";
import { Icon } from "../Icon";
import { StyledButton } from "./styles";
import { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <StyledButton {...props} disabled={props.isDisabled}>
      {props.icon && (
        <Icon color="#ffffff" name={props.icon} mr={3} size={24} />
      )}
      {props.value}
    </StyledButton>
  );
};

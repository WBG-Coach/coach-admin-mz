import React from "react";
import { Container } from "../Container";
import { Icon } from "../Icon";
import { Text } from "../Text";
import {
  StyledErrorMessage,
  StyledInput,
  StyledInputContainer,
} from "./styles";
import { InputProps } from "./types";

export const Input: React.FC<InputProps> = ({
  icon,
  value,
  type,
  label,
  placeholder,
  errorMessage,
  onChangeText: onChange,
  ...props
}) => {
  return (
    <Container flexDirection="column" {...props}>
      {label && (
        <Text
          mb="4px"
          fontSize="14px"
          lineHeight="18px"
          fontWeight={600}
          value={label}
        />
      )}
      <StyledInputContainer hasError={errorMessage}>
        {icon && <Icon ml="8px" color="#494B50" size={24} name={icon} />}
        <StyledInput
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e: any): void => onChange(e.target.value)}
          onKeyPress={(event: React.KeyboardEvent) => {
            if (event.key === "Enter" && props?.handlePressEnter) {
              props.handlePressEnter();
            }
          }}
        />
      </StyledInputContainer>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </Container>
  );
};

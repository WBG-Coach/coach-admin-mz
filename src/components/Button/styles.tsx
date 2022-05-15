import styled from "styled-components";
import { space } from "styled-system";
import { ButtonProps } from "./types";

export const StyledButton = styled.button<ButtonProps>`
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 300ms;
  font-family: "Montserrat", sans-serif;
  background: ${(props) => props.theme.colors.primary};
  &:hover {
    opacity: 0.7;
  }
  ${space}
`;

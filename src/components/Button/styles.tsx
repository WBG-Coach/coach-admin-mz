import styled from "styled-components";
import { justifyContent, layout, space, textAlign } from "styled-system";
import { ButtonProps } from "./types";

export const StyledButton = styled.button<ButtonProps>`
  border: none;
  display: flex;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  font-style: normal;
  padding: 12px 24px;
  border-radius: 12px;
  transition: all 300ms;
  justify-content: center;
  font-family: "Inter", sans-serif;
  border: 1px solid ${(props) => props.theme.colors.primary};
  color: ${(props) =>
    props.variant === "secondary" ? props.theme.colors.primary : "#fff"};
  background: ${(props) =>
    props.isDisabled
      ? "#eee"
      : props.variant === "secondary"
      ? "#fff"
      : props.theme.colors.primary};
  &:hover {
    opacity: 0.7;
  }
  ${space}
  ${layout}
  ${textAlign}
  ${justifyContent}
`;

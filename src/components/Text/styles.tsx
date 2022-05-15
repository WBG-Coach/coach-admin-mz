import styled from "styled-components";
import { color, fontSize, fontWeight, space } from "styled-system";
import { TextProps } from "./types";

export const StyledText = styled.span<TextProps>`
  font-family: "Montserrat", sans-serif;
  ${space}
  ${color}
  ${fontSize}
  ${fontWeight}
`;

import styled from "styled-components";
import {
  color,
  fontSize,
  fontWeight,
  lineHeight,
  space,
  textAlign,
} from "styled-system";

export const StyledText = styled.span<any>`
  font-family: "Inter", sans-serif;
  display: flex;

  ${space}
  ${color}
  ${fontSize}
  ${fontWeight}
  ${textAlign}
  ${lineHeight}
`;

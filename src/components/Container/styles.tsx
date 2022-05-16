import styled from "styled-components";
import { background, flexbox, layout, space } from "styled-system";
import { ContainerProps } from "./types";

export const StyledContainer = styled.div<ContainerProps>`
  ${layout}
  ${space}
  ${flexbox}
  ${background}
  display: flex;
`;

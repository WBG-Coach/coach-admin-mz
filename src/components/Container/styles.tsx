import styled from "styled-components";
import { flexbox, layout, space } from "styled-system";
import { ContainerProps } from "./types";

export const StyledContainer = styled.div<ContainerProps>`
  ${layout}
  ${space}
  ${flexbox}
  display: flex;
`;

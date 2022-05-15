import styled from "styled-components";
import { size, space } from "styled-system";
import { ImageProps } from "./types";

export const StyledImage = styled.img<ImageProps>`
  ${size}
  ${space}
`;

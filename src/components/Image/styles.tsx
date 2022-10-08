import styled from "styled-components";
import { borderRadius, space } from "styled-system";

export const StyledImage = styled.img<any>`
  ${space}
  ${borderRadius}
  transform: ${(props) => props.transform};
`;

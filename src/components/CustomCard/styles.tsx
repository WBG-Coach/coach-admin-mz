import styled from "styled-components";
import { layout, space } from "styled-system";

export const StyledCustomCard = styled.div`
  width: fit-content;
  height: fit-content;
  ${space}
  ${layout}
  display: flex;
  overflow: hidden;
  border-radius: 12px;
  background: #ffffff;
  flex-direction: column;
  border: 1px solid #e6e6e6;
`;

export const StyledCustomCardHeader = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e6e6e6;
`;
export const StyledCustomCardContent = styled.div`
  flex: 1;
  padding: 24px;
`;

import styled, { css } from "styled-components";
import { space } from "styled-system";

export const StyledTabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #f4f5f5;
  gap: 20px;
  ${space}
`;

export const StyledTabItem = styled.div<{ isActive: boolean }>`
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #49504c;
  font-weight: 600;
  line-height: 20px;
  font-style: normal;
  border-radius: 2px;
  transition: all 300ms;
  font-family: "Inter", sans-serif;
  border-bottom: 2px solid transparent;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}10;
  }

  ${(props) =>
    props.isActive &&
    css`
      color: ${props.theme.colors.primary};
      border-color: ${props.theme.colors.primary};
    `}
`;

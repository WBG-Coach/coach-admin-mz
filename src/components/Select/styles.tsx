import styled, { css } from "styled-components";
import { layout, space } from "styled-system";

export const StyledSelectContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${space}
  ${layout}
`;

export const StyledSelectGroup = styled.div<{ hasError: boolean }>`
  cursor: pointer;
  border: 1px solid #d7e7e8;
  border-radius: 4px;
  transition: all 300ms;

  &:hover {
    background-color: #eeeeee22;
  }

  ${(props) =>
    props.hasError &&
    css`
      border-color: #d92626;
    `}

  ${space}
`;

export const StyledSelect = styled.select<{ layout?: string }>`
  width: 100%;
  border: none;
  padding: 14px 12px;
  padding-right: 0;
  border-radius: 4px;
  border-right: 12px solid transparent;
  color: ${(props) => (props.value ? "#000000" : "#757575")};

  ${(props) =>
    props.layout === "small" &&
    css`
      padding: 8px 12px;
      max-width: 70px;
    `};
`;

export const StyledOption = styled.option`
  padding: 4px;
  font-size: 14px;
`;

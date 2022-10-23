import styled, { css } from "styled-components";
import { layout, space } from "styled-system";

export const StyledSelectContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${space}
  ${layout}
`;

export const StyledSelectGroup = styled.div<{
  hasError: boolean;
  inFocus: boolean;
}>`
  cursor: pointer;
  border: 1px solid #d7e7e8;
  border-radius: 8px;
  transition: all 300ms;

  border: 1px solid
    ${(props) =>
      props.hasError ? "#e53935" : props.inFocus ? "#3373CC" : "#e3e5e8"};

  ${space}
`;

export const StyledSelect = styled.select<{ layout?: string }>`
  cursor: pointer;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  width: 100%;
  border: none;
  padding: 14px 12px;
  padding-right: 0;
  border-radius: 8px;
  border-right: 12px solid transparent;
  color: ${(props) => (props.value ? "#000000" : "#757575")};
  background-color: #f9fafb;
  outline: none;

  ${(props) =>
    props.layout === "small" &&
    css`
      padding: 8px 12px;
      max-width: 70px;
    `};
`;

export const StyledOption = styled.option`
  font-size: 14px;
`;

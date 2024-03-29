import styled from "styled-components";
import { flex, space } from "styled-system";

export const StyledInputContainer = styled.span<any>`
  ${space}
  ${flex}
  position: relative;
  background-color: #f9fafb;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid
    ${(props) =>
      props.hasError ? "#e53935" : props.inFocus ? "#3373CC" : "#e3e5e8"};
`;

export const StyledInput = styled.input`
  outline: none;
  font-family: "Inter", sans-serif;
  padding: 16px;
  font-size: 16px;
  margin: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  width: calc(100% - 32px);
`;

export const StyledErrorMessage = styled.span`
  font-family: "Inter", sans-serif;
  margin: 0;
  margin-top: 4px;
  font-size: 12px;
  border: none;
  color: #e53935;
`;

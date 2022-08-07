import styled from "styled-components";

export const StyledMenuItem = styled.div<{
  isSelected: boolean;
  borderColor: string;
}>`
  width: calc(100% - 32px);
  align-items: center;
  cursor: pointer;
  display: flex;
  padding: 8px 16px;
  flex-direction: row;
  border-left: 4px solid;
  border-radius: 4px;
  transition: all 300ms;
  background: ${(props) =>
    props.isSelected ? props.borderColor + "10" : "transparent"};
  border-color: ${(props) =>
    props.isSelected ? props.borderColor : "transparent"};

  &:hover {
    background: ${(props) =>
      props.isSelected ? props.borderColor + "10" : props.borderColor + "10"};
  }
`;

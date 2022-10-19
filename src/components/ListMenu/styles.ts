import styled from "styled-components";

export const StyledOption = styled.div<{ isLast: boolean }>`
  padding: 12px;
  transition: 200ms all;
  cursor: pointer;
  background-color: #ffffff;
  border-radius: ${(props) =>
    props.isLast ? "0px 0px 12px 12px" : "12px 12px 0px 0px"};

  &:hover {
    filter: brightness(0.9);
  }
`;

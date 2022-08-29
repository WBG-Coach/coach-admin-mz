import styled from "styled-components";

export const StyleModalContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const StyledModalContent = styled.div`
  padding: 16px;
  display: flex;
  min-width: 200px;
  max-width: 100vw;
  min-height: 200px;
  max-height: 100vh;
  border-radius: 8px;
  position: relative;
  flex-direction: column;
  background-color: #ffffff;
  padding-top: 40px;
`;

export const StyledCloseButton = styled.div`
  top: 16px;
  right: 16px;
  padding: 4px;
  cursor: pointer;
  border-radius: 8px;
  position: absolute;
  transition: all 300ms;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

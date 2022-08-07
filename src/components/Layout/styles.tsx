import styled from "styled-components";

export const StyledLayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledMenuContainer = styled.div`
  height: calc(100vh -32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  gap: 40px;
  width: 256px;
  background: #fafbfa;
  border-right: 1.00408px solid #e4e7e5;
  box-shadow: 0px 0px 10.0408px rgba(0, 0, 0, 0.1);
`;

export const StyledPageContent = styled.div`
  position: relative;
  width: calc(100vw - 256px);
  max-height: 100vh;
  overflow-y: auto;
`;

export const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 64px;
  border-bottom: 1px solid #f4f5f5;
`;

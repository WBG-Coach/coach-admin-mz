import styled, { css } from "styled-components";
import {
  background,
  border,
  boxShadow,
  flexbox,
  gridGap,
  layout,
  position,
  space,
} from "styled-system";
import { ContainerProps } from "./types";

export const StyledContainer = styled.div<ContainerProps>`
  transition: all 300ms;
  display: flex;
  ${layout}
  ${space}
  ${flexbox}
  ${position}
  ${border}
  ${background}
  ${gridGap}
  ${boxShadow}

  ${(props) =>
    props.rotate &&
    css`
      transform: rotate(${props.rotate}deg);
    `}

  ${(props) =>
    props.hideScrollbar &&
    css`
      &::-webkit-scrollbar {
        height: 0px;
      }
    `}

  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
      &:hover {
        opacity: 0.7;
        ${props.hoverColor && `background: ${props.hoverColor};`}
      }
    `}
`;

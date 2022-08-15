import { Icon } from "../Icon";
import React from "react";
import {
  StyledCloseButton,
  StyledModalContent,
  StyleModalContainer,
} from "./styles";
import { ModalProps } from "./types";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  ...otherProps
}) => {
  return (
    <>
      {isOpen && (
        <StyleModalContainer {...otherProps}>
          <StyledModalContent>
            <StyledCloseButton onClick={onClose}>
              <Icon name="close" size={24} color="#49504C" />
            </StyledCloseButton>
            {children}
          </StyledModalContent>
        </StyleModalContainer>
      )}
    </>
  );
};

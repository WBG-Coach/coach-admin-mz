import { Icon } from "../Icon";
import React from "react";
import {
  StyledCloseButton,
  StyledModalContent,
  StyleModalContainer,
} from "./styles";
import { ModalProps } from "./types";
import { Text } from "../Text";
import { Container } from "../Container";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  ...otherProps
}) => {
  return (
    <>
      {isOpen && (
        <StyleModalContainer {...otherProps}>
          <StyledModalContent>
            {onClose && (
              <StyledCloseButton onClick={onClose}>
                <Icon name="close" size={24} color="#49504C" />
              </StyledCloseButton>
            )}
            {title && (
              <Container
                flex={1}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text value={title} fontSize={"18px"} fontWeight={"600"} />
              </Container>
            )}
            {children}
          </StyledModalContent>
        </StyleModalContainer>
      )}
    </>
  );
};

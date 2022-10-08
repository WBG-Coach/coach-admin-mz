import { useCallback, useEffect, useRef, useState } from "react";
import { StyledDropDownContainer, StyledDropdownContent } from "./styles";
import { DropdownProps } from "./types";
import { Container } from "../Container";
import { Icon } from "../Icon";

export const Dropdown: React.FC<DropdownProps> = ({
  id,
  children,
  buttonContent,
}) => {
  const toggleContainer = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const toggleDropdown = () => setOpen(!isOpen);

  const onClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !toggleContainer?.current?.contains(target)) {
        setOpen(false);
        window.removeEventListener("click", onClickOutside, true);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    if (isOpen) window.addEventListener("click", onClickOutside, true);
  }, [onClickOutside, isOpen]);

  return (
    <StyledDropDownContainer id={id} ref={toggleContainer}>
      <Container
        minWidth="80px"
        minHeight="36px"
        justifyContent="flex-end"
        width="fit-content"
        overflow="hidden"
        borderRadius={"30px"}
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        border="1px solid #CCCCCC"
        aria-controls={`${id}-dropdown`}
      >
        <>{buttonContent}</>
        <Icon size={16} name="angle-down" my="auto" mx="8px" />
      </Container>

      {isOpen && (
        <StyledDropdownContent
          id={`${id}-dropdown`}
          tabIndex={0}
          role="listbox"
        >
          {children}
        </StyledDropdownContent>
      )}
    </StyledDropDownContainer>
  );
};

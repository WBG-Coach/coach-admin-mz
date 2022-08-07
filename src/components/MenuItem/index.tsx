import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PROJECT } from "../../mock";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { StyledMenuItem } from "./styles";
import { MenuItemProps } from "./types";

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isSelected = !!props?.route && pathname.endsWith(props.route || "");

  return (
    <StyledMenuItem
      isSelected={isSelected}
      borderColor={PROJECT.primaryColor}
      onClick={() =>
        props?.onClick ? props?.onClick() : navigate(props?.route || "")
      }
    >
      <Icon
        size={24}
        name={props.icon}
        mr="12px"
        color={isSelected ? PROJECT.primaryColor : "#49504C"}
      />
      <Text
        value={props.label}
        fontSize="14px"
        lineHeight="20px"
        color={isSelected ? PROJECT.primaryColor : "#49504C"}
      />
    </StyledMenuItem>
  );
};

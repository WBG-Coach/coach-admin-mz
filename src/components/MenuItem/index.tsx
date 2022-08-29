import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { StyledMenuItem } from "./styles";
import { MenuItemProps } from "./types";

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const isSelected = !!props?.route && pathname.endsWith(props.route || "");

  return (
    <StyledMenuItem
      isSelected={isSelected}
      borderColor={theme.colors.primary}
      onClick={() =>
        props?.onClick ? props?.onClick() : navigate(props?.route || "")
      }
    >
      <Icon
        size={24}
        name={props.icon}
        mr="12px"
        color={isSelected ? theme.colors.primary : "#49504C"}
      />
      <Text
        value={props.label}
        fontSize="14px"
        lineHeight="20px"
        color={isSelected ? theme.colors.primary : "#49504C"}
      />
    </StyledMenuItem>
  );
};

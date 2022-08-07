import IcomoonReact from "icomoon-react";
import React from "react";
import { Container } from "../Container";

import iconSet from "./selection.json";
import { IconProps } from "./types";

export const Icon: React.FC<IconProps> = (props) => {
  const { color, name, size, rotate, ...otherProps } = props;
  return (
    <Container
      {...otherProps}
      width={size}
      height={size}
      rotate={rotate}
      alignItems="center"
      justifyContent="center"
    >
      <IcomoonReact iconSet={iconSet} color={color} size={size} icon={name} />
    </Container>
  );
};

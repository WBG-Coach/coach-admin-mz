import { StyledCardContainer } from "./styles";
import { CardProps } from "./types";

export const Card: React.FC<CardProps> = ({ children, ...otherProps }) => {
  return <StyledCardContainer {...otherProps}>{children}</StyledCardContainer>;
};

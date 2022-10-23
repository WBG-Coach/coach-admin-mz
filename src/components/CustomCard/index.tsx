import { Text } from "../Text";
import {
  StyledCustomCard,
  StyledCustomCardContent,
  StyledCustomCardHeader,
} from "./styles";
import { CustomCardProps } from "./types";

export const CustomCard: React.FC<CustomCardProps> = ({
  children,
  title,
  description,
  ...otherProps
}) => {
  return (
    <StyledCustomCard {...otherProps}>
      <StyledCustomCardHeader>
        <Text
          mb="8px"
          value={title}
          fontSize="20px"
          lineHeight="28px"
          fontWeight="600"
          color="#16191D"
        />
        <Text
          fontSize="14px"
          fontWeight="400"
          lineHeight="20px"
          color="#576375"
          value={description}
        />
      </StyledCustomCardHeader>
      <StyledCustomCardContent>{children}</StyledCustomCardContent>
    </StyledCustomCard>
  );
};

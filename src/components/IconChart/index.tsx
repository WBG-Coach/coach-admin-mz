import { Container, Text } from "..";
import { Icon } from "../Icon";

const IconRules = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

export const IconChart: React.FC<{ value: number; iconName: string }> = ({
  value,
  iconName,
}) => {
  return (
    <>
      <Container flexDirection="row" alignItems="center">
        <Text
          mr="20px"
          fontWeight={600}
          fontSize="40px"
          value={(value * 100).toFixed(0) + "%"}
        />
        <Container flexDirection="row" flexWrap="wrap" width={56 * 5}>
          {IconRules.map((rule, index) => (
            <Icon
              key={index}
              size={56}
              name={iconName}
              color={value > rule ? "#3373CC" : "#ECEEED"}
            />
          ))}
        </Container>
      </Container>
    </>
  );
};

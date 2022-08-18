import { useTheme } from "styled-components";
import { Container, Text } from "../../../../../components";
import { CompetenceProgressProps } from "./types";

export const CompetenceProgress: React.FC<CompetenceProgressProps> = ({
  data,
  total,
}) => {
  const theme: any = useTheme();

  return (
    <Container flexDirection="column">
      <Container
        height="36px"
        alignItems="center"
        borderBottom="1px solid #F4F5F5"
      >
        <Container flex={1}>
          <Text
            value="COMPETENCE"
            color="#49504C"
            fontSize="14px"
            lineHeight="20px"
          />
        </Container>
        <Container width={100}>
          <Text
            ml="auto"
            value="SESSIONS"
            color="#49504C"
            fontSize="14px"
            lineHeight="20px"
          />
        </Container>
        <Container width={100}>
          <Text
            ml="auto"
            value="%"
            color="#49504C"
            fontSize="14px"
            lineHeight="20px"
          />
        </Container>
      </Container>

      {data.map((item, index) => (
        <span key={index}>
          <Container pt="16px" pb="8px" alignItems="center">
            <Container flex={1}>
              <Text value={item.name} fontSize="16px" lineHeight="24px" />
            </Container>
            <Container width={100}>
              <Text
                ml="auto"
                value={item.quantity.toString()}
                fontSize="16px"
                lineHeight="24px"
              />
            </Container>
            <Container width={100}>
              <Text
                ml="auto"
                value={((item.quantity / total) * 100).toFixed(0) + "%"}
                fontSize="16px"
                lineHeight="24px"
              />
            </Container>
          </Container>

          <Container
            height="4px"
            borderRadius="2px"
            width="100%"
            background="#E4E7E5"
          >
            <Container
              borderRadius="2px"
              width={(item.quantity / total) * 100 + "%"}
              background={theme?.colors.primary}
            />
          </Container>
        </span>
      ))}
    </Container>
  );
};

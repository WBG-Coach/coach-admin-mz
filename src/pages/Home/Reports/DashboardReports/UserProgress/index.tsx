import { useTheme } from "styled-components";
import { Container } from "../../../../../components/Container";
import { Text } from "../../../../../components/Text";
import { UserProgressProps } from "./types";

export const UserProgress: React.FC<UserProgressProps> = (props) => {
  const theme: any = useTheme();

  return (
    <>
      <Container alignItems="center">
        <Container
          mr="16px"
          width="40px"
          height="40px"
          overflow="hidden"
          alignItems="center"
          borderRadius="20px"
          background="#F4F5F5"
          justifyContent="center"
        >
          <Text
            fontSize="24px"
            color="#49504C"
            value={props.name.substring(0, 1)}
          />
        </Container>

        <Container flexDirection="column" flex={1}>
          <Text
            value={props.name}
            fontWeight={500}
            fontSize="16px"
            lineHeight="24px"
          />
          <Text
            value={props.description}
            fontWeight={400}
            color="#7D827F"
            fontSize="14px"
            lineHeight="20px"
          />
        </Container>

        <Container>
          <Text
            value={props.value.toString()}
            fontSize="24px"
            lineHeight="28px"
            fontWeight={600}
          />
        </Container>
      </Container>
      <Container
        mt="8px"
        height="4px"
        borderRadius="2px"
        width="100%"
        background="#E4E7E5"
      >
        <Container
          borderRadius="2px"
          width={(props.value / props.total) * 100 + "%"}
          background={theme?.colors.primary}
        />
      </Container>
    </>
  );
};

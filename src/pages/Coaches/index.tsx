import React from "react";
import { Container, Text } from "../../components";

const Coaches: React.FC<{}> = () => {
  return (
    <Container
      width="100%"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Text fontSize={32} mt={24}>
        Admin - Coaches
      </Text>
    </Container>
  );
};

export default Coaches;

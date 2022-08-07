import React from "react";
import { Container, Text } from "../../components";

const Schools: React.FC<{}> = () => {
  return (
    <Container
      width="100%"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Text fontSize={32} mt={24}>
        Admin - Schools
      </Text>
    </Container>
  );
};

export default Schools;

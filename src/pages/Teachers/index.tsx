import React from "react";
import { Container, Text } from "../../components";

const Teachers: React.FC<{}> = () => {
  return (
    <Container
      width="100%"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Text fontSize={32} mt={24}>
        Admin - Teachers
      </Text>
    </Container>
  );
};

export default Teachers;

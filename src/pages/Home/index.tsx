import React from "react";
import { Container, Text } from "../../components";

const Home: React.FC<{}> = () => {
  return (
    <Container
      background="#333"
      width="100%"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Text fontSize={32} mt={24} color="#fff">
        Admin - Home
      </Text>
    </Container>
  );
};

export default Home;

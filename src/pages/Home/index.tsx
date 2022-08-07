import React from "react";
import { Container, Text } from "../../components";

const Home: React.FC<{}> = () => {
  return (
    <Container
      width="100%"
      minHeight="200vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Text fontSize={32} mt={24}>
        Admin - Home
      </Text>
    </Container>
  );
};

export default Home;

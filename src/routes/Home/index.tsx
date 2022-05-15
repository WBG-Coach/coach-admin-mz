import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WorldBank from "../../assets/images/world-bank.png";
import { Button, Container, Image, Text } from "../../components";
import {
  decremented,
  incremented,
  selectCounterValue,
} from "../../store/counter";

const Home: React.FC<{}> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const value = useSelector(selectCounterValue);

  return (
    <Container
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Text fontSize={32} mt={24}>
        Home
      </Text>
      <Image src={WorldBank} />
      <Container flexDirection="row" mb={3}>
        <Button value="-" onClick={() => dispatch(decremented())} />
        <Text fontSize={32} mx={12}>
          {value}
        </Text>
        <Button value="+" onClick={() => dispatch(incremented())} />
      </Container>
      <Button value="Go to login" onClick={() => navigate("login")} />
    </Container>
  );
};

export default Home;

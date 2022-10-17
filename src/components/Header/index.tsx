import { Container } from "../Container";
import { LanguageButton } from "./LanguageButton";
import ProfileDetail from "./ProfileDetail";
import { StyledHeaderContainer } from "./styles";

const Header: React.FC = () => {
  return (
    <StyledHeaderContainer>
      <Container height={"32px"}>
        <LanguageButton />
        <Container
          mx={"16px"}
          width={"1px"}
          height={"100%"}
          background={"#F4F5F5"}
        />
        <ProfileDetail />
      </Container>
    </StyledHeaderContainer>
  );
};

export default Header;

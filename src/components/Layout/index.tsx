import React from "react";
import { useDispatch } from "react-redux";
import { PROJECT } from "../../mock";
import { logout } from "../../store/auth";
import { Container } from "../Container";
import { Image } from "../Image";
import { LanguageButton } from "../LanguageButton";
import { MenuItem } from "../MenuItem";
import { Text } from "../Text";
import {
  StyledPageContent,
  StyledLayoutContainer,
  StyledMenuContainer,
  StyledHeaderContainer,
} from "./styles";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const selectedProject = PROJECT;
  const dispatch = useDispatch();

  return (
    <StyledLayoutContainer>
      <StyledMenuContainer>
        <Image src={selectedProject.image} height={32} />
        <Container flexDirection="column" width="100%" height="100%">
          <MenuItem icon="home-alt" route="/" label="Dashboard" />
          <MenuItem
            icon="puzzle-piece"
            route="/competencies"
            label="Competencies"
          />

          <Text
            py="8px"
            px="16px"
            value="QUESTIONNAIRE"
            fontSize="12px"
            color="#7D827F"
          />

          <MenuItem
            icon="clipboard-notes"
            route="/observation-questionnaire"
            label="Observation"
          />
          <MenuItem
            icon="comments"
            route="/feedbacks-questionnaire"
            label="Feedback"
          />

          <Text
            py="8px"
            px="16px"
            value="SCHOOL"
            fontSize="12px"
            color="#7D827F"
          />

          <MenuItem icon="university" route="/schools" label="Units" />
          <MenuItem icon="user" route="/coaches" label="Coaches" />
          <MenuItem icon="user-circle" route="/teachers" label="Teachers" />
          <MenuItem icon="notes" route="/sessions" label="Sessions" />
          <MenuItem icon="setting" route="/settings" label="Settings" />

          <Container mt="auto" />
          <MenuItem
            icon="signout"
            label="Logout"
            onClick={() => dispatch(logout())}
          />
        </Container>
      </StyledMenuContainer>
      <StyledPageContent>
        <StyledHeaderContainer>
          <LanguageButton />
        </StyledHeaderContainer>
        {children}
      </StyledPageContent>
    </StyledLayoutContainer>
  );
};

export default Layout;

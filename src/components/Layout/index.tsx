import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../../store/auth";
import { Container } from "../Container";
import { Image } from "../Image";
import { MenuItem } from "../MenuItem";
import { Text } from "../Text";
import logo from "../../assets/images/logo.svg";

import {
  StyledPageContent,
  StyledLayoutContainer,
  StyledMenuContainer,
} from "./styles";
import { Modal } from "../Modal";
import { SelectProject } from "../SelectProject";
import { SelectProjectButton } from "../SelectProjectButton";
import Header from "../Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  return (
    <StyledLayoutContainer>
      <StyledMenuContainer>
        <Image src={logo} height={32} />
        <SelectProjectButton />
        <Container flexDirection="column" width="100%" height="100%">
          <MenuItem icon="home-alt" route="/" label="Dashboard" />
          <MenuItem icon="box" label="Projects" route="/projects" />
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
          <MenuItem
            icon="clipboard-notes"
            route="/documentations-questionnaire"
            label="Documentation"
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
        <Header />
        {user.currentProject && children}
        <Modal isOpen={!user.currentProject}>
          <SelectProject />
        </Modal>
      </StyledPageContent>
    </StyledLayoutContainer>
  );
};

export default Layout;

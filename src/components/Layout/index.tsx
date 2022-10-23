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
import { MenuItems } from "../../common";
import { useTranslation } from "react-i18next";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useSelector(selectCurrentUser);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <StyledLayoutContainer>
      <StyledMenuContainer>
        <Image src={logo} height={32} />
        <SelectProjectButton />
        <Container flexDirection="column" width="100%" height="100%">
          {MenuItems.map((item) =>
            item.subItems ? (
              <>
                <Text
                  py="8px"
                  px="16px"
                  value={t(`Navbar.${item.label}`)}
                  fontSize="12px"
                  color="#7D827F"
                />
                {item.subItems.map((subItem) => (
                  <MenuItem
                    icon={subItem.icon}
                    label={t(`Navbar.${subItem.label}`)}
                    route={subItem.route}
                  />
                ))}
              </>
            ) : item.lasts ? (
              <Container mt="auto">
                {item.lasts.map((lastItem) => (
                  <MenuItem
                    icon={lastItem.icon}
                    label={t(`Navbar.${lastItem.label}`)}
                    onClick={() => dispatch(logout())}
                  />
                ))}
              </Container>
            ) : (
              <MenuItem
                icon={item.icon}
                label={t(`Navbar.${item.label}`)}
                route={item.route}
              />
            )
          )}
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

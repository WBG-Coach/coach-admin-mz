import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "../../components";
import BreadCrumb from "../../components/Breadcrumb";
import { Icon } from "../../components/Icon";
import ChangePassword from "./ChangePassword";
import EditUser from "./EditUser";
import Users from "./Users";

const Settings: React.FC<{}> = () => {
  const { t } = useTranslation();
  const [currentOption, setCurrentOption] = useState(0);
  const options = [
    {
      label: t("Settings.ChangePassword.title"),
      icon: "user-circle",
      component: <EditUser />,
    },
    {
      label: t("Settings.EditUser.title"),
      icon: "user-circle",
      component: <ChangePassword />,
    },
    {
      label: t("Settings.Users.title"),
      icon: "user",
      component: <Users />,
    },
  ];

  return (
    <Container flexDirection={"column"} width={"100%"}>
      <BreadCrumb />
      <Text mb={40} fontSize={32} fontWeight={600} value={"Configurações"} />
      <Container width={"100%"}>
        <Container
          flexDirection={"column"}
          minWidth={"266px"}
          pr={"8px"}
          borderRight={"1px solid #E3E6E9"}
        >
          {options.map((opt, index) => {
            const isActive = index === currentOption;

            return (
              <Container
                py={"14px"}
                px={"10px"}
                key={index}
                borderRadius={"4px"}
                background={isActive ? "#EBF1FF" : "transparent"}
                onClick={() => setCurrentOption(index)}
              >
                <Icon
                  name={opt.icon}
                  size={20}
                  color={isActive ? "#3373CC" : "#576375"}
                />
                <Text
                  ml={"14px"}
                  fontWeight={500}
                  fontSize={"16px"}
                  color={isActive ? "#3373CC" : "#576375"}
                >
                  {opt.label}
                </Text>
              </Container>
            );
          })}
        </Container>
        <Container width={"100%"} px={"32px"}>
          {options[currentOption].component}
        </Container>
      </Container>
    </Container>
  );
};

export default Settings;

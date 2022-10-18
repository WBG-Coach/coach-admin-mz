import "react-spring-bottom-sheet/dist/style.css";
import React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "../../Icon";
import { setLocalLanguage } from "../../../storage";
import Select from "react-select";
import { Container } from "../../Container";

const NAMES: any = {
  "pt-MZ": "PT",
  "en-US": "EN",
};
const LANGUAGES: any = [
  {
    label: "PT",
    value: "pt-MZ",
  },
  {
    label: "EN",
    value: "en-US",
  },
];

export const LanguageButton: React.FC<{}> = () => {
  const { i18n } = useTranslation();

  const handleLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLocalLanguage(language);
  };

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,

      background: state.isFocused ? "#000000" : "transparent",
      color: state.isFocused ? "#ffffff" : "#000000",
      fontFamily: '"Inter", sans-serif',
    }),
    input: (base: any) => ({
      ...base,
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      fontFamily: '"Inter", sans-serif',
      borderColor: "transparent",
      borderWidth: "0px",
      boxShadow: "none",
    }),
  };

  return (
    <Container alignItems={"center"}>
      <Icon name="internet" size={24} />
      <Select
        styles={customStyles}
        defaultValue={{
          value: NAMES[i18n.language],
          label: NAMES[i18n.language],
        }}
        options={LANGUAGES}
        onChange={(event) => {
          handleLanguage(event?.value);
        }}
      />
    </Container>
  );
};

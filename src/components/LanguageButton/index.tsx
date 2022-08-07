import "react-spring-bottom-sheet/dist/style.css";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "../Container";
import { BottomSheet } from "react-spring-bottom-sheet";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { setLocalLanguage } from "../../storage";

const NAMES: any = {
  "pt-MZ": "PT",
  "en-US": "EN",
};
const LANGUAGES: any = [
  {
    name: "Português",
    value: "pt-MZ",
  },
  {
    name: "English",
    value: "en-US",
  },
];

export const LanguageButton: React.FC<{}> = () => {
  const { i18n } = useTranslation();
  const [isOpen, setOpen] = useState(false);

  const handleLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLocalLanguage(language);
    setOpen(false);
  };

  return (
    <>
      <Container>
        <Container alignItems="center" onClick={() => setOpen(true)}>
          <Icon name="internet" size={24} />
          <Text mx="4px" value={NAMES[i18n.language]} />
          <Icon name="chevron-bottom" size={24} />
        </Container>
      </Container>
      <BottomSheet open={isOpen} onDismiss={() => setOpen(false)}>
        <Container p="16px" width="100%" flexDirection="column">
          {LANGUAGES.map((language: any) => (
            <Container
              key={language.value}
              onClick={() => handleLanguage(language.value)}
              height="40px"
              alignItems="center"
              borderBottom="1px solid #eee"
            >
              <Text
                fontSize="16px"
                value={language.name}
                color={i18n.language === language.value ? "primary" : "#000"}
                fontWeight={i18n.language === language.value ? 600 : 400}
              />
            </Container>
          ))}
        </Container>
      </BottomSheet>
    </>
  );
};

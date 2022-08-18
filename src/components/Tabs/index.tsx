import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyledTabContainer, StyledTabItem } from "./styles";
import { TabsProps } from "./type";

export const Tabs: React.FC<TabsProps> = ({
  titles,
  onClickTab,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    onClickTab(currentIndex);
  }, [onClickTab, currentIndex]);

  return (
    <StyledTabContainer {...otherProps}>
      {titles.map((title, index) => (
        <StyledTabItem
          key={index}
          isActive={currentIndex === index}
          onClick={() => setCurrentIndex(index)}
        >
          {t(title)}
        </StyledTabItem>
      ))}
    </StyledTabContainer>
  );
};

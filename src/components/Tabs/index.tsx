import { useEffect, useState } from "react";
import { StyledTabContainer, StyledTabItem } from "./styles";
import { TabsProps } from "./type";

export const Tabs: React.FC<TabsProps> = ({
  titles,
  onClickTab,
  ...otherProps
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    onClickTab(currentIndex);
  }, [onClickTab, currentIndex]);

  return (
    <StyledTabContainer {...otherProps}>
      {titles.map((title, index) => (
        <StyledTabItem
          isActive={currentIndex === index}
          onClick={() => setCurrentIndex(index)}
        >
          {title}
        </StyledTabItem>
      ))}
    </StyledTabContainer>
  );
};

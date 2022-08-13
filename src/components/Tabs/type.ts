import { SpaceProps } from "styled-system";

export type TabsProps = {
  titles: string[];
  onClickTab: (index: number) => void;
} & SpaceProps;

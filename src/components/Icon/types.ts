import { PositionProps, SpaceProps } from "styled-system";

export type IconProps = {
  size: number;
  color?: string;
  rotate?: number;
  name:
    | "eye"
    | "plus"
    | "home"
    | "file"
    | "close"
    | "world"
    | "notes"
    | "check"
    | "camera"
    | "search"
    | "comments"
    | "internet"
    | "edit-file"
    | "thumbs-up"
    | "file-blank"
    | "graduation"
    | "arrow-left"
    | "thumbs-down"
    | "chevron-right"
    | "clipboard-notes"
    | "comments-outline"
    | "chevron-bottom"
    | string;
} & SpaceProps &
  PositionProps;

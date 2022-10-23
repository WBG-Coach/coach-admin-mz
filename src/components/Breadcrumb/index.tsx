import { selectCurrentUser } from "../../store/auth";
import { useSelector } from "react-redux";
import { Text } from "../Text";
import { Props } from "./types";
import { useLocation } from "react-router-dom";
import { MenuItems } from "../../common";
import { useTranslation } from "react-i18next";

const BreadCrumb: React.FC<Props> = ({ customParam }) => {
  const user = useSelector(selectCurrentUser);
  const { t } = useTranslation();
  const route = useLocation();
  const routeLabel = MenuItems.reduce((acc, item) => {
    if (item.subItems) {
      const labelIndex = item.subItems.findIndex((subItem) =>
        route.pathname.includes(subItem.route)
      );
      if (labelIndex >= 0) {
        return item?.subItems[labelIndex]?.label;
      }
    } else {
      if (item.route && route.pathname.includes(item.route)) {
        console.log(item.route);
        return item?.label;
      }
    }

    return acc;
  }, "" as any);

  return (
    <Text
      value={`${t("Projects.title")} / ${user.currentProject?.name} / ${t(
        `Navbar.${routeLabel}`
      )} ${customParam ? "/ " + customParam : ""}`}
      fontSize={"14px"}
      fontWeight={400}
      color={"#49504C"}
      mb={"16px"}
    />
  );
};

export default BreadCrumb;

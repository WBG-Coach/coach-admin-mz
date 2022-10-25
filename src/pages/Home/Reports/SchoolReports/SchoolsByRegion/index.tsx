import { useTranslation } from "react-i18next";
import { Text } from "../../../../../components";
import { CustomCard } from "../../../../../components/CustomCard";

export const SchoolsByRegion = () => {
  const { t } = useTranslation();
  return (
    <CustomCard
      mb="16px"
      width="100%"
      title={t("Dashboard.SchoolReports.schools-by-region")}
      description={t("Dashboard.SchoolReports.schools-by-region-description")}
    >
      <Text value="Coming soon" />
    </CustomCard>
  );
};

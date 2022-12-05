import { useTranslation } from "react-i18next";
import { Text } from "../../../../components";
import { CustomCard } from "../../../../components/CustomCard";
import { LoadingDots } from "../../../../components/LoadingDots";
import { CompetenceProgress } from "./CompetenceProgress";
import { DashboardReportsProps } from "./types";

export const DashboardReports: React.FC<DashboardReportsProps> = (props) => {
  const { t } = useTranslation();
  return props.isLoading ? (
    <LoadingDots />
  ) : (
    <CustomCard
      width="100%"
      title={t("Dashboard.DashboardReports.competency-by-feedback")}
      description={t("Dashboard.DashboardReports.competency-by-feedback")}
    >
      <Text mb="32px" fontSize="18px" lineHeight="24px" value="" />
      <CompetenceProgress
        data={props.data?.competencies || []}
        total={
          props.data?.competencies.reduce(
            (acc, item) => acc + item.quantity,
            0
          ) || 0
        }
      />
    </CustomCard>
  );
};

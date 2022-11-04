import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CustomCard } from "../../../../../components/CustomCard";
import { IconChart } from "../../../../../components/IconChart";
import { LoadingDots } from "../../../../../components/LoadingDots";
import { useGetSchoolsBySessionMutation } from "../../../../../service/reports";

export const SchoolsBySession = () => {
  const { t } = useTranslation();
  const [getSchoolsBySession, { data, isLoading }] =
    useGetSchoolsBySessionMutation();

  useEffect(() => {
    getSchoolsBySession();
  }, [getSchoolsBySession]);

  return (
    <CustomCard
      ml="16px"
      width={"700px"}
      title={t("Dashboard.SchoolReports.schools-without-sessions")}
      description={t(
        "Dashboard.SchoolReports.schools-without-sessions-description"
      )}
    >
      {isLoading ? (
        <LoadingDots />
      ) : (
        <IconChart
          iconName="home-solid"
          value={
            data?.schools_without_sessions && data?.schools_quantity
              ? data?.schools_without_sessions / data?.schools_quantity
              : 0
          }
        />
      )}
    </CustomCard>
  );
};

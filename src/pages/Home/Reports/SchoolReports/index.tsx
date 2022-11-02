import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Container } from "../../../../components";
import { CustomCard } from "../../../../components/CustomCard";
import { IconChart } from "../../../../components/IconChart";
import { LoadingDots } from "../../../../components/LoadingDots";
import { SessionTable } from "../../../../components/SessionTable";
import { useGetReportSessionPerSchoolMutation } from "../../../../service/reports";
import { selectCurrentUser } from "../../../../store/auth";
import { EvolutionOfSchools } from "./EvolutionOfSchools";
import { SchoolsByRegion } from "./SchoolsByRegion";

export const SchoolReports: React.FC<{
  start_date: Date;
  end_date: Date;
}> = ({ end_date, start_date }) => {
  const [getReport, { data }] = useGetReportSessionPerSchoolMutation();
  const { t } = useTranslation();

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    getReport({
      end_date,
      start_date,
      project_id: user.currentProject?.id || 0,
    });
  }, [getReport, end_date, start_date, user]);

  return !data ? (
    <LoadingDots />
  ) : (
    <Container flexDirection="column" width="100%">
      <EvolutionOfSchools />

      <SchoolsByRegion />

      <Container>
        <CustomCard
          width="100%"
          title={t("Dashboard.SchoolReports.list-schools")}
          description={t("Dashboard.SchoolReports.list-schools-description")}
        >
          <SessionTable data={data} />
        </CustomCard>
        <CustomCard
          ml="16px"
          width={"700px"}
          title={t("Dashboard.SchoolReports.schools-without-sessions")}
          description={t(
            "Dashboard.SchoolReports.schools-without-sessions-description"
          )}
        >
          <IconChart iconName="home-solid" value={0.7} />
        </CustomCard>
      </Container>
    </Container>
  );
};

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Container } from "../../../../components";
import { CustomCard } from "../../../../components/CustomCard";
import { IconChart } from "../../../../components/IconChart";
import { LoadingDots } from "../../../../components/LoadingDots";
import { SessionTable } from "../../../../components/SessionTable";
import { useGetReportSessionPerSchoolMutation } from "../../../../service";
import { selectCurrentUser } from "../../../../store/auth";

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
      <CustomCard
        mb="16px"
        width="100%"
        title="Schools that improved the most"
        description="Schools with more positive competences among their teachers in 2022."
      >
        <></>
      </CustomCard>
      <Container>
        <CustomCard
          width="100%"
          title="Schools"
          description="List of all schools"
        >
          <SessionTable data={data} />
        </CustomCard>
        <CustomCard
          ml="16px"
          width={"700px"}
          title={t("Dashboard.schools-without-sessions-chart-title")}
          description={t(
            "Dashboard.schools-without-sessions-chart-description"
          )}
        >
          <IconChart iconName="home-alt" value={0.7} />
        </CustomCard>
      </Container>
    </Container>
  );
};

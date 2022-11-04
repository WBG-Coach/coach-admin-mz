import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Container } from "../../../../components";
import { CustomCard } from "../../../../components/CustomCard";
import { IconChart } from "../../../../components/IconChart";
import { LoadingDots } from "../../../../components/LoadingDots";
import { SessionTable } from "../../../../components/SessionTable";
import { useGetReportSessionPerCoachMutation } from "../../../../service/reports";
import { selectCurrentUser } from "../../../../store/auth";
import { AnswersByCity } from "./AnswersByCity";

export const CoachReports: React.FC<{
  start_date: Date;
  end_date: Date;
}> = ({ end_date, start_date }) => {
  const [getReport, { data }] = useGetReportSessionPerCoachMutation();
  const user = useSelector(selectCurrentUser);
  const { t } = useTranslation();

  useEffect(() => {
    getReport({
      end_date,
      start_date,
      project_id: user.currentProject?.id || 0,
    });
  }, [getReport, end_date, start_date, user]);

  return (
    <Container flexDirection="column" gridGap="16px">
      {!data ? (
        <LoadingDots />
      ) : (
        <Container>
          <CustomCard
            mr="20px"
            width="100%"
            title={t("Dashboard.CoachReports.all-coaches")}
            description={
              t("Dashboard.CoachReports.coaches-from") +
              user.currentProject?.name
            }
          >
            <SessionTable data={data} />
          </CustomCard>
        </Container>
      )}

      <Container>
        <CustomCard
          width="100%"
          mr="16px"
          title={t("Dashboard.CoachReports.session-by-region")}
          description={t(
            "Dashboard.CoachReports.session-by-region-description"
          )}
        >
          <AnswersByCity />
        </CustomCard>

        <CustomCard
          width="700px"
          title={t("Dashboard.CoachReports.without-feedback")}
          description={t("Dashboard.CoachReports.without-feedback-description")}
        >
          <IconChart iconName="person" value={0.3} />
        </CustomCard>
      </Container>
    </Container>
  );
};

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Container } from "../../../../components";
import { CustomCard } from "../../../../components/CustomCard";
import { LoadingDots } from "../../../../components/LoadingDots";
import { SessionTable } from "../../../../components/SessionTable";
import { useGetReportSessionPerTeacherMutation } from "../../../../service/reports";
import { selectCurrentUser } from "../../../../store/auth";
import { ProductiveFeedbackChart } from "./ProductiveFeedbackChart";
import { TeachersEvolutionChart } from "./TeachersEvolutionChart";
import { TeachersWithoutFeedbackChart } from "./TeachersWithoutFeedbackChart";

export const TeacherReports: React.FC<{
  start_date: Date;
  end_date: Date;
}> = ({ end_date, start_date }) => {
  const [getReport, { data }] = useGetReportSessionPerTeacherMutation();

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
        <Container flexDirection="column">
          <Container mb="16px" gridGap="16px">
            <TeachersWithoutFeedbackChart
              end_date={end_date}
              start_date={start_date}
            />
            <TeachersEvolutionChart />
            <ProductiveFeedbackChart />
          </Container>
          <CustomCard
            width="100%"
            title={t("Dashboard.TeacherReports.all-teachers")}
            description={
              t("Dashboard.TeacherReports.all-teachers-description") +
              user.currentProject?.name
            }
          >
            <SessionTable data={data} />
          </CustomCard>
        </Container>
      )}
    </Container>
  );
};

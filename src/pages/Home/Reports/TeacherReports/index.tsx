import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "../../../../components";
import { LoadingDots } from "../../../../components/LoadingDots";
import { useGetReportSessionPerTeacherMutation } from "../../../../service/reports";
import { selectCurrentUser } from "../../../../store/auth";
import { ProductiveFeedbackChart } from "./ProductiveFeedbackChart";
import { TeachersWithoutFeedbackChart } from "./TeachersWithoutFeedbackChart";

export const TeacherReports: React.FC<{
  start_date: Date;
  end_date: Date;
}> = ({ end_date, start_date }) => {
  const [getReport, { data }] = useGetReportSessionPerTeacherMutation();

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
    <Container flexDirection="column">
      <Container mb="16px" gridGap="16px">
        <TeachersWithoutFeedbackChart
          end_date={end_date}
          start_date={start_date}
        />
        <ProductiveFeedbackChart />
      </Container>
    </Container>
  );
};

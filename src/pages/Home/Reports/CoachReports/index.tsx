import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "../../../../components";
import { Card } from "../../../../components/Card";
import { LoadingDots } from "../../../../components/LoadingDots";
import { SessionTable } from "../../../../components/SessionTable";
import { useGetReportSessionPerCoachMutation } from "../../../../service";
import { selectCurrentUser } from "../../../../store/auth";

export const CoachReports: React.FC<{
  start_date: Date;
  end_date: Date;
}> = ({ end_date, start_date }) => {
  const [getReport, { data }] = useGetReportSessionPerCoachMutation();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    getReport({ end_date, start_date, project_id: user.project?.id || 0 });
  }, [getReport, end_date, start_date, user]);

  return (
    <Container flexDirection="column" gridGap="16px">
      {!data ? (
        <LoadingDots />
      ) : (
        <Card flex={1}>
          <SessionTable data={data} />
        </Card>
      )}
    </Container>
  );
};

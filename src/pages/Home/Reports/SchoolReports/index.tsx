import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "../../../../components";
import { LoadingDots } from "../../../../components/LoadingDots";
import { useGetReportSessionPerSchoolMutation } from "../../../../service/reports";
import { selectCurrentUser } from "../../../../store/auth";
import { SchoolsByRegion } from "./SchoolsByRegion";
import { SchoolsBySession } from "./SchoolsBySession";

export const SchoolReports: React.FC<{
  start_date: Date;
  end_date: Date;
}> = ({ end_date, start_date }) => {
  const [getReport, { data }] = useGetReportSessionPerSchoolMutation();

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
      <SchoolsByRegion />
      <SchoolsBySession />
    </Container>
  );
};

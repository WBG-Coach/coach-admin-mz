import { Container, Text } from "../../../../components";
import { Card } from "../../../../components/Card";
import { LoadingDots } from "../../../../components/LoadingDots";
import { CompetenceProgress } from "./CompetenceProgress";
import { DashboardReportsProps } from "./types";
import { UserProgress } from "./UserProgress";

export const DashboardReports: React.FC<DashboardReportsProps> = (props) => {
  return props.isLoading ? (
    <LoadingDots />
  ) : (
    <Container flexDirection="column" gridGap="16px">
      <Container width="100%" gridGap="16px">
        <Card flex={1}>
          <Text
            mb="32px"
            fontSize="18px"
            lineHeight="24px"
            value="Total feedback by competency"
          />
          <CompetenceProgress
            data={props.data?.competencies || []}
            total={props.data?.questionnaire_applications_qty || 0}
          />
        </Card>

        <Container flexDirection="column" maxWidth="360px" width="50%">
          <Card mb="16px">
            <Text
              mb="32px"
              fontSize="18px"
              lineHeight="24px"
              value="Teacher with the most sessions"
            />

            <UserProgress
              imageUrl={props.data?.teacher_most_sessions?.user?.image_url}
              value={props.data?.teacher_most_sessions.quantity || 0}
              name={props.data?.teacher_most_sessions.user?.name || ""}
              total={props.data?.questionnaire_applications_qty || 0}
              description={
                props.data?.teacher_most_sessions.user?.subject || ""
              }
            />
          </Card>
          <Card>
            <Text
              mb="16px"
              fontSize="18px"
              lineHeight="24px"
              value="Coach with the most sessions"
            />
            <UserProgress
              imageUrl={props.data?.coach_most_sessions?.user?.image_url}
              value={props.data?.coach_most_sessions.quantity || 0}
              name={props.data?.coach_most_sessions.user?.name || ""}
              total={props.data?.questionnaire_applications_qty || 0}
              description={props.data?.coach_most_sessions.user?.email || ""}
            />
          </Card>
        </Container>
      </Container>
    </Container>
  );
};

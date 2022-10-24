import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "../../../../../components";
import { CustomCard } from "../../../../../components/CustomCard";
import { IconChart } from "../../../../../components/IconChart";
import { LoadingDots } from "../../../../../components/LoadingDots";
import { useGetSessionsQuantityMutation } from "../../../../../service/reports";
import { selectCurrentUser } from "../../../../../store/auth";

export const TeachersWithoutFeedbackChart: React.FC<{
  end_date: Date;
  start_date: Date;
}> = ({ end_date, start_date }) => {
  const [getSessionsQuantity, { data }] = useGetSessionsQuantityMutation();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    getSessionsQuantity({
      project_id: user.currentProject?.id || 0,
      end_date,
      start_date,
    });
  }, [end_date, start_date, user, getSessionsQuantity]);

  return (
    <CustomCard
      width="100%"
      title="Teachers without feedbacks"
      description="Teachers who did not receive any feedback session."
    >
      {data ? (
        <Container minHeight="168px">
          <IconChart
            value={
              data.sessions_qty > 0
                ? data.pending_feedback_sessions_qty / data.sessions_qty
                : 0
            }
            iconName="person"
          />
        </Container>
      ) : (
        <LoadingDots />
      )}
    </CustomCard>
  );
};

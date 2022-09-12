import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Text } from "../../../../../components";
import { Icon } from "../../../../../components/Icon";
import { LoadingDots } from "../../../../../components/LoadingDots";
import { useGetSessionsQuantityMutation } from "../../../../../service";
import { selectCurrentUser } from "../../../../../store/auth";

const IconRules = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

export const PersonChart: React.FC<{
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

  return data ? (
    <>
      <Container flexDirection="row" alignItems="center">
        <Text
          mr="20px"
          fontWeight={600}
          fontSize="40px"
          value={
            data.sessions_qty > 0
              ? `${(
                  (1 - data.pending_feedback_sessions_qty / data.sessions_qty) *
                  100
                ).toFixed(0)}%`
              : "0%"
          }
        />
        <Container flexDirection="row" flexWrap="wrap" width={56 * 5}>
          {IconRules.map((rule) =>
            data.sessions_qty > 0 ? (
              <Icon
                size={56}
                name="person"
                color={
                  1 - data.pending_feedback_sessions_qty / data.sessions_qty >
                  rule
                    ? "#3373CC"
                    : "#ECEEED"
                }
              />
            ) : (
              <Icon size={56} name="person" color="#ECEEED" />
            )
          )}
        </Container>
      </Container>
    </>
  ) : (
    <LoadingDots />
  );
};

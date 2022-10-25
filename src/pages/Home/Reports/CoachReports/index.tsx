import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Container, Image, Text } from "../../../../components";
import { Card } from "../../../../components/Card";
import { CustomCard } from "../../../../components/CustomCard";
import { IconChart } from "../../../../components/IconChart";
import { LoadingDots } from "../../../../components/LoadingDots";
import { SessionTable } from "../../../../components/SessionTable";
import { useGetReportSessionPerCoachMutation } from "../../../../service/reports";
import { selectCurrentUser } from "../../../../store/auth";
import { User } from "../../../../store/type";

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

  const moreSessions = data && data[0];
  const lessSessions = data && data[data.length - 1];

  const renderCoachInfos = (coach: User, qtd: number) => (
    <Container flex={1} mt="16px" minWidth={120} alignItems="center">
      <Container
        mr="8px"
        width="24px"
        height="24px"
        overflow="hidden"
        alignItems="center"
        borderRadius="20px"
        background="#F4F5F5"
        justifyContent="center"
      >
        {coach?.image_url ? (
          <Image src={coach?.image_url} width="24px" height="24px" />
        ) : (
          <Text
            fontSize={16}
            value={coach.name?.substring(0, 1)}
            color="#49504C"
          />
        )}
      </Container>
      <Container flexDirection="column">
        <Text mb="2px" fontSize={14} fontWeight={500} value={coach?.name} />
      </Container>
      <Text ml="auto" fontSize="20px" fontWeight={600} value={qtd.toString()} />
    </Container>
  );

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
          <Container width="50%" maxWidth="360px" flexDirection="column">
            <Card>
              <Text
                fontSize="18px"
                fontWeight={500}
                lineHeight="24px"
                color="#16191D"
                value={t("Dashboard.CoachReports.biggest-sessions")}
              />

              {moreSessions?.coach &&
                renderCoachInfos(
                  moreSessions.coach,
                  moreSessions?.sessions_qty || 0
                )}
            </Card>

            <Card mt="16px">
              <Text
                fontSize="18px"
                fontWeight={500}
                lineHeight="24px"
                color="#16191D"
                value={t("Dashboard.CoachReports.fewer-sessions")}
              />

              {lessSessions?.coach &&
                renderCoachInfos(
                  lessSessions.coach,
                  lessSessions?.sessions_qty || 0
                )}
            </Card>
          </Container>
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
          <></>
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

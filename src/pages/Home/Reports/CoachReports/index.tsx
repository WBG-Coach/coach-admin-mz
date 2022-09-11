import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Container, Image, Text } from "../../../../components";
import { Card } from "../../../../components/Card";
import { LoadingDots } from "../../../../components/LoadingDots";
import { SessionTable } from "../../../../components/SessionTable";
import { useGetReportSessionPerCoachMutation } from "../../../../service";
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

  const renderSchoolInfos = (coach: User, qtd: number) => (
    <Container flex={1} minWidth={120} alignItems="center">
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
          <Card mr="20px" flex={1}>
            <SessionTable data={data} />
          </Card>
          <Container width="50%" maxWidth="360px" flexDirection="column">
            <Text
              value={t("Dashboard.tabs-coaches")}
              fontWeight={500}
              fontSize="18px"
            />

            <Container
              my="16px"
              height="1px"
              background="#ECEEED"
              width="100%"
            />

            <Text value="Orientador com mais sessões" fontSize="14px" />

            <Container my="8px">
              {moreSessions?.coach &&
                renderSchoolInfos(
                  moreSessions.coach,
                  moreSessions?.sessions_qty || 0
                )}
            </Container>

            <Container
              my="16px"
              height="1px"
              background="#ECEEED"
              width="100%"
            />

            <Text value="Orientador com menos sessões" fontSize="14px" />

            <Container my="8px">
              {lessSessions?.coach &&
                renderSchoolInfos(
                  lessSessions.coach,
                  lessSessions?.sessions_qty || 0
                )}
            </Container>
          </Container>
        </Container>
      )}
    </Container>
  );
};

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Container, Image, Text } from "../../../../components";
import { Card } from "../../../../components/Card";
import { LoadingDots } from "../../../../components/LoadingDots";
import { SessionTable } from "../../../../components/SessionTable";
import { useGetReportSessionPerTeacherMutation } from "../../../../service";
import { selectCurrentUser } from "../../../../store/auth";
import { User } from "../../../../store/type";
import { PersonChart } from "./PersonChart";

export const TeacherReports: React.FC<{
  start_date: Date;
  end_date: Date;
}> = ({ end_date, start_date }) => {
  const [getReport, { data }] = useGetReportSessionPerTeacherMutation();
  const { t } = useTranslation();

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    getReport({
      end_date,
      start_date,
      project_id: user.currentProject?.id || 0,
    });
  }, [getReport, end_date, start_date, user]);

  const moreSessions = data && data[0];
  const lessSessions = data && data[data.length - 1];

  const renderSchoolInfos = (teacher: User, qtd: number) => (
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
        {teacher?.image_url ? (
          <Image src={teacher?.image_url} width="24px" height="24px" />
        ) : (
          <Text
            fontSize={16}
            value={teacher.name?.substring(0, 1)}
            color="#49504C"
          />
        )}
      </Container>
      <Container flexDirection="column">
        <Text mb="2px" fontSize={14} fontWeight={500} value={teacher?.name} />
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
              value={t("Dashboard.tabs-teachers")}
              fontWeight={500}
              fontSize="18px"
            />

            <Container
              my="16px"
              height="1px"
              background="#ECEEED"
              width="100%"
            />

            <Text value="Teachers with most sessions" fontSize="14px" />

            <Container my="8px">
              {moreSessions?.teacher &&
                renderSchoolInfos(
                  moreSessions.teacher,
                  moreSessions?.sessions_qty || 0
                )}
            </Container>

            <Container
              my="16px"
              height="1px"
              background="#ECEEED"
              width="100%"
            />

            <Text value="Teacher with fewer sessions" fontSize="14px" />

            <Container my="8px">
              {lessSessions?.teacher &&
                renderSchoolInfos(
                  lessSessions.teacher,
                  lessSessions?.sessions_qty || 0
                )}
            </Container>
          </Container>
        </Container>
      )}
      <Container>
        <Card>
          <Container mb="32px">
            <Text
              mb="32px"
              fontSize="18px"
              lineHeight="24px"
              value={t("Dashboard.teacher-person-chart-title")}
            />
          </Container>

          <PersonChart end_date={end_date} start_date={start_date} />
        </Card>
      </Container>
    </Container>
  );
};

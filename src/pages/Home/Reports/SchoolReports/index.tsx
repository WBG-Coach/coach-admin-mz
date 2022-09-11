import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Image, Text } from "../../../../components";
import { Card } from "../../../../components/Card";
import { Icon } from "../../../../components/Icon";
import { LoadingDots } from "../../../../components/LoadingDots";
import { SessionTable } from "../../../../components/SessionTable";
import { useGetReportSessionPerSchoolMutation } from "../../../../service";
import { selectCurrentUser } from "../../../../store/auth";
import { School } from "../../../../store/type";
import { CompetenciesBySchool } from "./CompetenciesBySchool";

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

  const renderSchoolInfos = (school: School, qtd: number) => (
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
        {school?.image_url ? (
          <Image src={school?.image_url} width="24px" height="24px" />
        ) : (
          <Icon size={16} name="university" color="#49504C" />
        )}
      </Container>
      <Container flexDirection="column">
        <Text mb="2px" fontSize={14} fontWeight={500} value={school?.name} />
        <Text
          color="#7D827F"
          fontSize={14}
          fontWeight={500}
          value={(school?.country || "-") + ", " + (school?.city || "-")}
        />
      </Container>
      <Text ml="auto" fontSize="20px" fontWeight={600} value={qtd.toString()} />
    </Container>
  );

  const moreSessions = data && data[0];
  const lessSessions = data && data[data.length - 1];
  const morePositiveCompetence = data?.reduce((morePositive, item) => {
    return (morePositive?.yes_qty || 0) < (item?.yes_qty || 0)
      ? item
      : morePositive;
  }, data[0]);

  const moreNegativeCompetence = data?.reduce((morePositive, item) => {
    return (morePositive?.no_qty || 0) < (item?.no_qty || 0)
      ? item
      : morePositive;
  }, data[0]);

  return (
    <Container gridGap="16px">
      {!data ? (
        <LoadingDots />
      ) : (
        <>
          <Container flex={1} flexDirection="column">
            <Card flex={1}>
              <SessionTable data={data} />
            </Card>
            <Card mt="16px" flex={1}>
              <CompetenciesBySchool sessionReport={data} />
            </Card>
          </Container>
          <Container width="50%" maxWidth="360px" flexDirection="column">
            <Text value="Sessões" fontWeight={500} fontSize="18px" />

            <Container
              my="16px"
              height="1px"
              background="#ECEEED"
              width="100%"
            />

            <Text value="Escola com mais sessões" fontSize="14px" />

            <Container my="8px">
              {moreSessions?.school &&
                renderSchoolInfos(
                  moreSessions.school,
                  moreSessions?.sessions_qty || 0
                )}
            </Container>

            <Container
              my="16px"
              height="1px"
              background="#ECEEED"
              width="100%"
            />

            <Text value="Escola com menos sessões" fontSize="14px" />

            <Container my="8px">
              {lessSessions?.school &&
                renderSchoolInfos(
                  lessSessions.school,
                  lessSessions?.sessions_qty || 0
                )}
            </Container>

            <Text
              mt="48px"
              fontSize="18px"
              fontWeight={500}
              value="Competências"
            />

            <Container
              my="16px"
              height="1px"
              background="#ECEEED"
              width="100%"
            />

            <Text
              value="Escolas com mais competências positivas"
              fontSize="14px"
            />

            <Container my="8px">
              {morePositiveCompetence?.school &&
                renderSchoolInfos(
                  morePositiveCompetence.school,
                  morePositiveCompetence?.sessions_qty || 0
                )}
            </Container>

            <Container
              my="16px"
              height="1px"
              background="#ECEEED"
              width="100%"
            />

            <Text
              value="Escolas com mais competências negativas"
              fontSize="14px"
            />

            <Container my="8px">
              {moreNegativeCompetence?.school &&
                renderSchoolInfos(
                  moreNegativeCompetence.school,
                  moreNegativeCompetence?.sessions_qty || 0
                )}
            </Container>
          </Container>
        </>
      )}
    </Container>
  );
};

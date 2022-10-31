import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "../../../../../components";
import { LoadingDots } from "../../../../../components/LoadingDots";
import { useGetAnswersByCityMutation } from "../../../../../service/reports";

export const AnswersByCity: React.FC = () => {
  const { t } = useTranslation();
  const [getReport, { data, isLoading }] = useGetAnswersByCityMutation();

  useEffect(() => {
    getReport();
  }, [getReport]);

  const total = useMemo(() => {
    if (!data) return 0;
    return data.reduce((acc, item) => item.quantity + acc, 0);
  }, [data]);

  return isLoading ? (
    <LoadingDots />
  ) : (
    <Container flexDirection="column">
      <Container
        py="8px"
        mb="8px"
        justifyContent="space-between"
        borderBottom="1px solid #F0F2F4"
      >
        <Text value={t("Dashboard.CoachReports.region")} color="#576375" />
        <Text value={t("Dashboard.CoachReports.sessions")} color="#576375" />
      </Container>
      {data?.map((item) => (
        <Container
          py="8px"
          mb="8px"
          key={item.city}
          position="relative"
          justifyContent="space-between"
          borderBottom="4px solid #F0F2F4"
        >
          <Text value={item.city || "-"} color="#16191D" />
          <Text value={item.quantity + ""} color="#16191D" />
          <Container
            position="absolute"
            borderRadius="4px"
            left={0}
            bottom={-4}
            height="4px"
            background="#3373CC"
            width={(item.quantity / total) * 100 + "%"}
          />
        </Container>
      ))}
    </Container>
  );
};

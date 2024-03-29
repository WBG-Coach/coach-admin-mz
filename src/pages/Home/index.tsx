import React, { useEffect, useState } from "react";
import { Container, Text } from "../../components";
import { Tabs } from "../../components/Tabs";
import { DashboardReports } from "./Reports/DashboardReports";
import { CompetenceReports } from "./Reports/CompetenceReports";
import { SchoolReports } from "./Reports/SchoolReports";
import { CoachReports } from "./Reports/CoachReports";
import { DateRange } from "../../components/DateRange";
import { startOfMonth } from "date-fns";
import { useGetReportDashboardMutation } from "../../service/reports";
import { LoadingDots } from "../../components/LoadingDots";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import { TeacherReports } from "./Reports/TeacherReports";
import BreadCrumb from "../../components/Breadcrumb";

const TAB_TITLES = [
  "Dashboard.tabs-dashboard",
  "Dashboard.tabs-competencies",
  "Dashboard.tabs-schools",
  "Dashboard.tabs-coaches",
  "Dashboard.tabs-teachers",
];

const Home: React.FC<{}> = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState<number>();
  const [getDashboardReport, { isLoading, data }] =
    useGetReportDashboardMutation();
  const [dateRange, setDateRange] = useState({
    startDate: startOfMonth(new Date()),
    endDate: new Date(),
  });
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    getDashboardReport({
      end_date: dateRange.endDate,
      start_date: dateRange.startDate,
      project_id: user.currentProject?.id || 0,
    });
  }, [getDashboardReport, dateRange, user]);

  const renderCountValue = (title: string, value: number) => (
    <Container width="200px" height="auto" flexDirection="column">
      <Text
        mb="8px"
        fontWeight={500}
        color="#49504C"
        fontSize={"14px"}
        lineHeight={"20px"}
        value={title}
      />
      <Text
        value={value.toString()}
        fontSize={"28px"}
        lineHeight={"32px"}
        fontWeight={600}
      />
    </Container>
  );

  return (
    <Container width="100%" flexDirection="column">
      <BreadCrumb />
      <Container mb="40px" justifyContent="space-between">
        <Text
          value={t("Dashboard.title")}
          fontSize="32px"
          lineHeight="40px"
          fontWeight={600}
        />

        <DateRange {...dateRange} onChange={setDateRange} />
      </Container>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <Container mb="24px" width="100%">
          {renderCountValue(
            "Sessions",
            data?.questionnaire_applications_qty || 0
          )}
          {renderCountValue("Schools", data?.schools_qty || 0)}
          {renderCountValue("Coaches", data?.coaches_qty || 0)}
          {renderCountValue("Teachers", data?.teachers_qty || 0)}
        </Container>
      )}
      <Tabs mb="40px" titles={TAB_TITLES} onClickTab={setCurrentTab} />
      {currentTab === 0 && (
        <DashboardReports isLoading={isLoading} data={data} />
      )}
      {currentTab === 1 && (
        <CompetenceReports
          start_date={dateRange.startDate}
          end_date={dateRange.endDate}
        />
      )}
      {currentTab === 2 && (
        <SchoolReports
          start_date={dateRange.startDate}
          end_date={dateRange.endDate}
        />
      )}
      {currentTab === 3 && (
        <CoachReports
          start_date={dateRange.startDate}
          end_date={dateRange.endDate}
        />
      )}
      {currentTab === 4 && (
        <TeacherReports
          start_date={dateRange.startDate}
          end_date={dateRange.endDate}
        />
      )}
    </Container>
  );
};

export default Home;

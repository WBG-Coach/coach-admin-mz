import React, { useState } from "react";
import { Container, Text } from "../../components";
import { Tabs } from "../../components/Tabs";
import { DashboardReports } from "./Reports/DashboardReports";
import { CompetenceReports } from "./Reports/CompetenceReports";
import { SchoolReports } from "./Reports/SchoolReports";
import { CoachReports } from "./Reports/CoachReports";
import { DateRange } from "../../components/DateRange";
import { startOfMonth } from "date-fns";
import { SessionReports } from "./Reports/SessionReports";

const TAB_TITLES = [
  "DASHBOARD",
  "COMPETENCES",
  "SCHOOLS",
  "COACHES",
  "SESSIONS",
];

const Home: React.FC<{}> = () => {
  const [currentTab, setCurrentTab] = useState<number>();
  const [dateRange, setDateRange] = useState({
    startDate: startOfMonth(new Date()),
    endDate: new Date(),
  });

  return (
    <Container width="100%" flexDirection="column">
      <Container mb="40px" justifyContent="space-between">
        <Text
          value="Dashboard"
          fontSize="32px"
          lineHeight="40px"
          fontWeight={600}
        />

        <DateRange {...dateRange} onChange={setDateRange} />
      </Container>
      <Container mb="24px" width="100%">
        <Container width="200px" height="auto" flexDirection="column">
          <Text
            mb="8px"
            fontWeight={500}
            color="#49504C"
            fontSize={"14px"}
            lineHeight={"20px"}
            value="Sessions done"
          />
          <Text
            value={"0"}
            fontSize={"28px"}
            lineHeight={"32px"}
            fontWeight={600}
          />
        </Container>
        <Container width="200px" height="auto" flexDirection="column">
          <Text
            mb="8px"
            fontWeight={500}
            color="#49504C"
            fontSize={"14px"}
            lineHeight={"20px"}
            value="Schools"
          />
          <Text
            value={"0"}
            fontSize={"28px"}
            lineHeight={"32px"}
            fontWeight={600}
          />
        </Container>
        <Container width="200px" height="auto" flexDirection="column">
          <Text
            mb="8px"
            fontWeight={500}
            color="#49504C"
            fontSize={"14px"}
            lineHeight={"20px"}
            value="Coaches"
          />
          <Text
            value={"0"}
            fontSize={"28px"}
            lineHeight={"32px"}
            fontWeight={600}
          />
        </Container>
        <Container width="200px" height="auto" flexDirection="column">
          <Text
            mb="8px"
            fontWeight={500}
            color="#49504C"
            fontSize={"14px"}
            lineHeight={"20px"}
            value="Teachers"
          />
          <Text
            value={"0"}
            fontSize={"28px"}
            lineHeight={"32px"}
            fontWeight={600}
          />
        </Container>
      </Container>
      <Tabs mb="40px" titles={TAB_TITLES} onClickTab={setCurrentTab} />
      {currentTab === 0 && <DashboardReports />}
      {currentTab === 1 && <CompetenceReports />}
      {currentTab === 2 && <SchoolReports />}
      {currentTab === 3 && <CoachReports />}
      {currentTab === 4 && <SessionReports />}
    </Container>
  );
};

export default Home;

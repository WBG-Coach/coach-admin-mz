import React, { useState } from "react";
import { Container } from "../../components";
import { Tabs } from "../../components/Tabs";
import { DashboardReports } from "./Reports/DashboardReports";
import { CompetenceReports } from "./Reports/CompetenceReports";
import { SchoolReports } from "./Reports/SchoolReports";
import { CoachReports } from "./Reports/CoachReports";

const TAB_TITLES = [
  "DASHBOARD",
  "COMPETENCES",
  "SCHOOLS",
  "COACHES",
  "SESSIONS",
];

const Home: React.FC<{}> = () => {
  const [currentTab, setCurrentTab] = useState<number>();

  return (
    <Container width="100%" flexDirection="column">
      <Tabs mb="40px" titles={TAB_TITLES} onClickTab={setCurrentTab} />
      {currentTab === 0 && <DashboardReports />}
      {currentTab === 1 && <CompetenceReports />}
      {currentTab === 2 && <SchoolReports />}
      {currentTab === 3 && <CoachReports />}
      {currentTab === 4 && <DashboardReports />}
    </Container>
  );
};

export default Home;

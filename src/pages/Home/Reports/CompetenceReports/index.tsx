import { Container } from "../../../../components";
import { EvolutionOfCompetences } from "./EvolutionOfCompetences";
import { MostWorkedCompetences } from "./MostWorkedCompetences";
import { PerformancePerCompetence } from "./PerformancePerCompetence";

export const CompetenceReports: React.FC<{
  start_date: Date;
  end_date: Date;
}> = (props) => {
  return (
    <Container flexDirection="column" gridGap="16px">
      <MostWorkedCompetences {...props} />

      <EvolutionOfCompetences />

      <PerformancePerCompetence />
    </Container>
  );
};

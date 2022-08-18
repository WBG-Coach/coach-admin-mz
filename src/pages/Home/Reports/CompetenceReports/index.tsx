import { Container } from "../../../../components";
import { Card } from "../../../../components/Card";
import { EvolutionOfCompetences } from "./EvolutionOfCompetences";
import { MostWorkedCompetences } from "./MostWorkedCompetences";

export const CompetenceReports: React.FC<{
  start_date: Date;
  end_date: Date;
}> = (props) => {
  return (
    <Container flexDirection="column" gridGap="16px">
      <Container width="100%" gridGap="16px">
        <MostWorkedCompetences {...props} />
        <Card flex={1}>
          <></>
        </Card>
      </Container>

      <EvolutionOfCompetences />
    </Container>
  );
};

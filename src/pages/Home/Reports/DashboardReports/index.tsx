import { Container, Text } from "../../../../components";
import { Card } from "../../../../components/Card";
import { CompetenceProgress } from "./CompetenceProgress";
import { UserProgress } from "./UserProgress";

const DATA = [
  {
    name: "Construir relacionamentos",
    quantity: 16,
    percent: 0.35,
  },
  {
    name: "Usar o guião do professor com eficácia",
    quantity: 12,
    percent: 0.26,
  },
  {
    name: "Verificar a compreensão",
    quantity: 12,
    percent: 0.26,
  },
  {
    name: "Estabelecer rotinas",
    quantity: 4,
    percent: 0.08,
  },
  {
    name: "Demonstrar e praticar",
    quantity: 1,
    percent: 0.02,
  },
];

export const DashboardReports = () => {
  return (
    <Container flexDirection="column" gridGap="16px">
      <Container width="100%" gridGap="16px">
        <Card flex={1}>
          <Text
            mb="32px"
            fontSize="18px"
            lineHeight="24px"
            value="Total feedback by competency"
          />
          <CompetenceProgress data={DATA} />
        </Card>

        <Container flexDirection="column" maxWidth="360px" width="50%">
          <Card mb="16px">
            <Text
              mb="32px"
              fontSize="18px"
              lineHeight="24px"
              value="Teacher with the most sessions"
            />

            <UserProgress
              description="Opa! Escola de Design"
              name="Dinho Barreto"
              value={50}
              total={100}
            />
          </Card>
          <Card>
            <Text
              mb="16px"
              fontSize="18px"
              lineHeight="24px"
              value="Coach with the most sessions"
            />
            <UserProgress
              description="jmoravec@worldbank.org"
              name="John Moravec"
              value={25}
              total={100}
            />
          </Card>
        </Container>
      </Container>
    </Container>
  );
};

import { Container, Text } from "../../../../components";
import { Card } from "../../../../components/Card";

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
        </Card>
        <Container flexDirection="column" maxWidth="360px" width="50%">
          <Card mb="16px">
            <Text
              mb="32px"
              fontSize="18px"
              lineHeight="24px"
              value="Teacher with the most sessions"
            />
          </Card>
          <Card>
            <Text
              mb="32px"
              fontSize="18px"
              lineHeight="24px"
              value="Coach with the most sessions"
            />
          </Card>
        </Container>
      </Container>
    </Container>
  );
};

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

            <Container alignItems="center">
              <Container
                mr="16px"
                width="40px"
                height="40px"
                overflow="hidden"
                alignItems="center"
                borderRadius="20px"
                background="#F4F5F5"
                justifyContent="center"
              >
                <Text fontSize="24px" color="#49504C" value={"D"} />
              </Container>

              <Container flexDirection="column" flex={1}>
                <Text
                  value="Dinho Barreto"
                  fontWeight={500}
                  fontSize="16px"
                  lineHeight="24px"
                />
                <Text
                  value="Opa! Escola de Design"
                  fontWeight={400}
                  color="#7D827F"
                  fontSize="14px"
                  lineHeight="20px"
                />
              </Container>

              <Container>
                <Text
                  value="50"
                  fontSize="24px"
                  lineHeight="28px"
                  fontWeight={600}
                />
              </Container>
            </Container>
            <Container
              mt="8px"
              height="4px"
              borderRadius="2px"
              width="100%"
              background="#E4E7E5"
            ></Container>
          </Card>
          <Card>
            <Text
              mb="16px"
              fontSize="18px"
              lineHeight="24px"
              value="Coach with the most sessions"
            />

            <Container alignItems="center">
              <Container
                mr="16px"
                width="40px"
                height="40px"
                overflow="hidden"
                alignItems="center"
                borderRadius="20px"
                background="#F4F5F5"
                justifyContent="center"
              >
                <Text fontSize="24px" color="#49504C" value={"D"} />
              </Container>

              <Container flexDirection="column" flex={1}>
                <Text
                  value="Dinho Barreto"
                  fontWeight={500}
                  fontSize="16px"
                  lineHeight="24px"
                />
                <Text
                  value="Opa! Escola de Design"
                  fontWeight={400}
                  color="#7D827F"
                  fontSize="14px"
                  lineHeight="20px"
                />
              </Container>

              <Container>
                <Text
                  value="50"
                  fontSize="24px"
                  lineHeight="28px"
                  fontWeight={600}
                />
              </Container>
            </Container>
            <Container
              mt="8px"
              height="4px"
              borderRadius="2px"
              width="100%"
              background="#E4E7E5"
            ></Container>
          </Card>
        </Container>
      </Container>
    </Container>
  );
};

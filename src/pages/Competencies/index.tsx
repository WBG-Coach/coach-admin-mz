import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "../../components";
import { LoadingDots } from "../../components/LoadingDots";
import { useGetCompetenciesMutation } from "../../service";

const Competencies: React.FC<{}> = () => {
  const { t } = useTranslation();
  const [getCompetencies, { isLoading, data }] = useGetCompetenciesMutation();

  useEffect(() => {
    getCompetencies();
  }, [getCompetencies]);

  return (
    <Container width="100%" flexDirection="column">
      <Text
        mb={40}
        fontSize={32}
        fontWeight={600}
        value={t("Competencies.title")}
      />

      {isLoading || !data ? (
        <LoadingDots />
      ) : (
        data.map((competence) => (
          <Container
            onClick={() => {}}
            padding="20px 16px"
            border="1px solid #f4f5f5"
          >
            <Container width="24px">
              <Text
                fontSize="16px"
                color="#49504C"
                lineHeight="24px"
                value={competence.id.toString()}
              />
            </Container>
            <Text
              fontSize="16px"
              color="#49504C"
              lineHeight="24px"
              value={competence.title}
            />
          </Container>
        ))
      )}
    </Container>
  );
};

export default Competencies;

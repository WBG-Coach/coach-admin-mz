import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import { PROJECT } from "../../mock";
import { useGetCompetenciesMutation } from "../../service";
import { Competence } from "../../store/type";

const Competencies: React.FC<{}> = () => {
  const { t } = useTranslation();
  const [getCompetencies, { isLoading, data }] = useGetCompetenciesMutation();
  const [selectedCompetence, setSelectedCompetence] = useState<Competence>();

  useEffect(() => {
    setSelectedCompetence(undefined);
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

      <Container gridGap="32px">
        <Container
          flex={1}
          overflow="hidden"
          borderRadius="8px"
          borderBottom="none"
          flexDirection="column"
          border="1px solid #f4f5f5"
        >
          {isLoading || !data ? (
            <LoadingDots />
          ) : (
            data.map((competence) => (
              <Container
                onClick={() => setSelectedCompetence(competence)}
                padding="20px 16px"
                borderBottom="1px solid #f4f5f5"
                background={
                  selectedCompetence?.id === competence.id
                    ? PROJECT.primary_color + "10"
                    : "#fff"
                }
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
                  value={competence.subtitle}
                />
              </Container>
            ))
          )}
        </Container>
        {selectedCompetence && (
          <Container flex={1} flexDirection="column">
            <Text
              value={selectedCompetence.title}
              fontSize="14px"
              color="#000000"
              fontWeight={400}
              lineHeight="20px"
              mb="8px"
            />
            <Text
              mb="16px"
              fontSize="24px"
              color="#000000"
              fontWeight={600}
              lineHeight="28px"
              value={selectedCompetence.subtitle}
            />
            <Text
              mb="32px"
              fontSize="16px"
              color="#49504C"
              fontWeight={500}
              lineHeight="24px"
              value={selectedCompetence.description}
            />
          </Container>
        )}
      </Container>

      <Container p="12px 16px" alignItems="center" onClick={() => {}}>
        <Icon size={24} name="plus" mr="8px" color={PROJECT.primary_color} />
        <Text value={t("Competencies.add")} color={PROJECT.primary_color} />
      </Container>
    </Container>
  );
};

export default Competencies;

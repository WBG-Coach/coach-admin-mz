import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import { PROJECT } from "../../mock";
import { useGetQuestionnairesMutation } from "../../service";
import { Questionnaire } from "../../store/type";

const QuestionnairesObservation: React.FC<{}> = () => {
  const { t } = useTranslation();
  const [getQuestionnaires, { isLoading, data }] =
    useGetQuestionnairesMutation();
  const [selectedQuestionnaire, setSelectedQuestionnaire] =
    useState<Questionnaire>();

  useEffect(() => {
    getQuestionnaires("OBSERVATION");
  }, [getQuestionnaires]);

  return (
    <Container width="100%" flexDirection="column">
      <Text
        mb={40}
        fontSize={32}
        fontWeight={600}
        value={t("Observation.title")}
      />

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
          data.map((questionnaire) => (
            <Container
              onClick={() => setSelectedQuestionnaire(questionnaire)}
              padding="20px 16px"
              borderBottom="1px solid #f4f5f5"
              background={
                selectedQuestionnaire?.id === questionnaire.id
                  ? PROJECT.primaryColor + "10"
                  : "#fff"
              }
            >
              <Container width="24px">
                <Text
                  fontSize="16px"
                  color="#49504C"
                  lineHeight="24px"
                  value={questionnaire.id.toString()}
                />
              </Container>
              <Text
                fontSize="16px"
                color="#49504C"
                lineHeight="24px"
                value={questionnaire.title}
              />
            </Container>
          ))
        )}
      </Container>

      <Container p="12px 16px" alignItems="center" onClick={() => {}}>
        <Icon size={24} name="plus" mr="8px" color={PROJECT.primaryColor} />
        <Text value={t("Observation.add")} color={PROJECT.primaryColor} />
      </Container>
    </Container>
  );
};

export default QuestionnairesObservation;

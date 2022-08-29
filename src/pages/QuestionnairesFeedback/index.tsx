import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { Container, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import { useGetQuestionnairesMutation } from "../../service";
import { selectCurrentUser } from "../../store/auth";
import { Questionnaire } from "../../store/type";

const QuestionnairesFeedback: React.FC<{}> = () => {
  const { t } = useTranslation();
  const [getQuestionnaires, { isLoading, data }] =
    useGetQuestionnairesMutation();
  const [selectedQuestionnaire, setSelectedQuestionnaire] =
    useState<Questionnaire>();
  const user = useSelector(selectCurrentUser);
  const theme = useTheme();

  useEffect(() => {
    getQuestionnaires({
      type: "FEEDBACK",
      project_id: user.currentProject?.id || 0,
    });
  }, [user, getQuestionnaires]);

  return (
    <Container width="100%" flexDirection="column">
      <Text
        mb={40}
        fontSize={32}
        fontWeight={600}
        value={t("Feedback.title")}
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
                  ? theme.colors.primary + "10"
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
        <Icon size={24} name="plus" mr="8px" color={theme.colors.primary} />
        <Text value={t("Feedback.add")} color={theme.colors.primary} />
      </Container>
    </Container>
  );
};

export default QuestionnairesFeedback;

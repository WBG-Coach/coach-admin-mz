import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { Container, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import { useGetQuestionsMutation } from "../../service";
import { QuestionnaireQuestion } from "../../store/type";
import { motion } from "framer-motion";

const Questions: React.FC = () => {
  const [questions, requestQuestions] = useGetQuestionsMutation();
  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionnaireQuestion>();
  const [newQuestion, setNewQuestion] = useState(false);
  const { t } = useTranslation();
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      questions({ questionnaire_id: parseInt(id, 10) });
    }
  }, [id, questions]);

  return (
    <Container flex={1} minHeight={"500px"} width="100%" flexDirection="column">
      {requestQuestions.isLoading ? (
        <Container flex={1} justifyContent={"center"} alignItems={"center"}>
          <LoadingDots />
        </Container>
      ) : (
        <>
          {requestQuestions.data ? (
            <>
              <Text
                mb={40}
                fontSize={32}
                fontWeight={600}
                value={requestQuestions.data.questionnaire.title}
              />

              {requestQuestions.data.questions.length >= 1 ? (
                <Container
                  flex={1}
                  borderRadius="8px"
                  borderBottom="none"
                  flexDirection="column"
                  border="1px solid #f4f5f5"
                >
                  {requestQuestions.data.questions.map((question, index) => (
                    <motion.div
                      key={question.id}
                      style={{ width: "100%" }}
                      initial={{ height: 0 }}
                      animate={{ height: "fit-content" }}
                    >
                      <Container
                        padding="20px 16px"
                        borderBottom="1px solid #f4f5f5"
                        alignItems={"center"}
                      >
                        <Container
                          onClick={() => setSelectedQuestion(question)}
                          flex={1}
                        >
                          <Icon
                            color="#7D827F"
                            name="clipboard-notes"
                            size={24}
                          />
                          <Text
                            ml={"16px"}
                            fontSize="16px"
                            color="#49504C"
                            lineHeight="24px"
                            value={`Question - ${index}`}
                          />
                        </Container>
                      </Container>
                    </motion.div>
                  ))}
                </Container>
              ) : (
                <Container padding={"20px 16px"}>
                  <Text
                    value={t("Questions.not-found")}
                    fontSize={18}
                    fontWeight={400}
                  />
                </Container>
              )}

              <Container
                p="12px 16px"
                alignItems="center"
                onClick={() => setNewQuestion(true)}
                width={"fit-content"}
              >
                <Icon
                  size={24}
                  name="plus"
                  mr="8px"
                  color={theme.colors.primary}
                />
                <Text value={t("Questions.add")} color={theme.colors.primary} />
              </Container>
            </>
          ) : (
            <Container
              flex={1}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Text
                value={t("Questions.error")}
                fontSize={20}
                fontWeight={400}
              />
              <Container
                onClick={() => navigate(-1)}
                width={"fit-content"}
                mt={"24px"}
                alignItems={"center"}
              >
                <Icon
                  size={24}
                  name="angle-left"
                  color={theme.colors.primary}
                />
                <Text
                  value={t("Questions.back")}
                  color={theme.colors.primary}
                />
              </Container>
            </Container>
          )}
        </>
      )}
    </Container>
  );
};

export default Questions;

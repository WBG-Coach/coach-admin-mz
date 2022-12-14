import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { Container, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import { Question } from "../../store/type";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import { useGetQuestionsMutation } from "../../service/questions";
import BreadCrumb from "../../components/Breadcrumb";
import { QuestionForm } from "./QuestionForm";
import { QuestionDetails } from "./QuestionDetails";
import ListMenu from "../../components/ListMenu";

const Questions: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const [questions, requestQuestions] = useGetQuestionsMutation();
  const [newQuestion, setNewQuestion] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const user = useSelector(selectCurrentUser);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();

  useEffect(() => {
    if (id) {
      questions({ questionnaire_id: parseInt(id, 10) });
    }
  }, [id, questions, user]);

  const closeModal = () => {
    if (id) {
      setIsUpdating(false);
      setNewQuestion(false);
      questions({ questionnaire_id: parseInt(id, 10) });
    }
  };

  return (
    <>
      <Container flex={1} width="100%" flexDirection="column">
        {requestQuestions.isLoading ? (
          <Container flex={1} justifyContent={"center"} alignItems={"center"}>
            <LoadingDots />
          </Container>
        ) : (
          <>
            {requestQuestions.data ? (
              <>
                <BreadCrumb
                  customParam={requestQuestions.data.questionnaire.title}
                />
                <Text
                  mb={40}
                  fontSize={32}
                  fontWeight={600}
                  value={requestQuestions.data.questionnaire.title}
                />

                <Container gridGap="32px">
                  <Container flexDirection="column" flex={1}>
                    {requestQuestions.data.questions.length >= 1 ? (
                      <Container
                        flex={1}
                        borderRadius="8px"
                        borderBottom="none"
                        flexDirection="column"
                        border="1px solid #f4f5f5"
                      >
                        {requestQuestions.data.questions.map(
                          (question, index) => (
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
                                  onClick={() =>
                                    setSelectedQuestion(question.question)
                                  }
                                  flex={1}
                                >
                                  <Container width={"calc(100% - 190px)"}>
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
                                      value={question.question.text}
                                    />
                                  </Container>
                                  <Container
                                    width="70px"
                                    justifyContent="right"
                                  >
                                    <Text
                                      fontSize="16px"
                                      color="#7D827F"
                                      lineHeight="24px"
                                      value={question.question.type}
                                    />
                                  </Container>
                                  <Container
                                    width="120px"
                                    justifyContent="right"
                                  >
                                    <Text
                                      fontSize="16px"
                                      color="#7D827F"
                                      lineHeight="24px"
                                      value={t("Questions.options-length", {
                                        value: question.question.options.length,
                                      })}
                                    />
                                  </Container>
                                </Container>
                              </Container>
                            </motion.div>
                          )
                        )}
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
                      <Text
                        value={t("Questions.add")}
                        color={theme.colors.primary}
                      />
                    </Container>
                  </Container>
                  {selectedQuestion && (
                    <Container flex={1} flexDirection="column">
                      <Container ml="auto">
                        <ListMenu
                          options={[
                            {
                              label: t("Questions.update"),
                              onClick: () => setIsUpdating(true),
                            },
                          ]}
                        />
                      </Container>
                      <QuestionDetails question={selectedQuestion} />
                    </Container>
                  )}
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

      {requestQuestions.data?.questionnaire.type && (
        <QuestionForm
          closeModal={closeModal}
          questionnaire_id={id || ""}
          question={selectedQuestion}
          questionLength={questions.length}
          isOpen={newQuestion || isUpdating}
          type={requestQuestions.data?.questionnaire.type}
        />
      )}
    </>
  );
};

export default Questions;

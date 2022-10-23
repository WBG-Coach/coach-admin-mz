import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { Button, Container, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import {
  useCreateQuestionnaireQuestionMutation,
  useGetCompetenciesMutation,
} from "../../service";
import { Competence, Question } from "../../store/type";
import { motion } from "framer-motion";
import { Formik } from "formik";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import * as Yup from "yup";
import Select from "../../components/Select";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth";
import {
  useCreateQuestionMutation,
  useGetQuestionsMutation,
  useUpdateQuestionMutation,
} from "../../service/questions";
import BreadCrumb from "../../components/Breadcrumb";

const questionTypes = ["TEXT", "OPTION", "FEEDBACK", "LIST"];

const Questions: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const [competencies, requestCompetencies] = useGetCompetenciesMutation();
  const [questions, requestQuestions] = useGetQuestionsMutation();
  const [newQuestion, setNewQuestion] = useState(false);
  const user = useSelector(selectCurrentUser);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();

  const [updateQuestion, requestUpdateQuestion] = useUpdateQuestionMutation();
  const [createQuestion, requestCreateQuestion] = useCreateQuestionMutation();
  const [createQuestionnaireQuestion, requestCreateQuestionnaireQuestion] =
    useCreateQuestionnaireQuestionMutation();

  useEffect(() => {
    if (id) {
      questions({ questionnaire_id: parseInt(id, 10) });
      competencies({ project_id: user.currentProject?.id || 0 });
    }
  }, [id, questions, competencies, user]);

  const closeModal = () => {
    if (id) {
      setSelectedQuestion(undefined);
      setNewQuestion(false);
      questions({ questionnaire_id: parseInt(id, 10) });
    }
  };

  const onSubmitQuestion = async (values: {
    text: string;
    competency_id: number;
    type: string;
  }) => {
    if (newQuestion && id) {
      const question_id = await createQuestion(values);
      if ("data" in question_id) {
        await createQuestionnaireQuestion({
          question_id: parseInt(question_id.data, 10),
          questionnaire_id: parseInt(id, 10),
          order: requestQuestions.data?.questions.length,
        });
      }
    } else {
      await updateQuestion({ ...selectedQuestion, ...values });
    }
    closeModal();
  };

  const questionSchema = Yup.object().shape({
    text: Yup.string().required(t("Validations.required")),
  });

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
                            onClick={() =>
                              setSelectedQuestion(question.question)
                            }
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
                              value={question.question.text}
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
                  <Text
                    value={t("Questions.add")}
                    color={theme.colors.primary}
                  />
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

      <Modal
        isOpen={
          (!!selectedQuestion || newQuestion) && !!requestCompetencies.data
        }
        onClose={closeModal}
        title={
          newQuestion ? t("Questions.new-title") : t("Questions.update-title")
        }
      >
        <Container flexDirection="column" minWidth={548}>
          <Formik
            initialValues={{
              text: selectedQuestion?.text || "",
              competency_id: selectedQuestion?.competency_id || 0,
              type: selectedQuestion?.type || "",
            }}
            onSubmit={onSubmitQuestion}
            validationSchema={questionSchema}
          >
            {({ handleSubmit, setFieldValue, values, errors, submitCount }) => (
              <Container width="100%" flexDirection="column" mt={40}>
                <Input
                  label={t("Questions.text")}
                  value={values.text}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.text) || ""}
                  onChangeText={(text) => setFieldValue("text", text)}
                />

                <Select
                  mt={"16px"}
                  value={questionTypes.findIndex(
                    (type) => type === values.type
                  )}
                  label={t("Questions.type")}
                  options={questionTypes}
                  onChange={(e) => setFieldValue("type", e)}
                  renderOption={(opt) => opt}
                />

                <Select
                  mt={"16px"}
                  value={(requestCompetencies?.data as Competence[]).findIndex(
                    (competency) => competency.id === values.competency_id
                  )}
                  label={t("Questions.competency")}
                  options={requestCompetencies.data as Competence[]}
                  onChange={(e) => setFieldValue("competency_id", e.id)}
                  renderOption={(opt) => opt.title}
                />

                <Container width={"100%"} justifyContent={"flex-end"}>
                  <Button
                    mt="40px"
                    width={"fit-content"}
                    isDisabled={
                      requestCreateQuestion.isLoading ||
                      requestUpdateQuestion.isLoading ||
                      requestCreateQuestionnaireQuestion.isLoading
                    }
                    value={t("Global.cancel")}
                    onClick={closeModal}
                    mr={"16px"}
                    variant={"secondary"}
                  />
                  <Button
                    mt="40px"
                    width={"fit-content"}
                    isDisabled={
                      requestCreateQuestion.isLoading ||
                      requestUpdateQuestion.isLoading ||
                      requestCreateQuestionnaireQuestion.isLoading
                    }
                    value={
                      requestCreateQuestion.isLoading ||
                      requestUpdateQuestion.isLoading ||
                      requestCreateQuestionnaireQuestion.isLoading
                        ? "Loading..."
                        : t("Projects.new-button")
                    }
                    onClick={handleSubmit}
                  />
                </Container>
              </Container>
            )}
          </Formik>
        </Container>
      </Modal>
    </>
  );
};

export default Questions;

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { Button, Container, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import {
  useCreateFeedbackQuestionnaireMutation,
  useGetQuestionnairesMutation,
  useUpdateFeedbackQuestionnaireMutation,
} from "../../service";
import { selectCurrentUser } from "../../store/auth";
import { Questionnaire } from "../../store/type";
import { motion } from "framer-motion";
import { Formik } from "formik";
import { Modal } from "../../components/Modal";
import * as Yup from "yup";
import { Input } from "../../components/Input";
import ListMenu from "../../components/ListMenu";
import { useNavigate } from "react-router-dom";

const QuestionnairesFeedback: React.FC<{}> = () => {
  const { t } = useTranslation();
  const [getQuestionnaires, { isLoading, data }] =
    useGetQuestionnairesMutation();
  const [newQuestionnaire, setNewQuestionnaire] = useState(false);
  const [selectedQuestionnaire, setSelectedQuestionnaire] =
    useState<Questionnaire>();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const theme = useTheme();

  const [updateFeedbackQuestionnaire, requestUpdateFeedbackquestionnaire] =
    useUpdateFeedbackQuestionnaireMutation();

  const [createFeedbackQuestionnaire, requestCreateFeedbackQuestionnaire] =
    useCreateFeedbackQuestionnaireMutation();

  const questionnaireSchema = Yup.object().shape({
    title: Yup.string().required(t("Validations.required")),
  });

  useEffect(() => {
    getQuestionnaires({
      type: "FEEDBACK",
      project_id: user.currentProject?.id || 0,
    });
  }, [user, getQuestionnaires]);

  const closeModal = () => {
    setSelectedQuestionnaire(undefined);
    setNewQuestionnaire(false);
    getQuestionnaires({
      type: "FEEDBACK",
      project_id: user.currentProject?.id || 0,
    });
  };

  const onSubmitFeedback = async (values: Partial<Questionnaire>) => {
    if (selectedQuestionnaire) {
      await updateFeedbackQuestionnaire({
        project_id: user.currentProject?.id || 0,
        ...selectedQuestionnaire,
        ...values,
      });
    } else {
      await createFeedbackQuestionnaire({
        project_id: user.currentProject?.id || 0,
        ...values,
      });
    }
    closeModal();
  };

  return (
    <>
      <Container width="100%" flexDirection="column">
        <Text
          mb={40}
          fontSize={32}
          fontWeight={600}
          value={t("Feedback.title")}
        />

        <Container
          flex={1}
          borderRadius="8px"
          borderBottom="none"
          flexDirection="column"
          border="1px solid #f4f5f5"
        >
          {isLoading || !data ? (
            <LoadingDots />
          ) : (
            data.map((questionnaire) => (
              <motion.div
                key={questionnaire.id}
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
                    onClick={() => setSelectedQuestionnaire(questionnaire)}
                    flex={1}
                    alignItems={"center"}
                  >
                    <Icon color="#7D827F" name="comments" size={24} />
                    <Text
                      ml={"16px"}
                      fontSize="16px"
                      color="#49504C"
                      lineHeight="24px"
                      value={questionnaire.title}
                    />
                  </Container>
                  <ListMenu
                    options={[
                      {
                        label: t("Observation.seeQuestion"),
                        onClick: () =>
                          navigate(`/questions/${questionnaire.id}`),
                      },
                      {
                        label: t("Observation.editQuestion"),
                        onClick: () => setSelectedQuestionnaire(questionnaire),
                      },
                    ]}
                  />
                </Container>
              </motion.div>
            ))
          )}
        </Container>

        <Container
          p="12px 16px"
          alignItems="center"
          onClick={() => setNewQuestionnaire(true)}
        >
          <Icon size={24} name="plus" mr="8px" color={theme.colors.primary} />
          <Text value={t("Feedback.add")} color={theme.colors.primary} />
        </Container>
      </Container>

      <Modal
        isOpen={!!selectedQuestionnaire || newQuestionnaire}
        onClose={closeModal}
        title={
          newQuestionnaire
            ? t("Feedback.new-title")
            : t("Feedback.update-title")
        }
      >
        <Container flexDirection="column" minWidth={548}>
          <Formik
            initialValues={{
              title: selectedQuestionnaire?.title,
            }}
            onSubmit={onSubmitFeedback}
            validationSchema={questionnaireSchema}
          >
            {({ handleSubmit, setFieldValue, values, errors, submitCount }) => (
              <Container width="100%" flexDirection="column" mt={40}>
                <Input
                  mb="16px"
                  label={t("Projects.name")}
                  value={values.title}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.title) || ""}
                  onChangeText={(text) => setFieldValue("title", text)}
                />

                <Container width={"100%"} justifyContent={"flex-end"}>
                  <Button
                    mt="40px"
                    width={"fit-content"}
                    isDisabled={
                      requestCreateFeedbackQuestionnaire.isLoading ||
                      requestUpdateFeedbackquestionnaire.isLoading
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
                      requestCreateFeedbackQuestionnaire.isLoading ||
                      requestUpdateFeedbackquestionnaire.isLoading
                    }
                    value={
                      requestCreateFeedbackQuestionnaire.isLoading ||
                      requestUpdateFeedbackquestionnaire.isLoading
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

export default QuestionnairesFeedback;

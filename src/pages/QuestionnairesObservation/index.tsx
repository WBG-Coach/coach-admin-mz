import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { Button, Container, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import {
  useCreateObservationQuestionnaireMutation,
  useGetQuestionnairesMutation,
  useGetQuestionsMutation,
  useUpdateObservationQuestionnaireMutation,
} from "../../service";
import { selectCurrentUser } from "../../store/auth";
import { Questionnaire } from "../../store/type";
import { motion } from "framer-motion";
import ListMenu from "../../components/ListMenu";
import { Modal } from "../../components/Modal";
import { Formik } from "formik";
import { Input } from "../../components/Input";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const QuestionnairesObservation: React.FC<{}> = () => {
  const { t } = useTranslation();

  const [
    updateObservationQuestionnaire,
    requestUpdateObservationQuestionnaire,
  ] = useUpdateObservationQuestionnaireMutation();

  const [
    createObservationQuestionnaire,
    requestCreateObservationQuestionnaire,
  ] = useCreateObservationQuestionnaireMutation();

  const [getQuestionnaires, { isLoading, data }] =
    useGetQuestionnairesMutation();

  const [getQuestions] = useGetQuestionsMutation();
  const [newQuestionnaire, setNewQuestionnaire] = useState(false);
  const [selectedQuestionnaire, setSelectedQuestionnaire] =
    useState<Questionnaire>();
  const user = useSelector(selectCurrentUser);
  const theme = useTheme();

  const questionnaireSchema = Yup.object().shape({
    title: Yup.string().required(t("Validations.required")),
  });

  useEffect(() => {
    getQuestionnaires({
      type: "OBSERVATION",
      project_id: user.currentProject?.id || 0,
    });
  }, [user, getQuestionnaires]);

  useEffect(() => {
    if (selectedQuestionnaire)
      getQuestions({ questionnaire_id: selectedQuestionnaire.id });
  }, [selectedQuestionnaire, getQuestions]);

  const closeModal = () => {
    setSelectedQuestionnaire(undefined);
    setNewQuestionnaire(false);
    getQuestionnaires({
      type: "OBSERVATION",
      project_id: user.currentProject?.id || 0,
    });
  };

  const onSubmitObservation = async (values: Partial<Questionnaire>) => {
    if (selectedQuestionnaire) {
      await updateObservationQuestionnaire({
        project_id: user.currentProject?.id || 0,
        ...selectedQuestionnaire,
        ...values,
      });
    } else {
      await createObservationQuestionnaire({
        project_id: user.currentProject?.id || 0,
        ...values,
      });
    }
    closeModal();
  };

  const navigate = useNavigate();

  return (
    <>
      <Container width="100%" flexDirection="column">
        <Text
          mb={40}
          fontSize={32}
          fontWeight={600}
          value={t("Observation.title")}
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
                    flex={1}
                    onClick={() => setSelectedQuestionnaire(questionnaire)}
                    alignItems={"center"}
                  >
                    <Icon color="#7D827F" name="clipboard-notes" size={24} />
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
          onClick={() => {
            setNewQuestionnaire(true);
          }}
          width={"fit-content"}
        >
          <Icon size={24} name="plus" mr="8px" color={theme.colors.primary} />
          <Text value={t("Observation.add")} color={theme.colors.primary} />
        </Container>
      </Container>

      <Modal
        isOpen={!!selectedQuestionnaire || newQuestionnaire}
        onClose={closeModal}
        title={
          newQuestionnaire
            ? t("Observation.new-title")
            : t("Observation.update-title")
        }
      >
        <Container flexDirection="column" minWidth={548}>
          <Formik
            initialValues={{
              title: selectedQuestionnaire?.title,
            }}
            onSubmit={onSubmitObservation}
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
                      requestCreateObservationQuestionnaire.isLoading ||
                      requestUpdateObservationQuestionnaire.isLoading
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
                      requestCreateObservationQuestionnaire.isLoading ||
                      requestUpdateObservationQuestionnaire.isLoading
                    }
                    value={
                      requestCreateObservationQuestionnaire.isLoading ||
                      requestUpdateObservationQuestionnaire.isLoading
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

export default QuestionnairesObservation;

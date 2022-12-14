import { useTranslation } from "react-i18next";
import { Button, Container } from "../../../components";
import { Modal } from "../../../components/Modal";
import { Competence, Question, QuestionnaireTypes } from "../../../store/type";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "../../../components/Input";
import {
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} from "../../../service/questions";
import Select from "../../../components/Select";
import { useGetCompetenciesMutation } from "../../../service/competences";
import { useEffect } from "react";
import { selectCurrentUser } from "../../../store/auth";
import { useSelector } from "react-redux";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  questionnaire_id: string;
  question?: Question;
  questionLength: number;
} & QuestionnaireTypes;

export const QuestionForm: React.FC<Props> = ({
  type,
  isOpen,
  closeModal,
  questionnaire_id,
  question,
}) => {
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
  const [getCompetencies, requestCompetencies] = useGetCompetenciesMutation();
  const [updateQuestion, requestUpdateQuestion] = useUpdateQuestionMutation();
  const [createQuestion, requestCreateQuestion] = useCreateQuestionMutation();

  useEffect(() => {
    getCompetencies({ project_id: user.currentProject?.id || 0 });
  }, [getCompetencies, user.currentProject?.id]);

  const questionTypes = ["TEXT", "OPTION", "FEEDBACK", "LIST"];

  const onSubmitQuestion = async (values: {
    text: string;
    competency_id?: number;
    type: string;
  }) => {
    if (!question) {
      await createQuestion({
        ...values,
        questionnaire_id: parseInt(questionnaire_id, 10),
      });
    } else {
      await updateQuestion({ ...question, ...values });
    }
    closeModal();
  };

  const questionSchema = Yup.object().shape({
    text: Yup.string().required(t("Validations.required")),
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={
        question
          ? t("Questionnaires.form.rename")
          : t("Questionnaires.form.new")
      }
    >
      <Container flexDirection="column" minWidth={548}>
        <Formik
          initialValues={{
            type: question?.type || "",
            text: question?.text || "",
            competency_id: question?.competency_id || undefined,
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

              {type !== "FEEDBACK" && (
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
              )}

              {type === "OBSERVATION" && (
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
              )}

              <Container width={"100%"} justifyContent={"flex-end"}>
                <Button
                  mt="40px"
                  width={"fit-content"}
                  isDisabled={
                    requestCreateQuestion.isLoading ||
                    requestUpdateQuestion.isLoading
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
                    requestUpdateQuestion.isLoading
                  }
                  value={
                    requestCreateQuestion.isLoading ||
                    requestUpdateQuestion.isLoading
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
  );
};

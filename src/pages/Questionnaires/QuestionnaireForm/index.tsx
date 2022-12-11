import { useTranslation } from "react-i18next";
import { Button, Container } from "../../../components";
import { Modal } from "../../../components/Modal";
import { Questionnaire, QuestionnaireTypes } from "../../../store/type";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  useCreateQuestionnaireMutation,
  useUpdateQuestionnaireMutation,
} from "../../../service/questionnaires";
import { selectCurrentUser } from "../../../store/auth";
import { useSelector } from "react-redux";
import { Input } from "../../../components/Input";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  questionnaire?: Questionnaire;
} & QuestionnaireTypes;

export const QuestionnaireForm: React.FC<Props> = ({
  type,
  isOpen,
  closeModal,
  questionnaire,
}) => {
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
  const [updateQuestionnaire, requestUpdateQuestionnaire] =
    useUpdateQuestionnaireMutation();
  const [createQuestionnaire, requestCreateQuestionnaire] =
    useCreateQuestionnaireMutation();

  const questionnaireSchema = Yup.object().shape({
    title: Yup.string().required(t("Validations.required")),
  });

  const onSubmitObservation = async (values: Partial<Questionnaire>) => {
    if (questionnaire) {
      await updateQuestionnaire({
        project_id: user.currentProject?.id || 0,
        ...questionnaire,
        ...values,
      });
    } else {
      await createQuestionnaire({
        type,
        project_id: user.currentProject?.id || 0,
        ...values,
      });
    }
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={
        questionnaire
          ? t("Questionnaires.form.rename")
          : t("Questionnaires.form.new")
      }
    >
      <Container flexDirection="column" minWidth={548}>
        <Formik
          initialValues={{
            title: questionnaire?.title,
          }}
          onSubmit={onSubmitObservation}
          validationSchema={questionnaireSchema}
        >
          {({ handleSubmit, setFieldValue, values, errors, submitCount }) => (
            <Container width="100%" flexDirection="column" mt={40}>
              <Input
                mb="16px"
                label={t("Questionnaires.form.name")}
                value={values.title}
                handlePressEnter={handleSubmit}
                errorMessage={(!!submitCount && errors.title) || ""}
                onChangeText={(text) => setFieldValue("title", text)}
              />

              <Container width={"100%"} justifyContent={"flex-end"}>
                <Button
                  mt="40px"
                  mr={"16px"}
                  onClick={closeModal}
                  width={"fit-content"}
                  variant={"secondary"}
                  value={t("Global.cancel")}
                  isDisabled={
                    requestCreateQuestionnaire.isLoading ||
                    requestUpdateQuestionnaire.isLoading
                  }
                />
                <Button
                  mt="40px"
                  width={"fit-content"}
                  onClick={handleSubmit}
                  isDisabled={
                    requestCreateQuestionnaire.isLoading ||
                    requestUpdateQuestionnaire.isLoading
                  }
                  value={
                    requestCreateQuestionnaire.isLoading ||
                    requestUpdateQuestionnaire.isLoading
                      ? t("Global.loading")
                      : t("Global.save")
                  }
                />
              </Container>
            </Container>
          )}
        </Formik>
      </Container>
    </Modal>
  );
};

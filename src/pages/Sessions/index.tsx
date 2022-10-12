import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Container, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import { Modal } from "../../components/Modal";
import {
  useGetCoachesMutation,
  useGetSchoolsMutation,
  useGetSessionsMutation,
  useGetTeachersMutation,
  useUpdateQuestionnaireApplicationMutation,
} from "../../service";
import { selectCurrentUser } from "../../store/auth";
import { ApplicationWithRelation, School, User } from "../../store/type";
import * as Yup from "yup";
import Select from "../../components/Select";

const Sessions: React.FC = () => {
  const [getSessions, { isLoading, data }] = useGetSessionsMutation();
  const [updateQuestionnaire, requestUpdateQuestionnaire] =
    useUpdateQuestionnaireApplicationMutation();

  const [getSchools, requestGetSchools] = useGetSchoolsMutation();
  const [getTeachers, requestGetTeachers] = useGetTeachersMutation();
  const [getCoachs, requestGetCoachs] = useGetCoachesMutation();

  const user = useSelector(selectCurrentUser);
  const [currentSession, setCurrentSession] = useState<
    ApplicationWithRelation | undefined
  >(undefined);
  const { t } = useTranslation();

  useEffect(() => {
    getSessions({ project_id: user.currentProject?.id || 0 });
    getSchools({});
    getTeachers({});
    getCoachs({});
  }, [getSessions, getSchools, user]);

  const closeModal = () => {
    setCurrentSession(undefined);
    getSessions({ project_id: user.currentProject?.id || 0 });
  };

  const onSubmitSession = async (
    values: Pick<
      ApplicationWithRelation,
      "school_id" | "teacher_id" | "coach_id"
    >
  ) => {
    await updateQuestionnaire({ ...currentSession, ...values });
    closeModal();
  };

  return (
    <>
      <Container width="100%" flexDirection="column">
        <Text
          mb={40}
          fontSize={32}
          fontWeight={600}
          value={t("Sessions.title")}
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
            data.map((session) => (
              <Container
                padding="20px 16px"
                alignItems="center"
                borderBottom="1px solid #f4f5f5"
                onClick={() => setCurrentSession(session)}
              >
                <Container
                  mr="16px"
                  width="40px"
                  height="40px"
                  overflow="hidden"
                  alignItems="center"
                  borderRadius="20px"
                  background="#F4F5F5"
                  justifyContent="center"
                >
                  <Icon size={24} name="user" color="#49504C" />
                </Container>
                <Text
                  fontSize="16px"
                  color="#49504C"
                  lineHeight="24px"
                  value={session.questionnaire.title}
                />
              </Container>
            ))
          )}
        </Container>
      </Container>

      <Modal isOpen={!!currentSession} onClose={closeModal}>
        <Container flexDirection="column" minWidth={400}>
          <Text
            mb={40}
            fontSize={24}
            fontWeight={600}
            value={t("Projects.update-title")}
          />

          <Formik
            initialValues={{
              school_id: currentSession?.school_id || 0,
              teacher_id: currentSession?.teacher_id || 0,
              coach_id: currentSession?.coach_id || 0,
            }}
            onSubmit={onSubmitSession}
          >
            {({ handleSubmit, setFieldValue, values, errors, submitCount }) => (
              <Container width="100%" flexDirection="column">
                {requestGetSchools.data && (
                  <Select
                    mb={"16px"}
                    value={requestGetSchools?.data.findIndex(
                      (school) => school.id === values.school_id
                    )}
                    label={t("Schools.name")}
                    options={requestGetSchools?.data as School[]}
                    onChange={(e) => setFieldValue("school_id", e.id)}
                    renderOption={(opt) => opt?.name}
                  />
                )}

                {requestGetTeachers.data && (
                  <Select
                    mb={"16px"}
                    value={requestGetTeachers?.data.findIndex(
                      (teacher) => teacher.id === values.teacher_id
                    )}
                    label={t("Teachers.name")}
                    options={requestGetTeachers?.data as User[]}
                    onChange={(e) => setFieldValue("teacher_id", e.id)}
                    renderOption={(opt) => opt?.name}
                  />
                )}

                {requestGetCoachs.data && (
                  <Select
                    mb={"16px"}
                    value={requestGetCoachs?.data.findIndex(
                      (coach) => coach.id === values.coach_id
                    )}
                    label={t("Coaches.name")}
                    options={requestGetCoachs?.data as User[]}
                    onChange={(e) => setFieldValue("coach_id", e.id)}
                    renderOption={(opt) => opt?.name}
                  />
                )}

                <Button
                  mt="40px"
                  isDisabled={requestUpdateQuestionnaire.isLoading}
                  value={
                    requestUpdateQuestionnaire.isLoading
                      ? "Loading..."
                      : t("Projects.new-button")
                  }
                  onClick={handleSubmit}
                />
              </Container>
            )}
          </Formik>
        </Container>
      </Modal>
    </>
  );
};

export default Sessions;

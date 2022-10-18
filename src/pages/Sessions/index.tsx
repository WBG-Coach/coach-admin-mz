import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Container, Text } from "../../components";
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
import Select from "../../components/Select";
import { motion } from "framer-motion";

const Sessions: React.FC = () => {
  const [getSessions, { isLoading, data }] = useGetSessionsMutation();
  const [updateQuestionnaire, requestUpdateQuestionnaire] =
    useUpdateQuestionnaireApplicationMutation();

  const [getSchools, requestGetSchools] = useGetSchoolsMutation();
  const [getTeachers, requestGetTeachers] = useGetTeachersMutation();
  const [getCoaches, requestGetCoachs] = useGetCoachesMutation();

  const user = useSelector(selectCurrentUser);
  const [currentSession, setCurrentSession] = useState<
    ApplicationWithRelation | undefined
  >(undefined);
  const { t } = useTranslation();

  useEffect(() => {
    const project_id = user.currentProject?.id || 0;
    getSessions({ teacher_project_id: project_id || 0 });
    getSchools({ project_id });
    getTeachers({ project_id });
    getCoaches({ project_id });
  }, [getSessions, getSchools, getCoaches, getTeachers, user]);

  const closeModal = () => {
    setCurrentSession(undefined);
    getSessions({ teacher_project_id: user.currentProject?.id || 0 });
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
          borderBottom="none"
          flexDirection="column"
        >
          <Container
            padding="20px 16px"
            alignItems="center"
            borderBottom="1px solid #f4f5f5"
          >
            <Container flex={1}>
              <Text
                fontSize="16px"
                color="#49504C"
                lineHeight="24px"
                value={t("Sessions.session-title")}
              />
            </Container>
            <Container flex={1}>
              <Text
                fontSize="16px"
                color="#49504C"
                lineHeight="24px"
                value={t("Sessions.school-name")}
              />
            </Container>
            <Container flex={1}>
              <Text
                fontSize="16px"
                color="#49504C"
                lineHeight="24px"
                value={t("Sessions.teacher-name")}
              />
            </Container>
            <Container flex={1}>
              <Text
                fontSize="16px"
                color="#49504C"
                lineHeight="24px"
                value={t("Sessions.coach-name")}
              />
            </Container>
          </Container>
          {isLoading || !data ? (
            <LoadingDots />
          ) : data.length >= 1 ? (
            data.map((session) => (
              <motion.div
                key={session.id}
                style={{ width: "100%" }}
                initial={{ height: 0 }}
                animate={{ height: "fit-content" }}
              >
                <Container
                  padding="20px 16px"
                  alignItems="center"
                  borderBottom="1px solid #f4f5f5"
                  onClick={() => setCurrentSession(session)}
                >
                  <Container flex={1}>
                    <Text
                      fontSize="16px"
                      color="#000000"
                      lineHeight="24px"
                      value={"Session " + session.order}
                    />
                  </Container>
                  <Container flex={1}>
                    <Text
                      fontSize="16px"
                      color="#49504C"
                      lineHeight="24px"
                      value={session.school.name}
                    />
                  </Container>
                  <Container flex={1}>
                    <Text
                      fontSize="16px"
                      color="#49504C"
                      lineHeight="24px"
                      value={session.teacher.name}
                    />
                  </Container>
                  <Container flex={1}>
                    <Text
                      fontSize="16px"
                      color="#49504C"
                      lineHeight="24px"
                      value={session.coach.name}
                    />
                  </Container>
                </Container>
              </motion.div>
            ))
          ) : (
            <Container
              minHeight={"200px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text
                fontSize={20}
                fontWeight={400}
                value={t("Sessions.data-not-found")}
              />
            </Container>
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

                <Container width={"100%"} justifyContent={"flex-end"}>
                  <Button
                    mt="40px"
                    width={"fit-content"}
                    isDisabled={requestUpdateQuestionnaire.isLoading}
                    value={t("Global.cancel")}
                    onClick={closeModal}
                    mr={"16px"}
                    variant={"secondary"}
                  />
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
              </Container>
            )}
          </Formik>
        </Container>
      </Modal>
    </>
  );
};

export default Sessions;

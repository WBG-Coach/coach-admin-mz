import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { Button, Container, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import {
  useCreateCompetencyMutation,
  useGetCompetenciesMutation,
  useUpdateCompetencyMutation,
} from "../../service/competences";
import { selectCurrentUser } from "../../store/auth";
import { Competence } from "../../store/type";
import { motion } from "framer-motion";
import BreadCrumb from "../../components/Breadcrumb";
import { Modal } from "../../components/Modal";
import { Formik } from "formik";
import { Input } from "../../components/Input";
import * as Yup from "yup";
import ListMenu from "../../components/ListMenu";

const Competencies: React.FC<{}> = () => {
  const { t } = useTranslation();
  const [getCompetencies, { isLoading, data }] = useGetCompetenciesMutation();
  const [createCompetency, requestCreateCompetency] =
    useCreateCompetencyMutation();
  const [updateCompetency, requestUpdateCompetency] =
    useUpdateCompetencyMutation();
  const [selectedCompetence, setSelectedCompetence] = useState<Competence>();
  const [isUpdating, setIsUpdating] = useState(false);
  const [newCompetence, setNewCompetence] = useState(false);
  const user = useSelector(selectCurrentUser);
  const theme = useTheme();

  useEffect(() => {
    setSelectedCompetence(undefined);
    getCompetencies({
      project_id: user.currentProject?.id || 0,
    });
  }, [getCompetencies, user]);

  const closeModal = () => {
    setIsUpdating(false);
    setNewCompetence(false);
    getCompetencies({
      project_id: user.currentProject?.id || 0,
    });
  };

  const competenciesSchema = Yup.object().shape({
    title: Yup.string().required(t("Validations.required")),
    description: Yup.string().required(t("Validations.required")),
    subtitle: Yup.string().required(t("Validations.required")),
  });

  const onSubmitCompetence = async (values: Partial<Competence>) => {
    if (selectedCompetence) {
      await updateCompetency({
        id: selectedCompetence?.id || 0,
        title: values.title || "",
        subtitle: values.subtitle || "",
        description: values.description || "",
      });
    } else {
      await createCompetency({
        ...values,
        project_id: user.currentProject?.id || 0,
        matrix_id: 1,
      });
    }
    closeModal();
  };

  return (
    <>
      <Container width="100%" flexDirection="column">
        <BreadCrumb />
        <Text
          mb={40}
          fontSize={32}
          fontWeight={600}
          value={t("Competencies.name")}
        />

        <Container gridGap="32px">
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
              data.map((competence) => (
                <motion.div
                  key={competence.id}
                  style={{ width: "100%" }}
                  initial={{ height: 0 }}
                  animate={{ height: "fit-content" }}
                >
                  <Container
                    padding="20px 16px"
                    alignItems="center"
                    borderBottom="1px solid #f4f5f5"
                    onClick={() => setSelectedCompetence(competence)}
                    background={
                      selectedCompetence?.id === competence.id
                        ? theme.colors.primary + "10"
                        : "#fff"
                    }
                  >
                    <Container flex={1}>
                      <Container width="24px">
                        <Text
                          fontSize="16px"
                          color="#49504C"
                          lineHeight="24px"
                          value={competence.id.toString()}
                        />
                      </Container>
                      <Text
                        fontSize="16px"
                        color="#49504C"
                        lineHeight="24px"
                        value={competence.subtitle}
                      />
                    </Container>

                    <ListMenu
                      options={[
                        {
                          label: t("Competencies.update"),
                          onClick: () => setIsUpdating(true),
                        },
                      ]}
                    />
                  </Container>
                </motion.div>
              ))
            )}
          </Container>
          {selectedCompetence && (
            <Container flex={1} flexDirection="column">
              <Text
                value={selectedCompetence.title}
                fontSize="14px"
                color="#000000"
                fontWeight={400}
                lineHeight="20px"
                mb="8px"
              />
              <Text
                mb="16px"
                fontSize="24px"
                color="#000000"
                fontWeight={600}
                lineHeight="28px"
                value={selectedCompetence.subtitle}
              />
              <Text
                mb="32px"
                fontSize="16px"
                color="#49504C"
                fontWeight={500}
                lineHeight="24px"
                value={selectedCompetence.description}
              />
            </Container>
          )}
        </Container>

        <Container
          p="12px 16px"
          alignItems="center"
          onClick={() => setNewCompetence(true)}
          width={"fit-content"}
        >
          <Icon size={24} name="plus" mr="8px" color={theme.colors.primary} />
          <Text value={t("Competencies.add")} color={theme.colors.primary} />
        </Container>
      </Container>

      <Modal
        isOpen={newCompetence || isUpdating}
        title={
          newCompetence
            ? t("Competencies.new-title")
            : t("Competencies.update-title")
        }
        onClose={closeModal}
      >
        <Container flexDirection="column" mt={40} minWidth={548}>
          <Formik
            initialValues={{
              title: selectedCompetence?.title || "",
              subtitle: selectedCompetence?.subtitle || "",
              description: selectedCompetence?.description || "",
            }}
            validationSchema={competenciesSchema}
            onSubmit={onSubmitCompetence}
          >
            {({ handleSubmit, setFieldValue, values, errors, submitCount }) => (
              <Container width="100%" flexDirection="column">
                <Input
                  mb="16px"
                  label={t("Competencies.title")}
                  value={values.title}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.title) || ""}
                  onChangeText={(text) => setFieldValue("title", text)}
                />

                <Input
                  mb="16px"
                  label={t("Competencies.sub-title")}
                  value={values.subtitle}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.subtitle) || ""}
                  onChangeText={(text) => setFieldValue("subtitle", text)}
                />

                <Input
                  mb="16px"
                  label={t("Competencies.description")}
                  value={values.description}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.description) || ""}
                  onChangeText={(text) => setFieldValue("description", text)}
                />

                <Container width={"100%"} justifyContent={"flex-end"}>
                  <Button
                    mt="40px"
                    width={"fit-content"}
                    isDisabled={
                      requestCreateCompetency.isLoading ||
                      requestUpdateCompetency.isLoading
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
                      requestCreateCompetency.isLoading ||
                      requestUpdateCompetency.isLoading
                    }
                    value={
                      requestCreateCompetency.isLoading ||
                      requestUpdateCompetency.isLoading
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

export default Competencies;

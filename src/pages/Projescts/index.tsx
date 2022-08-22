import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Image, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import { Modal } from "../../components/Modal";
import { PROJECT } from "../../mock";
import {
  useCreateProjectsMutation,
  useGetProjectsMutation,
} from "../../service";
import * as Yup from "yup";
import { Project } from "../../store/type";
import { Input } from "../../components/Input";

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [newProject, setNewProject] = useState(false);
  const [getProjects, { isLoading, data }] = useGetProjectsMutation();
  const [createProject, createProjectRequest] = useCreateProjectsMutation();

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const signInSchema = Yup.object().shape({
    name: Yup.string().required(t("Validations.required")),
    primary_color: Yup.string().required(t("Validations.required")),
    country: Yup.string().required(t("Validations.required")),
    image_url: Yup.string().required(t("Validations.required")),
  });

  const handlerNewProject = (values: Partial<Project>) => {
    createProject(values).then(() => {
      setNewProject(false);
      getProjects();
    });
  };

  return (
    <>
      <Container width="100%" flexDirection="column">
        <Text
          mb={40}
          fontSize={32}
          fontWeight={600}
          value={t("Projects.title")}
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
            data.map((project) => (
              <Container
                padding="20px 16px"
                alignItems="center"
                borderBottom="1px solid #f4f5f5"
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
                  {project.image_url ? (
                    <Image src={project.image_url} width="40px" />
                  ) : (
                    <Text
                      fontSize="24px"
                      color="#49504C"
                      value={project?.name?.substring(0, 1)}
                    />
                  )}
                </Container>
                <Container flex={1}>
                  <Text
                    fontSize="16px"
                    lineHeight="24px"
                    value={project.name}
                  />
                </Container>
                <Container
                  width={80}
                  borderRadius="4px"
                  alignItems="center"
                  justifyContent="center"
                  background={project.primary_color}
                >
                  <Text
                    fontSize="16px"
                    color="#FFFFFF"
                    lineHeight="24px"
                    value={project.primary_color}
                  />
                </Container>
                <Container width={120}>
                  <Text
                    ml="auto"
                    fontSize="16px"
                    lineHeight="24px"
                    value={project.country}
                  />
                </Container>
              </Container>
            ))
          )}
        </Container>

        <Container
          p="12px 16px"
          alignItems="center"
          onClick={() => setNewProject(true)}
        >
          <Icon size={24} name="plus" mr="8px" color={PROJECT.primary_color} />
          <Text value={t("Projects.add")} color={PROJECT.primary_color} />
        </Container>
      </Container>

      <Modal isOpen={newProject} onClose={() => setNewProject(false)}>
        <Container flexDirection="column" minWidth={400}>
          <Text
            mb={40}
            fontSize={24}
            fontWeight={600}
            value={t("Projects.new-tittle")}
          />

          <Formik
            initialValues={{
              name: "",
              primary_color: "",
              country: "",
              image_url: "",
            }}
            validationSchema={signInSchema}
            onSubmit={handlerNewProject}
          >
            {({ handleSubmit, setFieldValue, errors, submitCount }) => (
              <Container width="100%" flexDirection="column">
                <Text
                  mb="4px"
                  fontSize="14px"
                  lineHeight="18px"
                  fontWeight={600}
                  value={t("Project.name")}
                />

                <Input
                  mb="16px"
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.name) || ""}
                  onChangeText={(text) => setFieldValue("name", text)}
                />

                <Text
                  mb="4px"
                  fontSize="14px"
                  lineHeight="18px"
                  fontWeight={600}
                  value={t("Projects.image_url")}
                />

                <Input
                  mb="16px"
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.image_url) || ""}
                  onChangeText={(text) => setFieldValue("image_url", text)}
                />

                <Text
                  mb="4px"
                  fontSize="14px"
                  lineHeight="18px"
                  fontWeight={600}
                  value={t("Projects.primary_color")}
                />

                <Input
                  mb="16px"
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.primary_color) || ""}
                  onChangeText={(text) => setFieldValue("primary_color", text)}
                />

                <Text
                  mb="4px"
                  fontSize="14px"
                  lineHeight="18px"
                  fontWeight={600}
                  value={t("Projects.country")}
                />

                <Input
                  mb="16px"
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.country) || ""}
                  onChangeText={(text) => setFieldValue("country", text)}
                />

                <Button
                  mt="40px"
                  isDisabled={createProjectRequest.isLoading}
                  value={
                    createProjectRequest.isLoading
                      ? "Loading..."
                      : t("Project.new-button")
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

export default Projects;

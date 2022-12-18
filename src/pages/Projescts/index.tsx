import React, { useEffect, useState } from "react";
import { Button, Container, Image, Text } from "../../components";
import { LoadingDots } from "../../components/LoadingDots";
import { useTranslation } from "react-i18next";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { Icon } from "../../components/Icon";
import { Project } from "../../store/type";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  useCreateProjectMutation,
  useGetProjectsMutation,
  useUpdateProjectMutation,
} from "../../service/projects";
import { motion } from "framer-motion";
import { useTheme } from "styled-components";
import BreadCrumb from "../../components/Breadcrumb";
import PicSelect from "../../components/PicSelect";
import { uploadFileToS3 } from "../../util";

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [newProject, setNewProject] = useState(false);
  const [getProjects, { isLoading, data }] = useGetProjectsMutation();
  const [createProject, createProjectRequest] = useCreateProjectMutation();
  const [updateProject, updateProjectRequest] = useUpdateProjectMutation();
  const [imageUrl, setImageUrl] = useState<string>();
  const theme = useTheme();

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  useEffect(() => {
    setImageUrl(selectedProject?.image_url);
  }, [selectedProject]);

  const projectSchema = Yup.object().shape({
    name: Yup.string().required(t("Validations.required")),
    primary_color: Yup.string().required(t("Validations.required")),
    country: Yup.string().required(t("Validations.required")),
  });

  const onSubmitProject = (values: Partial<Project>) => {
    if (selectedProject) {
      updateProject({
        ...values,
        id: selectedProject.id,
        image_url: imageUrl,
      }).then(() => {
        closeModal();
        getProjects();
      });
    } else {
      createProject({ ...values, image_url: imageUrl }).then(() => {
        closeModal();
        getProjects();
      });
    }
  };

  const closeModal = () => {
    setNewProject(false);
    setSelectedProject(undefined);
  };

  const addImage = async (file?: File | null) => {
    try {
      if (file) {
        const fileUrl = await uploadFileToS3(file, "schools");
        setImageUrl(fileUrl.url);
      } else {
        setImageUrl("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container width="100%" flexDirection="column">
        <BreadCrumb />
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
              <motion.div
                key={project.id}
                style={{ width: "100%" }}
                initial={{ height: 0 }}
                animate={{ height: "fit-content" }}
              >
                <Container
                  padding="20px 16px"
                  alignItems="center"
                  borderBottom="1px solid #f4f5f5"
                  onClick={() => setSelectedProject(project)}
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
              </motion.div>
            ))
          )}
        </Container>

        <Container
          p="12px 16px"
          alignItems="center"
          onClick={() => setNewProject(true)}
        >
          <Icon size={24} name="plus" mr="8px" color={theme.colors.primary} />
          <Text value={t("Projects.add")} color={theme.colors.primary} />
        </Container>
      </Container>

      <Modal isOpen={newProject || !!selectedProject} onClose={closeModal}>
        <Container flexDirection="column" minWidth={548}>
          <Text
            mb={40}
            fontSize={24}
            fontWeight={600}
            value={
              newProject ? t("Projects.new-title") : t("Projects.update-title")
            }
          />

          <PicSelect
            defaultIconName="university"
            imageUrl={imageUrl || ""}
            onSelectImage={addImage}
          />

          <Formik
            initialValues={{
              name: selectedProject?.name,
              country: selectedProject?.country,
              primary_color: selectedProject?.primary_color,
            }}
            validationSchema={projectSchema}
            onSubmit={onSubmitProject}
          >
            {({ handleSubmit, setFieldValue, values, errors, submitCount }) => (
              <Container width="100%" flexDirection="column">
                <Input
                  mb="16px"
                  label={t("Projects.name")}
                  value={values.name}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.name) || ""}
                  onChangeText={(text) => setFieldValue("name", text)}
                />

                <Container justifyContent="center" alignItems="flex-end">
                  <Input
                    flex={1}
                    mb="16px"
                    mr="2px"
                    value={values.primary_color}
                    label={t("Projects.primary_color")}
                    handlePressEnter={handleSubmit}
                    errorMessage={(!!submitCount && errors.primary_color) || ""}
                    onChangeText={(text) =>
                      setFieldValue("primary_color", text)
                    }
                  />
                  <input
                    type="color"
                    value={values.primary_color}
                    onChange={(e) =>
                      setFieldValue("primary_color", e.target.value)
                    }
                    style={{
                      flex: 2,
                      height: "52px",
                      marginBottom: "18px",
                      cursor: "pointer",
                      border: "1px solid #e3e5e8",
                      borderRadius: "8px",
                      padding: "8px",
                    }}
                  />
                </Container>

                <Input
                  mb="16px"
                  value={values.country}
                  label={t("Projects.country")}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.country) || ""}
                  onChangeText={(text) => setFieldValue("country", text)}
                />

                <Button
                  mt="40px"
                  isDisabled={
                    createProjectRequest.isLoading ||
                    updateProjectRequest.isLoading
                  }
                  value={
                    createProjectRequest.isLoading ||
                    updateProjectRequest.isLoading
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

export default Projects;

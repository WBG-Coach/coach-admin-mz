import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { Button, Container, Image, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { Input } from "../../components/Input";
import { LoadingDots } from "../../components/LoadingDots";
import {
  useCreateSchoolsMutation,
  useGetSchoolsMutation,
  useUpdateSchoolsMutation,
} from "../../service";
import { selectCurrentUser } from "../../store/auth";
import { School } from "../../store/type";
import { Formik } from "formik";
import * as Yup from "yup";
import { Modal } from "../../components/Modal";
import { uploadFileToS3 } from "../../util";

const Schools: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
  const [newSchool, setNewSchool] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School>();
  const [getSchools, { isLoading, data }] = useGetSchoolsMutation();
  const [createSchool, requestCreateScool] = useCreateSchoolsMutation();
  const [updateSchool, requestUpdateSchool] = useUpdateSchoolsMutation();
  const [imageUrl, setImageUrl] = useState<string>();

  const schoolSchema = Yup.object().shape({
    name: Yup.string().required(t("Validations.required")),
  });

  useEffect(() => {
    getSchools({ project_id: user.currentProject?.id || 0 });
  }, [getSchools, user]);

  const onSubmitSchool = (values: Partial<School>) => {
    if (selectedSchool) {
      updateSchool({
        id: selectedSchool.id,
        image_url: imageUrl || selectedSchool.image_url,
        project_id: user.currentProject?.id || 0,
        ...values,
      }).then(() => {
        closeModal();
      });
    } else {
      createSchool({
        project_id: user.currentProject?.id || 0,
        ...values,
      }).then(() => {
        closeModal();
      });
    }
  };

  const closeModal = () => {
    setSelectedSchool(undefined);
    setNewSchool(false);
    getSchools({ project_id: user.currentProject?.id || 0 });
  };

  const addImage = async (file?: File | null) => {
    try {
      if (file) {
        const fileUrl = await uploadFileToS3(file);

        setImageUrl(fileUrl.url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container width="100%" flexDirection="column">
        <Text mb={40} fontSize={32} fontWeight={600} value={t("Units.title")} />

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
            data.map((school) => (
              <Container
                padding="20px 16px"
                alignItems="center"
                borderBottom="1px solid #f4f5f5"
                onClick={() => setSelectedSchool(school)}
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
                  {school.image_url ? (
                    <Image src={school.image_url} width="40px" height="40px" />
                  ) : (
                    <Icon size={24} name="university" color="#49504C" />
                  )}
                </Container>
                <Text
                  fontSize="16px"
                  color="#49504C"
                  lineHeight="24px"
                  value={school.name}
                />
              </Container>
            ))
          )}
        </Container>

        <Container
          p="12px 16px"
          alignItems="center"
          onClick={() => setNewSchool(true)}
        >
          <Icon size={24} name="plus" mr="8px" color={theme.colors.primary} />
          <Text value={t("Schools.add")} color={theme.colors.primary} />
        </Container>
      </Container>

      <Modal isOpen={newSchool || !!selectedSchool} onClose={closeModal}>
        <Container flexDirection="column" minWidth={400}>
          <Text
            mb={40}
            fontSize={24}
            fontWeight={600}
            value={
              newSchool ? t("Projects.new-title") : t("Projects.update-title")
            }
          />

          <Container mb="40px" flexDirection="column" alignItems="center">
            <Container
              width="120px"
              height="120px"
              overflow="hidden"
              borderRadius="60px"
              alignItems="center"
              background="#E3E5E8"
              justifyContent="center"
            >
              {imageUrl || selectedSchool?.image_url ? (
                <Image
                  src={imageUrl || selectedSchool?.image_url || ""}
                  width="120px"
                  height="120px"
                  borderRadius="60px"
                />
              ) : (
                <Icon name="university" size={60} />
              )}
            </Container>
            <Container mt="16px">
              <label htmlFor="file" style={{ cursor: "pointer" }}>
                <Text
                  fontSize="14px"
                  color="primary"
                  value={t("Schools.change-photo")}
                />
              </label>
            </Container>

            <input
              id="file"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                addImage(e.target.files?.item(0));
              }}
            />
          </Container>

          <Formik
            initialValues={{
              name: selectedSchool?.name,
            }}
            validationSchema={schoolSchema}
            onSubmit={onSubmitSchool}
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

                <Button
                  mt="40px"
                  isDisabled={
                    requestCreateScool.isLoading ||
                    requestUpdateSchool.isLoading
                  }
                  value={
                    requestCreateScool.isLoading ||
                    requestUpdateSchool.isLoading
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

export default Schools;

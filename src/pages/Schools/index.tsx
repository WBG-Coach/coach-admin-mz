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
import PicSelect from "../../components/PicSelect";
import { motion } from "framer-motion";

const Schools: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
  const [newSchool, setNewSchool] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School>();
  const [getSchools, { isLoading, data }] = useGetSchoolsMutation();
  const [createSchool, requestCreateSchool] = useCreateSchoolsMutation();
  const [updateSchool, requestUpdateSchool] = useUpdateSchoolsMutation();
  const [imageUrl, setImageUrl] = useState<string>();

  const schoolSchema = Yup.object().shape({
    name: Yup.string().required(t("Validations.required")),
  });

  useEffect(() => {
    getSchools({ project_id: user.currentProject?.id || 0 });
  }, [getSchools, user]);

  const onSubmitSchool = async (values: Partial<School>) => {
    if (selectedSchool) {
      await updateSchool({
        id: selectedSchool.id,
        image_url: imageUrl || selectedSchool.image_url,
        project_id: user.currentProject?.id || 0,
        ...values,
      });
    } else {
      await createSchool({
        project_id: user.currentProject?.id || 0,
        ...values,
      });
    }
    setImageUrl(undefined);
    closeModal();
  };

  const closeModal = () => {
    setSelectedSchool(undefined);
    setNewSchool(false);
    getSchools({ project_id: user.currentProject?.id || 0 });
  };

  const addImage = async (file?: File | null) => {
    try {
      if (file) {
        const fileUrl = await uploadFileToS3(file, "schools");
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
          borderRadius="8px"
          borderBottom="none"
          flexDirection="column"
          border="1px solid #f4f5f5"
        >
          {isLoading || !data ? (
            <LoadingDots />
          ) : (
            data.map((school) => (
              <motion.div
                key={school.id}
                style={{ width: "100%" }}
                initial={{ height: 0 }}
                animate={{ height: "fit-content" }}
              >
                <Container
                  padding="20px 16px"
                  alignItems="center"
                  borderBottom="1px solid #f4f5f5"
                >
                  <Container
                    alignItems={"center"}
                    onClick={() => setSelectedSchool(school)}
                    flex={1}
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
                        <Image
                          src={school.image_url}
                          width="40px"
                          height="40px"
                        />
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
                </Container>
              </motion.div>
            ))
          )}
        </Container>

        <Container
          p="12px 16px"
          alignItems="center"
          width={"fit-content"}
          onClick={() => setNewSchool(true)}
        >
          <Icon size={24} name="plus" mr="8px" color={theme.colors.primary} />
          <Text value={t("Schools.add")} color={theme.colors.primary} />
        </Container>
      </Container>

      <Modal
        isOpen={newSchool || !!selectedSchool}
        title={newSchool ? t("Schools.new-title") : t("Schools.update-title")}
        onClose={closeModal}
      >
        <Container flexDirection="column" mt={40} minWidth={548}>
          <PicSelect
            defaultIconName="university"
            imageUrl={imageUrl || selectedSchool?.image_url || ""}
            onSelectImage={addImage}
          />

          <Formik
            initialValues={{
              name: selectedSchool?.name,
              address: selectedSchool?.address,
              village: selectedSchool?.village,
              country: selectedSchool?.country,
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

                <Input
                  mb="16px"
                  label={t("Schools.address")}
                  value={values.address}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.address) || ""}
                  onChangeText={(text) => setFieldValue("address", text)}
                />

                <Input
                  mb="16px"
                  label={t("Schools.region")}
                  value={values.village}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.village) || ""}
                  onChangeText={(text) => setFieldValue("village", text)}
                />

                <Input
                  mb="16px"
                  label={t("Projects.country")}
                  value={values.country}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.country) || ""}
                  onChangeText={(text) => setFieldValue("country", text)}
                />
                <Container width={"100%"} justifyContent={"flex-end"}>
                  <Button
                    mt="40px"
                    width={"fit-content"}
                    isDisabled={
                      requestCreateSchool.isLoading ||
                      requestUpdateSchool.isLoading
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
                      requestCreateSchool.isLoading ||
                      requestUpdateSchool.isLoading
                    }
                    value={
                      requestCreateSchool.isLoading ||
                      requestUpdateSchool.isLoading
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

export default Schools;

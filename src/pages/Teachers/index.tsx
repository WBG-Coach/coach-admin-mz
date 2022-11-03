import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { Button, Container, Image, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import {
  useCreateTeacherMutation,
  useGetTeachersMutation,
  useUpdateUserMutation,
} from "../../service/users";
import { selectCurrentUser } from "../../store/auth";
import { Modal } from "../../components/Modal";
import { uploadFileToS3 } from "../../util";
import { School, User } from "../../store/type";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "../../components/Input";
import PicSelect from "../../components/PicSelect";
import Select from "../../components/Select";
import { motion } from "framer-motion";
import BreadCrumb from "../../components/Breadcrumb";
import { useGetSchoolsMutation } from "../../service/schools";
import { Paginator } from "../../components/Paginator";

const Teachers: React.FC = () => {
  const { t } = useTranslation();
  const [getTeachers, { isLoading, data }] = useGetTeachersMutation();
  const [getSchools, requestGetSchools] = useGetSchoolsMutation();

  const user = useSelector(selectCurrentUser);
  const theme = useTheme();

  const teacherSchema = Yup.object().shape({
    name: Yup.string().required(t("Validations.required")),
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [newTeacher, setNewTeacher] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<User>();
  const [createTeacher, requestCreateTeacher] = useCreateTeacherMutation();
  const [updateUser, requestUpdateUser] = useUpdateUserMutation();
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    getTeachers({ project_id: user.currentProject?.id || 0 });
    getSchools({ project_id: user.currentProject?.id || 0 });
  }, [getTeachers, getSchools, user]);

  const closeModal = () => {
    setSelectedTeacher(undefined);
    setNewTeacher(false);
    getTeachers({ project_id: user.currentProject?.id || 0 });
  };

  const onSubmitTeacher = async (values: Partial<User>) => {
    if (selectedTeacher) {
      await updateUser({
        id: selectedTeacher.id,
        image_url: imageUrl || selectedTeacher.image_url,
        name: values.name || "",
        last_name: values.last_name || "",
        subject: values.subject || "",
      });
    } else {
      await createTeacher({
        project_id: user.currentProject?.id || 0,
        school_id: values.school_id || 0,
        name: values.name || "",
        last_name: values.last_name || "",
        subject: values.subject || "",
        image_url: imageUrl || values.image_url,
      });
    }
    setImageUrl(undefined);
    closeModal();
  };

  const addImage = async (file?: File | null) => {
    try {
      if (file) {
        const fileUrl = await uploadFileToS3(file, "teachers");
        setImageUrl(fileUrl.url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container width="100%" flexDirection="column">
      <BreadCrumb />
      <Text
        mb={40}
        fontSize={32}
        fontWeight={600}
        value={t("Teachers.title")}
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
          data.map(
            (teacher, index) =>
              index >= currentPage * itemsPerPage &&
              index < (currentPage + 1) * itemsPerPage && (
                <motion.div
                  key={teacher.id}
                  style={{ width: "100%" }}
                  initial={{ height: 0 }}
                  animate={{ height: "fit-content" }}
                >
                  <Container
                    padding="20px 16px"
                    alignItems="center"
                    borderBottom="1px solid #f4f5f5"
                    onClick={() => {
                      setSelectedTeacher(teacher);
                    }}
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
                      {teacher.image_url ? (
                        <Image
                          src={teacher.image_url}
                          width="40px"
                          height="40px"
                        />
                      ) : (
                        <Text
                          fontSize="24px"
                          color="#49504C"
                          value={teacher?.name?.substring(0, 1)}
                        />
                      )}
                    </Container>
                    <Text
                      fontSize="16px"
                      color="#49504C"
                      lineHeight="24px"
                      value={teacher.name}
                    />
                  </Container>
                </motion.div>
              )
          )
        )}

        <Paginator
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onChangePage={(newPage) => setCurrentPage(newPage)}
          onChangeItemsPerPage={(newValue) => {
            setCurrentPage(0);
            setItemsPerPage(newValue);
          }}
          totalItems={data?.length || 0}
        />
      </Container>

      <Container
        p="12px 16px"
        alignItems="center"
        onClick={() => setNewTeacher(true)}
      >
        <Icon size={24} name="plus" mr="8px" color={theme.colors.primary} />
        <Text value={t("Teachers.add")} color={theme.colors.primary} />
      </Container>

      <Modal
        isOpen={
          newTeacher || (!!selectedTeacher && !requestGetSchools.isLoading)
        }
        onClose={closeModal}
        title={
          newTeacher ? t("Teachers.new-title") : t("Teachers.update-title")
        }
      >
        <Container flexDirection="column" mt={40} minWidth={548}>
          <PicSelect
            defaultIconName="university"
            imageUrl={imageUrl || selectedTeacher?.image_url || ""}
            onSelectImage={addImage}
          />

          <Formik
            initialValues={{
              name: selectedTeacher?.name || "",
              last_name: selectedTeacher?.last_name || "",
              subject: selectedTeacher?.subject || "",
              school_id: selectedTeacher?.school_id || 0,
            }}
            validationSchema={teacherSchema}
            onSubmit={onSubmitTeacher}
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
                  label={t("Teachers.surname")}
                  value={values.last_name}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.last_name) || ""}
                  onChangeText={(text) => setFieldValue("last_name", text)}
                />

                <Input
                  mb="16px"
                  label={t("Teachers.subject")}
                  value={values.subject}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.subject) || ""}
                  onChangeText={(text) => setFieldValue("subject", text)}
                />

                {requestGetSchools.data && (
                  <Select
                    value={requestGetSchools?.data.findIndex(
                      (school) => school.id === values.school_id
                    )}
                    label={t("Schools.name")}
                    options={requestGetSchools?.data as School[]}
                    onChange={(e) => setFieldValue("school_id", e.id)}
                    renderOption={(opt) => opt?.name}
                  />
                )}

                <Container width={"100%"} justifyContent={"flex-end"}>
                  <Button
                    mt="40px"
                    width={"fit-content"}
                    isDisabled={
                      requestCreateTeacher.isLoading ||
                      requestUpdateUser.isLoading
                    }
                    value={t("Global.cancel")}
                    onClick={closeModal}
                    mr={"16px"}
                    variant={"secondary"}
                  />
                  <Button
                    mt="40px"
                    isDisabled={
                      requestCreateTeacher.isLoading ||
                      requestUpdateUser.isLoading
                    }
                    value={
                      requestCreateTeacher.isLoading ||
                      requestUpdateUser.isLoading
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
    </Container>
  );
};

export default Teachers;

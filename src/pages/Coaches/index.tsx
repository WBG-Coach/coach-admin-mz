import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Container, Image, Text } from "../../components";
import { Input } from "../../components/Input";
import { LoadingDots } from "../../components/LoadingDots";
import { Modal } from "../../components/Modal";
import PicSelect from "../../components/PicSelect";
import {
  useCreateCoachMutation,
  useGetCoachesMutation,
  useUpdateUserMutation,
} from "../../service/users";
import { selectCurrentUser } from "../../store/auth";
import { User } from "../../store/type";
import { uploadFileToS3 } from "../../util";
import { motion } from "framer-motion";
import BreadCrumb from "../../components/Breadcrumb";
import { Icon } from "../../components/Icon";
import { useTheme } from "styled-components";
import * as Yup from "yup";
import { Paginator } from "../../components/Paginator";

const Coaches: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [getCoaches, { isLoading, data }] = useGetCoachesMutation();
  const [updateUser, requestUpdateUser] = useUpdateUserMutation();
  const [createCoach, requestCreateCoach] = useCreateCoachMutation();
  const [selectedCoach, setSelectedCoach] = useState<User>();
  const [newCoach, setNewCoach] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const user = useSelector(selectCurrentUser);
  const theme = useTheme();

  const coachSchema = Yup.object().shape({
    email: Yup.string().required(t("Validations.required")),
  });

  useEffect(() => {
    getCoaches({ project_id: user.currentProject?.id || 0 });
  }, [getCoaches, user]);

  const onSubmitCoach = async (values: User & { email: string }) => {
    if (selectedCoach) {
      await updateUser({
        id: selectedCoach.id,
        image_url: imageUrl || selectedCoach.image_url,
        name: values.name,
        last_name: values.last_name,
      });
      setImageUrl(undefined);
      closeModal();
    } else {
      await createCoach({
        ...values,
        project_id: user.currentProject?.id || 0,
        image_url: imageUrl,
      });
      closeModal();
    }
  };

  const closeModal = () => {
    setNewCoach(false);
    setSelectedCoach(undefined);
    getCoaches({ project_id: user.currentProject?.id || 0 });
  };

  const addImage = async (file?: File | null) => {
    try {
      if (file) {
        const fileUrl = await uploadFileToS3(file, "coaches");
        console.log(fileUrl.url);
        setImageUrl(fileUrl.url);
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
          value={t("Coaches.title")}
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
              (coach, index) =>
                index >= currentPage * itemsPerPage &&
                index < (currentPage + 1) * itemsPerPage && (
                  <motion.div
                    key={coach.id}
                    style={{ width: "100%" }}
                    initial={{ height: 0 }}
                    animate={{ height: "fit-content" }}
                  >
                    <Container
                      key={coach.id}
                      padding="20px 16px"
                      alignItems="center"
                      borderBottom="1px solid #f4f5f5"
                      onClick={() => setSelectedCoach(coach)}
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
                        {coach.image_url ? (
                          <Image
                            src={coach.image_url}
                            width="40px"
                            height="40px"
                          />
                        ) : (
                          <Text
                            fontSize="24px"
                            color="#49504C"
                            value={coach?.name?.substring(0, 1)}
                          />
                        )}
                      </Container>
                      <Text
                        fontSize="16px"
                        color="#49504C"
                        lineHeight="24px"
                        value={coach.name}
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
          width={"fit-content"}
          onClick={() => setNewCoach(true)}
        >
          <Icon size={24} name="plus" mr="8px" color={theme.colors.primary} />
          <Text value={t("Coaches.add")} color={theme.colors.primary} />
        </Container>
      </Container>

      <Modal
        onClose={closeModal}
        isOpen={!!selectedCoach || !!newCoach}
        title={newCoach ? t("Coaches.new-title") : t("Coaches.update-title")}
      >
        <Container flexDirection="column" minWidth={548} mt={40}>
          <PicSelect
            defaultIconName="user"
            imageUrl={imageUrl || selectedCoach?.image_url || ""}
            onSelectImage={addImage}
          />

          <Formik
            initialValues={{
              name: selectedCoach?.name,
              last_name: selectedCoach?.last_name,
              email: selectedCoach?.email || "",
              password: selectedCoach?.password,
            }}
            validationSchema={coachSchema}
            onSubmit={onSubmitCoach}
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
                  label={t("Coaches.last-name")}
                  value={values.last_name}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.last_name) || ""}
                  onChangeText={(text) => setFieldValue("last_name", text)}
                />

                <Input
                  mb="16px"
                  label={t("Coaches.email")}
                  value={values.email}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.email) || ""}
                  onChangeText={(text) => setFieldValue("email", text)}
                />

                {newCoach && (
                  <Input
                    mb="16px"
                    label={t("Coaches.password")}
                    value={values.password}
                    handlePressEnter={handleSubmit}
                    errorMessage={(!!submitCount && errors.password) || ""}
                    onChangeText={(text) => setFieldValue("password", text)}
                  />
                )}

                <Container width={"100%"} justifyContent={"flex-end"}>
                  <Button
                    mt="40px"
                    width={"fit-content"}
                    isDisabled={
                      requestUpdateUser.isLoading ||
                      requestCreateCoach.isLoading
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
                      requestUpdateUser.isLoading ||
                      requestCreateCoach.isLoading
                    }
                    value={
                      requestUpdateUser.isLoading ||
                      requestCreateCoach.isLoading
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

export default Coaches;

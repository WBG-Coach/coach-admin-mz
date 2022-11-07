import React, { useEffect, useState, useCallback } from "react";
import { Button, Container, Image, Text } from "../../../components";
import { LoadingDots } from "../../../components/LoadingDots";
import {
  useCreateAdminMutation,
  useDeleteUserMutation,
  useGetAdminsMutation,
  useUpdateUserMutation,
} from "../../../service/users";
import { motion } from "framer-motion";
import ListMenu from "../../../components/ListMenu";
import { useTranslation } from "react-i18next";
import { Icon } from "../../../components/Icon";
import { useTheme } from "styled-components";
import { User } from "../../../store/type";
import { Modal } from "../../../components/Modal";
import { Formik } from "formik";
import { Input } from "../../../components/Input";
import * as Yup from "yup";
import PicSelect from "../../../components/PicSelect";
import { uploadFileToS3 } from "../../../util";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/auth";
import { toast } from "react-toastify";

const Users: React.FC = () => {
  const [getAdmins, requestGetAdmins] = useGetAdminsMutation();
  const [createAdmin, requestCreateAdmin] = useCreateAdminMutation();
  const [updateUser, requestUpdateUser] = useUpdateUserMutation();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [newUser, setNewUser] = useState(false);
  const [deleteUser] = useDeleteUserMutation();
  const user = useSelector(selectCurrentUser);
  const { t } = useTranslation();
  const theme = useTheme();

  const userSchema = Yup.object().shape({
    email: Yup.string().required(t("Validations.required")),
  });

  const reloadAdmins = useCallback(async () => {
    await getAdmins({});
  }, [getAdmins]);

  useEffect(() => {
    reloadAdmins();
  }, [reloadAdmins]);

  const addImage = async (file?: File | null) => {
    try {
      if (file) {
        const fileUrl = await uploadFileToS3(file, "coaches");
        setImageUrl(fileUrl.url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitUser = async (values: User & { email: string }) => {
    if (selectedUser) {
      await updateUser({
        id: selectedUser.id,
        image_url: imageUrl || selectedUser.image_url,
        name: values.name,
        last_name: values.last_name,
      });
      setImageUrl(undefined);
      closeModal();
    } else {
      await createAdmin({
        ...values,
        image_url: imageUrl,
        project_id: user.currentProject?.id || 0,
      });
      closeModal();
    }
  };

  const closeModal = async () => {
    reloadAdmins();
    setSelectedUser(undefined);
    setNewUser(false);
  };

  const handleDeleteUser = async (user: User) => {
    try {
      await deleteUser(user);
      reloadAdmins();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      animate={{ scale: 1 }}
      style={{ width: "100%" }}
      initial={{ scale: 0.7 }}
    >
      <Container flexDirection={"column"} width={"100%"}>
        {requestGetAdmins.isLoading ? (
          <Container flex={1} justifyContent={"center"} alignItems={"center"}>
            <LoadingDots />
          </Container>
        ) : (
          <>
            {requestGetAdmins.data && requestGetAdmins.data?.length >= 1 ? (
              requestGetAdmins.data.map((user) => (
                <motion.div
                  key={user.id}
                  style={{ width: "100%" }}
                  initial={{ height: 0 }}
                  animate={{ height: "fit-content" }}
                >
                  <Container
                    padding="12px 0px"
                    borderBottom="1px solid #f4f5f5"
                    alignItems={"center"}
                  >
                    <Container
                      onClick={() => setSelectedUser(user)}
                      flex={1}
                      alignItems={"center"}
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
                        {user.image_url ? (
                          <Image
                            src={user.image_url}
                            width="40px"
                            height="40px"
                          />
                        ) : (
                          <Text
                            fontSize="24px"
                            color="#49504C"
                            value={user?.name?.substring(0, 1)}
                          />
                        )}
                      </Container>
                      <Text
                        ml={"16px"}
                        fontSize="16px"
                        color="#49504C"
                        lineHeight="24px"
                        value={user.name}
                      />
                    </Container>
                    <ListMenu
                      options={[
                        {
                          label: t("Settings.Users.delete"),
                          onClick: () => {
                            handleDeleteUser(user);
                          },
                        },
                        {
                          label: t("Settings.Users.edit"),
                          onClick: () => setSelectedUser(user),
                        },
                      ]}
                    />
                  </Container>
                </motion.div>
              ))
            ) : (
              <></>
            )}
            <Container
              p="12px 0px"
              alignItems="center"
              onClick={() => setNewUser(true)}
              width={"fit-content"}
            >
              <Icon
                size={24}
                name="plus"
                mr="8px"
                color={theme.colors.primary}
              />
              <Text
                value={t("Settings.Users.add")}
                color={theme.colors.primary}
              />
            </Container>
          </>
        )}
      </Container>

      <Modal
        isOpen={!!selectedUser || newUser}
        onClose={closeModal}
        title={
          newUser
            ? t("Settings.Users.new-title")
            : t("Settings.Users.update-title")
        }
      >
        <Container flexDirection="column" minWidth={548}>
          <Formik
            initialValues={{
              name: selectedUser?.name,
              last_name: selectedUser?.last_name,
              email: selectedUser?.email || "",
              password: selectedUser?.password || "",
            }}
            onSubmit={handleSubmitUser}
            validationSchema={userSchema}
          >
            {({ handleSubmit, setFieldValue, values, errors, submitCount }) => (
              <Container width="100%" flexDirection="column" mt={40}>
                <PicSelect
                  defaultIconName="user"
                  imageUrl={imageUrl || selectedUser?.image_url || ""}
                  onSelectImage={addImage}
                />
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

                {newUser && (
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
                      requestCreateAdmin.isLoading ||
                      requestUpdateUser.isLoading
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
                      requestCreateAdmin.isLoading ||
                      requestUpdateUser.isLoading
                    }
                    value={
                      requestCreateAdmin.isLoading ||
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
    </motion.div>
  );
};

export default Users;

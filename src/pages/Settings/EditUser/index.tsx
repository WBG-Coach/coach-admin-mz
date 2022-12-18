import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Text } from "../../../components";
import PicSelect from "../../../components/PicSelect";
import { loadLocalUser, selectCurrentUser } from "../../../store/auth";
import { User } from "../../../store/type";
import { uploadFileToS3 } from "../../../util";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Input } from "../../../components/Input";
import { motion } from "framer-motion";
import { useUpdateUserMutation } from "../../../service/users";
import { LoadingDots } from "../../../components/LoadingDots";
import { setLocalUser } from "../../../storage";

import { toast } from "react-toastify";

const EditUser: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [imageUrl, setImageUrl] = useState<string>();
  const [updateUser, requestUpdateUser] = useUpdateUserMutation();

  const userSchema = Yup.object().shape({
    name: Yup.string().required(t("Validations.required")),
    email: Yup.string().required(t("Validations.required")),
  });

  useEffect(() => {
    setImageUrl(user.image_url);
  }, [user]);

  const addImage = async (file?: File | null) => {
    try {
      if (file) {
        const fileUrl = await uploadFileToS3(file, "admins");
        setImageUrl(fileUrl.url);
      } else {
        setImageUrl("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitUpdate = async (values: User) => {
    try {
      const newUser = {
        ...user,
        name: values.name,
        last_name: values.last_name,
        image_url: imageUrl,
      };

      await updateUser({ ...newUser, email: undefined });
      setLocalUser(newUser);
      dispatch(loadLocalUser(newUser));
      toast.success(t("Global.Toast.user-updated"));
    } catch (err) {
      toast.warn(t("Global.Toast.user-updated-error"));
    }
  };

  return (
    <motion.div animate={{ scale: 1 }} initial={{ scale: 0.7 }}>
      <Container flexDirection={"column"} minWidth={"408px"}>
        <Text fontWeight={600} fontSize={"20px"}>
          {t("Settings.EditUser.title")}
        </Text>
        <Text fontWeight={400} mt={"8px"} fontSize={"14px"} color={"#576375"}>
          {t("Settings.EditUser.description")}
        </Text>

        {requestUpdateUser.isLoading ? (
          <LoadingDots />
        ) : (
          <>
            <Container justifyContent={"center"} width={"100%"} mt={"40px"}>
              <PicSelect
                defaultIconName="user"
                onSelectImage={addImage}
                imageUrl={imageUrl || ""}
              />
            </Container>

            <Formik
              initialValues={{
                name: user?.name || "",
                last_name: user?.last_name || "",
                email: user?.email || "",
              }}
              validationSchema={userSchema}
              onSubmit={onSubmitUpdate}
            >
              {({
                handleSubmit,
                setFieldValue,
                values,
                errors,
                submitCount,
              }) => (
                <>
                  <Input
                    mb="24px"
                    label={t("Settings.EditUser.name")}
                    value={values.name}
                    handlePressEnter={handleSubmit}
                    errorMessage={(!!submitCount && errors.name) || ""}
                    onChangeText={(text) => setFieldValue("name", text)}
                  />
                  <Input
                    mb="24px"
                    label={t("Settings.EditUser.surname")}
                    value={values.last_name}
                    handlePressEnter={handleSubmit}
                    errorMessage={(!!submitCount && errors.last_name) || ""}
                    onChangeText={(text) => setFieldValue("last_name", text)}
                  />
                  <Input
                    mb="40px"
                    label={t("Settings.EditUser.email")}
                    value={values.email}
                    handlePressEnter={handleSubmit}
                    errorMessage={(!!submitCount && errors.email) || ""}
                    onChangeText={(text) => setFieldValue("email", text)}
                  />

                  <Button
                    value={t("Settings.EditUser.button")}
                    isDisabled={requestUpdateUser.isLoading}
                    onClick={handleSubmit}
                  />
                </>
              )}
            </Formik>
          </>
        )}
      </Container>
    </motion.div>
  );
};

export default EditUser;

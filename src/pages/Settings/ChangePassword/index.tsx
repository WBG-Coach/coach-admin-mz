import { Formik } from "formik";
import React from "react";
import { Button, Container, Text } from "../../../components";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Input } from "../../../components/Input";
import { motion } from "framer-motion";
import { useUpdatePasswordMutation } from "../../../service/users";
import { LoadingDots } from "../../../components/LoadingDots";
import { toast } from "react-toastify";

const ChangePassword: React.FC = () => {
  const [updatePassword, requestUpdatePassword] = useUpdatePasswordMutation();
  const { t } = useTranslation();

  const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string().required(t("Validations.required")),
    newPassword: Yup.string().min(8).required(t("Validations.required")),
    rePassword: Yup.string()
      .min(8)
      .required(t("Validations.required"))
      .oneOf([Yup.ref("newPassword")], t("Validations.same-password")),
  });

  const onSubmitUpdate = (values: {
    currentPassword: string;
    newPassword: string;
    rePassword: string;
  }) => {
    try {
      updatePassword({
        new_password: values.newPassword,
        old_password: values.currentPassword,
      });
      toast.success(t("Global.Toast.change-password"));
    } catch (err) {
      toast.error(t("Global.Toast.change-password-error"));
    }
  };

  return (
    <motion.div animate={{ scale: 1 }} initial={{ scale: 0.7 }}>
      <Container flexDirection={"column"} minWidth={"408px"}>
        <Text fontWeight={600} fontSize={"20px"}>
          {t("Settings.ChangePassword.title")}
        </Text>
        <Text
          fontWeight={400}
          mt={"8px"}
          mb={"40px"}
          fontSize={"14px"}
          color={"#576375"}
        >
          {t("Settings.ChangePassword.description")}
        </Text>
        {requestUpdatePassword.isLoading ? (
          <LoadingDots />
        ) : (
          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              rePassword: "",
            }}
            validationSchema={passwordSchema}
            onSubmit={onSubmitUpdate}
          >
            {({ handleSubmit, setFieldValue, values, errors, submitCount }) => (
              <>
                <Input
                  mb="24px"
                  type="password"
                  label={t("Settings.ChangePassword.current-password")}
                  value={values.currentPassword}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.currentPassword) || ""}
                  onChangeText={(text) =>
                    setFieldValue("currentPassword", text)
                  }
                />
                <Input
                  type="password"
                  label={t("Settings.ChangePassword.new-password")}
                  value={values.newPassword}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.newPassword) || ""}
                  onChangeText={(text) => setFieldValue("newPassword", text)}
                />
                <Text
                  fontWeight={400}
                  mt={"8px"}
                  mb={"24px"}
                  fontSize={"14px"}
                  color={"#576375"}
                >
                  {t("Settings.ChangePassword.minimum")}
                </Text>
                <Input
                  mb="40px"
                  label={t("Settings.ChangePassword.re-password")}
                  value={values.rePassword}
                  type={"password"}
                  handlePressEnter={handleSubmit}
                  errorMessage={(!!submitCount && errors.rePassword) || ""}
                  onChangeText={(text) => setFieldValue("rePassword", text)}
                />

                <Button
                  value={t("Settings.ChangePassword.button")}
                  onClick={handleSubmit}
                />
              </>
            )}
          </Formik>
        )}
      </Container>
    </motion.div>
  );
};

export default ChangePassword;

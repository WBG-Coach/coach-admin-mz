import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Container, Image, Text } from "../../components";
import { Input } from "../../components/Input";
import { LoadingDots } from "../../components/LoadingDots";
import { Modal } from "../../components/Modal";
import PicSelect from "../../components/PicSelect";
import { useGetCoachesMutation } from "../../service";
import { selectCurrentUser } from "../../store/auth";
import { User } from "../../store/type";
import { useUpdateUserMutation } from "../../service";
import { uploadFileToS3 } from "../../util";
import { motion } from "framer-motion";

const Coaches: React.FC = () => {
  const { t } = useTranslation();
  const [getCoaches, { isLoading, data }] = useGetCoachesMutation();
  const [updateUser, requestUpdateUser] = useUpdateUserMutation();
  const [selectedCoach, setSelectedCoach] = useState<User>();
  const [imageUrl, setImageUrl] = useState<string>();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    getCoaches({ project_id: user.currentProject?.id || 0 });
  }, [getCoaches, user]);

  const onSubmitCoach = async (values: Partial<User>) => {
    if (selectedCoach) {
      await updateUser({
        id: selectedCoach.id,
        image_url: imageUrl || selectedCoach.image_url,
        name: values.name,
      });
      setImageUrl(undefined);
      closeModal();
    }
  };

  const closeModal = () => {
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
            data.map((coach) => (
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
                      <Image src={coach.image_url} width="40px" height="40px" />
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
            ))
          )}
        </Container>
      </Container>

      <Modal
        isOpen={!!selectedCoach}
        onClose={closeModal}
        title={t("Coaches.update-title")}
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
            }}
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

                <Container width={"100%"} justifyContent={"flex-end"}>
                  <Button
                    mt="40px"
                    width={"fit-content"}
                    isDisabled={requestUpdateUser.isLoading}
                    value={t("Global.cancel")}
                    onClick={closeModal}
                    mr={"16px"}
                    variant={"secondary"}
                  />
                  <Button
                    mt="40px"
                    width={"fit-content"}
                    isDisabled={requestUpdateUser.isLoading}
                    value={
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
    </>
  );
};

export default Coaches;

import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { Container, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import { useGetQuestionnairesMutation } from "../../service/questionnaires";
import { selectCurrentUser } from "../../store/auth";
import { Questionnaire, QuestionnaireTypes } from "../../store/type";
import { motion } from "framer-motion";
import ListMenu from "../../components/ListMenu";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../components/Breadcrumb";
import { QuestionnaireForm } from "./QuestionnaireForm";

const Questionnaires: React.FC<{}> = () => {
  const theme = useTheme();
  const { type } = useParams<QuestionnaireTypes>();
  const { t } = useTranslation();
  const [newQuestionnaire, setNewQuestionnaire] = useState(false);
  const [selectedQuestionnaire, setSelectedQuestionnaire] =
    useState<Questionnaire>();

  const user = useSelector(selectCurrentUser);
  const [getQuestionnaires, { isLoading, data }] =
    useGetQuestionnairesMutation();

  const loadQuestionnaires = useCallback(() => {
    if (type) {
      getQuestionnaires({
        type,
        project_id: user.currentProject?.id || 0,
      });
    }
  }, [getQuestionnaires, type, user.currentProject?.id]);

  useEffect(() => {
    loadQuestionnaires();
  }, [loadQuestionnaires]);

  const closeModal = () => {
    setSelectedQuestionnaire(undefined);
    setNewQuestionnaire(false);
    loadQuestionnaires();
  };

  const navigate = useNavigate();

  return (
    <>
      <Container width="100%" flexDirection="column">
        <BreadCrumb />
        <Text
          mb={40}
          fontSize={32}
          fontWeight={600}
          value={t(`Questionnaires.${type}.title`)}
        />

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
            data.map((questionnaire) => (
              <motion.div
                key={questionnaire.id}
                style={{ width: "100%" }}
                initial={{ height: 0 }}
                animate={{ height: "fit-content" }}
              >
                <Container
                  padding="20px 16px"
                  borderBottom="1px solid #f4f5f5"
                  alignItems={"center"}
                >
                  <Container flex={1} alignItems={"center"}>
                    <Icon color="#7D827F" name="clipboard-notes" size={24} />
                    <Text
                      ml={"16px"}
                      fontSize="16px"
                      color="#49504C"
                      lineHeight="24px"
                      value={questionnaire.title}
                    />
                  </Container>
                  <ListMenu
                    options={[
                      {
                        label: t("Questionnaires.edit"),
                        onClick: () =>
                          navigate(
                            `/questionnaire/${questionnaire.id}/questions`
                          ),
                      },
                      {
                        label: t("Questionnaires.rename"),
                        onClick: () => setSelectedQuestionnaire(questionnaire),
                      },
                    ]}
                  />
                </Container>
              </motion.div>
            ))
          )}
        </Container>

        <Container
          p="12px 16px"
          alignItems="center"
          onClick={() => {
            setNewQuestionnaire(true);
          }}
          width={"fit-content"}
        >
          <Icon size={24} name="plus" mr="8px" color={theme.colors.primary} />
          <Text
            value={t(`Questionnaires.${type}.add`)}
            color={theme.colors.primary}
          />
        </Container>
      </Container>

      {type && (
        <QuestionnaireForm
          type={type}
          closeModal={closeModal}
          questionnaire={selectedQuestionnaire}
          isOpen={!!selectedQuestionnaire || newQuestionnaire}
        />
      )}
    </>
  );
};

export default Questionnaires;

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { Container, Image, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import { useGetSchoolsMutation, useGetSessionsMutation } from "../../service";
import { selectCurrentUser } from "../../store/auth";
import { ApplicationWithRelation } from "../../store/type";

const Sessions: React.FC = () => {
  const [getSessions, { isLoading, data }] = useGetSessionsMutation();
  const user = useSelector(selectCurrentUser);
  const [currentSession, setCurrentSession] = useState<
    ApplicationWithRelation | undefined
  >(undefined);
  const { t } = useTranslation();

  useEffect(() => {
    getSessions({ project_id: user.currentProject?.id || 0 });
  }, [getSessions, user]);

  return (
    <Container width="100%" flexDirection="column">
      <Text
        mb={40}
        fontSize={32}
        fontWeight={600}
        value={t("Sessions.title")}
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
          data.map((session) => (
            <Container
              padding="20px 16px"
              alignItems="center"
              borderBottom="1px solid #f4f5f5"
              onClick={() => setCurrentSession(session)}
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
                <Icon size={24} name="user" color="#49504C" />
              </Container>
              <Text
                fontSize="16px"
                color="#49504C"
                lineHeight="24px"
                value={session.questionnaire.title}
              />
            </Container>
          ))
        )}
      </Container>
    </Container>
  );
};

export default Sessions;

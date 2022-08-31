import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { Container, Image, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import { useGetSchoolsMutation } from "../../service";
import { selectCurrentUser } from "../../store/auth";

const Schools: React.FC = () => {
  const { t } = useTranslation();
  const [getSchools, { isLoading, data }] = useGetSchoolsMutation();
  const theme = useTheme();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    getSchools({ project_id: user.currentProject?.id || 0 });
  }, [getSchools, user]);

  return (
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

      <Container p="12px 16px" alignItems="center" onClick={() => {}}>
        <Icon size={24} name="plus" mr="8px" color={theme.colors.primary} />
        <Text value={t("Competencies.add")} color={theme.colors.primary} />
      </Container>
    </Container>
  );
};

export default Schools;

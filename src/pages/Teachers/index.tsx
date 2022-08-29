import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { Container, Image, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import { useGetTeachersMutation } from "../../service";

const Teachers: React.FC = () => {
  const { t } = useTranslation();
  const [getTeachers, { isLoading, data }] = useGetTeachersMutation();
  const theme = useTheme();

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);

  return (
    <Container width="100%" flexDirection="column">
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
          data.map((teacher) => (
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
                {teacher.image_url ? (
                  <Image src={teacher.image_url} width="40px" height="40px" />
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
          ))
        )}
      </Container>

      <Container p="12px 16px" alignItems="center" onClick={() => {}}>
        <Icon size={24} name="plus" mr="8px" color={theme.colors.primary} />
        <Text value={t("Teachers.add")} color={theme.colors.primary} />
      </Container>
    </Container>
  );
};

export default Teachers;

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { Container, Text } from "../../components";
import { Icon } from "../../components/Icon";
import { LoadingDots } from "../../components/LoadingDots";
import { useGetCompetenciesMutation } from "../../service";
import { selectCurrentUser } from "../../store/auth";
import { Competence } from "../../store/type";
import { motion } from "framer-motion";
import BreadCrumb from "../../components/Breadcrumb";

const Competencies: React.FC<{}> = () => {
  const { t } = useTranslation();
  const [getCompetencies, { isLoading, data }] = useGetCompetenciesMutation();
  const [selectedCompetence, setSelectedCompetence] = useState<Competence>();
  const theme = useTheme();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    setSelectedCompetence(undefined);
    getCompetencies({
      project_id: user.currentProject?.id || 0,
    });
  }, [getCompetencies, user]);

  return (
    <Container width="100%" flexDirection="column">
      <BreadCrumb />
      <Text
        mb={40}
        fontSize={32}
        fontWeight={600}
        value={t("Competencies.title")}
      />

      <Container gridGap="32px">
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
            data.map((competence) => (
              <motion.div
                key={competence.id}
                style={{ width: "100%" }}
                initial={{ height: 0 }}
                animate={{ height: "fit-content" }}
              >
                <Container
                  onClick={() => setSelectedCompetence(competence)}
                  padding="20px 16px"
                  borderBottom="1px solid #f4f5f5"
                  background={
                    selectedCompetence?.id === competence.id
                      ? theme.colors.primary + "10"
                      : "#fff"
                  }
                >
                  <Container width="24px">
                    <Text
                      fontSize="16px"
                      color="#49504C"
                      lineHeight="24px"
                      value={competence.id.toString()}
                    />
                  </Container>
                  <Text
                    fontSize="16px"
                    color="#49504C"
                    lineHeight="24px"
                    value={competence.subtitle}
                  />
                </Container>
              </motion.div>
            ))
          )}
        </Container>
        {selectedCompetence && (
          <Container flex={1} flexDirection="column">
            <Text
              value={selectedCompetence.title}
              fontSize="14px"
              color="#000000"
              fontWeight={400}
              lineHeight="20px"
              mb="8px"
            />
            <Text
              mb="16px"
              fontSize="24px"
              color="#000000"
              fontWeight={600}
              lineHeight="28px"
              value={selectedCompetence.subtitle}
            />
            <Text
              mb="32px"
              fontSize="16px"
              color="#49504C"
              fontWeight={500}
              lineHeight="24px"
              value={selectedCompetence.description}
            />
          </Container>
        )}
      </Container>

      <Container p="12px 16px" alignItems="center" onClick={() => {}}>
        <Icon size={24} name="plus" mr="8px" color={theme.colors.primary} />
        <Text value={t("Competencies.add")} color={theme.colors.primary} />
      </Container>
    </Container>
  );
};

export default Competencies;

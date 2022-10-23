import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Container, Image, Text } from "../../../../../components";
import { CustomCard } from "../../../../../components/CustomCard";
import { Dropdown } from "../../../../../components/Dropdown";
import {
  useGetTeacherCompetencesMutation,
  useGetTeachersMutation,
} from "../../../../../service";
import { selectCurrentUser } from "../../../../../store/auth";
import { User } from "../../../../../store/type";

export const options = {
  plugins: {},
  responsive: true,
};

export const PerformancePerCompetence: React.FC = () => {
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
  const [getTeachers, teacherRequest] = useGetTeachersMutation();
  const [selectedTeacher, setSelectedTeacher] = useState<User>();
  const [getTeacherCompetences, { data }] = useGetTeacherCompetencesMutation();
  const [isOpen, setOpen] = useState(false);
  const toggleDropdown = () => setOpen(!isOpen);

  useEffect(() => {
    getTeachers({ project_id: user.currentProject?.id || 0 });
  }, [getTeachers, user]);

  useEffect(() => {
    if (teacherRequest.data && teacherRequest.data[0]) {
      setSelectedTeacher(teacherRequest.data[0]);
    }
  }, [teacherRequest]);

  useEffect(() => {
    if (selectedTeacher?.id) {
      getTeacherCompetences({ teacher_id: selectedTeacher.id });
    }
  }, [getTeacherCompetences, selectedTeacher]);

  const getBoll = (type?: "Y" | "N" | "Y_F" | "N_F") => {
    switch (type) {
      case "Y":
        return (
          <Container
            m="auto"
            width="24px"
            height="24px"
            borderRadius="12px"
            background="#33CC5A"
          />
        );
      case "N":
        return (
          <Container
            m="auto"
            width="24px"
            height="24px"
            borderRadius="12px"
            background="#D92626"
          />
        );

      default:
        return (
          <Container
            m="auto"
            width="24px"
            height="24px"
            borderRadius="12px"
            background="#0080FF"
          />
        );
    }
  };

  const renderItem = (teacher: User) => (
    <Container
      p="8px"
      key={teacher.id}
      onClick={() => {
        setSelectedTeacher(teacher);
        toggleDropdown();
      }}
      borderBottom="1px solid #E3E6E9"
    >
      {teacher.image_url && (
        <Image
          mr="8px"
          width="20px"
          height="20px"
          borderRadius="10px"
          src={teacher.image_url}
        />
      )}
      <Text fontSize="14px" fontWeight="400" lineHeight="20px">
        {teacher.name}
      </Text>
    </Container>
  );

  const renderLegend = (label: string, color: string) => (
    <Container justifyContent="center" alignItems="center" mr="16px">
      <Container
        mr="8px"
        width="24px"
        height="24px"
        background={color}
        borderRadius="12px"
      />
      <Text fontSize="14px" color="#49504C">
        {label}
      </Text>
    </Container>
  );

  return (
    <CustomCard
      width="100%"
      title="Performance by competence"
      description="How each teacher evolved in each competency during the orientation sessions."
    >
      <Dropdown
        id="select-teacher"
        isOpen={isOpen}
        toggleDropdown={toggleDropdown}
        buttonContent={<>{selectedTeacher && renderItem(selectedTeacher)}</>}
      >
        {teacherRequest?.data?.map((teacher) => renderItem(teacher))}
      </Dropdown>

      <Container mt="32px">
        <Container>
          {renderLegend("Marked as yes", "#33CC5A")}
          {renderLegend("Marked as no", "#D92626")}
          {renderLegend("With feedback", "#0080FF")}
        </Container>
      </Container>

      <Container flexDirection="column" mt="32px" overflowX="scroll">
        <table style={{ width: "fit-content", borderSpacing: "0 16px" }}>
          <tr>
            {data?.headers.map((header, index) => (
              <td
                style={{
                  minWidth: index === 0 ? 200 : 80,
                  textAlign: "center",
                }}
              >
                {header?.order && (
                  <Text
                    fontSize="12px"
                    lineHeight="16px"
                    color="#576375"
                    value={t("Dashboard.session-name", {
                      value: header?.order,
                    })}
                  />
                )}
              </td>
            ))}
          </tr>
          {data?.data[0] && data?.data[0].length > 1 ? (
            data?.data.map((item) => (
              <tr>
                {item.map((row, index) => (
                  <td
                    style={{
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    {row?.subtitle ? (
                      <Text
                        textAlign="center"
                        fontSize="12px"
                        lineHeight="16px"
                        color="#576375"
                        value={row.subtitle}
                      />
                    ) : (
                      getBoll(row.type)
                    )}
                    {index !== 0 && (
                      <Container
                        zIndex="-1"
                        width="100%"
                        height="1px"
                        background="#F0F2F4"
                        position="absolute"
                        top="50%"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <Text>{selectedTeacher?.name} haven't sessions</Text>
          )}
        </table>
      </Container>
    </CustomCard>
  );
};

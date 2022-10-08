import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Image, Text } from "../../../../../components";
import { Card } from "../../../../../components/Card";
import { Dropdown } from "../../../../../components/Dropdown";
import { useGetTeachersMutation } from "../../../../../service";
import { selectCurrentUser } from "../../../../../store/auth";
import { User } from "../../../../../store/type";

export const options = {
  plugins: {},
  responsive: true,
};

export const PerformancePerCompetence: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const [getTeachers, teacherRequest] = useGetTeachersMutation();
  const [selectedTeacher, setSelectedTeacher] = useState<User>();

  useEffect(() => {
    getTeachers({ project_id: user.currentProject?.id || 0 });
  }, [getTeachers, user]);

  const renderItem = (teacher: User) => (
    <Container
      p="8px"
      key={teacher.id}
      onClick={() => setSelectedTeacher(teacher)}
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
    <Card flex={1}>
      <Container
        p="24px"
        m="-24px"
        mb="32px"
        borderBottom="1px solid #E3E6E9"
        flexDirection="column"
      >
        <Text
          mb="8px"
          fontSize="20px"
          fontWeight="600"
          lineHeight="28px"
          color="#16191D"
          value="Performance by competence"
        />
        <Text
          fontSize="14px"
          fontWeight="400"
          color="#576375"
          lineHeight="20px"
          value="How each teacher evolved in each competency during the orientation sessions."
        />
      </Container>
      <Dropdown
        id="select-teacher"
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
    </Card>
  );
};

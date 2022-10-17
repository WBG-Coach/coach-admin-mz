import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProjectsMutation } from "../../service";
import { selectCurrentUser, selectProject } from "../../store/auth";
import { Project } from "../../store/type";
import { Container } from "../Container";
import { Image } from "../Image";
import { LoadingDots } from "../LoadingDots";
import { Text } from "../Text";

export const SelectProject: React.FC<{ afterSelect?: () => void }> = ({
  afterSelect,
}) => {
  const user = useSelector(selectCurrentUser);
  const [getProjects, requestProjects] = useGetProjectsMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const onSelect = (project: Project) => {
    dispatch(selectProject(project));
    if (afterSelect) {
      afterSelect();
    }
  };

  return (
    <Container flexDirection="column">
      <Text
        value="Select a project"
        fontSize={24}
        mb="16px"
        fontWeight="bold"
      />
      {requestProjects.isLoading ? (
        <Container minHeight={"160px"} minWidth={"400px"}>
          <LoadingDots />
        </Container>
      ) : (
        requestProjects.data?.map((project) => (
          <Container
            minWidth={400}
            padding="20px 16px"
            alignItems="center"
            onClick={() => onSelect(project)}
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
              {project.image_url ? (
                <Image src={project.image_url} width="40px" />
              ) : (
                <Text
                  fontSize="24px"
                  color="#49504C"
                  value={project?.name?.substring(0, 1)}
                />
              )}
            </Container>
            <Container flex={1}>
              <Text fontSize="16px" lineHeight="24px" value={project.name} />
            </Container>
            {user.currentProject?.id === project.id && (
              <Container
                padding="0px 8px"
                background={project.primary_color}
                borderRadius="8px"
              >
                <Text
                  ml="auto"
                  fontSize="12px"
                  lineHeight="24px"
                  color="#ffffff"
                  value={"Selected"}
                />
              </Container>
            )}
          </Container>
        ))
      )}
    </Container>
  );
};

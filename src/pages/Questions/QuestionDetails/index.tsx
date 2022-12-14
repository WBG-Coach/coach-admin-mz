import { Container, Text } from "../../../components";
import { Icon } from "../../../components/Icon";
import { Question } from "../../../store/type";
import { OptionButton } from "../OptionButton";

type Props = {
  question: Question;
};

export const QuestionDetails: React.FC<Props> = ({ question }) => {
  return (
    <>
      <Container flex={1} flexDirection="column">
        <>
          <Container flexDirection="column">
            <Text fontSize={18} fontWeight="bold">
              {question.text}
            </Text>

            {question.competence && (
              <Container
                mt="8px"
                p="12px"
                width="100%"
                borderRadius="20px"
                background="#F4F5F5"
                flexDirection="column"
              >
                <Container mb="8px" alignItems="center">
                  <Icon
                    name="puzzle-piece"
                    size={16}
                    mr="4px"
                    color="#49504C"
                  />
                  <Text
                    fontSize={"12px"}
                    lineHeight="16px"
                    color="#49504C"
                    value={question.competence.title}
                  />
                </Container>
                <Text
                  fontSize="14px"
                  lineHeight="20px"
                  fontWeight="500"
                  value={question?.competence.subtitle}
                />
              </Container>
            )}

            <Container mt="24px" flexDirection="column">
              {question.options.map((option) => (
                <OptionButton mb="12px" value={option.text} />
              ))}
            </Container>
          </Container>
        </>
      </Container>
    </>
  );
};

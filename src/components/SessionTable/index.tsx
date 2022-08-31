import { Container } from "../Container";
import { Icon } from "../Icon";
import { Image } from "../Image";
import { Text } from "../Text";
import { ColorTableProps } from "./types";

export const SessionTable: React.FC<ColorTableProps> = ({ data }) => {
  const getBgColor = (percent: number) => {
    if (percent >= 90) return "rgb(214, 245, 222)";
    if (percent >= 70) return "rgb(239, 251, 242)";
    if (percent >= 50) return "rgb(255, 252, 235)";
    if (percent >= 25) return "rgb(252, 238, 238)";
    return "rgb(247, 212, 212)";
  };

  return (
    <Container width="100%" flexDirection="column">
      <Container flexDirection="row" width="100%">
        <Container
          p="8px"
          flex={2}
          minWidth={120}
          borderRight="1px solid #ECEEED"
        >
          {data[0]?.teacher && (
            <Text fontSize={12} value="Teacher" fontWeight={500} />
          )}
          {data[0]?.coach && (
            <Text fontSize={12} value="Coach" fontWeight={500} />
          )}
          {data[0]?.school && (
            <Text fontSize={12} value="School" fontWeight={500} />
          )}
        </Container>
        <Container
          width={120}
          p="8px"
          borderRight="1px solid #ECEEED"
          justifyContent="center"
        >
          <Text fontSize={12} value="Sessions" fontWeight={500} />
        </Container>
        <Container
          width={120}
          p="8px"
          justifyContent="center"
          borderRight="1px solid #ECEEED"
        >
          <Text fontSize={12} value="Feedbacks" fontWeight={500} />
        </Container>
        <Container
          width={120}
          p="8px"
          borderRight="1px solid #ECEEED"
          justifyContent="center"
        >
          <Text fontSize={12} value="Comp. positive" fontWeight={500} />
        </Container>
        <Container width={120} p="8px" justifyContent="center">
          <Text fontSize={12} value="Comp. negative" fontWeight={500} />
        </Container>
      </Container>
      {data.map((item) => (
        <Container
          flexDirection="row"
          width="100%"
          borderTop="1px solid #ECEEED"
        >
          {item.teacher && (
            <Container
              flex={1}
              p="8px"
              minWidth={120}
              alignItems="center"
              borderRight="1px solid #ECEEED"
            >
              <Container
                mr="8px"
                width="24px"
                height="24px"
                overflow="hidden"
                alignItems="center"
                borderRadius="20px"
                background="#F4F5F5"
                justifyContent="center"
              >
                {item.teacher.image_url ? (
                  <Image
                    src={item.teacher.image_url}
                    width="24px"
                    height="24px"
                  />
                ) : (
                  <Text
                    fontSize="16px"
                    color="#49504C"
                    value={item.teacher?.name?.substring(0, 1)}
                  />
                )}
              </Container>
              <Text fontSize={12} value={item.teacher.name} />
            </Container>
          )}
          {item.coach && (
            <Container
              flex={1}
              p="8px"
              minWidth={120}
              alignItems="center"
              borderRight="1px solid #ECEEED"
            >
              <Container
                mr="8px"
                width="24px"
                height="24px"
                overflow="hidden"
                alignItems="center"
                borderRadius="20px"
                background="#F4F5F5"
                justifyContent="center"
              >
                {item.coach.image_url ? (
                  <Image
                    src={item.coach.image_url}
                    width="24px"
                    height="24px"
                  />
                ) : (
                  <Text
                    fontSize="16px"
                    color="#49504C"
                    value={item.coach?.name?.substring(0, 1)}
                  />
                )}
              </Container>
              <Text fontSize={12} value={item.coach.name} />
            </Container>
          )}
          {item.school && (
            <Container
              flex={1}
              p="8px"
              minWidth={120}
              borderRight="1px solid #ECEEED"
              alignItems="center"
            >
              <Container
                mr="8px"
                width="24px"
                height="24px"
                overflow="hidden"
                alignItems="center"
                borderRadius="20px"
                background="#F4F5F5"
                justifyContent="center"
              >
                {item.school.image_url ? (
                  <Image
                    src={item.school.image_url}
                    width="24px"
                    height="24px"
                  />
                ) : (
                  <Icon size={16} name="university" color="#49504C" />
                )}
              </Container>
              <Text fontSize={12} value={item.school.name} />
            </Container>
          )}
          <Container
            width={120}
            p="8px"
            borderRight="1px solid #ECEEED"
            justifyContent="center"
          >
            <Text fontSize={12} value={item.sessions_qty.toString()} />
          </Container>
          <Container
            width={120}
            p="8px"
            borderRight="1px solid #ECEEED"
            justifyContent="center"
          >
            <Text fontSize={12} value={item.feedback_qty.toString()} />
          </Container>
          <Container
            width={120}
            p="8px"
            borderRight="1px solid #ECEEED"
            justifyContent="center"
            background={getBgColor(
              item.yes_qty + item.no_qty === 0
                ? 0
                : (item.yes_qty / (item.yes_qty + item.no_qty)) * 100
            )}
          >
            <Text
              fontSize={12}
              value={
                item.yes_qty + item.no_qty === 0
                  ? "0%"
                  : (
                      (item.yes_qty / (item.yes_qty + item.no_qty)) *
                      100
                    ).toFixed(0) + "%"
              }
            />
          </Container>
          <Container
            width={120}
            p="8px"
            justifyContent="center"
            background={getBgColor(
              item.yes_qty + item.no_qty === 0
                ? 0
                : (item.no_qty / (item.yes_qty + item.no_qty)) * 100
            )}
          >
            <Text
              fontSize={12}
              value={
                item.yes_qty + item.no_qty === 0
                  ? "0%"
                  : (
                      (item.no_qty / (item.yes_qty + item.no_qty)) *
                      100
                    ).toFixed(0) + "%"
              }
            />
          </Container>
        </Container>
      ))}
      <Container flexDirection="row" width="100%" borderTop="1px solid #ECEEED">
        <Container
          p="8px"
          flex={1}
          minWidth={120}
          borderRight="1px solid #ECEEED"
        >
          <Text fontSize={12} value="Total" fontWeight={500} />
        </Container>

        <Container
          width={120}
          p="8px"
          borderRight="1px solid #ECEEED"
          justifyContent="center"
        >
          <Text
            fontSize={12}
            fontWeight={500}
            value={data
              .reduce((acc, item) => acc + item.sessions_qty, 0)
              .toString()}
          />
        </Container>

        <Container
          width={120}
          p="8px"
          justifyContent="center"
          borderRight="1px solid #ECEEED"
        >
          <Text
            fontSize={12}
            fontWeight={500}
            value={data
              .reduce((acc, item) => acc + item.feedback_qty, 0)
              .toString()}
          />
        </Container>

        <Container
          width={120}
          p="8px"
          justifyContent="center"
          borderRight="1px solid #ECEEED"
        />
        <Container width={"120px"} p="8px" />
      </Container>
    </Container>
  );
};

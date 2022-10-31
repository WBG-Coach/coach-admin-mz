import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SessionReport } from "../../store/type";
import { Container } from "../Container";
import { Icon } from "../Icon";
import { Image } from "../Image";
import { Paginator } from "../Paginator";
import { Text } from "../Text";
import { ColorTableProps } from "./types";

export const SessionTable: React.FC<ColorTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [paginatedItems, setPaginatedItems] = useState<SessionReport>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (data.length > itemsPerPage)
      setPaginatedItems(
        data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      );
    else setPaginatedItems(data);
  }, [data, currentPage, itemsPerPage]);

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
            <Text
              fontSize={12}
              value={t("Dashboard.SessionTable.teacher")}
              fontWeight={500}
            />
          )}
          {data[0]?.coach && (
            <Text
              fontSize={12}
              value={t("Dashboard.SessionTable.coach")}
              fontWeight={500}
            />
          )}
          {data[0]?.school && (
            <Text
              fontSize={12}
              value={t("Dashboard.SessionTable.school")}
              fontWeight={500}
            />
          )}
        </Container>
        <Container
          width={120}
          p="8px"
          borderRight="1px solid #ECEEED"
          justifyContent="center"
        >
          <Text
            fontSize={12}
            value={t("Dashboard.SessionTable.sessions")}
            fontWeight={500}
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
            value={t("Dashboard.SessionTable.feedbacks")}
            fontWeight={500}
          />
        </Container>
        <Container
          width={120}
          p="8px"
          borderRight="1px solid #ECEEED"
          justifyContent="center"
        >
          <Text
            fontSize={12}
            value={t("Dashboard.SessionTable.positive-comp")}
            fontWeight={500}
          />
        </Container>
        <Container width={120} p="8px" justifyContent="center">
          <Text
            fontSize={12}
            value={t("Dashboard.SessionTable.negative-comp")}
            fontWeight={500}
          />
        </Container>
      </Container>
      {paginatedItems.map((item, index) => (
        <Container
          key={index}
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
      <Paginator
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onChangePage={(newPage) => setCurrentPage(newPage)}
        onChangeItemsPerPage={(newValue) => setItemsPerPage(newValue)}
        totalItems={data?.length}
      />
    </Container>
  );
};

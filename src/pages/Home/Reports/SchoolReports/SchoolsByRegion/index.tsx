import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomCard } from "../../../../../components/CustomCard";
import { GoogleMap, LoadScript, OverlayView } from "@react-google-maps/api";
import { Container, Image, Text } from "../../../../../components";
import { MapsStyle } from "./mapsStyle";
import { CircularProgressbar } from "react-circular-progressbar";
import { useGetSchoolsByRegionMutation } from "../../../../../service/reports";
import { SchoolByRegion } from "../../../../../store/type";
import { Icon } from "../../../../../components/Icon";
import { LoadingDots } from "../../../../../components/LoadingDots";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../../store/auth";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const markerStyle = {
  borderRadius: "50%",
  height: "48px",
  width: "48px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

export const SchoolsByRegion = () => {
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
  const [selectedSchool, setSelectedSchool] = useState<SchoolByRegion>();
  const [getSchoolsByRegion, { isLoading, data }] =
    useGetSchoolsByRegionMutation();

  const [zoom] = React.useState(2);
  const [center] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    getSchoolsByRegion({
      project_id: user.currentProject?.id || 0,
    });
  }, [getSchoolsByRegion, user]);

  const renderInfoItem = (value: string, label: string) => (
    <Container flex={1} flexDirection="column">
      <Text
        mb="4px"
        value={value}
        fontSize="32px"
        lineHeight="40px"
        color="#16191D"
        fontWeight="600"
      />
      <Text value={label} fontSize="16px" lineHeight="20px" color="#576375" />
    </Container>
  );
  return (
    <CustomCard
      mb="16px"
      width="100%"
      title={t("Dashboard.SchoolReports.schools-by-region")}
      description={t("Dashboard.SchoolReports.schools-by-region-description")}
    >
      <Container gridGap="40px">
        <Container flex={1} borderRadius="12px" overflow="hidden">
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY || ""}
          >
            <GoogleMap
              zoom={zoom}
              center={center}
              options={{ styles: MapsStyle }}
              mapContainerStyle={containerStyle}
            >
              {data?.map((school, index) => (
                <OverlayView
                  key={index}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  position={{
                    lat: school.latitude || 0,
                    lng: school.longitude || 0,
                  }}
                >
                  <button
                    style={{
                      ...markerStyle,
                      border:
                        school.id === selectedSchool?.id
                          ? "4px solid #3373CC"
                          : "none",
                    }}
                    onClick={() => setSelectedSchool(school)}
                  >
                    {school.image_url ? (
                      <Image
                        src={school.image_url}
                        width="40px"
                        height="40px"
                        borderRadius="50%"
                      />
                    ) : (
                      <Icon size={24} name="university" color="#49504C" />
                    )}
                  </button>
                </OverlayView>
              ))}
            </GoogleMap>
          </LoadScript>
        </Container>
        {isLoading ? (
          <LoadingDots />
        ) : (
          <Container flex={1} flexDirection="column" gridGap="24px">
            <Container gridGap="16px" alignItems="center">
              {selectedSchool?.image_url ? (
                <Image
                  src={selectedSchool.image_url}
                  width="48px"
                  height="48px"
                  borderRadius="50%"
                />
              ) : (
                <Icon size={48} name="university" color="#49504C" />
              )}
              <Container flexDirection="column">
                <Text
                  mb="8px"
                  fontSize="24px"
                  fontWeight="600"
                  lineHeight="32px"
                  color="#16191D"
                  value={selectedSchool?.name || "Select a school"}
                />
                <Text
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight="24px"
                  color="#576375"
                  value={selectedSchool?.address || "-"}
                />
              </Container>
            </Container>
            {typeof selectedSchool?.teachers_qty === "number" && (
              <Container gridGap="16px">
                <Container width="64px">
                  <CircularProgressbar
                    value={selectedSchool?.positive_percent || 0}
                    styles={{}}
                  />
                </Container>
                <Container>
                  {renderInfoItem(
                    `${selectedSchool?.positive_percent || 0}%`,
                    t("Dashboard.SchoolReports.positive-competencies")
                  )}
                </Container>
              </Container>
            )}
            <Container>
              {typeof selectedSchool?.teachers_qty === "number" &&
                renderInfoItem(
                  selectedSchool?.teachers_qty.toString(),
                  t("Dashboard.SchoolReports.teachers")
                )}
              {typeof selectedSchool?.coaches_qty === "number" &&
                renderInfoItem(
                  selectedSchool?.coaches_qty.toString(),
                  t("Dashboard.SchoolReports.coaches")
                )}
            </Container>
            <Container>
              {typeof selectedSchool?.sessions_qty === "number" &&
                renderInfoItem(
                  selectedSchool.sessions_qty.toString(),
                  t("Dashboard.SchoolReports.sessions")
                )}
              {typeof selectedSchool?.feedbacks_qty === "number" &&
                renderInfoItem(
                  selectedSchool?.feedbacks_qty.toString(),
                  t("Dashboard.SchoolReports.feedbacks")
                )}
            </Container>
          </Container>
        )}
      </Container>
    </CustomCard>
  );
};

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomCard } from "../../../../../components/CustomCard";
import { GoogleMap, LoadScript, OverlayView } from "@react-google-maps/api";
import { Container, Image, Text } from "../../../../../components";
import { MapsStyle } from "./mapsStyle";
import { CircularProgressbar } from "react-circular-progressbar";

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

const schools = [
  {
    id: 1,
    lat: 45.79837,
    lng: 104.41674,
    name: "School 1",
    address: "86 Rua Sabino Pires, Maputo, Moçambique",
    image_url: "https://swgfl.org.uk/assets/images/school-l.jpg",
    teachers: 20,
    sessions: 10,
    feedbacks: 4,
    coaches: 10,
    positiveCompetencies: 50,
  },
  {
    id: 2,
    lat: -27.63848,
    lng: 35.69651,
    name: "School 2",
    address: "86 Rua Sabino Pires, Maputo, Moçambique",
    image_url:
      "https://basickamaster.in/wp-content/uploads/2022/06/school-icon.png",
    teachers: 30,
    sessions: 60,
    feedbacks: 40,
    coaches: 30,
    positiveCompetencies: 70,
  },
  {
    id: 3,
    lat: 47.98133,
    lng: 79.88778,
    name: "School 3",
    address: "86 Rua Sabino Pires, Maputo, Moçambique",
    image_url: "https://www.co.pine.mn.us/school.jpg",
    teachers: 10,
    sessions: 20,
    feedbacks: 12,
    coaches: 1,
    positiveCompetencies: 20,
  },
];

export const SchoolsByRegion = () => {
  const { t } = useTranslation();
  const [selectedSchool, setSelectedSchool] = useState(schools[0]);

  const [zoom] = React.useState(2);
  const [center] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

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
          <LoadScript googleMapsApiKey="AIzaSyBJR-Qm19jraWkc52MXazoQfMp5uBnZkUg">
            <GoogleMap
              zoom={zoom}
              center={center}
              options={{ styles: MapsStyle }}
              mapContainerStyle={containerStyle}
            >
              {schools.map((school, index) => (
                <OverlayView
                  key={index}
                  position={school}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <button
                    style={{
                      ...markerStyle,
                      border:
                        school.id === selectedSchool.id
                          ? "4px solid #3373CC"
                          : "none",
                    }}
                    onClick={() => setSelectedSchool(school)}
                  >
                    <Image
                      width="40px"
                      height="40px"
                      borderRadius="50%"
                      src={school.image_url}
                    />
                  </button>
                </OverlayView>
              ))}
            </GoogleMap>
          </LoadScript>
        </Container>
        <Container flex={1} flexDirection="column" gridGap="24px">
          <Container gridGap="16px" alignItems="center">
            <Image
              src={selectedSchool.image_url}
              width="48px"
              height="48px"
              borderRadius="50%"
            />
            <Container flexDirection="column">
              <Text
                mb="8px"
                fontSize="24px"
                fontWeight="600"
                lineHeight="32px"
                color="#16191D"
                value={selectedSchool.name}
              />
              <Text
                fontSize="16px"
                fontWeight="400"
                lineHeight="24px"
                color="#576375"
                value={selectedSchool.address}
              />
            </Container>
          </Container>
          <Container gridGap="16px">
            <Container width="64px">
              <CircularProgressbar
                value={selectedSchool.positiveCompetencies}
                styles={{}}
              />
            </Container>
            <Container>
              {renderInfoItem(
                `${selectedSchool.positiveCompetencies}%`,
                t("Dashboard.SchoolReports.positive-competencies")
              )}
            </Container>
          </Container>
          <Container>
            {renderInfoItem(
              selectedSchool.teachers.toString(),
              t("Dashboard.SchoolReports.teachers")
            )}
            {renderInfoItem(
              selectedSchool.coaches.toString(),
              t("Dashboard.SchoolReports.coaches")
            )}
          </Container>
          <Container>
            {renderInfoItem(
              selectedSchool.sessions.toString(),
              t("Dashboard.SchoolReports.sessions")
            )}
            {renderInfoItem(
              selectedSchool.feedbacks.toString(),
              t("Dashboard.SchoolReports.feedbacks")
            )}
          </Container>
        </Container>
      </Container>
    </CustomCard>
  );
};

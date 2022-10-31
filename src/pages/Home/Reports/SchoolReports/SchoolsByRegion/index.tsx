import React from "react";
import { useTranslation } from "react-i18next";
import { CustomCard } from "../../../../../components/CustomCard";

export const SchoolsByRegion = () => {
  const { t } = useTranslation();
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();
  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  return (
    <CustomCard
      mb="16px"
      width="100%"
      title={t("Dashboard.SchoolReports.schools-by-region")}
      description={t("Dashboard.SchoolReports.schools-by-region-description")}
    >
      <div id="map" ref={ref} />
    </CustomCard>
  );
};

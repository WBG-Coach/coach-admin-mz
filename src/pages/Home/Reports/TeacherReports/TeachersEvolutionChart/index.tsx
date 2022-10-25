import { CircularProgressbar } from "react-circular-progressbar";
import { CustomCard } from "../../../../../components/CustomCard";
import "react-circular-progressbar/dist/styles.css";
import { useTranslation } from "react-i18next";

export const TeachersEvolutionChart: React.FC = () => {
  const { t } = useTranslation();
  const progressValue = 66;

  return (
    <CustomCard
      width="100%"
      title={t("Dashboard.TeacherReports.teacher-evolution")}
      description={t("Dashboard.TeacherReports.teacher-evolution-description")}
    >
      <CircularProgressbar value={progressValue} text={`${progressValue}%`} />
    </CustomCard>
  );
};

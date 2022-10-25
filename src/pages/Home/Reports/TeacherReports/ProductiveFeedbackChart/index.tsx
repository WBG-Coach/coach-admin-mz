import { CircularProgressbar } from "react-circular-progressbar";
import { CustomCard } from "../../../../../components/CustomCard";
import "react-circular-progressbar/dist/styles.css";
import { useTranslation } from "react-i18next";

export const ProductiveFeedbackChart: React.FC = () => {
  const progressValue = 33;
  const { t } = useTranslation();

  return (
    <CustomCard
      width="100%"
      title={t("Dashboard.TeacherReports.productive-feedback")}
      description={t(
        "Dashboard.TeacherReports.productive-feedback-description"
      )}
    >
      <CircularProgressbar value={progressValue} text={`${progressValue}%`} />
    </CustomCard>
  );
};

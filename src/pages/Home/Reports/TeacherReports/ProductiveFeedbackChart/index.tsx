import { CircularProgressbar } from "react-circular-progressbar";
import { CustomCard } from "../../../../../components/CustomCard";
import "react-circular-progressbar/dist/styles.css";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo } from "react";
import { LoadingDots } from "../../../../../components/LoadingDots";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../../store/auth";
import { useGetProductiveFeedbackMutation } from "../../../../../service/reports";

export const ProductiveFeedbackChart: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const [getProductiveFeedbacks, { data }] = useGetProductiveFeedbackMutation();
  const { t } = useTranslation();

  useEffect(() => {
    getProductiveFeedbacks({ project_id: user.currentProject?.id || 0 });
  }, [getProductiveFeedbacks, user.currentProject?.id]);

  const value = useMemo(() => {
    if (!data || data.sessions_qty === 0) return 0;
    return (data.improvement_qty / data.sessions_qty) * 100;
  }, [data]);

  return !data ? (
    <LoadingDots />
  ) : (
    <CustomCard
      width="100%"
      title={t("Dashboard.TeacherReports.productive-feedback")}
      description={t(
        "Dashboard.TeacherReports.productive-feedback-description"
      )}
    >
      <CircularProgressbar value={value} text={`${value}%`} />
    </CustomCard>
  );
};

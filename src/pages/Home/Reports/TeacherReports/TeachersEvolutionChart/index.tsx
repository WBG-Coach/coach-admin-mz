import { CircularProgressbar } from "react-circular-progressbar";
import { CustomCard } from "../../../../../components/CustomCard";
import "react-circular-progressbar/dist/styles.css";
import { useTranslation } from "react-i18next";
import { useGetTeacherEvolutionMutation } from "../../../../../service/reports";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../../store/auth";
import { LoadingDots } from "../../../../../components/LoadingDots";

export const TeachersEvolutionChart: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const [getTeacherEvolution, { data }] = useGetTeacherEvolutionMutation();
  const { t } = useTranslation();

  useEffect(() => {
    getTeacherEvolution({ project_id: user.currentProject?.id || 0 });
  }, [getTeacherEvolution, user.currentProject?.id]);

  const value = useMemo(() => {
    if (!data) return 0;
    return (data.perfect_last_sessions_qty / data.teachers_qty) * 100;
  }, [data]);

  return !data ? (
    <LoadingDots />
  ) : (
    <CustomCard
      width="100%"
      title={t("Dashboard.TeacherReports.teacher-evolution")}
      description={t("Dashboard.TeacherReports.teacher-evolution-description")}
    >
      <CircularProgressbar value={value} text={`${value}%`} />
    </CustomCard>
  );
};

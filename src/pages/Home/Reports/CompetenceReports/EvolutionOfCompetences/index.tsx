import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CustomCard } from "../../../../../components/CustomCard";
import { LoadingDots } from "../../../../../components/LoadingDots";
import { useGetReportCompetenceEvolutionsMutation } from "../../../../../service/reports";
import { selectCurrentUser } from "../../../../../store/auth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {},
  stacked: true,
  plugins: {},
  scales: {},
};

const COLORS = ["#165BAA", "#A155B9", "#FFA5CB", "#16BFD6", "#1DDD8D"];

type DateItem = {
  label: string;
  borderColor: string;
  backgroundColor: string;
  data: number[];
};

export const EvolutionOfCompetences = () => {
  const { t } = useTranslation();
  const [requestReport, { data, isLoading }] =
    useGetReportCompetenceEvolutionsMutation();
  const [datasets, setDatasets] = useState<DateItem[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    requestReport({ project_id: user.currentProject?.id || 0 });
  }, [requestReport, user]);

  useEffect(() => {
    if (data) {
      setDatasets(
        data.map((item, index) => ({
          label: item.name,
          borderColor: COLORS[index],
          backgroundColor: COLORS[index],
          data: item.data.map((itemData) => itemData.qty * 100),
        }))
      );
      setLabels(data[0].data.map((item) => item.month));
    }
  }, [data]);

  return isLoading ? (
    <LoadingDots />
  ) : (
    <CustomCard
      width="100%"
      title={t("Dashboard.CompetenceReports.feedbacks-per-competency")}
    >
      <Line height="60px" options={options} data={{ labels, datasets }} />
    </CustomCard>
  );
};

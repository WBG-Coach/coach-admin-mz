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
import { Text } from "../../../../../components";
import { Card } from "../../../../../components/Card";
import { LoadingDots } from "../../../../../components/LoadingDots";
import { useGetReportCompetenceEvolutionsMutation } from "../../../../../service";

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

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const COLORS = ["#165BAA", "#A155B9", "#FFA5CB", "#16BFD6", "#1DDD8D"];

type DateItem = {
  label: string;
  borderColor: string;
  backgroundColor: string;
  data: number[];
};

export const EvolutionOfCompetences = () => {
  const [requestReport, { data, isLoading }] =
    useGetReportCompetenceEvolutionsMutation();
  const [datasets, setDatasets] = useState<DateItem[]>([]);

  useEffect(() => {
    requestReport(2022);
  }, [requestReport]);

  useEffect(() => {
    if (data) {
      setDatasets(
        data.map((item, index) => ({
          label: item.name,
          borderColor: COLORS[index],
          backgroundColor: COLORS[index],
          data: item.data.map((itemData) => itemData.percentYes * 100),
        }))
      );
    }
  }, [data]);

  return isLoading ? (
    <LoadingDots />
  ) : (
    <Card>
      <Text
        mb="32px"
        fontSize="18px"
        lineHeight="24px"
        value="Evolution of competences in 2022"
      />
      <Line options={options} data={{ labels, datasets }} />
    </Card>
  );
};
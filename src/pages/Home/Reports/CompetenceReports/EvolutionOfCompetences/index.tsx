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
import { Line } from "react-chartjs-2";
import { Text } from "../../../../../components";
import { Card } from "../../../../../components/Card";

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

export const data = {
  labels,
  datasets: [
    {
      label: "Competence 1",
      borderColor: "#165BAA",
      backgroundColor: "#165BAA",
      data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 90, 70],
    },
    {
      label: "Competence 2",
      borderColor: "#A155B9",
      backgroundColor: "#A155B9",
      data: [5, 25, 20, 10, 50, 60, 35, 15, 90, 80, 70, 90],
    },
    {
      label: "Competence 3",
      borderColor: "#FFA5CB",
      backgroundColor: "#FFA5CB",
      data: [15, 35, 30, 10, 30, 40, 95, 45, 90, 80, 75, 10],
    },
    {
      label: "Competence 4",
      borderColor: "#16BFD6",
      backgroundColor: "#16BFD6",
      data: [25, 45, 50, 60, 70, 90, 10, 35, 40, 50, 95, 100],
    },
    {
      label: "Competence 5",
      borderColor: "#1DDD8D",
      backgroundColor: "#1DDD8D",
      data: [95, 15, 60, 0, 35, 45, 85, 95, 20, 30, 40, 30],
    },
  ],
};

export const EvolutionOfCompetences = () => {
  return (
    <Card>
      <Text
        mb="32px"
        fontSize="18px"
        lineHeight="24px"
        value="Evolution of competences"
      />
      <Line options={options} data={data} />
    </Card>
  );
};

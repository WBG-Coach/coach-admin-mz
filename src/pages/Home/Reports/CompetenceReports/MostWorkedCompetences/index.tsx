import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Text } from "../../../../../components";
import { Card } from "../../../../../components/Card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {},
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = [
  "Competencia 1",
  "Competencia 2",
  "Competencia 3",
  "Competencia 4",
  "Competencia 5",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Não com feedback",
      data: [40, 30, 10, 30, 10],
      backgroundColor: "#0080FF",
    },
    {
      label: "Não sem feedback",
      data: [10, 45, 80, 45, 80],
      backgroundColor: "#EC9393",
    },
    {
      label: "Sim",
      data: [50, 25, 10, 25, 10],
      backgroundColor: "#33CC5A",
    },
  ],
};

export const MostWorkedCompetences = () => {
  return (
    <Card flex={1}>
      <Text
        mb="32px"
        fontSize="18px"
        lineHeight="24px"
        value="Most worked competences with teachers"
      />
      <Bar options={options} data={data} />
    </Card>
  );
};

import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

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
      type: "bar" as const,
      label: "Sessions with feedback",
      backgroundColor: "rgb(75, 192, 192)",
      borderColor: "white",
      borderWidth: 2,
      data: [0, 2, 35, 65, 10, 10, 22, 17, 29, 91, 70, 15],
    },
    {
      type: "line" as const,
      label: "Sessions created",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: [20, 10, 40, 100, 25, 12, 50, 27, 30, 100, 80, 75],
    },
  ],
};

export const SessionReports = () => {
  return <Chart type="bar" data={data} />;
};

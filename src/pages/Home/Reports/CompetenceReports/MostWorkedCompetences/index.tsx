import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Text } from "../../../../../components";
import { Card } from "../../../../../components/Card";
import { LoadingDots } from "../../../../../components/LoadingDots";
import { useGetReportCompetenceWithFeedbacksMutation } from "../../../../../service";

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

type DatesetItem = {
  label: string;
  data: number[];
  backgroundColor: string;
};

const TYPES: { label: "yes" | "no"; backgroundColor: string }[] = [
  { label: "yes", backgroundColor: "#0080FF" },
  { label: "no", backgroundColor: "#EC9393" },
];

export const MostWorkedCompetences: React.FC<{
  start_date: Date;
  end_date: Date;
}> = ({ end_date, start_date }) => {
  const [requestReport, { isLoading, data }] =
    useGetReportCompetenceWithFeedbacksMutation();
  const [datasets, setDatasets] = useState<DatesetItem[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    requestReport({ end_date, start_date });
  }, [requestReport, end_date, start_date]);

  useEffect(() => {
    setDatasets(
      TYPES?.map((type) => ({
        ...type,
        data:
          data?.map(
            (item): number => (item[type.label] / item.total) * 100 || 0
          ) || [],
      })) || []
    );

    setLabels(data?.map((item) => item.name) || []);
  }, [data]);

  return isLoading ? (
    <LoadingDots />
  ) : (
    <Card flex={1}>
      <Text
        mb="32px"
        fontSize="18px"
        lineHeight="24px"
        value="Most worked competences with teachers"
      />
      <Bar options={options} data={{ labels, datasets }} />
    </Card>
  );
};

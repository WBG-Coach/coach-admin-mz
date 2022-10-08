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
import { useSelector } from "react-redux";
import { Text } from "../../../../../components";
import { Card } from "../../../../../components/Card";
import { LoadingDots } from "../../../../../components/LoadingDots";
import { useGetReportCompetencesMutation } from "../../../../../service";
import { selectCurrentUser } from "../../../../../store/auth";

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
};

type DatesetItem = {
  label: string;
  data: number[];
  backgroundColor: string;
};

const TYPES: { label: string; backgroundColor: string; attr: string }[] = [
  { label: "Marked as yes", attr: "yes", backgroundColor: "#33CC5A" },
  { label: "Marked as no", attr: "no", backgroundColor: "#D92626" },
  { label: "Feedback sessions", attr: "no", backgroundColor: "#0080FF" },
];

export const MostWorkedCompetences: React.FC<{
  start_date: Date;
  end_date: Date;
}> = ({ end_date, start_date }) => {
  const [requestReport, { isLoading, data }] =
    useGetReportCompetencesMutation();
  const [datasets, setDatasets] = useState<DatesetItem[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    requestReport({
      end_date,
      start_date,
      project_id: user.currentProject?.id || 0,
    });
  }, [requestReport, end_date, start_date, user]);

  useEffect(() => {
    setDatasets(
      TYPES?.map((type) => ({
        ...type,
        data: data?.map((item: any): number => item[type.attr] || 0) || [],
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

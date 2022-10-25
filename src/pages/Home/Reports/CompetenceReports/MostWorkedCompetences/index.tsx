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
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CustomCard } from "../../../../../components/CustomCard";
import { LoadingDots } from "../../../../../components/LoadingDots";
import { useGetReportCompetencesMutation } from "../../../../../service/reports";
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

export const MostWorkedCompetences: React.FC<{
  start_date: Date;
  end_date: Date;
}> = ({ end_date, start_date }) => {
  const { t } = useTranslation();
  const [requestReport, { isLoading, data }] =
    useGetReportCompetencesMutation();
  const [datasets, setDatasets] = useState<DatesetItem[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const user = useSelector(selectCurrentUser);

  const TYPES: { label: string; backgroundColor: string; attr: string }[] = [
    {
      label: t("Dashboard.CompetenceReports.marked-yes"),
      attr: "yes",
      backgroundColor: "#33CC5A",
    },
    {
      label: t("Dashboard.CompetenceReports.marked-no"),
      attr: "no",
      backgroundColor: "#D92626",
    },
    {
      label: t("Dashboard.CompetenceReports.feedback-sessions"),
      attr: "feedback_qty",
      backgroundColor: "#0080FF",
    },
  ];

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
    <CustomCard
      width="100%"
      title={t("Dashboard.CompetenceReports.most-worked")}
      description={t("Dashboard.CompetenceReports.most-worked-description")}
    >
      <Bar height="60px" options={options} data={{ labels, datasets }} />
    </CustomCard>
  );
};

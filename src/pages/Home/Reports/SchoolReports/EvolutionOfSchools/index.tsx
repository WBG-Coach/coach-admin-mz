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
import { useGetReportSchoolEvolutionsMutation } from "../../../../../service/reports";
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

type DateItem = {
  label: string;
  borderColor: string;
  backgroundColor: string;
  data: number[];
};

export const EvolutionOfSchools = () => {
  const { t } = useTranslation();
  const [requestReport, { data, isLoading }] =
    useGetReportSchoolEvolutionsMutation();
  const [datasets, setDatasets] = useState<DateItem[]>([]);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    requestReport({ year: 2022, project_id: user.currentProject?.id || 0 });
  }, [requestReport, user]);

  useEffect(() => {
    if (data) {
      setDatasets(
        data.map((item) => {
          const color = Math.floor(Math.random() * 16777215).toString(16);
          return {
            label: item.school,
            borderColor: `#${color}`,
            backgroundColor: `#${color}`,
            data: item.data.map((itemData) => itemData),
          };
        })
      );
    }
  }, [data]);

  return isLoading ? (
    <LoadingDots />
  ) : (
    <CustomCard
      mb="16px"
      width="100%"
      title={t("Dashboard.SchoolReports.schools-improved-most")}
      description={t(
        "Dashboard.SchoolReports.schools-improved-most-description"
      )}
    >
      <Line height="60px" options={options} data={{ labels, datasets }} />
    </CustomCard>
  );
};

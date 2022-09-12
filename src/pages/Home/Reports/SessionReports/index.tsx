import { useEffect } from "react";
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
import { Card } from "../../../../components/Card";
import { Text } from "../../../../components";
import { useTranslation } from "react-i18next";
import { useGetReportSessionByYearMutation } from "../../../../service";
import { selectCurrentUser } from "../../../../store/auth";
import { useSelector } from "react-redux";

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

export const SessionReports = () => {
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
  const [getReport, { data }] = useGetReportSessionByYearMutation();

  const report = {
    labels,
    datasets: [
      {
        type: "bar" as const,
        label: "Sessions with feedback",
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "white",
        borderWidth: 2,
        data: data?.map((item) => item.feedback_qty),
      },
      {
        type: "line" as const,
        label: "Sessions created",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: data?.map((item) => item.sessions_qty),
      },
    ],
  };

  useEffect(() => {
    getReport({
      project_id: user.currentProject?.id || 0,
      year: new Date().getFullYear(),
    });
  }, [getReport, user]);

  return (
    <Card>
      <Text
        mb="32px"
        fontSize="18px"
        lineHeight="24px"
        value={t("Dashboard.session-evolution")}
      />
      <Chart type="bar" data={report} />
    </Card>
  );
};

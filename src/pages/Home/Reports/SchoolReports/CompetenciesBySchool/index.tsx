import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Select from "../../../../../components/Select";
import { useGetReportCompetenciesBySchoolMutation } from "../../../../../service";
import { selectCurrentUser } from "../../../../../store/auth";
import { SessionReport } from "../../../../../store/type";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const CompetenciesBySchool: React.FC<{
  sessionReport: SessionReport;
}> = ({ sessionReport }) => {
  const [getCompetenciesBySchool, { data }] =
    useGetReportCompetenciesBySchoolMutation();
  const user = useSelector(selectCurrentUser);
  const [schoolId, setSchoolId] = useState<number | undefined>(
    sessionReport[0].school?.id
  );

  useEffect(() => {
    if (schoolId)
      getCompetenciesBySchool({
        school_id: schoolId,
        project_id: user.currentProject?.id || 0,
      });
  }, [getCompetenciesBySchool, schoolId, user]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = data?.map((item) => item.name);

  const config = {
    labels,
    datasets: [
      {
        label: "Yes",
        data: data?.map((item) => item.yes),
        backgroundColor: "#33CC5A",
      },
      {
        label: "No",
        data: data?.map((item) => item.no),
        backgroundColor: "#D92626",
      },
      {
        label: "Feedback",
        data: data?.map((item) => item.feedbacks_quantity),
        backgroundColor: "#0080FF",
      },
    ],
  };

  return (
    <>
      <Select
        value={sessionReport.findIndex((item) => item.school?.id === schoolId)}
        onChange={(option) => setSchoolId(option?.school?.id)}
        options={sessionReport}
        renderOption={(option) => option.school?.name}
      />
      <Bar options={options} data={config} />
    </>
  );
};

import { CircularProgressbar } from "react-circular-progressbar";
import { CustomCard } from "../../../../../components/CustomCard";
import "react-circular-progressbar/dist/styles.css";

export const ProductiveFeedbackChart: React.FC = () => {
  const progressValue = 33;

  return (
    <CustomCard
      width="100%"
      title="Teachers without feedbacks"
      description="Teachers who did not receive any feedback session."
    >
      <CircularProgressbar value={progressValue} text={`${progressValue}%`} />
    </CustomCard>
  );
};

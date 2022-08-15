export type DateRangeProps = {
  endDate: Date;
  startDate: Date;
  onChange: (range: { startDate: Date; endDate: Date }) => void;
};

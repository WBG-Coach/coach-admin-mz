import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { Icon } from "../Icon";
import { Modal } from "../Modal";
import { DateRangeProps } from "./types";
import { DateRangePicker } from "react-date-range";
import { StyledDateRangeInputContainer } from "./styles";
import { format } from "date-fns";

export const DateRange: React.FC<DateRangeProps> = ({
  startDate,
  endDate,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([
    { startDate, endDate, key: "selection" },
  ]);

  return (
    <>
      <StyledDateRangeInputContainer onClick={() => setOpen(true)}>
        <Icon name="schedule" size={24} />
        {format(startDate, "yyyy-MM-dd") +
          " - " +
          format(endDate, "yyyy-MM-dd")}
        <Icon name="angle-down" size={24} color="#7D827F" />
      </StyledDateRangeInputContainer>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <DateRangePicker
          ranges={range}
          inputRanges={[]}
          onChange={(item: any) => {
            if (item.selection.endDate !== item.selection.startDate) {
              onChange({
                endDate: item.selection.endDate,
                startDate: item.selection.startDate,
              });
              setOpen(false);
            }
            setRange([item.selection]);
          }}
        />
      </Modal>
    </>
  );
};
